import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateJobStatus } from '../../../../services/operations/jobPostAPI'; 
import { SERVICE_STATUS } from '../../../../utils/constants';

const ApproveJobButton = ({ job }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(job.status);
  const { token } = useSelector((state) => state.auth)
  console.log("token",token);

  console.log("job inside approvejobbutton : ", job)

  const handleToggleStatus = async () => {
    setLoading(true);
    try {
      const newStatus = status === SERVICE_STATUS.ACTIVE ? SERVICE_STATUS.INACTIVE : SERVICE_STATUS.ACTIVE;
      const data = {jobId:job._id, status:newStatus}
      console.log("token inside try:", token)
      const updatedJobStatus = await updateJobStatus(data,token); // Call your API function to update the status
      
      if(updatedJobStatus){
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

export default ApproveJobButton;