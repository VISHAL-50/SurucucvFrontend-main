// import { useForm } from "react-hook-form"
// import { useDispatch, useSelector } from "react-redux"
// import { useNavigate } from "react-router-dom"
// import { useState, useEffect } from "react";
// import { updateCompanyProfile } from "../../../../services/operations/SettingsAPI"
// import IconBtn from "../../../common/IconBtn"
// import { getActiveSectors } from '../../../../services/operations/sectorAPI';
// import { RiEditBoxLine } from "react-icons/ri"


// export default function EditCompanyProfile() {
//   const { user } = useSelector((state) => state.profile)
//   const { token } = useSelector((state) => state.auth)
//   const navigate = useNavigate()
//   const dispatch = useDispatch()

//   const [sectors, setSectors] = useState([]);
//   const [loading, setLoading] = useState(false)

//   const [isContactPerson, setIsContactPerson] = useState(false); // New state for contact person checkbox
//   const [employees, setEmployees] = useState(user?.companyDetails?.employees || []); // Employee list
  
//   useEffect(() => {
//     const getSectors = async () => {
//       setLoading(true);
//       const sectors = await getActiveSectors();
//       if (sectors.length > 0) {
//         console.log("sectors", sectors)
//         setSectors(sectors);
//       }
//       setLoading(false);
//     };
//     getSectors();

//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm()

//   const submitProfileForm = async (data) => {
//     console.log("Form Data in edit company profile - ", data)
//     try {
//       dispatch(updateCompanyProfile(token, data, navigate))
//     } catch (error) {
//       console.log("ERROR MESSAGE - ", error.message)
//     }
//   }

//   const handleAddEmployee = (employee) => {
//     setEmployees([...employees, employee]);
//   };

//   return (
//     <>
//       <form onSubmit={handleSubmit(submitProfileForm)}>
//         {/* Company Information */}
//         <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-200 p-8 px-12">
//           <h2 className="text-lg font-semibold text-richblack-5">
//             Edit Company Profile Information
//           </h2>

//           <div className="flex flex-col gap-5 lg:flex-row">

//             <div className="flex flex-col gap-2 lg:w-[33%]">
//               <label htmlFor="companyTitle" className="lable-style">
//                 Company Title
//               </label>
//               <input
//                 type="text"
//                 name="companyTitle"
//                 id="companyTitle"
//                 placeholder="Enter company title"
//                 className="form-style"
//                 {...register("companyTitle", { required: true })}
//                 defaultValue={user?.companyDetails?.companyTitle}
//               />
//               {errors.companyTitle && (
//                 <span className="-mt-1 text-[12px] text-yellow-100">
//                   Please enter your company title.
//                 </span>
//               )}
//             </div>

//             <div className="flex flex-col space-y-2 lg:w-[48%] ">
//               <label
//                 className="lable-style"
//                 htmlFor="sector"
//               >
//                 Sector <sup className="text-pink-200">*</sup>
//               </label>
//               <select
//                 {...register("sector", { required: true })}
//                 // defaultValue={user?companyProfileDetails?.sector}
//                 id="sector"
//                 className="form-style w-full"
//               >
//                 <option value="" disabled>
//                   Choose a Sector
//                 </option>
//                 {!loading &&
//                   sectors?.map((sector, indx) => (
//                     <option key={indx} value={sector?._id}>
//                       {sector?.sectorName}
//                     </option>
//                   ))}
//               </select>
//               {errors.sector && (
//                 <span className="ml-2 text-xs tracking-wide text-pink-200">
//                   Sector is required
//                 </span>
//               )}
//             </div>
            
//             <div className="flex flex-col gap-2 lg:w-[33%]">
//               <label htmlFor="taxAdministration" className="lable-style">
//                 Tax Administration
//               </label>
//               <input
//                 type="text"
//                 name="taxAdministration"
//                 id="taxAdministration"
//                 placeholder="Enter tax administration"
//                 className="form-style"
//                 {...register("taxAdministration", { required: true })}
//                 defaultValue={user?.companyDetails?.taxAdministration}
//               />
//               {errors.taxAdministration && (
//                 <span className="-mt-1 text-[12px] text-yellow-100">
//                   Please enter your tax administration.
//                 </span>
//               )}
//             </div>
//           </div>

