import { useEffect, useState } from 'react';
import { editServiceDetails, fetchServiceDetails } from '../../../../../services/operations/serviceDetailsAPI';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import IconBtn from '../../../../common/IconBtn';
import { useForm } from "react-hook-form"
import { setEditService, setService } from '../../../../../slices/serviceSlice';
import { toast } from "react-hot-toast"
import { useParams } from "react-router-dom"
import { getAllSectors } from '../../../../../services/operations/sectorAPI';



const EditService = () => {
  const { serviceId } = useParams();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.profile);
  const { service } = useSelector((state) => state.service);
  console.log("service in slice:", service);
  
  const [loading, setLoading] = useState(false);
  const token = user.token;
  const [sectors, setSectors] = useState([]);

  useEffect(() => {
    const getServiceDetails = async () => {
      setLoading(true);
      const result = await fetchServiceDetails(serviceId);
      console.log("fetch service details result:", result?.[0]);
      if (result?.[0] !== null) {
        dispatch(setEditService(true));
        dispatch(setService(result?.[0]));
        const serviceDetails = result?.[0];
        setValue("serviceName", serviceDetails?.serviceName);
        setValue("serviceDescription", serviceDetails?.serviceDescription);
        setValue("status", serviceDetails?.status);
        setValue("sector", serviceDetails?.sector);
        console.log("value of set service:", setService);
        dispatch(setEditService(false));
      }
      setLoading(false);
    };
    getServiceDetails();
  }, [dispatch, serviceId, setValue]);

  useEffect(() => {
    const getSectors = async () => {
      setLoading(true);
      const sectors = await getAllSectors();
      if (sectors.length > 0) {
        setSectors(sectors);
      }
      setLoading(false);
    };
    getSectors();
  }, []);

  const onSubmit = async (data) => {
    console.log("Form Data after form submission - ", data);
    try {
      dispatch(editServiceDetails({...data, serviceIcon: data.serviceIcon[0], serviceId: serviceId}, token, navigate));
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message);
    }
  };
  return (
    // console.log(service?.sector)
    
    <form onSubmit={handleSubmit(onSubmit)}>
        {/* Service Information */}
        <div className="my-10 flex flex-col lg:mt-20 gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-200 p-8 px-12">
          <h2 className="text-lg font-semibold text-richblack-5">
            Edit Service
          </h2>
          <div className="flex flex-col gap-5 lg:flex-row">

            <div className="flex flex-col gap-2 lg:w-[33%]">
              <label htmlFor="serviceName" className="lable-style">
                Service Name
              </label>
              <input
                type="text"
                name="serviceName"
                id="serviceName"
                placeholder="Enter service name"
                className="form-style"
                {...register("serviceName")}
                
              />
              {errors.serviceName && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your service name.
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2 lg:w-[33%]">
              <label htmlFor="serviceDescription" className="lable-style">
                Service Description
              </label>
              <input
                type="text"
                name="serviceDescription"
                id="serviceDescription"
                placeholder="Enter service description"
                className="form-style"
                {...register("serviceDescription")}
                
              />
              {errors.serviceDescription && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your service description.
                </span>
              )}
            </div>
            
            
          </div>

          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="serviceIcon" className="lable-style">
                Service Icon
              </label>
              <input
                type="file"
                name="serviceIcon"
                accept=".jpg, .jpeg, .png"
                id="serviceIcon"
                placeholder="Choose service Icon "
                className="form-style"
                {...register("serviceIcon")}
                // defaultValue={user?.adminDetails?.post}
              />
              {errors.serviceIcon && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please select your service icon.
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="status" className="lable-style">
                Status
              </label>
              <select
                
                name="status"
                id="status"
                placeholder="Enter Bio Details"
                className="form-style"
                {...register("status")}
           
                
              >
                <option value="" disabled>Choose status</option>
                <option value="Active" >Active</option>
                <option value="Inactive" >Inactive</option>
              </select>
              {errors.status && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please choose status.
                </span>
              )}
            </div> 
          </div>

          

          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="flex flex-col space-y-2 lg:w-[48%] ">
              <label
                className="lable-style"
                htmlFor="sector"
              >
                Sector <sup className="text-pink-200">*</sup>
              </label>
              <select
                {...register("sector")}
                id="sector"
                className="form-style w-full"
                defaultValue={service?.sector}
              >
                <option value="" disabled>
                  Choose a Sector
                </option>
                {!loading &&
                  sectors?.map((sector, indx) => (
                    <option key={indx} value={sector?._id}>
                      {sector?.sectorName}
                    </option>
                  ))}
              </select>
              {errors.sector && (
                <span className="ml-2 text-xs tracking-wide text-pink-200">
                  Sector is required
                </span>
              )}
            </div>
          </div>
          

          


        </div>


            <div className="flex justify-end gap-2">
                <button
                    onClick={() => {
                    navigate("/dashboard/my-services")
                    }}
                    disabled={loading}
                    className="cursor-pointer rounded-md bg-richblack-200 py-2 px-5 font-semibold text-richblack-50"
                >
                    Cancel
                </button>
                <IconBtn
                  disabled={loading}
                  type="submit" text="Save Changes" />
            </div>
      </form>
  );
}

export default EditService;


// currently on edit service form 