import React, { useState, useEffect} from "react"
import { IAuth, IClient, ISite } from "../../interface/sites"
import userService  from "../../services/user-service"
import { saveLocally } from "../../utilities/local-storage"
import { utils } from "../../utilities/utils"
import { useHistory } from "react-router-dom"


export const useProvideAuth = () => {


 /**
  * auth_user state
  * history api .. react-router-dom
  */   
const [auth_user , setAuthUser] = useState<IClient|{}>({})
const history = useHistory()

/**
 * initial load of the component
 *@type boolean
 */
const [loggedIn , setLoggedIn] = useState<boolean>(false)

/**
 * user service .. this class is where every api calls is handled for user management
 */
const service = new userService()


/**
 * local client ... this class persisits data to local storage and handles encryption of data for security purpose. 
 */
const localClient = new saveLocally()


/**
 * 
 * @param email
 * @param password
 * @returns auth_user object ...typeod client
 */
const signIn = async ({email, password}:IAuth):Promise<IClient> => {
    try{
        let result =  await service.signIn({email :email ,password:password })
        updateState(result)
        setLoggedIn(true)
        setLocal("active" , result.id)
        return Promise.resolve(result) 
    }catch(error){
        return Promise.resolve(error)
    }
}

const setLocal = (value:string , id:string) =>{
    localStorage.setItem("loggedIn" , value)
    localStorage.setItem("clientId" , id)
}

/**
 * 
 * @param state auth_user ... typeof IClient
 * update state change to store statea and local storage to persist data.
 */
const updateState =(state:IClient) =>{

    //save state to context api
    setAuthUser(state)

    //set to local storage
    localClient.setClient(state)

}

/**
 * delete all state data object during a user session
 */
const logOut =  ():void => {
    var localStates = ["sites" , "clients" , "loggedIn" , "clientId"];

    try{

        for (var i in localStates) {
            localStorage.removeItem(localStates[i])
        } 
        history.push('/')
    }catch(error){
        
    }
   
}


useEffect(() => {
        var fetch_local_loggedIn_status = localStorage.getItem("loggedIn")

            if (fetch_local_loggedIn_status == "active"){
                 var user = localClient.getClient();
                  setAuthUser(user)
            }
}, [loggedIn])
    
    return{
     auth_user,
     logOut,
     signIn
    }

}