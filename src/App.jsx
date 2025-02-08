import { useSelector } from 'react-redux';
import './App.css';
// import Home from './Screens/Home';
import Home from "./Pages/Home"
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import { ACCOUNT_TYPE } from "./utils/constants";
import NavBar from './components/common/NavBar';
import FindJob from './Screens/FindJob';
import JobDetailsPage from "./Pages/Find Job/JobDetailsPage";
import FindDriver from './Screens/FindDriver';
import Contact from './Screens/Contact';
import AboutUs from './Pages/Footer/AboutUs';
import PrivacyPolicy from './Pages/Footer/PrivacyPolicy';
import FAQ from './Pages/Footer/FAQ'
import Vision from './Pages/Footer/Vision';
import CreateCv from './Pages/Create CV/CreateCv';
import OurPublication from './Pages/Footer/OurPublication';
import OpenRoute from "./components/core/Auth/OpenRoute"
import PrivateRoute from "./components/core/Auth/PrivateRoute"
import MyProfile  from "./components/core/Dashboard/MyProfile/MyProfile"
import CompanyProfile from "./components/core/Dashboard/CompanyProfile/CompanyProfile"
import Dashboard from "./components/core/Dashboard/MainPage/Dashboard"
import AddService from "./components/core/Dashboard/Services/AddService/index"
import Settings from './components/core/Dashboard/Settings/index';
import Services from "./components/core/Dashboard/Services/index"
import EditService from "./components/core/Dashboard/Services/EditService/index"
import  PostJob  from "./components/core/Dashboard/PostJob/PostJob"
import MyJobs from "./components/core/Dashboard/PostJob/MyJobs"
import EditJobPost from "./components/core/Dashboard/PostJob/EditJobPost/index"
import CandidateProfile from "./components/core/Dashboard/CandidateProfile/index"
import MyCv from "./components/core/Dashboard/MyCv/MyCv"
import AppliedJobs from "./components/core/Dashboard/AppliedJobs/AppliedJobs"
// import ApproveJobPost from "./components/core/Dashboard/PostJob/ApproveJobPost"
import AllJobs from "./components/core/Dashboard/AllJobsForAdmin/AllJobs"
import AppliedCandidates from './components/core/Dashboard/AppliedCandidates/AppliedCandidates';
import ViewCv from "./components/core/Dashboard/MyCv/ViewCv"
import Sectors from "./components/core/Dashboard/Sectors/index"
import AddSector from './components/core/Dashboard/Sectors/AddSector/index';
import EditSector from "./components/core/Dashboard/Sectors/EditSector/index"
// import FullTimeJobs from './components/core/HomePage/FullTimeJobs';
// import PartTimeJobs from './components/core/HomePage/PartTimeJobs';
// import RecentlyPublishedJobs from './components/core/HomePage/RecentlyPublishedJobs';
// import JobSearchBar from './components/core/HomePage/JobSearchBar';
import AddPackage from './components/core/Dashboard/Packages/AddPackage/index'
import EditPackage from './components/core/Dashboard/Packages/EditPackage/index'
import Packages from './components/core/Dashboard/Packages/index'
import VerifyEmail from "./Pages/VerifyEmail"
import VerifyOtp from './Pages/VerifyOtp';
import LoginForm from './components/core/Auth/LoginForm';
import SignupForm from './components/core/Auth/SignupForm';
import AdPackages from './components/core/AdPackages/AdPackages';
import PaymentPage from "./components/core/AdPackages/PaymentPage";
import PaymentApprovalPage from './components/core/Dashboard/PaymentApprovalAdminPage/PaymentApprovalPage';
import PostAdvertisement from "./components/core/Dashboard/PostAds/PostAdvertisement"
import MyAds from './components/core/Dashboard/PostAds/MyAds'
import AdDetails from "./components/core/Dashboard/PostAds/AdDetails"
import AllAds from "./components/core/Dashboard/AllAdsForAdmin/AllAds"
import CompanyPackages from "./components/core/Dashboard/Packages/PackagesForCompany"
function App(){

  const { user } = useSelector((state) => state.profile)
  const token = user?.token
  const { serviceId } = useSelector((state) => state.service)
// console.log("serviceId inside app ",serviceId)

  return (
    // bg-orange-400
         <div className='w-full h-[100vh] min-h-screen flex flex-col font-inter bg-white overflow-x-hidden '>
          <NavBar/>
          <Routes>


            <Route exact path='/' element= {<Home/>} />
            <Route exact path='/find-job' element= {<FindJob/>} />
            <Route exact path='/contact' element= {<Contact/>} />
            <Route exact path='/about' element= {<AboutUs/>} />
            

            <Route exact path='/login' element= {<OpenRoute><LoginForm/></OpenRoute>} />
            <Route exact path='/signup' element= {<OpenRoute><SignupForm/></OpenRoute>} />
            <Route exact path='/packages' element= {<AdPackages/>} />
            <Route exact path='/payment/:packageId' element= {<PaymentPage/>} />
            <Route
              path="verify-email"
              element={
                <OpenRoute>
                  <VerifyEmail />
                </OpenRoute>
              }
            />

            <Route
              path="verify-otp"
              element={
                <OpenRoute>
                  <VerifyOtp />
                </OpenRoute>
              }
            />

            <Route exact path='/job/:jobId' element= {<JobDetailsPage user={user}/>} />
            <Route exact path='/find-driver' element= {<FindDriver/>}/>
            <Route exact path='/create-cv' element= {<CreateCv user={user} token={token} />} />

            <Route exact path='/privacy' element= {<OpenRoute><PrivacyPolicy/></OpenRoute>} />
            {/* <Route exact path='/terms' element= {<OpenRoute><Terms/></OpenRoute>} /> */}
            <Route exact path='/faq' element= {<OpenRoute><FAQ/></OpenRoute>} />
            <Route exact path='/vision' element= {<OpenRoute><Vision/></OpenRoute>} />
            <Route exact path='/our-publication' element={<OpenRoute><OurPublication/></OpenRoute>}/>
            {/* <Route exact path="/" element={<OpenRoute><JobSidebar/></OpenRoute>}>


            <Route path="full-time-jobs" element={<FullTimeJobs/>} />

            <Route path="part-time-jobs" element={<PartTimeJobs/>} />
            <Route path="recently-published-jobs" element={<RecentlyPublishedJobs/>} />

            </Route> */}



            <Route path="/dashboard" element={<PrivateRoute><Dashboard/></PrivateRoute>}>

            
            {/* Route for admin profile */}

            {user?.accountType === ACCOUNT_TYPE.ADMIN && (
              <>

              <Route path="my-profile" element={<MyProfile/>} />
              {/* <Route path="service" element={<Services/>} /> */}
              <Route path="add-service" element={<AddService/>} />
              <Route path="my-services" element={<Services />} />
              <Route
                  path="edit-service/:serviceId"
                  element={<EditService />}
                />
              <Route path="all-jobs" element={<AllJobs />} />

              {/* sector paths */}
              <Route path="add-sector" element={<AddSector/>} />
              <Route path="my-sectors" element={<Sectors />} />
              <Route
                  path="edit-sector/:sectorId"
                  element={<EditSector />}
                />

              <Route path="add-package" element={<AddPackage/>} />
              <Route path="my-packages" element={<Packages />} />
              <Route
                  path="edit-package/:packageId"
                  element={<EditPackage />}
                />
              
              {/* <Route
                  path="approve-job/:jobId"
                  element={<ApproveJobPost />}
                />     */}
              
                {/* Advertisement status toggle route for admin  */}
              <Route path="all-ads" element={<AllAds />} />

                <Route
                  path="company-payment-approval-page"
                  element={<PaymentApprovalPage />}
                />
              </>
            )}
            <Route path="settings" element={<Settings />} />


            {/* Route only for Company */}
          {user?.accountType === ACCOUNT_TYPE.COMPANY && (
            <>
              <Route
                path="post-job"
                element={<PostJob />}
              />
              <Route path="my-profile" element={<CompanyProfile/>} />
              <Route path="my-jobs" element={<MyJobs />} />
              <Route path="packages-for-company" element={<CompanyPackages />} />

              <Route
                  path="edit-job/:jobId"
                  element={<EditJobPost />}
                />
              <Route path="applied-candidates/:jobId" element={<AppliedCandidates />} />
              {/* <Route exact path='/job/:jobId' element= {<JobDetailsPage user={user}/>} /> */}
              <Route path="view-cv" element={<ViewCv />} />
              
              {/* Advertisements */}
              <Route
                path="post-ads"
                element={<PostAdvertisement />}
              />
              <Route path="my-ads" element={<MyAds />} />
              <Route
                  path="ad-details/:adId"
                  element={<AdDetails/>}
                />
            </>
          )}



            {/* Route only for Candidate */}
            {
              user?.accountType === ACCOUNT_TYPE.CANDIDATE && (
                <>
                  <Route
                    path='my-profile' element={<CandidateProfile/>}
                  />
              <Route path="create-cv" element={<CreateCv />} />
              <Route path="my-cv" element={<MyCv />} />
              <Route path="applied-jobs" element={<AppliedJobs />} />

                </>
              )
            }



            </Route>
            



          </Routes>
         </div>

     
    
  );

}

export default App;