import React , {FC , ComponentClass} from "react";
import {  Route } from "react-router-dom"
import { ProvideData } from "../provider/store/store-context"
import Layout from "../layouts/scheduleLayout";

 interface IPrivateRoute{
     path:string,
     component:FC | ComponentClass
     exact?:any
 }

const PrivateRoute = ({path ,exact, component} : IPrivateRoute) => {

  return(
      <Layout>
          <ProvideData>
                <Route component={({ match }:any) =>
                
                    <>
                        
                        {exact ? <Route path={path} exact component={component}  /> : <Route path={path} component={component} />}
                    </>
               } /> 
         
           </ProvideData>
      </Layout>
        
    )
}

export default PrivateRoute;





