import React from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'

import { login } from "../../../services/operations/authAPI"

const LoginForm = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    // const { user } = useSelector((state) => state.profile)
    const [formData, setFormData] = useState({
        email: "", password: ""
    })

    // console.log("accountType in loginform : ",user?.accountType)
    const [showPassword, setShowPassword] = useState(false)

    const { email, password } = formData

    function changeHandler(event) {

        setFormData((prevData) => (
            {
                ...prevData,
                [event.target.name]: event.target.value,
            }
        ))
    }

    function submitHandler(event) {
        event.preventDefault();
        dispatch(login(email, password, navigate))
    }

    return (
        <div className='w-full h-full border flex bg-[#f5f5f5] justify-center items-center lg:px-0 px-4'>
            <div className=' lg:w-[450px] w-full  flex bg-white py-4 px-4 rounded-xl shadow-[0_0_5px_rgba(0,0,0,0.1)]'>
                <form onSubmit={submitHandler} className='w-full flex flex-col gap-y-4'>
                    <div className='w-full flex flex-col gap-y-2'>

                        <label className='text-lg font-rubik-medium '>
                            Email Address<sup className='text-pink-200'>*</sup>
                        </label>
                        <input
                            required
                            type="email"
                            value={email}
                            onChange={changeHandler}
                            placeholder='Enter email address'
                            name="email"
                            className='w-full px-3 py-2.5 border border-purple-700 outline-none focus-visible:ring focus-visible:ring-purple-700  text-lg font-rubik-light  focus:ring-2 focus:ring-purple-700  rounded-lg'

                        />
                    </div>
                    <div className='w-full flex flex-col gap-y-2 relative'>

                        <label className='text-lg font-rubik-medium '>
                            Password<sup className='text-pink-200'>*</sup>
                        </label>
                        <div className='relative '>
                            <input
                                required
                                type={showPassword ?
                                    ("text") :
                                    ("password")}
                                value={password}
                                onChange={changeHandler}
                                placeholder='Enter Password'
                                name="password"
                                className='w-full px-3 py-2.5 border border-purple-700 focus-visible:ring focus-visible:ring-purple-700 outline-none  text-lg font-rubik-light  rounded-lg'

                            />
                            <div onClick={() => setShowPassword((prev) => !prev)}
                                className='absolute right-3 top-[12px] z-[10] cursor-pointer'>
                                {showPassword ? (<AiOutlineEyeInvisible className='size-6 text-purple-700' />
                                ) : (
                                    <AiOutlineEye className='size-6 text-purple-700' />
                                )}
                            </div>
                        </div>
                    </div>

                    <div className='w-full flex justify-end items-center'>
                        <Link
                            to="/forgot-password"
                            className='text-sm font-rubik-normal no-underline text-purple-700 '
                        >
                            Forgot password
                        </Link>
                    </div>



                    <button
                        type='submit'
                        className='w-full rounded-lg mt-8 text-white px-3 py-2 flex justify-center hover:bg-gradient-to-b hover:from-purple-700 hover:to-purple-500 hover:text-purple-700  items-center text-lg bg-purple-500 font-rubik-semibold'
                    >
                        Sign In
                    </button>

                </form>
            </div>
        </div>
    )
}

export default LoginForm