import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { addServiceDetails } from '../../../../../services/operations/serviceDetailsAPI';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import IconBtn from '../../../../common/IconBtn';
import { useForm } from "react-hook-form"
import { useState, useEffect } from "react";
import { getActiveSectors } from '../../../../../services/operations/sectorAPI';


const AddService = () => {
  const { user } = useSelector((state) => state.profile)
  const [loading, setLoading] = useState(false)

  // const { token } = useSelector((state) => state.auth)
  const token = user.token;
  console.log("token : ",token)
  //token ki dikkat h kl check krungaa
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [sectors, setSectors] = useState([]);
  
  useEffect(() => {
    const getSectors = async () => {
      setLoading(true);
      const sectors = await getActiveSectors();
      if (sectors.length > 0) {
        console.log("sectors", sectors)
        setSectors(sectors);
      }
      setLoading(false);
    };
    getSectors();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  
  const submitServiceForm = async (data) => {
    console.log("Form Data - ", data)
    // console.log("token - ", token)

    try {
      dispatch(addServiceDetails({...data, serviceIcon:data.serviceIcon[0]}, token, navigate, dispatch))
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
    }
  }
  return (
    
      <form onSubmit={handleSubmit(submitServiceForm)}>
        {/* Service Information */}
        <div className="my-10 lg:mt-14 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-200 p-8 px-12">
          <h2 className="text-lg font-semibold text-richblack-5">
            Create Service
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
                {...register("serviceName", { required: true })}
                // defaultValue={user?.adminProfileDetails?.firstName}
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
                {...register("serviceDescription", { required: true })}
                // defaultValue={user?.adminDetails?.middleName}
              />
              {errors.serviceDescription && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your service description.
                </span>
              )}
            </div>
            
            {/* <div className="flex flex-col gap-2 lg:w-[33%]">
              <label htmlFor="lastName" className="lable-style">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Enter first name"
                className="form-style"
                {...register("lastName", { required: true })}
                defaultValue={user?.adminDetails?.lastName}
              />
              {errors.lastName && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your last name.
                </span>
              )}
            </div> */}
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
                {...register("serviceIcon", { required: true })}
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
                {...register("status", { required: true })}
                // defaultValue={user?.adminDetails?.bio}
                
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

          
          <div className="flex flex-col gap-2 lg:flex-row">
            <div className="flex flex-col space-y-2 lg:w-[48%] ">
              <label
                className="lable-style"
                htmlFor="sector"
              >
                Sector <sup className="text-pink-200">*</sup>
              </label>
              <select
                {...register("sector", { required: true })}
                defaultValue=""
                id="sector"
                className="form-style w-full"
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
                    className="cursor-pointer rounded-md bg-richblack-200 py-2 px-5 font-semibold text-richblack-50"
                >
                    Cancel
                </button>
                <IconBtn type="submit" text="Save" />
            </div>
      </form>
  );
}

export default AddService;