import { IClient, ISite, ISiteRequest} from "../interface/interfaces"
import {Data} from "../dummy-data/data-site"
import {apiService} from "./apiService"
import { sites_list_url, single_site_url, clients_url} from "../constants/apiConstants"

interface ISchedule<T>{
    list({page , limit , query}:ISiteRequest): Promise<T>
    sort():Promise<any>
    single(id:string):Promise<ISite>
    
}



export interface IResponse{
    page:number
    limit?: number
    sites?: ISite | ISite[]
    clients?: IClient | IClient[]
}

class scheduleService implements ISchedule<IResponse>{
    private http: apiService
    

    constructor(){
            
            this.http = new apiService()

    }

    async list({ page, limit , query}: ISiteRequest): Promise<IResponse>{
        let temp_result :ISite[];
        let result :IResponse
        let url :string;

        if(query){
             url = sites_list_url + "?q=" + query + "&_page=" + page 
              url = limit != undefined ? url+ "&_limit=" + limit : url
              
        }else{
             let temp_url: string = sites_list_url + "?_page=" + page
               url = limit != undefined ? temp_url + "&_limit=" + limit : temp_url
        }

        try{
             temp_result = await this.http.sendGet({ url: url})

                //extract out the pagination details 
            var paginateDetails = query ? this.setPaginateDetails(this.http.paginationLink , query): this.setPaginateDetails(this.http.paginationLink)
                


                if (paginateDetails) {
                    result = {
                        page: paginateDetails.page,
                        limit: paginateDetails.limit,
                        sites: temp_result
                    }
                } else {
                    result = {
                        page: page,
                        limit: 1,
                        sites: temp_result
                    }
                }

                return  Promise.resolve(result)
            }catch(error){
                return Promise.reject(error)
            }
    }

    async sort(){
        return ""
    }

    async single(id:string):Promise<ISite>{
        let result:ISite
            try{
                result  = await this.http.sendGet({url:single_site_url(id)})
                return Promise.resolve(result)
            }catch(error){
                return Promise.reject(error)
            }
    }



  
    /**
     * trying to format the details from the server to get last page number and limit
     * @param value  return link object from the server 
     * 
     */
     setPaginateDetails(value:any , query?:string){
        
        var limit:string
        var page:string;
        var data: ISiteRequest
        var check:string[]

         /**
         * this is the sample returned from the server 
         *  <http://localhost:3000/sites?_page=1&_limit=9>; rel="first",
          <http://localhost:3000/sites?_page=2&_limit=9>; rel="next",
          <http://localhost:3000/sites?_page=170&_limit=9>; rel="last"
         */
        
        if(value.length > 1) {
            var paginationArray:any = value.split(",")
            
            let lastItem: string = paginationArray.splice(-1)
            let pagearray = lastItem[0].substring(lastItem[0].indexOf("?") + 1);
            
            
            pagearray = pagearray.split('>')[0]
            
            var arr: any = pagearray.split("=")

            if (query) {
            for(var i=0; i < arr.length ; i++){ 
               check = ["q", `${query}&_page`]
                if (arr[i] === check[i]){
                      arr.splice(i, 1);
                  }
                }  
            } 
            limit = arr.slice(-1)[0] 
            var index = arr[1]
            page = index.split('&')[0]
            

            data = {
                page: Number(page),
                limit: Number(limit)
            }

        
            return data;
           
        }else{
            return null;
        } 
    }


}


export default scheduleService