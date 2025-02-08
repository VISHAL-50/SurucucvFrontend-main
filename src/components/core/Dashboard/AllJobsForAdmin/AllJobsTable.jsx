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
import ApproveJobButton from "./ApproveJobButton"


export default function AllJobsTable({ jobs, setJobs }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { token } = useSelector((state) => state.auth)
  const [loading, setLoading] = useState(false)
  const [confirmationModal, setConfirmationModal] = useState(null)
  const TRUNCATE_LENGTH = 10

  const handleJobDelete = async (jobId) => {
    setLoading(true)
    await deleteJob({ jobId: jobId }, token)
    const result = await getAllJobs(token)
    if (result) {
      setJobs(result)
    }
    setConfirmationModal(null)
    setLoading(false)
  }

  // console.log("All Course ", courses)

  return (
    <>
      <Table className="rounded-xl border bg-black/55 rounded-t-md border-richblack-800 ">
        <Thead>
          <Tr className="flex gap-x-28 items-center text-center rounded-t-md border-b border-b-richblack-800 px-6 py-2">
            <Th className="text-left text-sm font-semibold bg-transparent uppercase text-richblack-5">
              Company Name
            </Th>
            <Th className="text-left text-sm font-semibold uppercase bg-transparent text-richblack-5">
              Job Title
            </Th>
            <Th className="text-left text-sm font-semibold uppercase bg-transparent text-richblack-5">
              Passport type
            </Th>
            <Th className="text-left text-sm font-semibold uppercase bg-transparent text-richblack-5">
              Job Location
            </Th>
            <Th className="text-left text-sm font-semibold uppercase  bg-transparent text-richblack-5">
              Manage Status
            </Th>
            <Th className="text-left text-sm font-semibold uppercase bg-transparent text-richblack-5">
              Action
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {jobs?.length === 0 ? (
            <Tr className="bg-richblack-200">
              <Td className="py-10 text-center text-2xl font-semibold text-richblack-5">
                No jobs found
                {/* TODO: Need to change this state */}
              </Td>
            </Tr>
          ) : (
            jobs?.map((job) => (
              <Tr
                key={job._id}
                className="flex gap-x-16 justify-between border-b border-richblack-800 px-6 py-8 bg-richblack-200"
              >
                <Td className="flex flex-col gap-x-4">
                  {/* <img
                    src={service?.icon}
                    alt={service?.serviceName}
                    className="h-[148px] w-[220px] rounded-lg object-cover"
                  /> */}<div className="text-lg font-semibold text-richblack-5">{job.companyName}</div>
                  <div className="flex flex-col justify-between">
                  
                    {job.status === SERVICE_STATUS.INACTIVE ? (
                      <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-pink-100">
                        <HiClock size={14} />
                        Inactive
                      </p>
                    ) : (
                      <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-white">
                        <div className="flex h-3 w-3 items-center justify-center rounded-full bg-black/75 text-white">
                          <FaCheck size={8} />
                        </div>
                        Active
                      </p>
                    )}
                  </div>
                </Td>
                <Td>
                    <p className="text-lg font-semibold text-richblack-5">
                        {job.jobTitle}
                    </p>
                </Td>
                <Td>
                    <p className="text-xs text-richblack-5">{job.passport}</p>
                </Td>
                <Td>
                    <p className="text-xs text-richblack-5">
                        {job.jobLocation}
                    </p>
                    
                </Td>
                <Td>
                    <ApproveJobButton job={job}/>
                </Td>
                <Td className="text-xs text-richblack-5">
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
                </Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  )
}
