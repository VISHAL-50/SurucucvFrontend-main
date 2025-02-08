import { useEffect, useState } from "react"
import { VscAdd } from "react-icons/vsc"
import { useNavigate } from "react-router-dom"

import { getAllServices } from "../../../../services/operations/serviceDetailsAPI"
import IconBtn from "../../../common/IconBtn"

import ServicesTable from "./ServicesTable"

export default function AddService() {
  const navigate = useNavigate()
  const [services, setServices] = useState([])

  useEffect(() => {
    const fetchServices = async () => {
      const result = await getAllServices()
      console.log("result : ",result);
      if (result) {
        setServices(result)
      }
    }
    fetchServices()
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, [])

  return (
    <div>
      <div className="mb-14 lg:mt-28 flex items-center justify-between">
        <h1 className="text-3xl font-medium text-black">My Services</h1>
        <IconBtn
          text="Add Service"
          onclick={() => navigate("/dashboard/add-service")}
        >
          <VscAdd />
        </IconBtn>
      </div>

      {services && <ServicesTable services={services} setServices={setServices} />}
    </div>
  )
}
