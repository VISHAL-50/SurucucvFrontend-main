// import { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { updateServiceStatus } from '../../../../services/operations/serviceDetailsAPI'; // Import your action for updating service status

// const ServiceStatusToggle = ({ service }) => {
//   const dispatch = useDispatch();
//   const [isLoading, setIsLoading] = useState(false);
//   const [status, setStatus] = useState(service.status);

//   const handleToggle = async () => {
//     setIsLoading(true);
//     const newStatus = status === 'Active' ? 'Inactive' : 'Active';
//     const updatedService = await dispatch(updateServiceStatus(service._id, newStatus));
//     if (updatedService) {
//       setStatus(newStatus);
//     }
//     setIsLoading(false);
//   };

//   return (
//     <button
//       className={`px-2 py-1 rounded-md ${
//         status === 'Active' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
//       }`}
//       onClick={handleToggle}
//       disabled={isLoading}
//     >
//       {isLoading ? 'Loading...' : status}
//     </button>
//   );
// }
// export default ServiceStatusToggle

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateServiceStatus } from '../../../../services/operations/serviceDetailsAPI'; // Import your API function for updating service status
import { SERVICE_STATUS } from '../../../../utils/constants';

const ServiceStatusToggle = ({ service }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(service.status);
  const { token } = useSelector((state) => state.auth)
  console.log("token",token);

  console.log("service inside servicestatustoggle : ", service)

  const handleToggleStatus = async () => {
    setLoading(true);
    try {
      const newStatus = status === SERVICE_STATUS.ACTIVE ? SERVICE_STATUS.INACTIVE : SERVICE_STATUS.ACTIVE;
      const data = {serviceId:service._id, status:newStatus}
      console.log("token inside try:", token)
      const updatedStatus = await updateServiceStatus(data,token); // Call your API function to update the status
      
      if(updatedStatus){
        setStatus(newStatus)
      }
      setLoading(false);
    } catch (error) {
      console.error('Error toggling service status:', error);
      setLoading(false);
    }
  };

  return (
    <button
      disabled={loading}
      onClick={handleToggleStatus}
      className={`px-2 py-1 rounded ${
        status === SERVICE_STATUS.ACTIVE ? 'bg-blue-700' : 'bg-red-500'
      } text-white`}
    >
      {loading ? 'Loading...' : status}
    </button>
  );
};

export default ServiceStatusToggle;