//           <div className="flex flex-col gap-5 lg:flex-row">
//             <div className="flex flex-col gap-2 lg:w-[48%]">
//               <label htmlFor="taxNumber" className="lable-style">
//                 Tax Number
//               </label>
//               <input
//                 type="text"
//                 name="taxNumber"
//                 id="taxNumber"
//                 placeholder="Enter tax number "
//                 className="form-style"
//                 {...register("taxNumber", { required: true })}
//                 defaultValue={user?.companyDetails?.taxNumber}
//               />
//               {errors.taxNumber && (
//                 <span className="-mt-1 text-[12px] text-yellow-100">
//                   Please enter your Post.
//                 </span>
//               )}
//             </div>

//             <div className="flex flex-col gap-2 lg:w-[48%]">
//               <label htmlFor="companyAddress" className="lable-style">
//                 Company Address
//               </label>
//               <input
//                 type="text"
//                 name="companyAddress"
//                 id="companyAddress"
//                 placeholder="Enter company address"
//                 className="form-style"
//                 {...register("companyAddress", { required: true })}
//                 defaultValue={user?.companyDetails?.companyAddress}
//               />
//               {errors.companyAddress && (
//                 <span className="-mt-1 text-[12px] text-yellow-100">
//                   Please enter your company address.
//                 </span>
//               )}
//             </div> 
//           </div>

//           <div className="flex flex-col gap-5 lg:flex-row">
//             <div className="flex flex-col gap-2 lg:w-[48%]">
//                 <label htmlFor="contactNumber" className="lable-style">
//                     Contact Number
//                 </label>
//                 <input
//                     type="tel"
//                     name="contactNumber"
//                     id="contactNumber"
//                     placeholder="Enter Contact Number"
//                     className="form-style"
//                     {...register("contactNumber", {
//                     required: {
//                         value: true,
//                         message: "Please enter your Contact Number.",
//                     },
//                     maxLength: { value: 12, message: "Invalid Contact Number" },
//                     minLength: { value: 10, message: "Invalid Contact Number" },
//                     })}
//                     defaultValue={user?.contactNumber}
//                 />
//                 {errors.contactNumber && (
//                     <span className="-mt-1 text-[12px] text-yellow-100">
//                     {errors.contactNumber.message}
//                     </span>
//                 )}
//             </div>

//             <div className="flex flex-col gap-2 lg:w-[48%]">
//               <label htmlFor="name" className="lable-style">
//                   Name
//               </label>
//               <input
//                 type="text"
//                 name="name"
//                 id="name"
//                 placeholder="Enter name"
//                 className="form-style"
//                 {...register("name", { required: true })}
//                 defaultValue={user?.companyDetails?.name}
//               />
//               {errors.name && (
//                 <span className="-mt-1 text-[12px] text-yellow-100">
//                   Please enter your name.
//                 </span>
//               )}
//             </div>
//           </div>

//           <div className="flex flex-col gap-5 lg:flex-row">

//             <div className="flex flex-col gap-2 lg:w-[33%]">
//               <label htmlFor="email" className="lable-style">
//                 Email
//               </label>
//               <input
//                 type="email"
//                 name="email"
//                 id="email"
//                 placeholder="Enter email"
//                 className="form-style"
//                 {...register("email", { required: true })}
//                 defaultValue={user?.companyDetails?.email}
//               />
//               {errors.email && (
//                 <span className="-mt-1 text-[12px] text-yellow-100">
//                   Please enter your email.
//                 </span>
//               )}
//             </div>

// {/* name="", email, position="", contactNumber, dateOfBirth="", */}
//             <div className="flex flex-col gap-2 lg:w-[33%]">
//               <label htmlFor="position" className="lable-style">
//                 Position
//               </label>
//               <input
//                 type="text"
//                 name="position"
//                 id="position"
//                 placeholder="Enter position"
//                 className="form-style"
//                 {...register("position", { required: true })}
//                 defaultValue={user?.companyDetails?.position}
//               />
//               {errors.position && (
//                 <span className="-mt-1 text-[12px] text-yellow-100">
//                   Please enter your position.
//                 </span>
//               )}
//             </div>
            
