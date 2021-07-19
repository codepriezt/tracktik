import React , {FC , useState} from "react"
import { useEffect } from "react"
import { ISite, StoreContextType } from "../interface/sites"
import { useProvider } from "../provider/store/store-context"
import { IResponse } from "../services/schedule-service"

type navigateType = "prev" |"next"

interface IPaginateProps{
    type:navigateType;
    value:number
}



export interface IPropsData{
    start:number
    end:number
    total:number
    lastPage:number
    query?:string,
    limit:number
}

interface IProps{
    data:IPropsData
}


const PaginateBox:FC<IProps> =(props) => {
const data = props.data

const store = useProvider()

var page:number = store?.page ? store.page : 1

const [loading , setLoading] = useState<boolean>(false)
const [initialLoad , setInitialLoad] = useState<boolean>(true)
const [prevPage , setPrevPage] = useState<number>(page)
const [nextPage, setNextPage] = useState<number>(page)
const [values, setPaginate] = useState<IPropsData>({
       start:0,
       end: 0,
       total: 0,
       lastPage:0,
       limit: 0,
       query:""
})


const paginate =async  ({type , value}:IPaginateProps)=>{

    
    let result:any;
    let p = type==="next" ? page+value : page-value
    
    type === "prev" ? page != 1 ? setPrevPage(page - value) : setPrevPage(page) : page != values.lastPage ? setNextPage(page + value) : setNextPage(page)
   
    setLoading(true)
    try{
        result = data.query ? await store?.list({ page: p, limit: values.limit, query: data.query }) : await store?.list({ page: p, limit: values.limit})
        if(result){
            if(result.start && result.end && result.lastPage)  
            setPaginate({ ...values,
                start:result.start,
                end:result.end,
                lastPage:result.lastPage,
                total:data.total
            })
        }
            
    }catch(error){
        
    }
    setLoading(false)
}

useEffect(() => {
   
  setInitialLoad(false) 
},[])





useEffect(() => {
        
      setPaginate({
            ...values,
            start: data.start,
            end: data.end,
            total: data.total,
            lastPage: data.lastPage,
            limit: data.limit
       })
}, [data])



 return(
        <>

            <div className="px-4 mr-1 text-black bg-gray-100 rounded-lg" >
                 <p><span>{values.start}-{values.end} </span>of <span>{values.total}</span></p> 
            </div>
            <div className="px-1 pt-1 pb-1 text-black rounded-lg ">
               
                 {page === 1 ?( <button className=" focus:bg-gray-300 circle-div"  disabled type="button" >
                     <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-300 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                     </svg>
                </button>):
                    (<button className=" focus:bg-gray-300 circle-div" type="button" onClick={() => paginate({ type: "prev", value: 1 })}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-black " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>)
                }
               

                {page === data.lastPage ? (<button  className="focus:bg-gray-300 circle-div"  disabled type="button" >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-300 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                     </svg>
                </button>):(
                        <button className=" disabled focus:bg-gray-300 circle-div" type="button" onClick={() => paginate({ type: "next", value: 1 })}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-black " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                )}

            </div> 
        </>
    )

}
export default PaginateBox