import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { State, City }  from 'country-state-city';

import { updateCandidateProfile } from "../../../../services/operations/SettingsAPI"
import IconBtn from "../../../common/IconBtn"
const options = [
 "React.js",
  "Node.js", "MongoDB","Express.js", "C++"
];

// const skillsList = ['Skill 1', 'Skill 2', 'Skill 3', 'Skill 4']; 
export default function EditCandidateProfile() {
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedStateIsoCode , setSelectedStateIsoCode] = useState('');

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
    setSelectedCity('');
    const selectedStateObject = states.find((state) => state.name === e.target.value);
    // console.log("selectedStateObject :",selectedStateObject)
    const isoCode = selectedStateObject?.isoCode
    // console.log("IsoCode :", selectedStateObject?.isoCode)
    setSelectedStateIsoCode(isoCode)
    // console.log(" selectedStateIsoCode :",selectedStateIsoCode)

    if (selectedStateObject) {
      const stateCities = City.getCitiesOfState('TR',isoCode);
      setCities(stateCities);
    } else {
      setCities([]);
    }
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  useEffect(() => {
    // const turkey = Country.getCountryByShortName('TR');
    const turkeyStates = State.getStatesOfCountry('TR');
    setStates(turkeyStates);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()


  const submitProfileForm = async (data) => {
    // console.log("Form Data - ", data)
    try {
      dispatch(updateCandidateProfile(token, data, navigate))
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
            Edit Candidate Profile Information
          </h2>

          <div className="flex flex-col gap-5 lg:flex-row">
          {/* name, email, contactNumber, dateOfBirth="", 
            about="", skills="", preferedJobLocation, 
            degree, province, district */}
            <div className="flex flex-col gap-2 lg:w-[33%]">
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
                defaultValue={user?.candidateDetails?.name}
              />
 
      
              {errors.name && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your name.
                </span>
              )}
            </div>

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
                defaultValue={user?.candidateDetails?.email}
              />
              {errors.email && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your email.
                </span>
              )}
            </div>
            
            <div className="flex flex-col gap-2 lg:w-[33%]">
              <label htmlFor="about" className="lable-style">
                About
              </label>
              <input
                type="text"
                name="about"
                id="about"
                placeholder="Enter something about you"
                className="rounded-lg border-black bg-orange-300 p-3 text-[16px] leading-[24px] text-black shadow-[0_1px_0_0] shadow-white/50 placeholder:text-white focus:outline-none;
"
                {...register("about")}
                defaultValue={user?.candidateDetails?.about}
              />
              {errors.about && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter something about yourself.
                </span>
              )}
            </div>
             
          </div>

          

          <div className="flex flex-col gap-5 lg:flex-row">
          {/* Province */}
            <div className="flex flex-col gap-2 ">
              <label htmlFor="province" className="lable-style">
              Province
              </label>
    
            <select 
        
                name="province"
                id="province"
                placeholder="Choose province "
                className="form-style"
                {...register("province", { required: true })}
                defaultValue={user?.candidateDetails?.province}
                value={selectedState} onChange={handleStateChange}>

          <option value="" disabled>
              Choose a province
            </option>
          {states.map((state) => (
            <option key={state.id} value={state.name}>
              {state.name}
            </option>
          ))}
            </select>

        {errors.province && (
                <span className="-mt-1 text-[12px] text-red-200">
                  Please select your residential province.
                </span>
        )}

            </div>

            {/* District */}
            <div className="flex flex-col gap-2">
              <label htmlFor="district" className="lable-style">District</label>
              <select
                name="district"
                id="district"
                className="form-style"
                defaultValue={user?.candidateDetails?.district}                
                  {...register("district", { required: true })}
                  value={selectedCity} onChange={handleCityChange}>
                <option value="">Select District</option>
                {cities.map((city) => (
                  <option key={city.id} value={city.name}>
                    {city.name}
                  </option>
                ))}
              </select>
              {errors.district && (
                  <span className="-mt-1 text-[12px] text-red-200">
                    Please select your residential district.
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
              <label htmlFor="degree" className="lable-style">
                  Qualifications
              </label>
              <input
                type="text"
                name="degree"
                id="degree"
                placeholder="Enter qualifications"
                className="form-style"
                {...register("degree", { required: true })}
                defaultValue={user?.candidateDetails?.degree}
              />
              {errors.name && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your qualifications.
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-5 lg:flex-row">

          <div className="flex flex-col gap-2 lg:w-[33%]">
              <label htmlFor="preferedJobLocation" className="lable-style">
                Prefered Job Location
              </label>
              <input
                type="text"
                name="preferedJobLocation"
                id="preferedJobLocation"
                placeholder="Enter prefered job location"
                className="form-style"
                {...register("preferedJobLocation", { required: true })}
                defaultValue={user?.candidateDetails?.preferedJobLocation}
              />
              {errors.industryName && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your prefered job location.
                </span>
              )}
            </div>
            

{/* name="", email, position="", contactNumber, dateOfBirth="", */}
            {/* <div className="flex flex-col gap-2 lg:w-[33%]">
              <label htmlFor="skills" className="lable-style">
                Skills
              </label>
              
      <pre>{JSON.stringify(selected)}</pre>
      <MultiSelect
        options={options}
        value={selected}
        id="skills"
        className="text-richblack-500 text-bold"
        onChange={setSelected}
        labelledBy="Select"
      />
      
              {errors.skills && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your skills.
                </span>
              )}
            </div> */}
            
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
                defaultValue={user?.candidateDetails?.dateOfBirth}
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
