import React, { FC, useState, useEffect, SyntheticEvent} from "react"
import { useMediaQuery } from 'react-responsive'
import {Link} from "react-router-dom"
import { useProvideAuth } from "../provider/auth/provide-auth"

const Header: FC =() => {

/**
     * auth provider to update the loggedIn user and 
 */
const auth = useProvideAuth()


/**
      * state manangement and methods to toogle elements on responsive screens...
        * user... authenticated loggedin user.. Iclient
        * isOpen .. this is to display and hide the user profile dropdown .. boolean
        * open .. this is to display the nav list on tablet or mobile screen
        * show .. toggle isOpen to true or false
        * slide ... toggle open to true of false
 */
const [user, setUser] = useState<any>()
const [isOpen, setIsOpen] = useState<boolean>(false)
const [open, setOpen] = useState<boolean>(false)
const show = () => { isOpen ? setIsOpen(false) : setIsOpen(true) }
const slide = () => { open ? setOpen(false) : setOpen(true) }
/** */


/**
      *  Detect users screen at different breakpoint.
 */
const isDesktopOrLaptop = useMediaQuery({ query: '(min-device-width: 1224px)'})
const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
const isTabletOrMobileDevice = useMediaQuery({query: '(max-device-width: 1224px)'})


/**
     * loggedOut method.. this is to log a user out and remove all states persisited to local storage
 */
const logOut = (e: SyntheticEvent):void => {
    e.preventDefault()
    try{
        let result =  auth?.logOut()
    }catch(error){
        console.log(error)
    }
}


useEffect(() => {
    setUser(auth.auth_user)
}, [auth.auth_user])


return(
    <>
        {isDesktopOrLaptop &&
        <header className="fixed left-0 right-0 flex items-center justify-end w-full px-4 bg-white h-14 ">
            <div className="flex justify-end ">
                <button onClick={show} className="z-10 justify-end w-12 h-12 overflow-hidden border-4 border-gray-400 rounded-full toggleButton realtive hover:border-gray-300 focus:border-gray-300 focus:outline-none ">
                    <img src={user ? user.logo :"https://source.unsplash.com/uJ8LNVCBjFQ/400x400"  } style={{height:'50px'}}></img>
                </button>
               
                {isOpen ? (
                <div className="absolute w-32 py-2 mt-16 bg-white rounded-lg shadow-lg ">
              
                        <button onClick={logOut}  className="block py-2 pl-4 pr-12 hover:bg-gray-200 focus:bg-gray-200">Sign Out</button>
              </div>):""}
            </div>
        </header >}

      
        {isTabletOrMobileDevice &&
          <header  className="w-full px-6 py-5 bg-sidebar sm:hidden">

            <div className="flex items-center justify-between">

                <button onClick={slide} className="text-3xl text-black focus:outline-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 20 20" fill="currentColor">
                       <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                   </svg>
                </button>
               


                <ul className="flex ">
                    <li className="mr-4 " ><a href="#" className="text-xl text-white text-bolder">Scheduling</a></li>
                </ul>

                <div className="flex items-center justify-center order-3 last-part ">
                <div className="flex items-center justify-center w-8 h-8 mr-3 menu-icon">
                     <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-black" viewBox="0 0 20 20" fill="currentColor">
                         <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                     </svg>
                </div>

                <div className="relative flex justify-end ">
                        <button onClick={show} className="z-10 w-10 h-10 overflow-hidden rounded-full realtive hover:border-gray-300 focus:border-gray-300 focus:outline-none toggleButton">
                            <img src={user ? user.logo : "https://source.unsplash.com/uJ8LNVCBjFQ/400x400"} style={{ height: '50px' }}></img>
                        </button>
                        
                        {isOpen ? (<div className="absolute w-32 py-2 mt-16 bg-white rounded-lg shadow-lg">
                            
                            <button onClick={logOut} className="block py-2 pl-4 pr-12 hover:bg-gray-200 focus:bg-gray-200">Sign Out</button>
                        </div>) : ""}
                 </div>

             </div>
            </div>

        
            {open ?<nav className='flex flex-col pt-4 '>
                <Link to="/schedules" className="flex items-center py-4 pl-6 text-white active-nav-link nav-item">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                    List
                </Link>
            </nav> :""} 
        </header>}
    </>
    )
}

export default Header

