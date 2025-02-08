// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchAllAds, deleteAd } from "../../../../services/operations/adsAPI";
// import { useNavigate } from "react-router-dom";
// import { FaEdit, FaTrash } from "react-icons/fa";

// export default function AdsTable(ad, setAds) {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   // const { ads } = useSelector((state) => state.ad);

//   // console.log("ads log : ",ad)
//   useEffect(() => {
//     dispatch(fetchAllAds());
//   }, [dispatch]);

//   const handleDelete = (adId) => {
//     dispatch(deleteAd(adId));
//   };

//   const handleRedirect = (adId) => {
//     navigate(`/ad-details/${adId}`);
//   };

//   return (
//     <table className="w-full text-left">
//       <thead>
//         <tr>
//           <th className="p-4 border-b">Ad Title</th>
//           <th className="p-4 border-b">Start Date</th>
//           <th className="p-4 border-b">End Date</th>
//           <th className="p-4 border-b">Package Name</th>
//           <th className="p-4 border-b">Actions</th>
//         </tr>
//       </thead>
//       <tbody>
//         {ad.map((item) => (
//           <tr key={item._id} className="hover:bg-gray-100 cursor-pointer" onClick={() => handleRedirect(ad._id)}>
//             <td className="p-4">{item.title}</td>
//             <td className="p-4">{new Date(item.startDate).toLocaleDateString()}</td>
//             <td className="p-4">{new Date(item.endDate).toLocaleDateString()}</td>
//             <td className="p-4">{item.package.name}</td>
//             <td className="p-4 flex gap-2">
//               <button className="text-blue-500 hover:text-blue-700">
//                 <FaEdit />
//               </button>
//               <button onClick={() => handleDelete(item._id)} className="text-red-500 hover:text-red-700">
//                 <FaTrash />
//               </button>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// }


import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { deleteAd, getAllAdsByCompanyId, fetchAllAds } from "../../../../services/operations/adsAPI";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table"

export default function AdsTable({ ads, setAds }) { // Updated to destructure props

  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth)
  const [loading, setLoading] = useState(false)
  const [confirmationModal, setConfirmationModal] = useState(null)

  const handleDelete = async (adId) => {
    setLoading(true)
    await deleteAd({ adId: adId }, token)
    const result = await fetchAllAds(token)
    if (result) {
      setAds(result)
    }
    setConfirmationModal(null)
    setLoading(false)
  };

  const handleRedirect = (adId) => {
    navigate(`/dashboard/ad-details/${adId}`);
  };

  return (
    <Table className="rounded-xl border border-richblack-800  bg-black/55 rounded-t-md ">
      <Thead>
        <Tr className="flex gap-x-10 justify-between items-center rounded-t-md border-b border-b-richblack-800 px-6 py-2">
          <Th className=" text-left text-sm font-semibold bg-transparent uppercase text-richblack-5">Ad Title</Th>
          <Th className=" text-left text-sm font-semibold bg-transparent uppercase text-richblack-5">Start Date</Th>
          <Th className=" text-left text-sm font-semibold bg-transparent uppercase text-richblack-5">End Date</Th>
          <Th className=" text-left text-sm font-semibold bg-transparent uppercase text-richblack-5">Package Name</Th>
          <Th className=" text-left text-sm font-semibold bg-transparent uppercase text-richblack-5">Actions</Th>
        </Tr>
      </Thead>
      <Tbody>
        {ads?.length === 0 ? (
            <Tr className="bg-richblack-200">
              <Td className="py-10 text-center text-2xl font-semibold text-richblack-5">
                No Advertisement found, start creating
                {/* TODO: Need to change this state */}
              </Td>
            </Tr>
          ) : (
            ads?.map((item) => (
          <Tr key={item._id} className="hover:bg-gray-100 cursor-pointer" onClick={() => handleRedirect(item._id)}>
            <Td className="p-4">{item.title}</Td>
            <Td className="p-4">{new Date(item.startDate).toLocaleDateString()}</Td>
            <Td className="p-4">{new Date(item.endDate).toLocaleDateString()}</Td>
            <Td className="p-4">{item.package.name}</Td>
            <Td className="p-4 flex gap-2">
              <button className="text-blue-500 hover:text-blue-700">
                <FaEdit />
              </button>
              <button onClick={() => handleDelete(item._id)} className="text-red-500 hover:text-red-700">
                <FaTrash />
              </button>
            </Td>
          </Tr>
        ))
        )
        }
      </Tbody>
    </Table>
  );
}
