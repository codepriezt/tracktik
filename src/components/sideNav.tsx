import React , {FC} from "react"
import {Link} from "react-router-dom"
import Responsive from './is-component-responsive'

const SideNav:FC = () => {
const {isDesktopOrLaptop} = Responsive()
      


 return(
    <>
         {isDesktopOrLaptop &&
             <aside className="relative w-64 h-screen shadow-xl md:block bg-sidebar ">
                 <div className="p-6">
                     <Link to="/schedules" className="text-3xl font-semibold text-blue-300 uppercase hover:text-gray-300">TrackTik</Link>
                     <button className="flex items-center justify-center w-full py-2 mt-5 font-semibold bg-white rounded-tr-lg rounded-bl-lg rounded-br-lg shadow-lg cta-btn hover:shadow-xl hover:bg-gray-300">
                     <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                     </svg> New Report
                     </button>
                 </div>
                 <nav className="pt-3 text-base font-semibold text-white">
                     <Link to="/" className="flex items-center py-4 pl-6 text-white active-nav-link nav-item">
                     <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 mr-2" viewBox="0 0 20 20" fill="currentColor">
                         <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                      </svg>
                         List
                     </Link>

                 </nav>
             </aside>}

     </>
    )
}
export default SideNav

  



     
 
           