import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { updateAdminProfile } from "../../../../services/operations/SettingsAPI"
import IconBtn from "../../../common/IconBtn"


export default function EditAdminProfile() {
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const submitProfileForm = async (data) => {
    // console.log("Form Data - ", data)
    try {
      dispatch(updateAdminProfile(token, data,navigate))
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit(submitProfileForm)}>
        {/* Profile Information */}
        <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-200 p-8 px-12">
          <h2 className="text-lg font-semibold text-richblack-5">
            Profile Information
          </h2>
          <div className="flex flex-col gap-5 lg:flex-row">

            <div className="flex flex-col gap-2 lg:w-[33%]">
              <label htmlFor="firstName" className="lable-style">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="Enter first name"
                className="form-style"
                {...register("firstName", { required: true })}
                defaultValue={user?.adminProfileDetails?.firstName}
              />
              {errors.firstName && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your first name.
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2 lg:w-[33%]">
              <label htmlFor="middleName" className="lable-style">
                Middle Name
              </label>
              <input
                type="text"
                name="middleName"
                id="middleName"
                placeholder="Enter middle name"
                className="form-style"
                {...register("middleName", { required: true })}
                defaultValue={user?.adminDetails?.middleName}
              />
              {errors.middleName && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your middle name.
                </span>
              )}
            </div>
            
            <div className="flex flex-col gap-2 lg:w-[33%]">
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
            </div>
          </div>

          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="post" className="lable-style">
                Post
              </label>
              <input
                type="text"
                name="post"
                id="post"
                placeholder="Enter Post "
                className="form-style"
                {...register("post", { required: true })}
                defaultValue={user?.adminDetails?.post}
              />
              {errors.post && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your Post.
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="bio" className="lable-style">
                Bio
              </label>
              <input
                type="text"
                name="bio"
                id="bio"
                placeholder="Enter Bio Details"
                className="form-style"
                {...register("bio", { required: true })}
                defaultValue={user?.adminDetails?.bio}
              />
              {errors.bio && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your Bio.
                </span>
              )}
            </div> 
          </div>

          <div className="flex flex-col gap-5 lg:flex-row">

            <div className="flex flex-col gap-2 lg:w-[48%]">
                <label htmlFor="contactNumber" className="lable-style">
                    Contact Number
                </label>
                <input
                    type="tel"
                    name="contactNumber"
                    id="contactNumber"
                    placeholder="Enter Contact Number"
                    className="form-style"
                    {...register("contactNumber", {
                    required: {
                        value: true,
                        message: "Please enter your Contact Number.",
                    },
                    maxLength: { value: 12, message: "Invalid Contact Number" },
                    minLength: { value: 10, message: "Invalid Contact Number" },
                    })}
                    defaultValue={user?.contactNumber}
                />
                {errors.contactNumber && (
                    <span className="-mt-1 text-[12px] text-yellow-100">
                    {errors.contactNumber.message}
                    </span>
                )}
                </div>
          </div>


          

          

          


        </div>


            <div className="flex justify-end gap-2">
                <button
                    onClick={() => {
                    navigate("/dashboard/my-profile")
                    }}
                    className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
                >
                    Cancel
                </button>
                <IconBtn type="submit" text="Save" />
            </div>
      </form>
    </>
  )
}
