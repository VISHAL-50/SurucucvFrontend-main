// import { useEffect, useState } from "react"
// import { VscAdd } from "react-icons/vsc"
// import { useSelector } from "react-redux"
// import { useNavigate } from "react-router-dom"

// import { fetchAllAds } from "../../../../services/operations/adsAPI"
// import IconBtn from "../../../common/IconBtn"

// import AdsTable from "./AdsTable"

// export default function MyAds() {
//   const { token } = useSelector((state) => state.auth)
//   const navigate = useNavigate()
//   const [ad, setAds] = useState([])

//   useEffect(() => {
//     const fetchAds = async () => {
//       const result = await fetchAllAds(token)
//       console.log("result My Ads : ",result);
//       if (result) {
//         setAds(result)
//       }
//     }
//     fetchAds()
//     // eslint-disable-next-line react-hooks/exhaustive-deps
// }, [])

//   return (
//     <div>
//       <div className="mb-14 flex items-center lg:mt-14 justify-between">
//         <h1 className="text-3xl font-medium text-black">My Ads</h1>
//         <IconBtn
//           text="Add Advertisement Post"
//           onclick={() => navigate("/dashboard/post-ads")}
//         >
//           <VscAdd />
//         </IconBtn>
//       </div>

//       {ad && <AdsTable ad={ad} setAds={setAds} />}
//     </div>
//   )
// }

import { useEffect, useState } from "react";
import { VscAdd } from "react-icons/vsc";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllAdsByCompanyId } from "../../../../services/operations/adsAPI";
import IconBtn from "../../../common/IconBtn";
import AdsTable from "./AdsTable";

export default function MyAds() {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [ads, setAds] = useState([]);
  const { user } = useSelector((state) => state.profile)

  useEffect(() => {
    const fetchAds = async () => {
      const result = await getAllAdsByCompanyId(user._id);
      console.log("result My Ads:", result);
      if (result?.success && Array.isArray(result.data)) {
        setAds(result.data);
      } else {
        setAds([]);
      }
    };
    fetchAds();
  }, [token]);

  return (
    <div>
      <div className="mb-14 flex items-center lg:mt-14 justify-between">
        <h1 className="text-3xl font-medium text-black">My Ads</h1>
        <IconBtn
          text="Add Advertisement Post"
          onclick={() => navigate("/dashboard/post-ads")}
        >
          <VscAdd />
        </IconBtn>
      </div>

      {/* Pass ads prop */}
      {ads && <AdsTable ads={ads} setAds={setAds} />}
    </div>
  );
}
