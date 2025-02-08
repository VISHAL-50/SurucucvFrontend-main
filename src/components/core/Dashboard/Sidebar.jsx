// import { useState } from "react"
// import { VscSignOut } from "react-icons/vsc"
// import { useDispatch, useSelector } from "react-redux"
// import { useNavigate } from "react-router-dom"

// import { sidebarLinks } from "../../../data/dashboard-links"
// import { logout } from "../../../services/operations/authAPI"
// import ConfirmationModal from "../../../components/common/ConfirmationModal"
// import SidebarLink from "./SidebarLink"

// export default function Sidebar() {
//   const { user, loading: profileLoading } = useSelector(
//     (state) => state.profile
//   )
//   const { loading: authLoading } = useSelector((state) => state.auth)
//   const dispatch = useDispatch()
//   const navigate = useNavigate()
//   // to keep track of confirmation modal
//   const [confirmationModal, setConfirmationModal] = useState(null)

//   if (profileLoading || authLoading) {
//     return (
//       <div className="grid h-full min-w-[220px] items-center border-r-[1px] border-r-richblack-700 bg-orange-300">
//         <div className="spinner"></div>
//       </div>
//     )
//   }

//   return (
//     <>
//     {/* hidden use krke sm k liye media query add krnih  isme  */}
//       <div className="flex min-w-[100px] sm:min-w-[80px] flex-col border-r-[1px] border-r-richblack-700 bg-orange-400 py-10">      <div className="flex flex-col">
//           {sidebarLinks.map((link) => {
//             if (link.type && user?.accountType !== link.type) return null
//             return (
//               <SidebarLink key={link.id} link={link} iconName={link.icon} />
//             )
//           })}
//         </div>
//         <div className="mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-700" />
//         <div className="flex flex-col">
//           <SidebarLink
//             link={{ name: "Settings", path: "/dashboard/settings" }}
//             iconName="VscSettingsGear"
//           />
//           <button
//             onClick={() =>
//               setConfirmationModal({
//                 text1: "Are you sure?",
//                 text2: "You will be logged out of your account.",
//                 btn1Text: "Logout",
//                 btn2Text: "Cancel",
//                 btn1Handler: () => dispatch(logout(navigate)),
//                 btn2Handler: () => setConfirmationModal(null),
//               })
//             }
//             className="px-8 py-2 text-sm font-medium text-richblack-300"
//           >
//             <div className="flex items-center gap-x-2  text-white">
//               <VscSignOut className="text-lg" />
//               <span>Logout</span>
//             </div>
//           </button>
//         </div>
//       </div>
//       {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
//     </>
//   )
// }



import { useState, useRef } from "react";
import { VscSignOut, VscChevronLeft, VscChevronRight, VscClose  } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sidebarLinks } from "../../../data/dashboard-links";
import { logout } from "../../../services/operations/authAPI";
import ConfirmationModal from "../../common/ConfirmationModal";
import SidebarLink from "./SidebarLink";
import useOnClickOutside from "../../../hook/useOnClickOutside"

export default function Sidebar() {
  const { user, loading: profileLoading } = useSelector(
    (state) => state.profile
  );
  const { loading: authLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // to keep track of confirmation modal
  const [confirmationModal, setConfirmationModal] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const ref = useRef(null)
    
    
    useOnClickOutside(ref, () => setIsSidebarOpen(false))

  if (profileLoading || authLoading) {
    return (
      <div className="grid h-full min-w-[220px] items-center border-r-[1px] border-r-richblack-700 bg-orange-300">
        <div className="spinner"></div>
      </div>
    );
  }


  return (
    <>
      <div className="relative">
        <button
          className={`fixed top-[70px] -left-3 z-50  mt-[1px]
          flex items-center justify-center w-10 h-10 bg-orange-400 rounded-md shadow-md shadow-richblack-600
          ${isSidebarOpen ? "sm:translate-x-48 lg:translate-x-30" : ""} transition-transform duration-300 ease-in-out`}
          // onClick={() => isSidebarOpen(!isSidebarOpen)}
          onClick={() => setIsSidebarOpen(true)}
          // ref={ref}
        >
          {isSidebarOpen ? (
            <VscClose  className="text-red-600 font-semibold  " onClick={() => setIsSidebarOpen(true)} />
          ) : (
            <VscChevronRight className="text-white font-semibold" onClick={() => setIsSidebarOpen(false)} />
          )}
        </button>
        
          <div
          className={`fixed top-[70px] left-0 h-full min-w-[200px] sm:w-[30%] lg:w-[10%] bg-black/75 py-10 transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out z-40`}

          onClick={(e) => e.stopPropagation()}
          ref={ref}
        >
        
          <div className="flex flex-col "
          onClick={(e) => e.stopPropagation()}
          ref={ref}>
            {sidebarLinks.map((link) => {
              if (link.type && user?.accountType !== link.type) return null;
              return (
                <SidebarLink key={link.id} link={link} iconName={link.icon} />
              );
            })}
          </div>
          <div className="mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-5" />
          <div className="flex flex-col">
            <SidebarLink
              link={{ name: "Settings", path: "/dashboard/settings" }}
              iconName="VscSettingsGear"
            />
            <button
              onClick={() =>
                setConfirmationModal({
                  text1: "Are you sure?",
                  text2: "You will be logged out of your account.",
                  btn1Text: "Logout",
                  btn2Text: "Cancel",
                  btn1Handler: () => dispatch(logout(navigate)),
                  btn2Handler: () => setConfirmationModal(null),
                })
              }
              className="px-8 py-2 text-sm font-medium text-richblack-300"
            >
              <div className="flex items-center gap-x-2 text-white">
                <VscSignOut className="text-lg" />
                <span>Logout</span>
              </div>
            </button>
          </div>
        </div>
        
      </div>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  );
}
