import { useEffect, useState } from "react"
import { VscAdd } from "react-icons/vsc"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { getAllSectors } from "../../../../services/operations/sectorAPI"
import IconBtn from "../../../common/IconBtn"

import SectorsTable from "./SectorsTable"

export default function MySectors() {
  const navigate = useNavigate()
  const [sectors, setSectors] = useState([])

  useEffect(() => {
    const fetchSectors = async () => {
      const result = await getAllSectors()
      console.log("result : ",result);
      if (result) {
        setSectors(result)
      }
    }
    fetchSectors()
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, [])

  return (
    <div>
      <div className="mb-14 lg:mt-14 flex items-center justify-between">
        <h1 className="text-3xl font-medium text-black">My Sectors</h1>
        <IconBtn
          text="Add Sector"
          onclick={() => navigate("/dashboard/add-sector")}
        >
          <VscAdd />
        </IconBtn>
      </div>

      {sectors && <SectorsTable sectors={sectors} setSectors={setSectors} />}
    </div>
  )
}
