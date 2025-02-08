
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateSectorStatus } from '../../../../services/operations/sectorAPI'; // Import your API function for updating service status
import { SECTOR_STATUS } from '../../../../utils/constants';

const SectorStatusToggle = ({ sector }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(sector.status);
  const { token } = useSelector((state) => state.auth)
  console.log("token",token);

  console.log("sector inside sectorstatustoggle : ", sector)

  const handleToggleStatus = async () => {
    setLoading(true);
    try {
      const newStatus = status === SECTOR_STATUS.ACTIVE ? SECTOR_STATUS.INACTIVE : SECTOR_STATUS.ACTIVE;
      const data = {sectorId:sector._id, status:newStatus}
      console.log("token inside try:", token)
      const updatedStatus = await updateSectorStatus(data,token); // Call your API function to update the status
      
      if(updatedStatus){
        setStatus(newStatus)
      }
      setLoading(false);
    } catch (error) {
      console.error('Error toggling sector status:', error);
      setLoading(false);
    }
  };

  return (
    <button
      disabled={loading}
      onClick={handleToggleStatus}
      className={`px-2 w-14 h-9 py-1 rounded text-white ${
        status === SECTOR_STATUS.ACTIVE ? 'bg-blue-700' : 'bg-red-500'
      } `}
    >
      {loading ? 'Loading...' : status}
    </button>
  );
};

export default SectorStatusToggle;