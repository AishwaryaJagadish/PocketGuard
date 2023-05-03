import React, { useState } from 'react'
import { login, register } from '../redux/actions'
import { useDispatch, useSelector } from 'react-redux'

function Signin() {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password , setPassword] = useState("")
    const [islogin, setisLogin] = useState(true)
    const dispatch = useDispatch();
    const { isFetching, error } = useSelector((state) => state.expenses);

    const handleClick = (e) => {
        e.preventDefault()
        console.log({email, password})
        if(islogin)
        dispatch(login({email, password}))
        else 
        dispatch(register({username, email, password}))
    }

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-3xl font-medium leading-9 tracking-tight">
                        Pocket<span className='text-3xl font-medium text-blue-500'>Guard</span> 
                    </h2>
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        {islogin ? "Sign in to your account" : "Create your account"}
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" action="#" method="POST">
                        {!islogin && (
                            <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Username
                            </label>
                            <div className="mt-2">
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={e => setUsername(e.target.value)}
                                />
                            </div>
                        </div> )}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                                <div className="text-sm">
                                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                        Forgot password?
                                    </a>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                onClick={handleClick}
                                disabled={isFetching}
                            >
                                Sign in
                            </button>
                        </div>
                    </form>
                    {
                        error && <p className="text-red-500 text-center mt-5">Something went wrong</p>
                    }

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Not a member?{' '}
                        <a href = "#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500" onClick={() => setisLogin(!islogin)}>
                            {islogin ? "Create an account" : "Sign in"}
                        </a>
                    </p>
                </div>
            </div>
        </>
    )
}

export default Signin