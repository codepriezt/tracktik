
/**
 *
 * @author codepriezt
 * @portfolio olumideokewale.com
 */

export let api_headers = () => {
    return [
        {
            key: "Authorization",
            
            //token for a authorized request ...
            value: "Bearer " + "trackTikTestlol"
        },
        {
            key: "Accept",
            value: "application/json"
        },
        
        {
            key: "Content-Type",
            value: "application/json"
        }
    ]
} ;




//local baseurl... json server default port 3000 server 

let localUrl = "http://localhost:3000/";


//prod baseurl
let prodUrl = "https://tracktik-challenge.staffr.com/";


export let baseUrl = process.env.NODE_ENV == 'production' ? prodUrl : localUrl;



export const sites_list_url  = "/sites"

export const clients_url = "/clients"

export const  single_site_url = (id:string)  =>  `/sites/${id}`