import React from 'react'
import { useProvider } from "../../provider/auth/auth-context"
import {useHistory} from "react-router-dom"

interface IAuthProps{
    email:string ,
    password:string,
    loading:boolean,
    redirect:boolean
}

const SignIn:React.FC = () => {

/**
 * auth provider.. this is me making use of react context and providers api to emit methods and states across all 
 * other components who need auth user data object .  
 */
const auth = useProvider()

/**
 * react router dom history api
 */
const history = useHistory()

/**
 * authentication parameters to successfully login in a client 
 */
    const [values, setValues] = React.useState<IAuthProps>({
    email:"tracktik@gmail.com",
    password:"password12345",
    loading:false,
    redirect:false
})

/**
 * 
 * @param e react form event on input html element
 * this method is to update email state when an onchange even triggers on html email input field 
 */
    const handleChangeEmail = (e: React.FormEvent<HTMLInputElement>) =>{
    e.preventDefault()
    setValues({ ...values, email: e.currentTarget.value })
}


/**
 * @param e react form event on input  html element
 * this method is to update email state when an onchange even triggers on html password input field
 */
    const handleChangePassword = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault()
        setValues({ ...values, password: e.currentTarget.value })
 }


/**
 * 
 * @param e  react synthetic event on form button
 * this method is to fetch  registered users on the platform .. and redirect to their respective dashboard
 * after a successful authentication check.
 */
    const submit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    try{
        setValues({...values , loading:true})
        let result = await auth?.signIn({email:values.email , password:values.password})
        result && setValues({...values , loading:false , redirect:true})
        history.push('/schedules')
    }catch(error){
        setValues({...values , loading:false , redirect:false})
    }
}

    return(
        <div className="flex items-center justify-center w-full min-h-screen px-4 py-12 bg-gray-50 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div>
                    <img
                        className="w-auto h-12 mx-auto"
                        src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                        alt="Workflow"
                    />
                    <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">Sign in to TrackTik</h2>
                    
                </div>
                <form className="mt-8 space-y-6" onSubmit={submit}>
                    <input type="hidden" name="remember" defaultValue="true" />
                    <div className="-space-y-px rounded-md shadow-sm">
                        <div className="mb-5">
                            <label htmlFor="email-address" className="sr-only">
                                Email address
                            </label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                onChange={handleChangeEmail}
                                value={values.email}
                                required
                                className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Email address"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                onChange={handleChangePassword}
                                value={values.password}
                                required
                                className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Password"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                            />
                            <label htmlFor="remember-me" className="block ml-2 text-sm text-gray-900">
                                Remember me
                            </label>
                        </div>

                        {/* <div className="text-sm">
                            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                Forgot your password?
                            </a>
                        </div> */}
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                {/* <LockClosedIcon className="w-5 h-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" /> */}
                            </span>
                            Sign in
                        </button>
                    </div>
                </form>
            </div>
        </div>

    )
}
export default SignIn
