
/**
 *
 * @author codepriezt
 * @portfolio olumideokewale.com
 */

import axios, { AxiosInstance,  AxiosResponse} from "axios"
import {baseUrl, api_headers} from "../constants/apiConstants"
import {utils} from "../utilities/utils"

type methodType = "post" | "get" |"put" | "delete"

interface IEndPointSpec{
    url:string;
    parameters?:object
}

interface IApiService<T , K>{
    sendGet({url, parameters}: IEndPointSpec):any;
    sendPost({ url, parameters }: IEndPointSpec):any;
    sendDelete({ url, parameters }: IEndPointSpec):Promise<any>;
    prepareResponse(request : K):Promise<T | string>
}

interface IParams{
   [key : string] : any
}


/**
 * I created a api class handler that handles request for axios library , 
 * this is can be extendable for other http , tcp  or grpc protocol library.
 */
export class apiService implements IApiService<AxiosResponse , AxiosInstance>{

    /**
     * method :  http verb methods
     * http : http client library
     * baseurl : api baseurl endpoint
     * api_header : request header
     * requestInProgress: request status
     * requestId : unique request id 
     */
    private  _method: methodType
    private  http: AxiosInstance
    private _baseUrl :string
    private _headers:any;
    private _requestInProgress:boolean
    private _requestId: string
    private _params:any
    public paginationLink:any

    constructor(){
        this._method = "post"
        this.http = axios.create()
        this._baseUrl = baseUrl
        this._headers = []
        this._params =[]
        this._requestInProgress = false
        this._requestId = utils.randomNumber()
        this.paginationLink= []

        //set request interceptors before triggering a request
        this.setInterceptors()
    }

    

    /**
     * 
     * @param url
     * @param parameters
     * @returns  a prepare response .. axios response
     */

    sendGet({url , parameters} : IEndPointSpec){
        let urlAddon = "";
        if (parameters && utils.isArrayLike(parameters)) {
            urlAddon = this.setGetParams(parameters).Geturl();
        }
        //Set up this request
        this.boostrapRequest();
        url = urlAddon ? url + "?" + urlAddon : url;
        let request = this.http.get(url);
        
       
        //Run this request and return result
        return this.prepareResponse(request);
    }


  

    /**
     * 
     * @param param0 IEndPointSpec paramters
     * @returns 
     */
    sendPost({ url, parameters }: IEndPointSpec): any {
        let data = parameters ? parameters : {};
        //Set up this request
        this.boostrapRequest();
        //Run the request
        let request = this.http.post(url, data);
        // request.catch(function(error){
        //     console.log(error,"catehc me")
        // });
        //Run this request and return result
        return this.prepareResponse(request);
    }

    sendDelete({ url, parameters }: IEndPointSpec): any {

    }



    setInterceptors(){
            let $this = this

            this.http.interceptors.request.use(
                //do something before every request is sent
                function(config){
                    $this._requestInProgress = true
                    return config
                },

                function(error){
                    $this._requestInProgress = false
                    $this.responseError(error)
                    return Promise.reject(error)
                }
            )
    }

    setHeaders(headers: any) {
        // let check = Array.isArray(headers)

            
                for (const i in headers) {
                    if (
                        headers[i].hasOwnProperty("key") &&
                        headers[i].hasOwnProperty("value")
                    ) {
                        let insert = [headers[i].key, headers[i].value];
                        this._headers.push(insert);
                    }
                }   
            
          return this;

    }


    async prepareResponse(request:any): Promise<any> {
        //Set the get parameters to be empty after every request
        this._params = [];
        // let result: AxiosResponse;
        let myError:any;
        //The type of response the user is expecting
        let jsonresponse: AxiosResponse["data"];
        try {

            //The HttpResponseMessage result from the http client
            let result:AxiosResponse = await request;

            var link: any = result.headers.link ? result.headers.link : null

            link ? this.setPagination(link) : null

            jsonresponse = result.data;
            // console.log(result ,"success response");
        } catch (error) {
            // console.log(error.response,"apiservice error")

            var errorStr = (error.toJSON && error.toJSON().message) || "";
            myError = errorStr + ". An unrecognized error occured from the server, check if";
            myError = myError + " you have an internet connection or server is up, or contact admin";

            //If this error is from my API, then it will have this format
            if (error.response && error.response.data) {
                myError = error.response.data.message;
            }
        }
        let promise1 = new Promise<string>((resolve, reject) =>{
            if (jsonresponse) {
                resolve(jsonresponse);
            } else {
                reject(myError);
            }
        });
        return promise1;
    }


    
        // used to setup the required headers for a request
    setupHeaders() {
            //This here sets the Authorization: Bearer header and other constant headers needed by the
            // Application
            this.setHeaders(api_headers());
            
            for (const i in this._headers) {

                // If its a no auth request, then don't send authorization header
                if (this._headers[i][0] === "Authorization" ) {
                    continue;
                }
                
                this.http.defaults.headers.common[this._headers[i][0]] = this._headers[
                    i
                ][1];
            }
    }

    setupBaseUrl(){
        this.http.defaults.baseURL = this._baseUrl;
    }

    //The public api for setting base url
    setBaseUrl(url:string) {
        this._baseUrl = url;
        return this;
    }


    setPagination(link:any){
        this.paginationLink = link
    }


    getPagination(){
        return this.paginationLink
    }
    

    /*
  * This function sets some parameters right just before a request happens
  * Headers and some other properties are set here
  *
  */
    boostrapRequest() {
        this.setupHeaders();
        this.setupBaseUrl();
    }






    /*
  * prepare a url string for get request
  * turns [{ mimi: "name"}, {oly: "sister"}] to mimi=name&oly=sister
  *
  */
    Geturl() {
        let concat = "";
        for (const i in this._params) {
            for (const key in this._params[i]) {
                // if not empty, then set amper sign behind sign behind
                if (concat) {
                    concat = concat + "&";
                }
                concat = concat + key + "=" + this._params[i][key];
            }
        }
        return concat;
    }



    setGetParams(params: IParams) {
        
        for ( var  i  in params) {
            if (params[i].hasOwnProperty("key")  && params[i].hasOwnProperty("value") ) {
                let insert:any = {};
                insert[params[i].key] = params[i].value;
                this._params.push(insert);
            }
        }
        return this;
    }



    responseError(error:any){
        console.log(error)
        var errorStr = "", message = {}, stri = "";
        errorStr = (error.toJSON && error.toJSON().message) || error.toString();
        // console.log(error.toJSON().message,error.toString());

        stri = " An unrecognized error occured from the server, check if you have an internet connection or server is up, or contact admin";


        var errorMsg = errorStr ? errorStr : stri;

        //If this error is from my API, then it will have this format
        if (error.response && error.response.data) {
            errorMsg = error.response.data.message;
            //If the users authentication is expired, take log them out
            //message = 'Unauthenticated.'  : when user token is expired


            //at the point .. trigger notification that return the server response to the user.
            
           
        }

    }
}



