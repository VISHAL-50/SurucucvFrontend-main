import { useEffect, useState } from 'react';
import { editSectorDetails, fetchSectorDetails } from '../../../../../services/operations/sectorAPI';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import IconBtn from '../../../../common/IconBtn';
import { useForm } from "react-hook-form"
import { setEditSector, setSector } from '../../../../../slices/sectorSlice';
import { toast } from "react-hot-toast"
import { useParams } from "react-router-dom"



const EditSector = () => {
  const { sectorId } = useParams()
  
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm()
  
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.profile)
  const { sector } = useSelector((state) => state.sector)
  
  console.log("value of sector from sector slice" ,sector)
  const [loading, setLoading] = useState(false)
  // const { token } = useSelector((state) => state.auth)
  const token = user.token;
  // console.log("token : ",token)
console.log("sector slice data :",sector)

useEffect(() => {
  const getSectorDetails = async () => {
    setLoading(true);
    const result = await fetchSectorDetails(sectorId);
    console.log("fetch sector details result:", result?.[0]);
    if (result?.[0] !== null) {
      dispatch(setEditSector(true));
      dispatch(setSector(result?.[0]));
      const sectorDetails = result?.[0];
      setValue("sectorName", sectorDetails?.sectorName);
      setValue("status", sectorDetails?.status);
      
      // console.log("value of set sector:", setService);
      dispatch(setEditSector(false));
    }
    setLoading(false);
  };
  getSectorDetails();
}, [dispatch, sectorId, setValue]);
  
  const onSubmit = async (data) => {
    console.log("Form Data after form submission - ", data)




    try {
      dispatch(editSectorDetails({...data, sectorId:sectorId},token,navigate))
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
    }
  }
  return (
    
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Sector Information */}
        <div className="my-10 lg:mt-20 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-200 p-8 px-12">
          <h2 className="text-lg font-semibold text-richblack-5">
            Edit Sector
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
                         
              >
                <option value="" disabled>Choose sector</option>
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
                    disabled={loading}
                    className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
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

export default EditSector;


// currently on edit service form 