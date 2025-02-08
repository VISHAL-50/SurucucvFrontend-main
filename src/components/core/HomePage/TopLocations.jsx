import React, { useEffect, useState } from 'react'
import { getTopJobLocations } from "../../../services/operations/jobPostAPI"
import { Link , useLocation, useNavigate} from "react-router-dom"
export const TopLocations = () => {
    const [topJobLocations , setTopJobLocations] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();
    const filterKey = "jobLocation"
    useEffect(() => {
        const fetchServices = async () => {
          const result = await getTopJobLocations()
          console.log("result of job location result : ",result);
          if (result) {
            setTopJobLocations(result)
          }
        }
        fetchServices()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleChange = (option) => {
      const queryParams = new URLSearchParams(location.search);
      queryParams.set(filterKey, option);
      navigate(`/find-job?${queryParams.toString()}`);
  };

    
  return (
    <div  className='w-full flex gap-x-2.5'>
        {
            topJobLocations?.length === 0 ? (
                <p>No Job Post Available yet</p>
            ) : (
                topJobLocations?.map((topJobLocation, index) => (
                  

                            <button key={index} className='text-sm px-4 py-2 rounded-full font-rubik 
                            text-purple-700  border-rich-50 bg-white hover:ring-1 hover:ring-purple-700 hover:bg-white text-center'
                            
                             onClick={() => handleChange(topJobLocation?._id)}>
                                {topJobLocation?._id}
                            </button>
                            
                        
                    

                ))
            )
        }
    </div>
  )
}
