import { useState, useEffect } from "react";
import React, {useRef} from "react";

import IconBtn from "../../../common/IconBtn";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addJobPost } from "../../../../services/operations/jobPostAPI";
import { useForm, useWatch } from "react-hook-form";
import { getActiveServices } from "../../../../services/operations/serviceDetailsAPI";
import { Country, State, City }  from 'country-state-city';
import {  fetchCompanyById } from "../../../../services/operations/profileAPI";

const licenseCategories = [
  { id: 'M', value: 'M', label: 'M' },
  { id: 'A1', value: 'A1', label: 'A1' },
  { id: 'A2', value: 'A2', label: 'A2' },
  { id: 'A', value: 'A', label: 'A' },
  { id: 'B1', value: 'B1', label: 'B1' },
  { id: 'B', value: 'B', label: 'B' },
  { id: 'C1', value: 'C1', label: 'C1' },
  { id: 'C', value: 'C', label: 'C' },
  { id: 'D1', value: 'D1', label: 'D1' },
  { id: 'D', value: 'D', label: 'D' },
  { id: 'BE', value: 'BE', label: 'BE' },
  { id: 'C1E', value: 'C1E', label: 'C1E' },
  { id: 'CE', value: 'CE', label: 'CE' },
  { id: 'D1E', value: 'D1E', label: 'D1E' },
  { id: 'DE', value: 'DE', label: 'DE' },
  { id: 'F', value: 'F', label: 'F' },
  { id: 'G', value: 'G', label: 'G' },
];
const PostJob = () => {
  
  // console.log(Country.getAllCountries())
  // console.log("state: ",JSON.stringify(State.getAllStates()))
  // console.log("city: ", City.getCitiesOfCountry("TR"))

  const { user } = useSelector((state) => state.profile);
  console.log("user in post job : ",user)
  const companyId = user._id;
  // const { token } = useSelector((state) => state.auth)
  const token = user.token;
  console.log("token : ", token);
  //token ki dikkat h kl check krungaa
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false)
  const [services, setServices] = useState([]);
  const [contactPersons, setContactPersons] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    // Get the list of employees marked as contact persons
    const employees = user?.companyDetails?.employees || [];
    const contactPerson = employees.filter((employee) => employee.contactPerson);
    
    // If form-filling person is marked as contact person, use their data
    if (user?.companyDetails?.name && user?.companyDetails?.contactPerson) {
      setSelectedContact({
        name: user?.companyDetails?.name,
        position: user?.companyDetails?.position,
        contactNumber: user?.companyDetails?.contactNumber,
      });
    } else if (contactPerson.length > 0) {
      setContactPersons(contactPerson);
    }
  }, [user]);

  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue, 
    watch,
    control

  } = useForm();

  const watchedValues = watch();

  const selectedLicenses = useWatch({control, name:'selectedLicenses', defaultValue:[]});
  
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
  
    const handleLicenseCheckboxChange = (e) => {  
      const { id, checked } = e.target;
  
      let newSelectedLicenses = [...selectedLicenses];
  
      const updateSelection = (add, remove = []) => {
        add.forEach((item) => {
          if (!newSelectedLicenses.includes(item)) newSelectedLicenses.push(item);
        });
        remove.forEach((item) => {
          newSelectedLicenses = newSelectedLicenses.filter((license) => license !== item);
        });
      };
  
      switch (id) {
        // case 'DE':
        //   updateSelection(
        //     checked ? licenseCategories.filter((category) => category.id !== 'A').map((category) => category.id) : [],
        //     checked ? [] : ['M', 'B1', 'B', 'C1', 'D', 'D1', 'D1E', 'C1E', 'CE', 'DE', 'F', 'G']
        //   );
        //   break;
        case 'A':
          updateSelection(
            checked ? ['A', 'A1','A2'] : [],
            checked ? [] : ['A','A1','A2']
          );
          break;
        case 'C':
          updateSelection(
            checked ? ['M', 'B', 'B1', 'C1', 'F','C','A1'] : [],
            checked ? [] : ['M', 'B', 'B1', 'C1', 'F','C','A1']
          );
          break;
        case 'B':
          updateSelection(
            checked ? ['M', 'B1', 'F','B','A1'] : [],
            checked ? [] : ['M', 'B1', 'F','B','A1']
          );
          break;
        case 'D1':
          updateSelection(
            checked ? ['M', 'B', 'B1', 'F','D1','A1'] : [],
            checked ? [] : ['M', 'B', 'B1', 'F','D1','A1']
          );
          break;
        case 'D':
          updateSelection(
            checked ? ['M', 'B', 'B1', 'D1', 'F','D','A1'] : [],
            checked ? [] : ['M', 'B', 'B1', 'D1', 'F','D','A1']
          );
          break;
        case 'D1E':
          updateSelection(
            checked ? ['M', 'B', 'B1', 'D1', 'F','D1E','A1'] : [],
            checked ? [] : ['M', 'B', 'B1', 'D1', 'F','D1E','A1']
          );
          break;
        case 'CE':
          updateSelection(
            checked ? ['M', 'B', 'B1', 'C', 'C1', 'F','CE','A1'] : [],
            checked ? [] : ['M', 'B', 'B1', 'C', 'C1', 'F','CE','A1']
          );
          break;
        default:
          if (checked) {
            newSelectedLicenses.push(id);
          } else {
            newSelectedLicenses = newSelectedLicenses.filter((license) => license !== id);
          }
          break;
      }
  
      // setSelectedLicenses(newSelectedLicenses);
      setValue('selectedLicenses', newSelectedLicenses);
    };
  
    const toggleDropdown = () => {
      setDropdownOpen(!dropdownOpen);
    };
  
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
  
    useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);
  

  

  const handleSrc1Change = (e) => {
    const checked = e.target.checked;
    setValue('isSrc1', checked);
    if (checked) {
      setValue('isSrc2', true);
      // setValue('isSrc3', false);
      // setValue('isSrc4', false);
    }
  };

  const handleSrc2Change = (e) => {
    const checked = e.target.checked;
    setValue('isSrc2', checked);
    if (checked) {
      // setValue('isSrc1', false);
      // setValue('isSrc3', false);
      // setValue('isSrc4', false);
    }
  };

  const handleSrc3Change = (e) => {
    const checked = e.target.checked;
    setValue('isSrc3', checked);
    if (checked) {
      setValue('isSrc4', true);
      // setValue('isSrc1', false);
      // setValue('isSrc2', false);
    }
  };

  const handleSrc4Change = (e) => {
    const checked = e.target.checked;
    setValue('isSrc4', checked);
    if (checked) {
      // setValue('isSrc3', false);
      // setValue('isSrc1', false);
      // setValue('isSrc2', false);
    }
  };

  useEffect(() => {
    const getServices = async () => {
      setLoading(true);
      const services = await getActiveServices();
      if (services.length > 0) {
        // console.log("categories", categories)
        setServices(services);
      }
      setLoading(false);
    };
    // if form is in edit mode
    // if (editCourse) {
    //   // console.log("data populated", editCourse)
    //   setValue("courseTitle", course.courseName)
    //   setValue("courseShortDesc", course.courseDescription)
    //   setValue("coursePrice", course.price)
    //   setValue("courseTags", course.tag)
    //   setValue("courseBenefits", course.whatYouWillLearn)
    //   setValue("courseCategory", course.category)
    //   setValue("courseRequirements", course.instructions)
    //   setValue("courseImage", course.thumbnail)
    // }
    getServices();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  
  

  const submitJobPostForm = async (data) => {
    console.log("Form Data - ", data);
    // console.log("token - ", token)

    try {
      dispatch(
        addJobPost({...data, licenseType: data.selectedLicenses.join(',')}, token,navigate)
      );
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message);
      
    }
  };
  return (
    <form onSubmit={handleSubmit(submitJobPostForm)}>
      {/* jJob Information */}
      <h1 className="mb-14 mt-14 text-3xl text-center font-medium text-black">
        Create Job Post
      </h1>
      <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-900 bg-richblack-200 p-8 px-12">
        <h2 className="text-lg font-semibold text-richblack-5">
          Basic Details
        </h2>

        {/* ROW 1 */}
        <div className="flex flex-col gap-5 lg:flex-row">
        {/* JOb Title   */}
          <div className="flex flex-col gap-2 lg:w-[25%]">
            <label htmlFor="title" className="lable-style">
              Job Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Enter job title"
              className="form-style"
              {...register("title", { required: true })}
              // defaultValue={user?.adminProfileDetails?.firstName}
            />
            {errors.title && (
              <span className="-mt-1 text-[12px] text-yellow-100">
                Please enter your job title .
              </span>
            )}
          </div>
        {/* Service */}
          <div className="flex flex-col space-y-2 lg:w-[25%] ">
            <label
              className="lable-style"
              htmlFor="service"
            >
              Service <sup className="text-pink-200">*</sup>
            </label>
            <select
              {...register("service", { required: true })}
              defaultValue=""
              id="service"
              className="form-style w-full"
            >
              <option value="" disabled>
                Choose a Service
              </option>
              {!loading &&
                services?.map((service, indx) => (
                  <option key={indx} value={service?._id}>
                    {service?.serviceName}
                  </option>
                ))}
            </select>
            {errors.service && (
              <span className="ml-2 text-xs tracking-wide text-pink-200">
                Service is required
              </span>
            )}
          </div>
        {/* Company Name */}
          <div className="flex flex-col gap-2 lg:w-[25%]">
            <label htmlFor="companyName" className="lable-style">
              Company Name
            </label>
            <input
              type="text"
              name="companyName"
              id="companyName"
              placeholder="Enter company name"
              className="form-style"
              defaultValue={user?.companyDetails?.companyTitle}
              {...register("companyName", { required: true })}
            />
            {errors.companyName && (
              <span className="-mt-1 text-[12px] text-yellow-100">
                Please enter your company name.
              </span>
            )}
          </div>


          <div className="flex flex-col gap-2 lg:w-[25%]">
          <label className="block text-md font-medium text-gray-700">Contact Person:</label>
      {selectedContact ? (
        <div>
          <p>{selectedContact.name} - {selectedContact.position}</p>
          <p>Contact Number: {selectedContact.contactNumber}</p>
        </div>
      ) : (
        <select
          className="form-select mt-1 block w-full"
          onChange={(e) => setSelectedContact(contactPersons[e.target.value])}
        >
          <option value="">Select Contact Person</option>
          {contactPersons.map((person, index) => (
            <option key={index} value={index}>
              {person.name} - {person.position}
            </option>
          ))}
        </select>
      )}
          </div>
        </div>

        {/* ROW 2 */}
        <div className="flex flex-col gap-5 lg:flex-row">
          {/* Required Experience */}
          <div className="flex flex-col gap-2 lg:w-[25%]">
            <label htmlFor="requiredExperience" className="lable-style">
            Required Experience
            </label>
            <input
              type="number"
              name="requiredExperience"
              id="requiredExperience"
              min="0" max="20"
              placeholder="Enter required experience "
              className="form-style"
              {...register("requiredExperience", { required: true })}
              // defaultValue={user?.adminDetails?.post}
            />
            {errors.requiredExperience && (
              <span className="-mt-1 text-[12px] text-yellow-100">
                Please select your required experience.
              </span>
            )}
          </div>
          {/* Salary Range */}
          <div className="flex flex-col gap-2 lg:w-[25%]">
            <label htmlFor="salaryRange" className="lable-style">
            Salary Range
            </label>
            <div className="flex gap-3 relative">

            <input
              type="text"
              name="salaryRange"
              id="salaryRange"
              placeholder="Enter salary range "
              className="form-style ml-1"
              {...register("salaryRange", { required: true })}
              // defaultValue={user?.adminDetails?.post}

            />
            <span className="flex flex-start absolute lable-style my-auto ml-2 mt-3 ">$</span>
            </div>
            {errors.salaryRange && (
              <span className="-mt-1 text-[12px] text-yellow-100">
                Please select your salary range.
              </span>
            )}
          </div>
          {/* Job Type */}
          <div className="flex flex-col gap-2 lg:w-[25%]">
            <label htmlFor="jobType" className="lable-style">
            Job Type
            </label>
            <select
              type="text"
              name="jobType"
              id="jobType"
              placeholder="Choose job type "
              className="form-style"
              {...register("jobType", { required: true })}
              // defaultValue={user?.adminDetails?.post}

            >
              <option value="" disabled >Choose Job Type</option>
              <option value="Full Time" >Full Time</option>
              <option value="Part Time" >Part Time</option>
              <option value="Temporary Job" >Temporary Job</option>

            </select>
            {errors.jobType && (
              <span className="-mt-1 text-[12px] text-yellow-100">
                Please select your job type.
              </span>
            )}
          </div>
          {/* Salary Type */}
          <div className="flex flex-col gap-2 lg:w-[25%]">
            <label htmlFor="salaryType" className="lable-style">
            Salary Type
            </label>
            <select
              type="text"
              name="salaryType"
              id="salaryType"
              placeholder="Choose salary type "
              className="form-style"
              {...register("salaryType", { required: true })}
              // defaultValue={user?.adminDetails?.post}

            >
              <option value="" disabled >Choose Salary Type</option>
              <option value="Monthly" default >Monthly</option>
              <option value="Daily" >Daily</option>
              <option value="Weekly" >Weekly</option>
              <option value="Yearly" >Yearly</option>

            </select>
            {errors.salaryType && (
              <span className="-mt-1 text-[12px] text-yellow-100">
                Please select your salary type.
              </span>
            )}
          </div>


        </div>

        {/* ROW 3 */}
        <div className="flex flex-col gap-5 lg:flex-row">

          {/*  Location */}
          <div className="flex flex-col gap-2 lg:w-[25%]">
            <label htmlFor="location" className="lable-style">
            Choose Location
            </label>
            <select
              type="text"
              name="location"
              id="location"
              placeholder="Choose location "
              className="form-style"
              {...register("location", { required: true })}
              // defaultValue={user?.adminDetails?.post}

            >
              <option value="" disabled>
            Choose a Location
          </option>
          {!loading &&
            State.getStatesOfCountry("TR")?.map((state, indx) => (
              <option key={indx} value={state?.name}>
                {state?.name}
              </option>
            ))}
            </select>
            {errors.location && (
              <span className="-mt-1 text-[12px] text-yellow-100">
                Please select your required location.
              </span>
            )}
          </div>

          {/* Start Date */}
          <div className="flex flex-col gap-2 lg:w-[25%]">
            <label htmlFor="startDate" className="lable-style">
              Select Start Date
            </label>
            <input
              type="date"
              name="startDate"
              id="startDate"
              placeholder="Select start date"
              className="form-style"
              {...register("startDate", { required: true })}
              // defaultValue={user?.adminDetails?.post}

            />            
            {errors.startDate && (
              <span className="-mt-1 text-[12px] text-yellow-100">
                Please select your start date.
              </span>
            )}
          </div>
          {/* End Date */}
          <div className="flex flex-col gap-2 lg:w-[25%]">
            <label htmlFor="endDate" className="lable-style">
              Select End Date
            </label>
            <input
              type="date"
              name="endDate"
              id="endDate"
              placeholder="Select end date"
              className="form-style"
              {...register("endDate", { required: true })}
              // defaultValue={user?.adminDetails?.post}

            />            
            {errors.endDate && (
              <span className="-mt-1 text-[12px] text-yellow-100">
                Please select your end date.
              </span>
            )}
          </div>
          
          {/* No. Of Vacancies */}
          <div className="flex flex-col gap-2 lg:w-[25%]">
            <label htmlFor="vacancy" className="lable-style">
              No. Of Vacancies
            </label>
            <input
              type="number"
              name="vacancy"
              id="vacancy"
              placeholder="Choose vacancy"
              className="form-style"
              {...register("vacancy", { required: true })}
              // defaultValue={user?.adminDetails?.post}
            />
            {errors.vacancy && (
              <span className="-mt-1 text-[12px] text-yellow-100">
                Please select your no. of vacancy.
              </span>
            )}
          </div>
        </div>

        {/* ROW 4 */}
        <div className="flex flex-col gap-5 lg:flex-row">
        {/* Description */}
        <div className="flex flex-col space-y-2 w-full">
        <label className="text-sm text-richblack-5" htmlFor="description">
          Job Short Description <sup className="text-pink-200">*</sup>
        </label>
        <textarea
          id="description"
          placeholder="Enter Description"
          {...register("description", { required: true })}
          className="form-style resize-x-none min-h-[130px] w-full"
        />
        {errors.description && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Job Description is required
          </span>
        )}
      </div>


        </div>

      </div>

      <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-900 bg-richblack-200 p-8 px-12">
        <h2 className="text-lg font-semibold text-richblack-5">
            Main Certificates
        </h2>

        {/* ROW 1 */}
        <div className="flex flex-col gap-5 lg:flex-row">
            {/* License Type */}
            <div className="relative " ref={dropdownRef}>
            <button type="button" className="form-style" onClick={toggleDropdown}>
              Choose License Type
            </button>
            {dropdownOpen && (
              <div className="absolute mt-1 lg:w-full sm:w-[100%] bg-white border border-gray-300 rounded-md shadow-lg z-10">
                <div className="flex flex-col p-2 max-h-60 overflow-auto">
                  {licenseCategories.map((category) => (
                    <div key={category.id} className="flex items-center justify-center gap-8 border-b border-b-orange-600 ">
                      <input
                        type="checkbox"
                        id={category.id}
                        value={category.value}
                        checked={selectedLicenses.includes(category.id)}
                        onChange={handleLicenseCheckboxChange}
                        className=""
                        // name="licenseType"
                        // {...register({selectedLicenses}, { required: true })}
                        // checked={watchedValues.licenseType}
                        // {...register('selectedLicenses')}       

                      />
                      <label htmlFor={category.id} className="w-full">
                        {category.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}
            </div>

            <div className="flex flex-col space-y-2 lg:w-[33%] lg:ml-32 text-white">
              <label
                className="lable-style"
              >
                SRCBox <sup className="text-pink-200">*</sup>
              </label>

              
              <div className="flex-col gap-4 space-x-8">
                <label htmlFor="isSrc1">
                    SRC 1
                    <input
                        type="checkbox"
                        name="isSrc1"
                        value="isSrc1"
                        onChange={handleSrc1Change}
                        checked={watchedValues.isSrc1 || false}
                    />
                </label>

                <label htmlFor="isSrc2">
                    SRC 2
                    <input
                        type="checkbox"
                        name="isSrc2"
                        value="isSrc2"
                        onChange={handleSrc2Change}
                        checked={watchedValues.isSrc2 || false}
                    />
                </label>
              </div>

              <div className="flex-col gap-4 space-x-8">
                  <label htmlFor="isSrc3">
                      SRC 3
                      <input
                          type="checkbox"
                          name="isSrc3"
                          value="isSrc3"
                          onChange={handleSrc3Change}
                          checked={watchedValues.isSrc3 || false}
                      
                      />
                  </label>
              
              
                  <label htmlFor="isSrc4">
                      SRC 4
                      <input
                          type="checkbox"
                          name="isSrc4"
                          value="isSrc4"
                          onChange={handleSrc4Change}
                          checked={watchedValues.isSrc4 || false}
                      />
                  </label>
              </div>

            </div>

            
            {/* Code 95 Document */}
            <div className="flex flex-col gap-2 lg:w-[33%] text-white  items-center">
                <label>
                    Code 95 Document
                </label>
                    <input
                        type="checkbox"
                        name="isCode95Document"
                        onChange={(e) => setValue('isCode95Document', e.target.checked)}
                        checked={watchedValues.isCode95Document}

                    />
            </div>


            
        </div>
        
        {/* ROW 2 */}
        <div className="flex flex-col gap-5 lg:flex-row">
            {/* ADR Driver Licence validity years */}
            <div className="flex flex-col gap-2 lg:w-[33%]">
              <label htmlFor="adrDriverLicence" className="lable-style">
                ADR Driver Licence
              </label>
              <input
                type="number"
                name="adrDriverLicence"
                id="adrDriverLicence"
                min="0" max="5"
                className="form-style"
              placeholder="Required Validity of ADR Licence "
                {...register("adrDriverLicence", { required: true })}
                // defaultValue={user?.adminDetails?.lastName}
              />
              {errors.adrDriverLicence && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                Please select driver's adr licence validity years .
                </span>
              )}
            </div>  

            {/* Psikoteknik No Of Validity Years*/}
            <div className="flex flex-col gap-2 lg:w-[33%]">
              <label htmlFor="psikoteknik" className="lable-style">
              Psikoteknik
              </label>
              <input
                type="number"
                name="psikoteknik"
                id="psikoteknik"
                min="0" max="5"
                className="form-style"
              placeholder="Required Validity of Psychotecnical "
                {...register("psikoteknik", { required: true })}
                // defaultValue={user?.adminDetails?.lastName}
              />
              {errors.psikoteknik && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please select driver's psikoteknik certificate validity years .
                </span>
              )}
            </div>
              {/* MYK CERTIFICATE VALIDITY YEARS */}
            <div className="flex flex-col gap-2 lg:w-[33%]">
              <label htmlFor="mykCertificate" className="lable-style">
              MYK Certificate
              </label>
              <input
                type="number"
                name="mykCertificate"
                id="mykCertificate"
                min="0" max="5"
                className="form-style"
              placeholder="Required Validity of MYK Certificate "
                {...register("mykCertificate", { required: true })}
                // defaultValue={user?.adminDetails?.lastName}
              />
              {errors.mykCertificate && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                Please select driver's myk certificate validity years .
                </span>
              )}
            </div>
            
        </div>

      </div>

      <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-900 bg-richblack-200 p-8 px-12">
        <h2 className="text-lg font-semibold text-richblack-5">
          Required Abilities
        </h2>
        
        {/* Row 1 */}
        <div className="flex flex-col gap-5 lg:flex-row">
        {/* passport,visa,abroadExperience, */}
            <div className="flex flex-col gap-2 lg:w-[25%]">
                <label htmlFor="passport" className="lable-style">
                  Passport
                </label>
                <select
                  type="text"
                  name="passport"
                  id="passport"
                  placeholder="Choose passport type "
                  className="form-style"
                  {...register("passport", { required: true })}
                  // defaultValue={user?.adminDetails?.post}

                >
                  <option value="" disabled >Choose Passport Type</option>
                  <option value="Type 1" >Type 1</option>
                  <option value="Type 2" >Type 2</option>
                  <option value="Type 3" >Type 3</option>

                </select>
                {errors.passport && (
                  <span className="-mt-1 text-[12px] text-yellow-100">
                    Please select your passport type.
                  </span>
                )}
            </div>

            <div className="flex flex-col gap-2 lg:w-[25%]">
                <label htmlFor="visa" className="lable-style">
                  Visa
                </label>
                <select
                  type="text"
                  name="visa"
                  id="visa"
                  placeholder="Choose visa type "
                  className="form-style"
                  {...register("visa", { required: true })}
                  // defaultValue={user?.adminDetails?.post}

                >
                  <option value="" disabled >Choose Visa Type</option>
                  <option value="Type 1" >Type 1</option>
                  <option value="Type 2" >Type 2</option>
                  <option value="Type 3" >Type 3</option>

                </select>
                {errors.visa && (
                  <span className="-mt-1 text-[12px] text-yellow-100">
                    Please select your visa type.
                  </span>
                )}
            </div>

            <div className="flex flex-col gap-2 lg:w-[25%]">
                <label htmlFor="abroadExperience" className="lable-style">
                  Abroad Experience
                </label>
                <input
                  type="number"
                  name="abroadExperience"
                  id="abroadExperience"
                  placeholder="Select Abroad Experience "
                  className="form-style"
                  {...register("abroadExperience", { required: true })}
                  // defaultValue={user?.adminDetails?.post}

                >
                </input>
                {errors.abroadExperience && (
                  <span className="-mt-1 text-[12px] text-yellow-100">
                    Please select your Abroad Experience.
                  </span>
                )}
            </div>


        </div>

        {/* isBlindSpotTraining,isSafeDrivingTraining,isFuelEconomyTraining */}
        {/* ROW 2 */}
        <div className="flex flex-col gap-5 lg:flex-row text-white">
            <div className="flex flex-col gap-2 lg:w-[25%]  items-center">
                <label>
                    Is Blind Spot Training
                </label>
                    <input
                        type="checkbox"
                        name="isBlindSpotTraining"
                        onChange={(e) => setValue('isBlindSpotTraining', e.target.checked)}
                        checked={watchedValues.isBlindSpotTraining}
                    />
            </div>

            <div className="flex flex-col gap-2 lg:w-[25%] items-center">
                <label>
                    Is Safe Driving Training
                </label>
                    <input
                        type="checkbox"
                        name="isSafeDrivingTraining"
                        onChange={(e) => setValue('isSafeDrivingTraining', e.target.checked)}
                        checked={watchedValues.isSafeDrivingTraining}
                    />
            </div>

            <div className="flex flex-col gap-2 lg:w-[25%] items-center">
                <label>
                    Is Fuel Economy Training
                </label>
                    <input
                        type="checkbox"
                        name="isFuelEconomyTraining"
                        onChange={(e) => setValue('isFuelEconomyTraining', e.target.checked)}
                        checked={watchedValues.isFuelEconomyTraining}
                    />
            </div>
        </div>
        {/* ROW 3 */}
        <div className="flex flex-col gap-5 lg:flex-row text-white">
              
        <div className="flex flex-col gap-2 lg:w-[25%]  items-center">
                <label>
                    Is International Job
                </label>
                    <input
                        type="checkbox"
                        name="isInternationalJob"
                        onChange={(e) => setValue('isInternationalJob', e.target.checked)}
                        checked={watchedValues.isInternationalJob}
                   />
        </div>
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <button
          onClick={() => {
            navigate("/dashboard/my-services");
          }}
          className="cursor-pointer rounded-md bg-richblack-200 py-2 px-5 font-semibold text-richblack-50"
        >
          Cancel
        </button>
        <IconBtn type="submit" text="Save" />
      </div>
    </form>
  );
};

export default PostJob;
