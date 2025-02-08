import { useEffect, useState } from "react"
import { VscAdd } from "react-icons/vsc"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { getAllJobs, getAllJobsByCompanyId } from "../../../../services/operations/jobPostAPI"
import IconBtn from "../../../common/IconBtn"

import JobsTable from "./JobsTable"

export default function AddJobs() {
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const [jobs, setJobs] = useState([])
  const { user } = useSelector((state) => state.profile)

  useEffect(() => {
    const fetchJobs = async () => {
      const result = await getAllJobsByCompanyId(user._id)
      console.log("result My Jobs : ",result);
      console.log("result My Jobs : ",result);

      if (result) {
        setJobs(result)
      }
    }
    fetchJobs()
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, [])

  return (
    <div>
      <div className="mb-14 flex items-center lg:mt-14 justify-between">
        <h1 className="text-3xl font-medium text-black">My Jobs</h1>
        <IconBtn
          text="Add Job Post"
          onclick={() => navigate("/dashboard/post-job")}
        >
          <VscAdd />
        </IconBtn>
      </div>

      {jobs && <JobsTable jobs={jobs} setJobs={setJobs} />}
    </div>
  )
}