//             <div className="flex flex-col gap-2 lg:w-[33%]">
//               <label htmlFor="dateOfBirth" className="lable-style">
//                 Date Of Birth
//               </label>
//               <input
//                 type="date"
//                 name="dateOfBirth"
//                 id="dateOfBirth"
//                 placeholder="Enter date of birth"
//                 className="form-style"
//                 {...register("dateOfBirth", { required: true })}
//                 defaultValue={user?.companyDetails?.dateOfBirth}
//               />
//               {errors.dateOfBirth && (
//                 <span className="-mt-1 text-[12px] text-yellow-100">
//                   Please enter your date of birth.
//                 </span>
//               )}
//             </div>



          

          

          


//         </div>
//             {/* Contact Person Section */}
//             {/* DOO THISS LATERR IN BETA  */}
//           {/* <div className="my-6">
//             <label className="lable-style">
//               Is the current form filler the contact person?
//             </label>
//             <input
//               type="checkbox"
//               checked={isContactPerson}
//               onChange={() => setIsContactPerson(!isContactPerson)}
//             />
//           </div> */}

//           {/* Conditional contact person section */}
// {/*           
//           {
//             !isContactPerson 
//           && (
//             <>
//               <h3 className="text-md font-semibold">Add Contact Person Details</h3>

//               <div className="flex flex-col gap-5 lg:flex-row">
//                 <div className="flex flex-col gap-2 lg:w-[48%]">
//                   <label htmlFor="contactName" className="lable-style">
//                     Contact Person Name
//                   </label>
//                   <input
//                     type="text"
//                     name="contactName"
//                     id="contactName"
//                     placeholder="Enter contact person name"
//                     className="form-style"
//                     {...register("contactName", { required: true })}
//                   />
//                   {errors.contactName && (
//                     <span className="-mt-1 text-[12px] text-yellow-100">
//                       Please enter the contact person name.
//                     </span>
//                   )}
//                 </div>

//                 <div className="flex flex-col gap-2 lg:w-[48%]">
//                   <label htmlFor="contactPosition" className="lable-style">
//                     Contact Person Position
//                   </label>
//                   <input
//                     type="text"
//                     name="contactPosition"
//                     id="contactPosition"
//                     placeholder="Enter contact person position"
//                     className="form-style"
//                     {...register("contactPosition", { required: true })}
//                   />
//                   {errors.contactPosition && (
//                     <span className="-mt-1 text-[12px] text-yellow-100">
//                       Please enter the contact person position.
//                     </span>
//                   )}
//                 </div>
//               </div>

//               <div className="flex flex-col gap-5 lg:flex-row">
//                 <div className="flex flex-col gap-2 lg:w-[48%]">
//                   <label htmlFor="contactEmail" className="lable-style">
//                     Contact Person Email
//                   </label>
//                   <input
//                     type="email"
//                     name="contactEmail"
//                     id="contactEmail"
//                     placeholder="Enter contact person email"
//                     className="form-style"
//                     {...register("contactEmail", { required: true })}
//                   />
//                   {errors.contactEmail && (
//                     <span className="-mt-1 text-[12px] text-yellow-100">
//                       Please enter the contact person email.
//                     </span>
//                   )}
//                 </div>

//                 <div className="flex flex-col gap-2 lg:w-[48%]">
//                   <label htmlFor="contactNumber" className="lable-style">
//                     Contact Person Number
//                   </label>
//                   <input
//                     type="tel"
//                     name="contactNumber"
//                     id="contactNumber"
//                     placeholder="Enter contact person number"
//                     className="form-style"
//                     {...register("contactNumber", { required: true })}
//                   />
//                   {errors.contactNumber && (
//                     <span className="-mt-1 text-[12px] text-yellow-100">
//                       Please enter the contact person number.
//                     </span>
//                   )}
//                 </div>
//               </div>
//             </>
//           )
//           } */}
          
//           </div>


// {/* Personal Information */}
//         {/*  */}
//             <div className="flex justify-end gap-2">
//                 <button
//                     onClick={() => {
//                     navigate("/dashboard/my-profile")
//                     }}
//                     className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
//                 >
//                     Cancel
//                 </button>
//                 <IconBtn type="submit" text="Save" />
//             </div>
//       </form>
//     </>
//   )
// }



