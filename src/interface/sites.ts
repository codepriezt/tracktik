

export interface ISite{
    id:string;
    clientId:string;
    title:string;
    createdAt:string;
    updatedAt:string;
    contacts:IContact;
    address:IAddress;
    images:string[];
    tags:string[]
}

interface IAddress{
    city:string;
    country:string;
    state:string;
    street:string;
    zipCode:string
}

export interface IMain{
    address:IAddress
    email: string
    firstName: string
    id: string
    jobTitle: string
    lastName: string
    phoneNumber: string
}

interface IContact{
    main:IMain 
}



export interface IClient{
    id:string;
    givenName:string;
    logo:string;
    createdAt:string;
    updatedAt:string;
    tags:string[]
}

export interface ISiteRequest{
    page:number
    limit?:number
    query?:string
}

export type sortType = "asc" | "desc"


export interface IAuth{
    email :string,
    password:string
}

export type  StoreContextType = {
    list({page , limit}: ISiteRequest):Promise<any>;
    updateState( page:number,  start:number ,limit:number ):any;
    singleSite(id:string):Promise<ISite>;
    sort(type:sortType):Promise<any>;
    loading:boolean
    sites: any;
    clients: IClient |IClient[] |{};
    page:number;
    start:number;
    end:number;
    lastPage:number;
    limit:number;

}

export type AuthContextType = {
    signIn({ email: string, password }: IAuth):Promise<IClient|{}>
    auth_user:IClient|{};
    logOut():void;
}





