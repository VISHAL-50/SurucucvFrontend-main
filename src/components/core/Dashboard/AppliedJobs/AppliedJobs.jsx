import React from 'react'
import { useEffect, useState } from "react"
import { VscAdd } from "react-icons/vsc"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

import { getAppliedJobs } from "../../../../services/operations/jobPostAPI"
import IconBtn from "../../../common/IconBtn"

import AppliedJobsTable from "./AppliedJobsTable"

export const AppliedJobs = () => {
// yaha api change krni h getAllJobs ki jagah new api bnao which will show jobs presend in candidate jobs path
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  console.log("user details from profile slice :",user)
  console.log("jobs in user slice :",user.jobs)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [jobs, setJobs] = useState([])

  useEffect(() => {
    // dispatch(setJobs(getAppliedJobs(token)))
    const fetchJobs = async () => {
      const result = await getAppliedJobs(token)
      console.log("Applied Jobs result : ",result);
      if (result) {
        setJobs(result)
      }
      // setJobs(user.jobs)
    }
    fetchJobs()
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, [])
console.log(jobs)



  return (
    <div>
    
<h3  className='text-3xl font-medium  text-center text-black lg:mt-14'>Applied Jobs</h3>
      {/* <div className="mb-14 flex items-center justify-between">
        <h1 className="text-3xl font-medium text-richblack-5">My Jobs</h1>
        <IconBtn
          text="Add Job Post"
          onclick={() => navigate("/dashboard/post-job")}
        >
          <VscAdd />
        </IconBtn>
      </div> */}

      {jobs && <AppliedJobsTable jobs={jobs} setJobs={setJobs}/>}
      {/* {jobs && <JobsTable jobs={jobs} setJobs={setJobs} />} */}
    </div>
  )
}

export default AppliedJobs

