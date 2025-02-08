import { useDispatch, useSelector } from "react-redux"
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table"

// import { setService, setEditService } from "../../../../slices/serviceSlice"
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"
import { useState } from "react"
import { FaCheck } from "react-icons/fa"
import { FiEdit2 } from "react-icons/fi"
import { HiClock } from "react-icons/hi"
import { RiDeleteBin6Line } from "react-icons/ri"
import { useNavigate } from "react-router-dom"
import  ConfirmationModal  from "../../../common/ConfirmationModal"
// import { formatDate } from "../../../../../services/formatDate"
import {
  deleteJob,
  getAllJobs,
} from "../../../../services/operations/jobPostAPI"
import { SERVICE_STATUS } from "../../../../utils/constants"
import MyCv from "../MyCv/MyCv"
import { Link } from 'react-router-dom';
import IconBtn from "../../../common/IconBtn"

export default function AppliedCandidatesTable({ appliedCandidates, setAppliedCandidates }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { token } = useSelector((state) => state.auth)
  const [loading, setLoading] = useState(false)
  const [confirmationModal, setConfirmationModal] = useState(null)
  const TRUNCATE_LENGTH = 8

  // const handleJobDelete = async (jobId) => {
  //   setLoading(true)
  //   await deleteJob({ jobId: jobId }, token)
  //   const result = await getAllJobs(token)
  //   if (result) {
  //     setJobs(result)
  //   }
  //   setConfirmationModal(null)
  //   setLoading(false)
  // }

  // console.log("All Course ", courses)

  return (
    <>
      <Table className="rounded-xl border border-richblack-800 bg-black/55 ">
        <Thead>
          <Tr className="flex gap-x-10 rounded-t-md border-b border-b-richblack-800 px-6 py-2">
            <Th className=" text-left text-sm font-semibold bg-transparent uppercase text-richblack-5">
              Candidate Name
            </Th>
            <Th className="text-left text-sm font-semibold uppercase bg-transparent text-richblack-5">
              Email
            </Th>
            <Th className="text-left text-sm font-semibold uppercase  bg-transparent text-richblack-5">
              Contact Number
            </Th>
            <Th className="text-left text-sm font-semibold uppercase bg-transparent text-richblack-5">
              Resume
            </Th>
            {/* <Th className="text-left text-sm font-medium uppercase bg-transparent text-richblack-100">
              
            </Th> */}
            {/* <Th className="text-left text-sm font-medium uppercase bg-transparent text-richblack-100">
              Action
            </Th> */}
          </Tr>
        </Thead>
        <Tbody>
          {appliedCandidates?.length === 0 ? (
            <Tr className=" bg-richblack-300">
              <Td className="py-10 text-center text-2xl font-semibold text-richblack-5">
                No Candidates found
                {/* TODO: Need to change this state */}
              </Td>
            </Tr>
          ) : (
            appliedCandidates?.map((appliedCandidate) => (
              <Tr
                key={appliedCandidate._id}
                className="flex gap-x-6 border-b border-richblack-800 px-3 py-8 bg-richblack-200"
              >
                     
                <Td>
                    <p className="text-lg font-semibold text-white">
                        {appliedCandidate.name}
                    </p>
                </Td>
                {/* <Td className="flex justify-between">                  
                    <p className="text-xs text-richblack-300">
                      {job.jobDescription.split(" ").length >
                      TRUNCATE_LENGTH
                        ? job.jobDescription
                            .split(" ")
                            .slice(0, TRUNCATE_LENGTH)
                            .join(" ") + "..."
                        : job.jobDescription}
                    </p>
                </Td> */}
                <Td>
                    <p className="text-md font-medium text-white">{appliedCandidate.email}</p>
                </Td>
                <Td>
                  <p className="text-md font-medium text-white">
                    {appliedCandidate.contactNumber}
                  </p>
                </Td>
                <Td>
                    {/* <p className="text-sm font-medium text-richblack-100">
                        <MyCv/>
                    </p> */}
                    <IconBtn className="bg-orange-500 text-white text-bold p-2 w-26 h-20 rounded-sm mb-3"
                    text="View Candidate CV"
                    onclick={() => { navigate("/dashboard/view-cv") }}
                    >
                    
                    {/* <Link to={`/view-cv`} /> */}
                    
                    </IconBtn>
                </Td>
                {/* <Td className="text-sm font-medium text-richblack-100 ">
                  <button
                    disabled={loading}
                    onClick={() => {
                      navigate(`/dashboard/edit-job/${job._id}`)
                    }}
                    title="Edit"
                    className="px-2 transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300"
                  >
                    <FiEdit2 size={20} />
                  </button>
                  <button
                    disabled={loading}
                    onClick={() => {
                      setConfirmationModal({
                        text1: "Do you want to delete this job?",
                        text2:
                          "All the data related to this job will be deleted",
                        btn1Text: !loading ? "Delete" : "Loading...  ",
                        btn2Text: "Cancel",
                        btn1Handler: !loading
                          ? () => handleJobDelete(job._id)
                          : () => {},
                        btn2Handler: !loading
                          ? () => setConfirmationModal(null)
                          : () => {},
                      })
                    }}
                    title="Delete"
                    className="px-1 transition-all duration-200 hover:scale-110 hover:text-[#ff0000]"
                  >
                    <RiDeleteBin6Line size={20} />
                  </button>
                </Td> */}
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  )
}
