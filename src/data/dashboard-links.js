import { ACCOUNT_TYPE } from "../utils/constants"

export const sidebarLinks = [
  {
    id: 1,
    name: "My Profile",
    path: "/dashboard/my-profile",
    icon: "VscAccount",
    type: ACCOUNT_TYPE.ADMIN,
  },
  {
    id: 3,
    name: "My Services",
    path: "/dashboard/my-services",
    type: ACCOUNT_TYPE.ADMIN,
    icon: "VscVm",
  },
  {
    id: 4,
    name: "Add Service",
    path: "/dashboard/add-service",
    type: ACCOUNT_TYPE.ADMIN,
    icon: "VscAdd",
  },
  {
    id: 5,
    name: "My Profile",
    path: "/dashboard/my-profile",
    icon: "VscAccount",
    type: ACCOUNT_TYPE.COMPANY,

  },
  {
    id: 6,
    name: "Post Job",
    path: "/dashboard/post-job",
    type: ACCOUNT_TYPE.COMPANY,
    icon: "VscAdd",
  },
  {
    id: 7,
    name: "My Jobs",
    path: "/dashboard/my-jobs",
    type: ACCOUNT_TYPE.COMPANY,
    icon:"VscVm",
  },
  
  {
    id: 8,
    name: "My Profile",
    path: "/dashboard/my-profile",
    icon: "VscAccount",
    type: ACCOUNT_TYPE.CANDIDATE,

  },
  {
    id: 9,
    name: "Create CV",
    path: "/dashboard/create-cv",
    type: ACCOUNT_TYPE.CANDIDATE,
    icon:"VscAdd",
  },
  {
    id: 10,
    name: "My CV",
    path: "/dashboard/my-cv",
    type: ACCOUNT_TYPE.CANDIDATE,
    icon:"VscOutput",
  },
  {
    id: 11,
    name: "Applied Jobs",
    path: "/dashboard/applied-jobs",
    type: ACCOUNT_TYPE.CANDIDATE,
    icon: "VscCheckAll"
  },
  {
    id: 12,
    name: "All Jobs",
    path: "/dashboard/all-jobs",
    type: ACCOUNT_TYPE.ADMIN,
    icon: "VscBriefcase"
  },
  {
    id: 13,
    name: "My Sectors",
    path: "/dashboard/my-sectors",
    type: ACCOUNT_TYPE.ADMIN,
    icon: "VscPieChart"
  },
  {
    id: 14,
    name: "Add Sectors",
    path: "/dashboard/add-sector",
    type: ACCOUNT_TYPE.ADMIN,
    icon: "VscAdd"
  },
  {
    id: 15,
    name: "Add Packages",
    path: "/dashboard/add-package",
    type: ACCOUNT_TYPE.ADMIN,
    icon: "VscExtensions"
  },
  {
    id: 16,
    name: "My Packages",
    path: "/dashboard/my-packages",
    type: ACCOUNT_TYPE.ADMIN,
    icon: "VscPackage"
  },
  {
    id: 17,
    name: "Companies Approval",
    path: "/dashboard/company-payment-approval-page",
    type: ACCOUNT_TYPE.ADMIN,
    icon: "VscFeedback"
  },
  {
    id:18,
    name: "Post Ads",
    path: "/dashboard/post-ads",
    type: ACCOUNT_TYPE.COMPANY,
    icon: "VscAdd"
  },
  {
    id:19,
    name: "My Ads",
    path: "/dashboard/my-ads",
    type: ACCOUNT_TYPE.COMPANY,
    icon: "VscPreview"
  },
  {
    id: 20,
    name: "All Ads",
    path: "/dashboard/all-ads",
    type: ACCOUNT_TYPE.ADMIN,
    icon: "VscPreview"
  },
  {
    id: 21,
    name: "Acquired Packages",
    path: "/dashboard/packages-for-company",
    type: ACCOUNT_TYPE.COMPANY,
    icon: "VscLayersActive"
  }
  // {
  //   id: 5,
  //   name: "Enrolled Courses",
  //   path: "/dashboard/enrolled-courses",
  //   type: ACCOUNT_TYPE.STUDENT,
  //   icon: "VscMortarBoard",
  // },
  // {
  //   id: 7,
  //   name: "Cart",
  //   path: "/dashboard/cart",
  //   type: ACCOUNT_TYPE.STUDENT,
  //   icon: "VscArchive",
  // },
]
