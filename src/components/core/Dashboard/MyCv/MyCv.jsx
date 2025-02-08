import { useDispatch, useSelector } from "react-redux"
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table"
import { VscAdd } from "react-icons/vsc"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"
// import { setService, setEditService } from "../../../../slices/serviceSlice"
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"
import { useState, useEffect } from "react"
import { FaCheck } from "react-icons/fa"
import { FiEdit2 } from "react-icons/fi"
import { HiClock } from "react-icons/hi"
import { RiDeleteBin6Line } from "react-icons/ri"
import { useNavigate } from "react-router-dom"
import  ConfirmationModal  from "../../../common/ConfirmationModal"
import IconBtn from "../../../common/IconBtn"
// import { format } from 'date-fns';
import { addDays, addYears, format, parseISO, isAfter } from "date-fns";
import {

  fetchResumeDetails,
} from "../../../../services/operations/resumeAPI"
import { SERVICE_STATUS } from "../../../../utils/constants"
import moment from 'moment';

export default function MyCv() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { token } = useSelector((state) => state.auth)
  
  const { user } = useSelector((state) => state.profile)
  console.log("user in cv : ",user)
  const resumeId = user.resume
  console.log("user?.resume : ",user?.resume)

  const [loading, setLoading] = useState(false)
  const [confirmationModal, setConfirmationModal] = useState(null)
  const TRUNCATE_LENGTH = 10
  const [resumeDetails, setResumeDetails] = useState(null);




