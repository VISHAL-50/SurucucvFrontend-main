import React from "react";
// import Header from "../MainPage/Header";
// import Sidebar from "../MainPage/SideBar";
import { RiEditBoxLine } from "react-icons/ri"

import { useSelector } from "react-redux"
// import ImageUpload from "./ImageUpload";
// import ProfileSettingsForm from "./ProfileSettings";
// import SocialForm from "./SocialNetwork";
// import FooterDash from "../../Footer/FooterDash";
import { useNavigate } from "react-router-dom"

import IconBtn from "../../../common/IconBtn"
// import { formattedDate } from "../../../../utils/dataFormatter"


const CompanyProfile = () => {
  // const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const { user } = useSelector((state) => state.profile)
  console.log("user from company profile slice", user);
  const navigate = useNavigate()
  console.log("user",user);
  console.log("value of position: ", user?.companyDetails?.position)




  return (
    <>
     
      <h1 className="mb-14 lg:mt-14 text-3xl font-medium text-black text-center">
        My Profile
      </h1>
      
      {/* Image Section */}
      <div className="flex items-center justify-between rounded-md border-[1px] border-richblack-900 bg-richblack-200 p-8 px-12">
        <div className="flex items-center gap-x-4">
          <img
            src={user?.image}
            alt={`profile-${user?.firstName}`}
            className="aspect-square w-[78px] rounded-full object-cover"
          />
          <div className="space-y-1">
            <p className="text-lg font-semibold text-richblack-5">
              {user?.name}
            </p>
            <p className="text-sm text-richblack-5">{user?.email}</p>
          </div>
        </div>
        <IconBtn
          text="Edit"
          onclick={() => {
            navigate("/dashboard/settings")
          }}
        >
          <RiEditBoxLine />
        </IconBtn>
      </div>

      {/* Company Details */}
      <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-900 bg-richblack-200 p-8 px-12">

        <div className="flex w-full items-center justify-between">
            <p className="text-lg font-semibold text-richblack-5">
              Company Details
            </p>
            <IconBtn
              text="Edit"
              onclick={() => {
                navigate("/dashboard/settings")
              }}
            >
              <RiEditBoxLine />
            </IconBtn>
        </div>
        {/* companyTitle="", industryName="", taxAdministration="",taxNumber, companyAddress=""  */}
        <div className="flex justify-between">
            <div className="flex flex-col gap-y-5">

              <div>
                <p className="mb-2 text-md text-richblack-700 font-semibold">Company Title</p>
                <p className="text-sm font-medium text-richblack-5">
                  {user?.companyDetails?.companyTitle  ?? "Add Company Title"}
                </p>
              </div>

              
              <div>
                <p className="mb-2 text-md text-richblack-700 font-semibold">Sector</p>
                <p className="text-sm font-medium text-richblack-5">
                  {user?.companyDetails?.sector  ?? "Add Sector"}
                </p>
              </div>
            </div>


            <div className="flex flex-col gap-y-5">
              <div>
                <p className="mb-2 text-md text-richblack-700 font-semibold">Tax Administration</p>
                <p className="text-sm font-medium text-richblack-5">
                  {user?.companyDetails?.taxAdministration ?? "Add Tax Administration"}
                </p>
              </div>

              <div>
                <p className="mb-2 text-md text-richblack-700 font-semibold">Tax Number</p>
                <p className="text-sm font-medium text-richblack-5">
                  {user?.companyDetails?.taxNumber  ?? "Add Tax Number"}
                </p>
              </div>

            </div>
        

            <div className="flex flex-col gap-y-5">
              <div>
                <p className="mb-2 text-md text-richblack-700 font-semibold">Company Address</p>
                <p className="text-sm font-medium text-richblack-5">
                  {user?.companyDetails?.companyAddress ?? "Add Company Address"}
                </p>
              </div>
            </div>
        
        </div>

      </div>

      {/* Personal Details */}
      <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-900 bg-richblack-200 p-8 px-12">

        <div className="flex w-full items-center justify-between">
            <p className="text-lg font-semibold text-richblack-5">
              Personal Details
            </p>
            <IconBtn
              text="Edit"
              onclick={() => {
                navigate("/dashboard/settings")
              }}
            >
              <RiEditBoxLine />
            </IconBtn>
        </div>

        <div className="flex  justify-between">
            <div className="flex flex-col gap-y-5">

              <div>
                <p className="mb-2 text-md text-richblack-700 font-semibold">Name</p>
                <p className="text-sm font-medium text-richblack-5">
                  {user?.companyDetails?.name  ?? "Add Name"}
                </p>
              </div>

              <div>
                <p className="mb-2 text-md text-richblack-700 font-semibold">Email</p>
                <p className="text-sm font-medium text-richblack-5">
                  {user?.companyDetails?.email ?? "Add Email "}
                </p>
              </div>
            </div>

          {/* name="", email, position="", contactNumber, dateOfBirth="", */}

            <div className="flex flex-col gap-y-5">
              <div>
                <p className="mb-2 text-md text-richblack-700 font-semibold">Position</p>
                <p className="text-sm font-medium text-richblack-5">
                  {user?.companyDetails?.position ?? "Add Position"}
                </p>
              </div>

              <div>
                <p className="mb-2 text-md text-richblack-700 font-semibold">Contact Number</p>
                <p className="text-sm font-medium text-richblack-5">
                  {user?.companyDetails?.contactNumber  ?? "Add Contact Number"}
                </p>
              </div>

            </div>
        

            <div className="flex flex-col gap-y-5">
              <div>
                <p className="mb-2 text-md text-richblack-700 font-semibold">Date Of Birth</p>
                <p className="text-sm font-medium text-richblack-5">
                  {user?.companyDetails?.dateOfBirth ?? "Add Date Of Birth"}
                </p>
              </div>             
            </div>
        
        </div>

      </div>



    </>
  );
};

export default CompanyProfile;