import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react";
import { updateCompanyProfile } from "../../../../services/operations/SettingsAPI"
import IconBtn from "../../../common/IconBtn"
import { getActiveSectors } from '../../../../services/operations/sectorAPI';


export default function EditCompanyProfile() {
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [sectors, setSectors] = useState([]);
  const [loading, setLoading] = useState(false)

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

  const submitProfileForm = async (data) => {
    console.log("Form Data - ", data)
    try {
      dispatch(updateCompanyProfile(token, data, navigate))
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
            Edit Company Profile Information
          </h2>

          <div className="flex flex-col gap-5 lg:flex-row">

            <div className="flex flex-col gap-2 lg:w-[33%]">
              <label htmlFor="companyTitle" className="lable-style">
                Company Title
              </label>
              <input
                type="text"
                name="companyTitle"
                id="companyTitle"
                placeholder="Enter company title"
                className="form-style"
                {...register("companyTitle", { required: true })}
                defaultValue={user?.companyDetails?.companyTitle}
              />
              {errors.companyTitle && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your company title.
                </span>
              )}
            </div>

            <div className="flex flex-col space-y-2 lg:w-[48%] ">
              <label
                className="lable-style"
                htmlFor="sector"
              >
                Sector <sup className="text-pink-200">*</sup>
              </label>
              <select
                {...register("sector", { required: true })}
                // defaultValue={user?companyProfileDetails?.sector}
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
            
            <div className="flex flex-col gap-2 lg:w-[33%]">
              <label htmlFor="taxAdministration" className="lable-style">
                Tax Administration
              </label>
              <input
                type="text"
                name="taxAdministration"
                id="taxAdministration"
                placeholder="Enter tax administration"
                className="form-style"
                {...register("taxAdministration", { required: true })}
                defaultValue={user?.companyDetails?.taxAdministration}
              />
              {errors.taxAdministration && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your tax administration.
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="taxNumber" className="lable-style">
                Tax Number
              </label>
              <input
                type="text"
                name="taxNumber"
                id="taxNumber"
                placeholder="Enter tax number "
                className="form-style"
                {...register("taxNumber", { required: true })}
                defaultValue={user?.companyDetails?.taxNumber}
              />
              {errors.taxNumber && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your Post.
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="companyAddress" className="lable-style">
                Company Address
              </label>
              <input
                type="text"
                name="companyAddress"
                id="companyAddress"
                placeholder="Enter company address"
                className="form-style"
                {...register("companyAddress", { required: true })}
                defaultValue={user?.companyDetails?.companyAddress}
              />
              {errors.companyAddress && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your company address.
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

            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="name" className="lable-style">
                  Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Enter name"
                className="form-style"
                {...register("name", { required: true })}
                defaultValue={user?.companyDetails?.name}
              />
              {errors.name && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your name.
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-5 lg:flex-row">

            <div className="flex flex-col gap-2 lg:w-[33%]">
              <label htmlFor="email" className="lable-style">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter email"
                className="form-style"
                {...register("email", { required: true })}
                defaultValue={user?.email}
              />
              {errors.email && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your email.
                </span>
              )}
            </div>

{/* name="", email, position="", contactNumber, dateOfBirth="", */}
            <div className="flex flex-col gap-2 lg:w-[33%]">
              <label htmlFor="position" className="lable-style">
                Position
              </label>
              <input
                type="text"
                name="position"
                id="position"
                placeholder="Enter position"
                className="form-style"
                {...register("position", { required: true })}
                defaultValue={user?.companyDetails?.position}
              />
              {errors.position && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your position.
                </span>
              )}
            </div>
            
            <div className="flex flex-col gap-2 lg:w-[33%]">
              <label htmlFor="dateOfBirth" className="lable-style">
                Date Of Birth
              </label>
              <input
                type="date"
                name="dateOfBirth"
                id="dateOfBirth"
                placeholder="Enter date of birth"
                className="form-style"
                {...register("dateOfBirth", { required: true })}
                defaultValue={user?.companyDetails?.dateOfBirth}
              />
              {errors.dateOfBirth && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your date of birth.
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