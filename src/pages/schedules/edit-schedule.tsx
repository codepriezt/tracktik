import React,{FC ,useState, useEffect} from "react"
import { useProvideData } from "../../provider/store/provide-data"
import { useParams , Link} from "react-router-dom"

import {ISite} from "../../interface/sites"

const Edit:FC = () => {
let {id}:any = useParams()
const store = useProvideData()
const [site , setSite] = useState<ISite>()
const [loading , setLoading] = useState(true)

const fetchSingle = async () => {
        try{

            
            let result = await store?.singleSite(id)  
            setSite(result)
            
            setLoading(false)
        }catch(error){
            // Promise.reject(error)
        }
}

const contactAddress = () => {
    let contact = site ? site.contacts.main : "not available"
          contact = typeof(contact) != "string" ? contact.firstName + " " + contact.lastName + " " + contact.phoneNumber :"0905783"
        return contact
}

const contactName = () => {
    let contact = site ? site.contacts.main : "not available"
    contact = typeof (contact) != "string" ? contact.firstName + " " + contact.lastName : "lastName"
    return contact
}

const contactNumber = () =>{
    let contact = site ? site.contacts.main : "not available"
    contact = typeof (contact) != "string" ? contact.phoneNumber : "009090234"
    return contact
}

    const siteAddress = () => {
        let address = site ? site.address : "not available"
        address = typeof(address) != "string" ? address.street + " " + address.city + " " + address.state + " " + address.country:"address"
        return address 
    }



useEffect(() => {
    fetchSingle()
} , [])

return(
    <>
      {!loading ? (<div>
      <ul className="bg-blue-600">
            <li className="site cursor-pointer px-3 py-1.5 md:pb-4  pt-16 f border-b border-t border-gray-600">
                <div className="flex items-center justify-start w-full col-span-2 left">
                    <Link to="/schedules" className="mr-3 div">
                        <svg className="w-5 h-5 transform rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" stroke="white" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>
                    <div
                        className="flex items-center justify-center w-12 h-12 col-span-2 mr-3 site-photo sm:h-14 sm:w-14 md:h-24 md:w-24 circle-div md:col-span-2">
                         <img src={site ? site.images[0]:""} alt="Image" className="w-12 h-12 sm:w-14 sm:h-14 md:h-24 md:w-24 circle-div " />
                    </div>
                    <div className="col-span-3 site-detail md:col-span-2">
                        <p className="text-sm sm:text-base md:text-xl">
                            <span className="font-medium text-white">{site ? site.title:""}</span>
                                <span className="block text-sm text-black">{siteAddress()}</span>
                                <span className="block text-sm text-black ">{contactNumber()}</span>
                        </p> 
                    </div>   
                </div>
            </li>

        </ul>

        <div className="grid-cols-2 lg:grid-rows-1 md:grid-rows-1" >
            <div className="h-64 bg-gray-300 img md:h-96"></div>
            <div className="px-6 py-4 contact">
                <ul>
                    <li className="flex items-center py-1">
                        <div className="mr-4 icon">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <p className="text-sm">
                                <span className="block font-medium">{contactName()}</span>
                                <span className="block text-gray-300">{site ? site.contacts.main.jobTitle:" "}</span>
                        </p>
                    </li>
                    <li className="flex items-center py-1">
                        <div className="mr-4 icon">
                            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                                <path
                                    d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                            </svg>
                        </div>
                        <p>
                                <span className="font-medium">{contactNumber()}</span>
                        </p>
                    </li>
                    <li className="flex items-center py-1">
                        <div className="mr-4 icon">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                            </svg>
                        </div>
                        <p>
                            <span className="font-medium">{site ? site.contacts.main.email : ""}</span>
                        </p>
                    </li>
                    <li className="flex items-center py-1">
                        <div className="mr-4 icon">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd"
                                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                    clipRule="evenodd" />
                            </svg>
                        </div>
                        <p>
                                <span className="font-medium">{contactAddress()} </span>
                        </p>
                    </li>
                </ul>
            </div>
        </div>
        </div>):""}
      </>
    )
}
export default Edit;