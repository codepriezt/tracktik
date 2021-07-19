import React , {FC} from "react"
import { ISite , IMain} from "../interface/interfaces"
import Responsive from "./is-component-responsive"


/**
     * interface props expected 
 */
interface Iprops{
    data:ISite,
    onClick():any

}

const ScheduleList:FC<Iprops> = (props) => {

    
/**
     * state props for a single schedule
 */
const { isTabletOrMobileDevice}  = Responsive()
const site  = props.data
/****/


/**
 * 
     * @returns contact address .. cominiation of firstname , last name  and phonenumber
 */
const contactAddress =() => {
   let contact:IMain;
   let result:any;

    contact = site.contacts.main 
    return result = contact.firstName + " " + contact.lastName + " " + contact.phoneNumber
    
     
}

/**
 * 
      * @returns side address ... street  ,  city , state and country
 */
const siteAddress =() => {
   
    let address = site.address
    return address.street + " " + address.city + " " + address.state + " " + address.country
}



    return(
        <>
            {isTabletOrMobileDevice ?



                (<li onClick={props.onClick} className="flex items-center justify-between py-3 pl-3 pr-4 text-sm ">
                    <div className="flex items-center flex-1 w-0 link ">
                       
                        <img src={site.images[0]} alt="Image" className="w-12 h-12 sm:w-6 sm:h-6 md:h-12 md:w-12 circle-div " style={{marginRight:'10px'}} />
                        
                        <div className="col-span-10 mr-1 lg:-ml-28 md:col-span-3 ">
                            <div className="text-sm text-black sm:text-base md:text-xl">
                                <p className="block text-sm font-semibold md:text-xs">{site.title}</p>
                                <span className="block text-xs">{siteAddress()}</span>
                                <span className="block text-xs">{contactAddress()}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex-shrink-0 ml-3">
                        <svg className="w-5 h-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                </li>) :
            
            (<li onClick={props.onClick} className="px-3 py-1.5  md:pl-8 lg:pl-8 border-b border-t border-gray-300">
                <div className="grid grid-cols-2 link" >
                    <div className="grid items-center justify-center grid-cols-5 col-span-1 left md:grid-cols-6">
                        <div className="flex items-center justify-center col-span-2 sm:h-10 sm:w-10 md:h-12 md:w-12 md:col-span-2 ">
                            <img src={site.images[0]} alt="Image" className="w-12 h-12 sm:w-6 sm:h-6 md:h-12 md:w-12 circle-div " />
                        </div>

                        <div className="col-span-10 lg:-ml-28 md:col-span-3 ">
                            <div className="text-sm text-black sm:text-base md:text-xl">
                                    <p className="block text-sm font-semibold md:text-xs">{site.title}</p>
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
            </li>)}
         
        </>
    )
}
export default ScheduleList

// col - span - 1 right

// 


    // < li onClick = { props.onClick } className = "px-3 py-1.5  md:pl-8 lg:pl-8 border-b border-t border-gray-300" >
    //     <div className="grid grid-flow-row grid-cols-3 link" >
    //         <div className="grid items-center justify-center grid-cols-5 col-span-1 left md:grid-cols-6">
    //             <div className="flex items-center justify-center col-span-2 sm:h-10 sm:w-10 md:h-12 md:w-12 md:col-span-2 ">
    //                 <img src={site.images[0]} alt="Image" className="w-12 h-12 sm:w-6 sm:h-6 md:h-12 md:w-12 circle-div " />
    //             </div>

    //             <div className="col-span-10 lg:-ml-28 md:col-span-3 ">
    //                 <div className="text-sm text-black sm:text-base md:text-xl">
    //                     <p className="block text-sm font-medium md:text-xs">{site.title}</p>
    //                     <span className="block text-xs">{siteAddress()}</span>
    //                     <span className="block text-xs">{contactAddress()}</span>
    //                 </div>
    //             </div>
    //         </div>
    //         <div className="flex items-center justify-end right">
    //             <svg className="w-5 h-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    //                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
    //             </svg>
    //         </div>
    //     </div>
    //         </li >