const [resume, setResume] = useState([])

  useEffect(() => {
    const fetchResume = async () => {
      const result = await fetchResumeDetails()
      console.log("result : ",result);
      if (result) {
        // console.log("result?.[0]:",result?.[0])
        // console.log("result?.[0]?.[0]",result?.[0]?.[0])
        // setResume(result?.[0])
          setResume(result)
      }
    }
    fetchResume()
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, [])

console.log(resume.isCode95Document)
console.log("resume.isCode95Document : ",resume.isCode95Document === true ? "Yes" : "No")
  const downloadCv = () => {
    const capture = document.querySelector(".resume")
    setLoading(true)
    html2canvas(capture).then((canvas)=>{
      const imgData = canvas.toDataURL("img/png")

      const doc = new jsPDF('p','mm','a4');
      const componentWidth = doc.internal.pageSize.getWidth()
      const componentHeight = doc.internal.pageSize.getHeight()
      doc.addImage(imgData,'PNG', 0, 0, componentWidth, componentHeight)
      setLoading(false)
      doc.save('candidate-cv.pdf');
    })

  }



  const formatMongoDate = (mongoDate) => {
    // Ensure the date is a valid Date object
    const dateObj = new Date(mongoDate);
  
    if (isNaN(dateObj.getTime())) {
      return 'Invalid Date';
    }
  
    // Get parts of the date
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(dateObj.getDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`; // Format as YYYY-MM-DD
  };

  return (
    <>

<div className="mb-14 sm:-translate-y-10 lg:translate-y-0 lg:mt-12 flex items-center lg:justify-between sm:justify-center">
        <h1 className="text-3xl font-medium text-black">My Resume</h1>
        <IconBtn
          text="Add Resume"
          onclick={() => navigate("/dashboard/create-cv")}
        >
          <VscAdd />
        </IconBtn>
      </div>
      <Table className="w-full sm:w-[full]">
        {/* <Thead>
          <Tr className="flex rounded-t-md border-b border-b-richblack-800 px-6 py-2">
            <Th className="text-left text-sm font-medium bg-transparent uppercase text-black">
             Resume
            </Th>
            
          </Tr>
        </Thead> */}
        <Tbody>
          {resume === null ? (
            <Tr>
              <Td className="py-10 text-center text-2xl font-medium text-richblack-100">
                Create Resume 
                {/* TODO: Need to change this state */}
              </Td>
            </Tr>
          ) : (
          
                <div className="w-[70%] resume mx-auto p-2 lg:flex lg:flex-col sm:flex-row sm:justify-start sm:items-start gap-3 lg:justify-start lg:items-start  lg:p-3  text-black">
                    
                       {/* 
                       tcNumber, firstName="",lastName="", age,gsm,city,state,
            licenseType="",isSrc1,isSrc2,isSrc3,isSrc4,psikoteknik,adrDriverLicense,
            passport,dateOfReceipt,duration,visa,abroadExperience,
            isBlindSpotTraining,isSafeDrivingTraining,isFuelEconomyTraining,isCode95Document,
            europeanExperiencePeriod,
            russiaExperiencePeriod,
            turkicRepublicsExperiencePeriod,
            southExperienceTime
             */}
                          <p className="text-[8px] lg:text-[16px] font-semibold ">Personal Information</p> 
                        <div className="w-[100%] sm:flex">

                          
                          <div className="sm:w-[100%] flex lg:gap-48 sm:gap-8">

                            <div className="flex flex-col ">
                              <p className="text-[8px] lg:text-[16px]">Name: {resume.firstName} {resume.lastName}</p>
                              <p className="text-[8px] lg:text-[16px]">TC Number: {resume.tcNumber}</p>
                              <p className="text-[8px] lg:text-[16px]">Date Of Birth: {resume.age}</p>
                              <p className="text-[8px] lg:text-[16px]">Passport: {resume.passport}</p>
                              <p className="text-[8px] lg:text-[16px]">Visa: {resume.visa}</p>
                            </div>

                            <div className="flex flex-col">
                              <p className="text-[8px] lg:text-[16px]">GSM: {resume.gsm}</p>
                              <p className="text-[8px] lg:text-[16px]">City: {resume.city}</p>
                              <p className="text-[8px] lg:text-[16px]">State: {resume.state}</p>
                              <p className="text-[8px] lg:text-[16px]">email: {resume.email}</p>
                              <p className="text-[8px] lg:text-[16px]">licenseType: {resume.licenseType}</p>
                            </div>

                          </div>

                        </div>

                          <p className="text-[8px] lg:text-[16px] font-semibold">Main Certifications</p>
                          

                        <div className="flex lg:gap-80 sm:gap-24">

                          <div className="flex flex-col">
                            <p className="text-[8px] lg:text-[16px]">Src1: {resume.isSrc1 === true ? "Yes" : "No"}</p>
                            <p className="text-[8px] lg:text-[16px]" >Src2: {resume.isSrc2 === true ? "Yes" : "No"}</p> 
                            <p className="text-[8px] lg:text-[16px]">Src3: {resume.isSrc3 === true ? "Yes" : "No"}</p>
                            <p className="text-[8px] lg:text-[16px]">Src4: {resume.isSrc4 === true ? "Yes" : "No"}</p>

                          </div>

                          <div className="flex flex-col ">
                            <p className="text-[8px] lg:text-[16px]">ADR Driving License Expiry :{formatMongoDate(resume.adrExpiryDate)}</p>
                            <p className="text-[8px] lg:text-[16px]">Psychotechnical Expiry: {formatMongoDate(resume.psikoteknikExpiryDate)}</p>
                            <p className="text-[8px] lg:text-[16px]">Code 95 Document: {resume.isCode95Document === true ? "Yes" : "No"}</p>
                            <p className="text-[8px] lg:text-[16px]">MYK Certificate Expiry: {formatMongoDate(resume.mykExpiryDate)}</p>

                          </div>

                          {/* {job.jobDescription.split(" ").length >
                      TRUNCATE_LENGTH
                        ? job.jobDescription
                            .split(" ")
                            .slice(0, TRUNCATE_LENGTH)
                            .join(" ") + "..."
                        : job.jobDescription} */}
                        </div>

                        <p className="text-[8px] lg:text-[16px] font-semibold">Experience Period</p>
                        
                        <div className="flex lg:gap-40 sm:gap-8">


                          <div className="flex flex-col ">
                            <p className="text-[8px] lg:text-[16px]">Abroad Experience: {resume.abroadExperience}</p>
                            <p className="text-[8px] lg:text-[16px]">European Experience Period: {resume.europeanExperiencePeriod}</p>
                            <p className="text-[8px] lg:text-[16px]">Russia Experience Period: {resume.russiaExperiencePeriod}</p>
                          </div>

                          <div className="flex flex-col lg:ml-1">
                            <p className="text-[8px] lg:text-[16px]">Turkic Republics Experience Period: {resume.turkicRepublicsExperiencePeriod}</p>
                            <p className="text-[8px] lg:text-[16px]">South Experience Time: {resume.southExperienceTime}</p>
                          </div>

                        </div>

                        <p className="text-[8px] lg:text-[16px] font-semibold">Advance Training And Certificates</p>
                        

                        <div className="flex sm:gap-10 lg:gap-52">



                          <div className="flex flex-col ">

                            <p className="text-[8px] lg:text-[16px] ">Blind Spot Training: {resume.isBlindSpotTraining  === true ? "Yes" : "No"}</p>
                            <p className="text-[8px] lg:text-[16px]">Safe Driving Training: {resume.isSafeDrivingTraining === true ? "Yes" : "No"}</p>
                          </div>

                          <div className="flex flex-col ">
                            <p className="text-[8px] lg:text-[16px]">Fuel Economy Training: {resume.isFuelEconomyTraining === true ? "Yes" : "No"}</p>

                          </div>
                        </div>
                           
                           {/* TODO: adr and phychotechnical ki valididty show krni h 5 years  */}
                        {/* <p>Duration: {resume.duration}</p> */}
                        
                        
                    
                </div>
            
          )}
        </Tbody>
      </Table>
      {/* <a href="MyCv" download 
        >
        </a> */}
            <button className="bg-orange-500 text-white text-bold p-2 w-26 h-20 rounded-sm mb-3"
              onClick={downloadCv}
              disabled={!(loading === false)}>
                {loading? (<span>Downloading</span>) : (<span>Download</span>)}
            </button>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  )
}
