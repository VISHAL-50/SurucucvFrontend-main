// import { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { approvePaymentRequest } from '../../../../services/operations/packageAPI'; // Update to use payment approval
// import { PAYMENT_STATUS } from '../../../../utils/constants'; // You can define constants for statuses

// const PackagePaymentStatusToggle = ({ pack }) => {
//   const [loading, setLoading] = useState(false);
//   const [status, setStatus] = useState(pack.status);
//   const { token } = useSelector((state) => state.auth); // Get the token from the Redux store

//   const handleToggleStatus = async () => {
//     setLoading(true);
//     try {
//       const newStatus = status === PAYMENT_STATUS.REQUESTED ? PAYMENT_STATUS.APPROVED : PAYMENT_STATUS.REQUESTED;
//       const data = { companyId: pack.companyId, packageId: pack._id, status: newStatus }; // Send required data

//       // Call your API function to update the payment status
//       const updatedStatus = await approvePaymentRequest(data, token);

//       if (updatedStatus) {
//         setStatus(newStatus); // Update the status in the UI
//       }
//       setLoading(false);
//     } catch (error) {
//       console.error('Error toggling payment status:', error);
//       setLoading(false);
//     }
//   };

//   return (
//     <button
//       disabled={loading}
//       onClick={handleToggleStatus}
//       className={`px-2 py-1 rounded ${
//         status === PAYMENT_STATUS.APPROVED ? 'bg-green-500' : 'bg-red-500'
//       } text-white`}
//     >
//       {loading ? 'Loading...' : status}
//     </button>
//   );
// };

// export default PackagePaymentStatusToggle;


