import { useParams, useNavigate } from "react-router-dom";
import { Button, Typography } from "@material-tailwind/react";
import { useSelector } from "react-redux"; // To access user data from the Redux store
import { fetchPackageDetails, sendPaymentApprovalSms } from "../../../services/operations/packageAPI"; // SMS API for sending notifications
import { useEffect, useState } from "react";

export default function PaymentPage() {
  const { packageId } = useParams(); // Get the package ID from the URL
  const navigate = useNavigate();
  console.log("package id froom params : ",packageId)
  // Extract the logged-in user data and token from the Redux store
  const { token } = useSelector((state) => state.auth); // Assumes 'user' slice exists
  const { user } = useSelector((state) => state.profile)
  const [packageDetails, setPackageDetails] = useState([])
  
  useEffect(() => {
    const fetchPackageDetailsData = async () => {
      try {
        const result = await fetchPackageDetails(packageId); // Fetch package details using the packageId
        if (result) {
          setPackageDetails(result?.[0]); // Set the package details in the state
          console.log(result?.[0])
        }
      } catch (error) {
        console.error("Error fetching package details:", error);
      }
    };
    fetchPackageDetailsData();
  }, [packageId]);

  const packageName = packageDetails?.packageName
console.log("here is the package name : ",packageName)
  console.log(token)
  console.log(user)
  console.log("user?.companyDetails?.companyProfileId : ", user?.companyDetails?._id)
  const companyProfileId = user?.companyDetails?._id
  useEffect(() => {
    // Check if the user is logged in and has a company account type
    if (!token) {
      alert("You need to be logged in to make a payment.");
      navigate("/login"); // Redirect to login if not authenticated
    } else if (user?.accountType !== "Company") {
      alert("Only company accounts can make payments.");
      navigate("/"); // Redirect to homepage if not a company account
    }
  }, [token, user, navigate]);


  console.log("name of user who purchased package : ",user?.name)
  const handlePaymentConfirmation = async () => {
    try {
      // Ensure the token exists before sending the SMS
      if (token) {
        // console.log("inside handler func : ",packageId)
        await sendPaymentApprovalSms( packageName ,user?.name, packageId, user?.companyDetails?._id); // Call the function to send the SMS
        // alert("Payment confirmation SMS sent to the admin!");
        navigate("/"); // Redirect to the homepage after confirmation
      } else {
        alert("You are not authorized to send a payment confirmation request.");
      }
    } catch (error) {
      console.error("Error sending SMS:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200 p-6">
      <Typography variant="h3" className="mb-4">
        Make Your Payment
      </Typography>
      <Typography className="text-xl mb-6">
        Account Number: <span className="font-bold">1234567890</span>
      </Typography>
      <Typography className="text-lg mb-4">
        Please transfer the amount for Package ID: <span className="font-bold">{packageId}</span>
      </Typography>
      <Button
        color="green"
        size="lg"
        className="mt-6 w-[70%] h-12 bg-orange-400"
        onClick={handlePaymentConfirmation}
      >
        I Made a Payment, Send Approval Request Now
      </Button>
    </div>
  );
}
