import {IAuth, IClient} from "../interface/sites"
import {Data} from "../dummy-data/data-site"
import { apiService } from "./apiService"
import { clients_url } from "../constants/apiConstants"
import {utils } from "../utilities/utils"


interface IUser<T>{
    signIn({email , password}:IAuth):Promise<T>
}

class userService implements IUser<IClient> {

    private http:apiService
    
    constructor(){
            this.http = new apiService()
    }


    /**
     * 
     * @param email 
     * @param password 
     * @returns Iclient
     */
    async signIn({email , password}:IAuth):Promise<IClient>{
        let result:IClient
        try{
           let  results: any  = await this.http.sendGet({url:clients_url})
             // trying to get a random client at every login session .. since the the login user api was not created 
             let random = Math.floor(Math.random() * results.length);
             result = utils.isArrayFindByKey(results , random)
             return Promise.resolve(result)
        }catch(error){
            return Promise.reject(error)
        }
            
    }



}

export default userService;