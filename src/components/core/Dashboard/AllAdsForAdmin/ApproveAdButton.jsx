import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateAdStatus } from '../../../../services/operations/adsAPI'; // Replace with the correct API path
import { SERVICE_STATUS } from '../../../../utils/constants';

const ApproveAdButton = ({ ad }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(ad.status);
  const { token } = useSelector((state) => state.auth);

  const handleToggleStatus = async () => {
    setLoading(true);
    try {
      const newStatus = status === SERVICE_STATUS.ACTIVE ? SERVICE_STATUS.INACTIVE : SERVICE_STATUS.ACTIVE;
      const data = { adId: ad._id, status: newStatus };
      const updatedAdStatus = await updateAdStatus(data, token); // Call your API function to update the ad status
      
      if (updatedAdStatus) {
        setStatus(newStatus);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error toggling ad status:', error);
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

export default ApproveAdButton;
