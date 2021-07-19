import React, { FC, useState, useEffect, FormEvent, SyntheticEvent} from "react"
import { useHistory } from 'react-router-dom';
import ScheduleList from "../../components/schedule-list";
import { ISite } from "../../interface/sites";
import {  useProvider } from "../../provider/store/store-context";
import SortData from "../../components/sort-box"
import PaginateData, { IPropsData } from "../../components/paginate-box"
import Responsive from '../../components/is-component-responsive'
import  logo  from "../../assets/transaction.svg"


const ListSchedules: FC= () => {
const store = useProvider()
const history = useHistory()
const { isDesktopOrLaptop, isTabletOrMobileDevice } = Responsive()

var globalPage: number = store?.page ? store.page : 1
var globalLimit: number = store?.limit ? store.limit : 10


const [loading , setLoading] = useState<boolean>(false)
const [page , setPage] = useState<number>(globalPage) 
const [limit, setLimit] = useState<number>(globalLimit)
const [sites , setSites] = useState<any>()     
const [initialLoad , setInitialLoad] = useState<boolean>(true)
const [showPagination, setPagination] = useState(false)
const [showSearch, setSearch] = useState(false)  
  
const [query, setQuery] = useState<string>("")

const [paginatedData, SetPaginateData] = useState<IPropsData>({
        end:10,
        start:1,
        lastPage:1,
        total:0,
        limit:limit
})
     


const search = async (e: SyntheticEvent) => {
   e.preventDefault()
        var update: IPropsData
         
  try {
                setLoading(true)
                let response = await store?.list({ page: page, limit: limit, query: query })
                setSites(response.result)
                if(response.result.length < 1){
                        let update = {
                               end:0 ,
                               start:0,
                               total:0,
                               limit:0,
                               lastPage:0
                        }
                        updateState(update)
                        setSites(response.reslt)
                }else{
                   updateState(response)
                }
                setLoading(false)
  } catch (error) {
                console.log(error)
        }
}


const handleChange = (e: FormEvent<HTMLInputElement>) => {
   e.preventDefault()
   setQuery(e.currentTarget.value)
   SetPaginateData({
        ...paginatedData,
           query: e.currentTarget.value
   })
}





const updateState = (result: any) => {
       
        let total = result.lastPage * limit
        
        SetPaginateData({
          ...paginatedData,
          end:result.end,
          start:result.start,
          total:total,
          lastPage:result.lastPage,
          limit:limit
         })     
}


const showPaginate = () => { showPagination ? setPagination(false) : setPagination(true) }
const showSearching = () => { showSearch ? setSearch(false) : setSearch(true) }

       


const getSites = async () => {  
  try{
        
        setLoading(true)
        let response = await store?.list({ page: page, limit: limit })
        console.log(response)
        setSites(response.result)
        updateState(response)
        setInitialLoad(false)
        setLoading(false)
       }catch(error){

    }
}


const trigger = (id:string) => {
        const url = `/schedule/${id}`
       return history.push(url)
}


useEffect(() => {
         getSites()
}, [])

useEffect(() => {
        if (store?.sites && !initialLoad ){
                setSites(store?.sites.sites)
        }
} , [store?.sites])


useEffect(() =>{
        if(query.length <= 1){
                getSites()
        }
},[query])

        



 return(
         <>
                 <div className="static ">
                         <header className="flex items-center justify-center text-xl text-white bg-blue-600 border border-gray-300 text-bolder h-14">
                                 <h5>Sites</h5>
                         </header>

                         <div className="flex items-center justify-between px-2 py-2 text-center border-2 border-gray-50 sm:py-2 sm:mt-24sub-header ">
                                 <div className="flex items-center justify-between left">
                                         <h5 className="mr-8 font-medium text-black sm:mr-10">All Sites</h5>
                                         <SortData />
                                 </div>

                                 <div className="flex items-center justify-between h-3 right">
                                         {isDesktopOrLaptop &&
                                                 <>
                                                        <PaginateData data={paginatedData}/>
                                                         <div className="flex items-center justify-center text-black ">
                                                                 <form className="flex overflow-hidden border rounded " onSubmit={search}>
                                                                 <input type="text" className="px-1 py-2" onChange={handleChange} placeholder="Search..." value={query} />
                                                                         <button className="flex items-center justify-center px-6 border-l " >
                                                                                 <svg className="w-4 h-4 text-grey-dark" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" /></svg>
                                                                         </button>
                                                                 </form>
                                                         </div>
                                                 </>
                                         }

                                         {isTabletOrMobileDevice &&
                                                 <>
                                                 {showPagination && <PaginateData data={paginatedData}/>}

                                                         <button className="w-6 h-6 mr-1 filter-icon" onClick={showPaginate}>
                                                                 <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-black" viewBox="0 0 20 20" fill="currentColor">
                                                                         <path d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h7a1 1 0 100-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM15 8a1 1 0 10-2 0v5.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L15 13.586V8z" />
                                                                 </svg>
                                                         </button>

                                                         <button className="relative search-icon" onClick={showSearching}>
                                                                 <svg className="w-6 h-6 text-black " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                                                 d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                                                 </svg>
                                                         </button>

                                                 </>
                                         }
                                 </div>

                         </div>
                         {(showSearch && isTabletOrMobileDevice) && <nav className="bg-white rounded-lg shadow-lg mb-1/2 ">

                                 <div className="flex py-2 ">
                                         <input className="w-full pl-3 ml-1 " type="text" onChange={handleChange} value={query} placeholder="Search..." />
                                         <button className=" bg-grey-lightest hover:bg-grey-lightest" onClick={search}>
                                                 <span className="flex items-center justify-end w-auto p-2 text-grey hover:text-grey-darkest">
                                                         <svg className="w-5 h-5 text-black " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                                         d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                                         </svg>
                                                 </span>
                                         </button>
                                 </div>
                         </nav>}


                 </div>
                 
                <ul>
                    {sites ? sites.map((element: any, index: number) => <ScheduleList onClick={() => trigger(element.id)} data={element} key={index} />)
                    :(
                    <div className="flex justify-center w-full mt-20 text-center md:mt-24">
                            <div className="flex-row">
                                <img src={logo} alt="no answer" style={{height:"300px" , marginBottom:"10px"}} />
                                <span className="mt-2">Ooop Sorry..Result Not Found</span>
                            </div>
                           
                    </div>
                    )}
                 </ul>
         </>         
      )

}

export default ListSchedules;