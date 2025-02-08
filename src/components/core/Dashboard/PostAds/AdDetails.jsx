// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { fetchAdvertisementDetails } from "../../../../services/operations/adsAPI";

// export default function AdDetails() {
//   const { adId } = useParams();
//   const [adDetails, setAdDetails] = useState(null);

//   useEffect(() => {
//     async function fetchDetails() {
//       const response = await fetchAdvertisementDetails(adId);
// console.log(response)
// // console.log(response.data)
//         setAdDetails(response);
      
//     }
//     fetchDetails();
//   }, [adId]);

//   if (!adDetails) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <div className="p-8 max-w-lg mx-auto lg:mt-20 bg-richblack-200 shadow-md rounded-md">
//       <h1 className="text-2xl font-bold mb-4">{adDetails.adTitle}</h1>
//       <p className="mb-2 text-white "><strong>Description:</strong> {adDetails.description}</p>
//       <p className="mb-2 text-white "><strong>Start Date:</strong> {new Date(adDetails.startDate).toLocaleDateString()}</p>
//       <p className="mb-2 text-white "><strong>End Date:</strong> {new Date(adDetails.endDate).toLocaleDateString()}</p>
//       <p className="mb-2 text-white "><strong>Publication Period:</strong> {adDetails.publicationPeriod} days</p>
//       <p className="mb-2 text-white "><strong>Homepage Duration:</strong> {adDetails.homePageDuration} days</p>
//       <p className="mb-2 text-white "><strong>Status:</strong> {adDetails.status}</p>
//       <p className="mb-2 text-white "><strong>Package:</strong> {adDetails.package.name}</p>
//     </div>
//   );
// }



import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchAdvertisementDetails } from "../../../../services/operations/adsAPI";
import { FaCalendarAlt, FaClipboard, FaHourglassHalf, FaInfoCircle } from "react-icons/fa";

export default function AdDetails() {
  const { adId } = useParams();
  const [adDetails, setAdDetails] = useState(null);

  useEffect(() => {
    async function fetchDetails() {
      const response = await fetchAdvertisementDetails(adId);
      console.log(response);
      setAdDetails(response);
    }
    fetchDetails();
  }, [adId]);

  if (!adDetails) {
    return <p className="text-center text-xl font-semibold text-gray-500">Loading...</p>;
  }

  return (
    <div className="p-8 max-w-lg mx-auto lg:mt-20 bg-gradient-to-r from-blue-500 to-blue-700 shadow-xl rounded-lg text-white">
      <h1 className="text-3xl font-bold mb-6 text-center">{adDetails.adTitle}</h1>
      
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <FaClipboard className="text-yellow-300" />
          <p><strong>Description:</strong> {adDetails.description}</p>
        </div>

        <div className="flex items-center space-x-3">
          <FaCalendarAlt className="text-green-300" />
          <p><strong>Start Date:</strong> {new Date(adDetails.startDate).toLocaleDateString()}</p>
        </div>

        <div className="flex items-center space-x-3">
          <FaCalendarAlt className="text-red-300" />
          <p><strong>End Date:</strong> {new Date(adDetails.endDate).toLocaleDateString()}</p>
        </div>

        <div className="flex items-center space-x-3">
          <FaHourglassHalf className="text-indigo-300" />
          <p><strong>Publication Period:</strong> {adDetails.publicationPeriod} days</p>
        </div>

        <div className="flex items-center space-x-3">
          <FaHourglassHalf className="text-pink-300" />
          <p><strong>Homepage Duration:</strong> {adDetails.homePageDuration} days</p>
        </div>

        <div className="flex items-center space-x-3">
          <FaInfoCircle className="text-yellow-500" />
          <p><strong>Status:</strong> {adDetails.status}</p>
        </div>

        <div className="flex items-center space-x-3">
          <FaClipboard className="text-cyan-300" />
          <p><strong>Package:</strong> {adDetails.package.name}</p>
        </div>
      </div>
    </div>
  );
}
