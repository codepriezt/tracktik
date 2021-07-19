import * as  CryptoJS from "crypto-js";

/**
 * @author codepriezt
 * @portfolio olumideokewale.com
 */

interface IEncryption{
    encrypt(params : any):any
    decrypt(params :any):any
}



export class Encryption implements IEncryption{
    private key :string;


    constructor() {
        this.key = "TrackTik123456789"
    }


    /**
     * 
     * @param value  object to be encrypted
     * 
     */
    encrypt(value:any):any{
            var encrypt = CryptoJS.AES.encrypt(JSON.stringify(value), this.key).toString();
            return encrypt;
          
    }


    /**
     * 
     * @param value object or string to be decrypted
     */
     decrypt(value :any):any{
         
         var bytes:any = CryptoJS.AES.decrypt(value, this.key);

        var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        return decryptedData;
         
    }


}

