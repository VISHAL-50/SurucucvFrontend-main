import { useEffect, useState } from "react"
import { VscAdd } from "react-icons/vsc"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { getAppliedCandidates } from "../../../../services/operations/jobPostAPI"
import IconBtn from "../../../common/IconBtn"

import AppliedCandidatesTable from "./AppliedCandidatesTable"
import { useParams } from 'react-router-dom';

export default function AppliedCandidates() {
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const [appliedCandidates, setAppliedCandidates] = useState([])
  const { jobId } = useParams();
console.log("job Id Inside Applied Candidates :",jobId)
  useEffect(() => {
    
    const fetchJobs = async () => {
      const result = await getAppliedCandidates(jobId)
      console.log("result APPLIED CANDIDATES : ",result);
      if (result) {
        setAppliedCandidates(result)
      }
    }
    fetchJobs()
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, [])

  return (
    <div>
      <div className="mb-14 lg:mt-20 flex items-center justify-center">
        <h1 className="text-3xl font-medium text-black">Candidates Applied</h1>
        
      </div>

      {appliedCandidates && <AppliedCandidatesTable appliedCandidates={appliedCandidates} setAppliedCandidates={setAppliedCandidates} />}
    </div>
  )
}
