import React from "react";
// import { useState } from "react";
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


const MyProfile = () => {
  // const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const { user } = useSelector((state) => state.profile)
  const navigate = useNavigate()
  console.log("user",user);
  console.log("value of post: ", user?.adminDetails?.post)
  // const OpenSidebar = () => {
  //   setOpenSidebarToggle(!openSidebarToggle);
  // };
  
  return (
    <>
      {/* <div className="grid-container"> */}
        {/* <Header OpenSidebar={OpenSidebar} />
        <Sidebar
          openSidebarToggle={openSidebarToggle}
          OpenSidebar={OpenSidebar} /> */}
        {/* <div className="section-myProfile"> */}
          {/* <div className="main-myProfile"> */}
             {/* <ImageUpload/> */}
             {/* <button className="btn btn-success m-3">Upgrade Plan</button> */}
            {/* <div className=" main" > <ProfileSettingsForm/></div> */}
            {/* <div className=" main" ><SocialForm/></div>  */}
            {/* <div><FooterDash/></div> */}
          {/* </div> */}
          
        {/* </div>  */}
 
      {/* </div> */}
     

      <h1 className="mb-14 text-3xl font-medium text-black lg:mt-14 text-center">
        My Profile
      </h1>
      <div className="flex items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-200 p-8 px-12">
        <div className="flex items-center gap-x-4">
          <img
            src={user?.image}
            alt={`profile-${user?.firstName}`}
            className="aspect-square w-[78px] rounded-full object-cover"
          />
          <div className="space-y-1">
            <p className="text-lg font-semibold text-richblack-5">
              {user?.adminDetails?.firstName + " " + user?.adminDetails?.lastName}
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

      <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-200 p-8 px-12">

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

        <div className="flex justify-between">
            <div className="flex flex-col gap-y-5">

              <div>
                <p className="mb-2 text-sm text-richblack-700 font-semibold">First Name</p>
                <p className="text-sm  text-richblack-5 font-semibold">
                  {user?.adminDetails?.firstName  ?? "Add First Name"}
                </p>
              </div>

              

              <div>
                <p className="mb-2 text-sm text-richblack-700 font-semibold">Bio</p>
                <p className="text-sm  text-richblack-5 font-semibold">
                  {user?.adminDetails?.bio ?? "Add Bio "}
                </p>
              </div>
            </div>


            <div className="flex flex-col gap-y-5">
              <div>
                <p className="mb-2 text-sm text-richblack-700 font-semibold">Middle Name</p>
                <p className="text-sm text-richblack-5 font-semibold">
                  {user?.adminDetails?.middleName ?? "Add Middle Name"}
                </p>
              </div>

              <div>
                <p className="mb-2 text-sm text-richblack-700 font-semibold">Post</p>
                <p className="text-sm text-richblack-5 font-semibold">
                  {user?.adminDetails?.post  ?? "Add Post"}
                </p>
              </div>

            </div>
        

            <div className="flex flex-col gap-y-5">
              <div>
                <p className="mb-2 text-sm text-richblack-700 font-semibold">Last Name</p>
                <p className="text-sm text-richblack-5 font-semibold">
                  {user?.adminDetails?.lastName ?? "Add Last Name"}
                </p>
              </div>

              <div>
                <p className="mb-2 text-sm text-richblack-700 font-semibold">Contact Number</p>
                <p className="text-sm text-richblack-5 font-semibold">
                  {user?.contactNumber ?? "Add Contact Number"}
                </p>
              </div>



            </div>
        
        </div>

      </div>




    </>
  );
};

export default MyProfile;
