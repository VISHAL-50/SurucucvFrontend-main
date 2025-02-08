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
  deleteService,
  getAllServices,
} from "../../../../services/operations/serviceDetailsAPI"
import { SERVICE_STATUS } from "../../../../utils/constants"
import  ServiceStatusToggle  from "./ServiceStatusToggle"

export default function CoursesTable({ services, setServices }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { token } = useSelector((state) => state.auth)
  const [loading, setLoading] = useState(false)
  const [confirmationModal, setConfirmationModal] = useState(null)
  const TRUNCATE_LENGTH = 15
// console.log("services : ",services)

  const handleServiceDelete = async (serviceId) => {
    setLoading(true)
    await deleteService({ serviceId: serviceId }, token)
    const result = await getAllServices(token)
    if (result) {
      setServices(result)
    }
    setConfirmationModal(null)
    setLoading(false)
  }


  return (
    <>
      <Table className="rounded-xl border bg-black/55 rounded-t-md border-richblack-800 ">
        <Thead>
          <Tr className="flex gap-x-40 items-center rounded-t-md border-b border-b-richblack-800 px-6 py-2">
            <Th className="text-left text-sm font-semibold  uppercase text-richblack-5 bg-transparent">
              Icon
            </Th>
            <Th className="text-left text-sm font-semibold  uppercase text-richblack-5 bg-transparent">
              Service Name
            </Th>
            <Th className="text-left text-sm font-semibold uppercase text-richblack-5 bg-transparent">
              Description
            </Th>
            <Th className="text-left text-sm font-semibold uppercase text-richblack-5 bg-transparent">
              Status
            </Th>
            <Th className="text-left text-sm font-semibold uppercase text-richblack-5 bg-transparent">
              Action
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {services?.length === 0 ? (
            <Tr className="bg-richblack-200">
              <Td className="py-10 text-center text-2xl font-semibold text-richblack-5">
                No services found
                {/* TODO: Need to change this state */}
              </Td>
            </Tr>
          ) : (
            services?.map((service) => (
              <Tr
                key={service._id}
                className="flex gap-x-8 border-b border-richblack-800 px-6 py-8 bg-richblack-200"
              >
                <Td className="flex gap-x-4">
                  <img
                    src={service?.icon}
                    alt={service?.serviceName}
                    className="h-[148px] w-[220px] rounded-lg object-cover"
                  />
                  </Td>
                  <Td>
                    <p className="text-lg font-semibold text-richblack-5 text-center">
                      {service.serviceName}
                    </p>
                  </Td>
                  <Td>
                    <p className="text-xs text-richblack-5  text-center">
                      {service.serviceDescription.split(" ").length >
                      TRUNCATE_LENGTH
                        ? service.serviceDescription
                            .split(" ")
                            .slice(0, TRUNCATE_LENGTH)
                            .join(" ") + "..."
                        : service.serviceDescription}
                    </p>
                  </Td>
                  {/* <div className="flex flex-col justify-between">
                       {service.status = setStatus}
                    <p className="text-[12px] text-white">
                        {status}
                    </p>
                    {service.status === SERVICE_STATUS.INACTIVE ? (
                      <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-pink-100">
                        <HiClock size={14} />
                        Inactive
                      </p>
                    ) : (
                      <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-yellow-100">
                        <div className="flex h-3 w-3 items-center justify-center rounded-full bg-yellow-100 text-richblack-700">
                          <FaCheck size={8} />
                        </div>
                        Active
                      </p>
                    )}
                  </div> */}
                
                <Td>
                  <ServiceStatusToggle service={service}/>
                </Td>
                
                <Td className="text-xs text-richblack-5 ">
                  <button
                    disabled={loading}
                    onClick={() => {
                      navigate(`/dashboard/edit-service/${service._id}`)
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
                        text1: "Do you want to delete this service?",
                        text2:
                          "All the data related to this service will be deleted",
                        btn1Text: !loading ? "Delete" : "Loading...  ",
                        btn2Text: "Cancel",
                        btn1Handler: !loading
                          ? () => handleServiceDelete(service._id)
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
