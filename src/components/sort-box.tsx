import React, { FC,useState} from "react"
import { sortType } from "../interface/sites"


const SortBox:FC =() => {

const [show , setShow] = useState(false)
const [tab , setTab] = useState(-1)
const [active , setActive] = useState({
        old:false,
        new:false
 })


const open = () =>{show? setShow(false): setShow(true)}

const sort = (props : sortType) =>{
     setActiveState(props)

}

const setActiveState = (props:sortType) => {
 switch (props) {
        case "desc":
            {active.old ? setActive({ ...active, old: false, new: false }) : setActive({ ...active, old: true, new: false })}
                break;
        case "asc":
            {active.new ? setActive({ ...active, new: false, old: false }) : setActive({ ...active, new: true, old: false })}
             break;
        default:
            break;
  }
}




return(
        <>
            <div className="relative inline-block text-left">
                <div>
                    <button onClick={open} className="inline-flex justify-center text-sm font-medium " id="menu-button" aria-expanded="true" aria-haspopup="true">
                        <svg className="w-5 h-5 " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>

                {show ? (<div className="absolute right-0 w-24 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex={tab}>
                    <div className="py-1" role="none">

                    <button  onClick={() => sort("asc")} className={active.new ? " bg-gray-100 text-gray-700 block w-full text-left px-4 py-2 text-sm" : "text-gray-700 block w-full text-left px-4 py-2 text-sm"} role="menuitem"
                       tabIndex={tab} id="menu-item-3">
                         Newest
                    </button> 
                        

                    <button  onClick={() => sort("desc")} className={active.old ? "bg-gray-100 text-gray-700 block w-full text-left px-4 py-2 text-sm" : "text-gray-700 block w-full text-left px-4 py-2 text-sm"  }role="menuitem"    tabIndex={tab}  id="menu-item-3">
                        Oldest
                </button>
              </div>
            </div>) :("")}
                
            </div>
        </>
    )
}

export default SortBox