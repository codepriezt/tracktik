import { IClient, ISite } from "../interface/sites";
import { Encryption } from "./encrypt-decrypt";


interface LocalStorage<T,K>{
    setSites(s : T|T[]):boolean;
    getSites():T|T[]|boolean
    setClient(c :K|K[] ):boolean
    getClient(): K |K[]|boolean
}

type statusType = "sites" | "clients"

type responseClientType = IClient | IClient[]
export type responseSiteType = ISite | ISite[]

export class saveLocally implements LocalStorage<ISite , IClient>{

    private encrypter: Encryption;
    private sitesStatus:boolean 
    private clientStatus:boolean 
    private sites: any
    public clients:any
    private sites_exists:boolean
    private clients_exists: boolean

    constructor(){
        this.encrypter = new Encryption()
        this.clientStatus= false
        this.sitesStatus = false
        this.sites_exists = false
        this.clients_exists = false
    }


    /**
     * 
     * @param data array or single item(s) of site(s) object
     * this methods encrypt data before saving to local storage
     * @return boolean site_status 
     */
    setSites(data:ISite[] | ISite):boolean{
      
            //encrypt the data to local storage before saving
        var encryptedData =  this.encrypter.encrypt(data)

        if(encryptedData){
             localStorage.setItem("sites", JSON.stringify(encryptedData))
            
            this.setStatus("sites", true)
        }

        return this.sitesStatus
    }


    /**
     *
     * @param data 
     * this methods decrypted data before saving to local storage
     * @return list of sites or a single site
     */
    getSites(): responseSiteType|boolean{
        let data: responseSiteType;
        let site:string | undefined = "sites"
        //decrypt data form local
        var encryptedString:string|null = localStorage.getItem(site)
        var encryptedData:JSON = encryptedString ? JSON.parse(encryptedString) : ""
           

        if(encryptedData){
            this.sites_exists = true
            this.sites  = this.encrypter.decrypt(encryptedData)
            return this.sites;
        } 
        this.sites_exists = false
        return  false;
    }

    getClient(): responseClientType | boolean{
        
        let clients: string | undefined = "clients"

        //decrypt data form local
        var encryptedString: string | null = localStorage.getItem(clients)
        var encryptedData: JSON = encryptedString ? JSON.parse(encryptedString) : ""
        

        if (encryptedData) {
             this.clients_exists = true
            this.clients = this.encrypter.decrypt(encryptedData)
            return this.clients;
        }
        this.clients_exists = false
        return false;
    }


    setClient(data: IClient| IClient[]):boolean{
        var encryptedData = this.encrypter.encrypt(data)

        if (encryptedData) {
            localStorage.setItem('clients', JSON.stringify(encryptedData))

            this.setStatus("clients" , true)
        }

        return this.clientStatus
    }


    getStatus(status : statusType):boolean{
        switch (status) {
            case "sites":
                  return this.sitesStatus
                break;
            case "clients":
                  return this.clientStatus
                break;
            default:
                return false
              break;
        }
    }

    private setStatus(status: statusType , value:boolean){
        switch (status) {
            case "sites":
                  this.sitesStatus = value
                break;
            case "clients":
                 this.clientStatus = value 
                break; 
        }
    }

  


}