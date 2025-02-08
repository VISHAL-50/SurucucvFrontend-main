import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { addSectorDetails } from '../../../../../services/operations/sectorAPI';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import IconBtn from '../../../../common/IconBtn';
import { useForm } from "react-hook-form"


const AddSector = () => {
  

  const { user } = useSelector((state) => state.profile)
  // const { token } = useSelector((state) => state.auth)
  const token = user.token;
  console.log("token : ",token)
  //token ki dikkat h kl check krungaa
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  
  const submitSectorForm = async (data) => {
    console.log("Form Data - ", data)
    // console.log("token - ", token)

    try {
      dispatch(addSectorDetails(data,token,navigate))
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
    }
  }
  return (
    
      <form onSubmit={handleSubmit(submitSectorForm)}>
        {/* Service Information */}
        <div className="my-10 lg:mt-14 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-200  p-8 px-12">
          <h2 className="text-lg text-black font-medium ">
            Create Sector
          </h2>
          <div className="flex flex-col gap-5 lg:flex-row">

            <div className="flex flex-col gap-2 lg:w-[33%]">
              <label htmlFor="sectorName" className="lable-style">
                Sector Name
              </label>
              <input
                type="text"
                name="sectorName"
                id="sectorName"
                placeholder="Enter sector name"
                className="form-style"
                {...register("sectorName", { required: true })}
                // defaultValue={user?.adminProfileDetails?.firstName}
              />
              {errors.sectorName && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your sector name.
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
                placeholder="Enter Status Details"
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

          

          


          

          

          


        </div>


            <div className="flex justify-end gap-2">
                <button
                    onClick={() => {
                    navigate("/dashboard/my-sectors")
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

export default AddSector;