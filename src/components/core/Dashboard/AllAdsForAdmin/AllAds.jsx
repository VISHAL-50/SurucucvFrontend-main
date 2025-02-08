import { useEffect, useState } from "react"
import { VscAdd } from "react-icons/vsc"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { fetchAllAds } from "../../../../services/operations/adsAPI"
import IconBtn from "../../../common/IconBtn"

import AllAdsTable from "./AllAdsTable"

export default function AllJobs() {
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const [ads, setAds] = useState([])

  useEffect(() => {
    const fetchAds = async () => {
      const result = await fetchAllAds(token)
      console.log("result : ",result);
      if (result) {
        setAds(result)
      }
    }
    fetchAds()
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, [])

  return (
    <div>
      <div className="mb-14 lg:mt-14 flex items-center justify-between">
        <h1 className="text-3xl font-medium text-black">All Advertisements</h1>
        <IconBtn
          text="Add Advertisement Post"
          onclick={() => navigate("/dashboard/post-ads")}
        >
          <VscAdd />
        </IconBtn>
      </div>

      {ads && <AllAdsTable ads={ads} setAds={setAds} />}
    </div>
  )
}
