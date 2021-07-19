import React, {useState ,useEffect , useReducer} from "react"
import { IAuth, IClient  , ISite, ISiteRequest } from "../../interface/sites"
import scheduleService, { IResponse } from "../../services/schedule-service"
import { saveLocally } from "../../utilities/local-storage"
import { utils } from "../../utilities/utils"



export const  useProvideData = () => {
const initialSite = {sites:{}}

const reducer = (state:any , action:any) => {
   
    switch (action.type) {
        case 'update':
            return {
                ...state,
                sites:action.payload
                };
            
        default:
            throw new Error();
    }
}


/**
 * variables  and states management
 * sites .. sites lisiting for clients
 */
const [sites , dispatch] = useReducer(reducer , initialSite)
const [clients , setClient] = useState<IClient| {}>({})
const service = new  scheduleService()
const localClient = new saveLocally();
const [lastPage , setLastPage] = useState<number>(1)
const [page, setPage] = useState<number>(1)
const [limit, setLimit] = useState<number>(10)
const [end , setEnd ] = useState<number>(0)
const [start ,setStart] = useState<number>(0)
const [loading , setLoading] = useState<boolean>(false)

/** End */


    /**
        * 
        * @param state array of sites gotten from the server
        */
const saveStateForSites = (state: ISite[] | ISite) => {
        dispatch({ type: "update", payload: state })
        //set to local storage
        localClient.setSites(state)
}

 const updateState = (page: number, start: number, limit: number) => {
        setPage(page)
        setEnd(page * limit)
        setLimit(limit)
        setStart(start)
}



    /**
     * 
     * @returns promise ISites object
     */
   const list = async ({page , limit , query}:ISiteRequest): Promise<any> =>{
       
       let result;
       let response;
        try{
            
            if(query){
                 result = await service.list({ page, limit, query })
            }else{
                 result = await service.list({ page, limit})
            }   

           
            
             //set state  to local storage and provider  for clients
            if (result){
            setLastPage(result.page)

             result.sites && saveStateForSites(result.sites)  ;

             result.limit && setLimit(result.limit) 

            
            setPage(page)

            var l: number = limit ? limit : 0

           
            let difference: number = page * l - l
            var start: number = difference + 1
            let end = page * l

            setPage(page)
            setEnd(end)
            setLimit(l)
            setStart(start)

             response = {
                result : result.sites,
                start:start,
                end:end,
                lastPage:result.page
            }

        }
           
    
            return  Promise.resolve(response)
        }catch(error){
            return Promise.reject(error)
        }

        
    }




    
    const sort = ():Promise<any> => {
        return Promise.resolve("kol")
    }



    
    


    const singleSite =  async (id:string):Promise<ISite> => {
         let result :ISite
        try{
            
            //i tried getting from the store but returned a null values , so i fetch from local storage 
              let array:any = localClient.getSites()  
              let site:ISite = utils.isArrayFilter(array, id , "id")
               site ? result = site : result = await service.single(id)
              return Promise.resolve( result)
        }catch(error){
            return Promise.reject(error)
            
        }

          
    }



    /**
    * 
    * @param state array of clients gotten from the server
    */
    const saveStateForClients = (state: IClient[] | IClient) => {
        //set state for provider
        setClient(state)

        //set to local storage
        localClient.setClient(state)
    }





    /**
     *  persist data to the context api  
     */


    return{
        page ,
        limit,
        list,
        end,
        start,
        sort,
        loading,
        singleSite,
        lastPage,
        sites,
        clients,
        updateState

    }
    
}