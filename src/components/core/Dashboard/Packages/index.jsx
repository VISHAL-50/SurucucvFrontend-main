import { useEffect, useState } from "react"
import { VscAdd } from "react-icons/vsc"
import { useNavigate } from "react-router-dom"

import { getAllPackages } from "../../../../services/operations/packageAPI"
import IconBtn from "../../../common/IconBtn"

import PackagesTable from "./PackagesTable"

export default function AllPackage() {
  const navigate = useNavigate()
  const [packages, setPackages] = useState([])

  useEffect(() => {
    const fetchPackages = async () => {
      const result = await getAllPackages()
      console.log("result : ",result);
      if (result) {
        setPackages(result)
      }
    }
    fetchPackages()
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, [])

  return (
    <div>
      <div className="mb-14 lg:mt-28 flex items-center justify-between">
        <h1 className="text-3xl font-medium text-black">My packages</h1>
        <IconBtn
          text="Add Package"
          onclick={() => navigate("/dashboard/add-package")}
        >
          <VscAdd />
        </IconBtn>
      </div>

      {packages && <PackagesTable packages={packages} setPackages={setPackages} />}
    </div>
  )
}
