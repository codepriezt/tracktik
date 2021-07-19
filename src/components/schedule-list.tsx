import React , {FC, useEffect , useState} from "react"
import {Link} from "react-router-dom"
import { Data } from "../dummy-data/data-site"
import { ISite , IMain} from "../interface/sites"
import { useHistory } from 'react-router-dom';




interface Iprops{
    data:ISite,
    onClick():any

}
const ScheduleList:FC<Iprops> = (props) => {

const site  = props.data

const contactAddress =() => {
   let contact:IMain;
    let result:any;

    contact = site.contacts.main 
    return result = contact.firstName + " " + contact.lastName + " " + contact.phoneNumber
    
     
}

const siteAddress =() => {
   
    let address = site.address
    return address.street + " " + address.city + " " + address.state + " " + address.country
}



    return(
        <>
        
            <li onClick={props.onClick} className="px-3 py-1.5  md:pl-8 lg:pl-8 border-b border-t border-gray-300">
                <div className="grid grid-cols-2 link" >
                    <div className="grid items-center justify-center grid-cols-5 col-span-1 left md:grid-cols-6">
                        <div className="flex items-center justify-center col-span-2 sm:h-10 sm:w-10 md:h-12 md:w-12 md:col-span-2 ">
                           <img src={site.images[0]} alt="Image" className="w-12 h-12 sm:w-6 sm:h-6 md:h-12 md:w-12 circle-div "/>
                        </div>
                        <div className="col-span-10 lg:-ml-28 md:col-span-3 ">
                            <div className="text-sm text-black sm:text-base md:text-xl">
                                <p className="block text-sm font-medium md:text-xs">{site.title}</p>
                                <span className="block text-xs">{siteAddress()}</span>
                                <span className="block text-xs">{contactAddress()}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-end right">
                        <svg className="w-5 h-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                </div>
            </li>
        </>
    )
}
export default ScheduleList

// col - span - 1 right

// 


