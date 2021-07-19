import React , {FC} from "react"
import SideNav from "../components/sideNav";
import Header from "../components/header";



const Layout:FC = ({children}:any) => {
    return (
    <>
          
                
          <SideNav />
          <div className="flex flex-col w-full h-screen overflow-y-hidden">
               <Header/> 
          
             <div className="flex flex-col flex-grow w-full overflow-x-hidden border-t">
                   {children} 
             </div>
          </div>
     </>  
    )
}

export default Layout;