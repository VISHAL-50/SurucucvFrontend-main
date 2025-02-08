import React from 'react'
import { useState,useRef } from 'react';
import {AiOutlineCaretDown} from "react-icons/ai"
import {VscDashboard, VscSignOut} from "react-icons/vsc"
import { useDispatch, useSelector } from 'react-redux';
import {Link , useNavigate } from "react-router-dom"

import useOnClickOutside from "../../../hook/useOnClickOutside"
import {logout} from "../../../services/operations/authAPI"

const ProfileDropDown = () => {
    const { user } = useSelector((state) => state.profile)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const ref = useRef(null)
    const [open, setOpen] = useState(false);
    
    useOnClickOutside(ref, () => setOpen(false))

    if (!user) return null

    return(
        <button className='relative ' onClick={() => setOpen(true)}>
            <div className='flex items-center gap-1'>
                <img
                src = {user?.image}
                alt = {`profile-${user?.name}`}
                className='aspect-square lg:w-[30px] sm:w-10  rounded-full object-cover'
                
                />
                <AiOutlineCaretDown className="text-sm text-richblack-100" />
            </div>
            {open && (
                <div
                    onClick={(e) => e.stopPropagation()}
                    className='absolute top-[118%] right-0 z-[1000] divide-y-[1px]
                    divide-purple-700 overflow-hidden rounded-md lg:border-[1px]
                    border-purple-700 bg-purple-600 '
                    ref={ref}
                >
                    <Link to='dashboard/my-profile' onClick={() => setOpen(false)}>
                        <div className='flex w-full items-center gap-x-1 py-[10px]
                        px-[12px] text-sm text-richblack-25 hover:bg-purple-700
                        hover:text-richblack-5'>
                        <VscDashboard className="text-lg" />
                        Dashboard
                        </div>
                    </Link>
                    <Link to={"/"}>
                    
                    
                        <div
                            onClick={() => {
                                dispatch(logout(navigate))
                                setOpen(false)
                            }}
                            className='flex w-full items-center gap-x-1 py-[10px]
                            px-[12px] text-sm text-richblack-25 hover:bg-purple-700
                            hover:text-richblack-5'
                        >
                            <VscSignOut className="text-lg" />
                            Logout
                        </div>
                    </Link>
                </div>
            )}
        </button>
    )
}

export default ProfileDropDown