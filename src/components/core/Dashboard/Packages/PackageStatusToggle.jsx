import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePackageStatus } from '../../../../services/operations/packageAPI'; // Import your API function for updating service status
import { PACKAGE_STATUS } from '../../../../utils/constants';

const PackageStatusToggle = ({ pack }) => {

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(pack.status);
  const { token } = useSelector((state) => state.auth)
  console.log("token",token);

  console.log("package inside packagestatustoggle : ", pack)

  const handleToggleStatus = async () => {
    setLoading(true);
    try {
      const newStatus = status === PACKAGE_STATUS.ACTIVE ? PACKAGE_STATUS.INACTIVE : PACKAGE_STATUS.ACTIVE;
      const data = {packageId:pack._id, status:newStatus}
      console.log("token inside try:", token)
      const updatedStatus = await updatePackageStatus(data,token); // Call your API function to update the status
      
      if(updatedStatus){
        setStatus(newStatus)
      }
      setLoading(false);
    } catch (error) {
      console.error('Error toggling package status:', error);
      setLoading(false);
    }
  };

  return (
    <button
      disabled={loading}
      onClick={handleToggleStatus}
      className={`px-2 py-1 rounded ${
        status === PACKAGE_STATUS.ACTIVE ? 'bg-blue-700' : 'bg-red-500'
      } text-white`}
    >
      {loading ? 'Loading...' : status}
    </button>
  );
};

export default PackageStatusToggle;