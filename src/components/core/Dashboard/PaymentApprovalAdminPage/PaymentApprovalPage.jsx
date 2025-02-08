// import React, { useEffect, useState } from "react";
// import { getCompaniesWithRequestedStatus } from "../../../../services/operations/packageAPI";
// import { Table, Tbody, Tr, Th, Td } from "react-super-responsive-table";
// import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
// import PackagePaymentStatusToggle from './PackagePaymentStatusToggle'; // Import the toggle component

// const PaymentApprovalPage = () => {
//   const [companies, setCompanies] = useState([]);

//   // Fetch companies with payment status 'Requested'
//   useEffect(() => {
//     const fetchCompanies = async () => {
//       try {
//         const result = await getCompaniesWithRequestedStatus();
//         setCompanies(Array.isArray(result) ? result : []); // Ensure result is an array
//       } catch (error) {
//         console.error("Error fetching companies:", error);
//         setCompanies([]); // Set to empty array in case of error
//       }
//     };
//     fetchCompanies();
//   }, []);

//   return (
//     <div className="container mx-auto p-6">
//       <h4 className="text-2xl font-bold mb-4">Approve Payment Requests</h4>
//       <Table className="w-full">
//         <thead>
//           <Tr>
//             <Th>Company Name</Th>
//             <Th>Package Name</Th>
//             <Th>Status</Th>
//             <Th>Action</Th>
//           </Tr>
//         </thead>
//         <Tbody>
//           {companies.map((company) => (
//             <Tr key={company._id}>
//               <Td>{company.name}</Td>
//               <Td>{company.packageName || 'N/A'}</Td> {/* Display package name */}
//               <Td>{company.paymentStatus}</Td>
//               <Td>
//                 <PackagePaymentStatusToggle
//                   pack={{ _id: company.package, status: company.paymentStatus, companyId: company._id }}
//                 />
//               </Td>
//             </Tr>
//           ))}
//         </Tbody>
//       </Table>
//     </div>
//   );
// };

// export default PaymentApprovalPage;


// import React, { useEffect, useState } from "react";
// import {
//   getCompaniesWithRequestedStatus,
//   approvePaymentRequest,
//   fetchPackageDetails,
//   rejectPaymentRequest,
// } from "../../../../services/operations/packageAPI";
// import { Table, Tbody, Tr, Th, Td } from "react-super-responsive-table";
// import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

// const PaymentApprovalPage = () => {
//   const [companies, setCompanies] = useState([]);

//   // Fetch companies with requested payment status on component mount
//   useEffect(() => {
//     const fetchCompanies = async () => {
//       try {
//         const result = await getCompaniesWithRequestedStatus();
//         console.log(result)
//         setCompanies(Array.isArray(result) ? result : []);
//       } catch (error) {
//         console.error("Error fetching companies:", error);
//         setCompanies([]); // Set to an empty array in case of error
//       }
//     };
//     fetchCompanies();
//   }, []);
// console.log(companies)
//   const handleApprovePayment = async (companyId, requestedPackageId) => {
//     try {
//       await approvePaymentRequest(companyId, requestedPackageId);
//       // Remove the approved company from the list
//       setCompanies((prevCompanies) =>
//         prevCompanies.filter((c) => c._id !== companyId)
//       );
//     } catch (error) {
//       console.error("Error approving payment:", error);
//     }
//   };

//   const handleRejectPayment = async (companyId, requestedPackageId) => {
//     try {
//       await rejectPaymentRequest(companyId, requestedPackageId);
//       // Remove the rejected company from the list
//       setCompanies((prevCompanies) =>
//         prevCompanies.filter((c) => c._id !== companyId)
//       );
//     } catch (error) {
//       console.error("Error rejecting payment:", error);
//     }
//   };

//   return (
//     <div className="container mx-auto p-6 lg:mt-20 mb-14">
//       <h1 className="text-3xl font-medium text-black text-center mb-10">
//         Approve Payment Requests
//       </h1>
//       <Table className="rounded-xl border bg-black/55 rounded-t-md border-richblack-800">
//         <thead>
//           <Tr className="flex gap-x-20 items-center rounded-t-md border-b border-b-richblack-800 px-6 py-2">
//             <Th className="text-center text-sm font-semibold uppercase text-richblack-5 bg-transparent">
//               Company Name
//             </Th>
//             <Th className="text-center text-sm font-semibold uppercase text-richblack-5 bg-transparent">
//               Requested Package
//             </Th>
//             <Th className="text-center text-sm font-semibold uppercase text-richblack-5 bg-transparent">
//               Status
//             </Th>
//             <Th className="text-center text-sm font-semibold uppercase text-richblack-5 bg-transparent">
//               Action
//             </Th>
//           </Tr>
//         </thead>
//         <Tbody>
//           {companies?.length === 0 ? (
//             <Tr className="bg-richblack-200">
//               <Td className="py-10 text-center text-2xl font-semibold text-richblack-5">
//                 No companies found with payment approval request
//               </Td>
//             </Tr>
//           ) : (
//             companies.map((company) => (
//               <Tr
//                 key={company._id}
//                 className="flex gap-x-1 border-b border-richblack-800 px-6 py-8 bg-richblack-200 justify-between"
//               >
//                 <Td className="text-lg font-semibold text-richblack-5 text-center">
//                   {company.name}
//                 </Td>
//                 <Td className="text-lg font-semibold text-richblack-5 text-center">
//                   {company?.requestedPackage?.packageName || "N/A"}
//                 </Td>
//                 <Td className="text-lg font-semibold text-richblack-5 text-center">
//                   {company.paymentStatus}
//                 </Td>
//                 <Td>
//                   <button
//                     className="bg-caribbeangreen-500 text-white py-1 px-3 rounded mr-2"
//                     onClick={() =>
//                       handleApprovePayment(
//                         company._id,
//                         company.requestedPackage?._id
//                       )
//                     }
//                   >
//                     Approve
//                   </button>
//                   <button
//                     className="bg-red-500 text-white py-1 px-3 rounded"
//                     onClick={() =>
//                       handleRejectPayment(
//                         company._id,
//                         company.requestedPackage?._id
//                       )
//                     }
//                   >
//                     Reject
//                   </button>
//                 </Td>
//               </Tr>
//             ))
//           )}
//         </Tbody>
//       </Table>
//     </div>
//   );
// };

// export default PaymentApprovalPage;


import React, { useEffect, useState } from "react";
import {
  getCompaniesWithRequestedStatus,
  approvePaymentRequest,
  fetchPackageDetails,
  rejectPaymentRequest,
} from "../../../../services/operations/packageAPI";
import { Table, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

const PaymentApprovalPage = () => {
  const [companies, setCompanies] = useState([]);
  const [packageNames, setPackageNames] = useState({}); // To store package names by ID

  // Fetch companies with requested payment status on component mount
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const result = await getCompaniesWithRequestedStatus();
        setCompanies(Array.isArray(result) ? result : []);

        // Fetch package details for each requestedPackageId
        if (Array.isArray(result)) {
          const packageDetails = {};
          for (const company of result) {
            if (company?.requestedPackage) {
              try {
                const response = await fetchPackageDetails(company.requestedPackage);
                if (response?.data?.success) {
                  const packageName = response.data.data[0]?.packageName || "N/A";
                  packageDetails[company.requestedPackage] = packageName;
                }
              } catch (error) {
                console.error(
                  `Error fetching package details for ${company.requestedPackage}:`,
                  error
                );
                packageDetails[company.requestedPackage] = "Error fetching package";
              }
            }
          }
          setPackageNames(packageDetails);
        }
      } catch (error) {
        console.error("Error fetching companies:", error);
        setCompanies([]); // Set to an empty array in case of error
      }
    };
    fetchCompanies();
  }, []);

  const handleApprovePayment = async (companyId, requestedPackageId) => {
    try {
      await approvePaymentRequest(companyId, requestedPackageId);
      setCompanies((prevCompanies) =>
        prevCompanies.filter((c) => c._id !== companyId)
      );
    } catch (error) {
      console.error("Error approving payment:", error);
    }
  };

  const handleRejectPayment = async (companyId, requestedPackageId) => {
    try {
      await rejectPaymentRequest(companyId, requestedPackageId);
      setCompanies((prevCompanies) =>
        prevCompanies.filter((c) => c._id !== companyId)
      );
    } catch (error) {
      console.error("Error rejecting payment:", error);
    }
  };

  return (
    <div className="container mx-auto p-6 lg:mt-20 mb-14">
      <h1 className="text-3xl font-medium text-black text-center mb-10">
        Approve Payment Requests
      </h1>
      <Table className="rounded-xl border bg-black/55 rounded-t-md border-richblack-800">
        <thead>
          <Tr className="flex gap-x-20 items-center rounded-t-md border-b border-b-richblack-800 px-6 py-2">
            <Th className="text-center text-sm font-semibold uppercase text-richblack-5 bg-transparent">
              Company Name
            </Th>
            <Th className="text-center text-sm font-semibold uppercase text-richblack-5 bg-transparent">
              Requested Package
            </Th>
            <Th className="text-center text-sm font-semibold uppercase text-richblack-5 bg-transparent">
              Status
            </Th>
            <Th className="text-center text-sm font-semibold uppercase text-richblack-5 bg-transparent">
              Action
            </Th>
          </Tr>
        </thead>
        <Tbody>
          {companies?.length === 0 ? (
            <Tr className="bg-richblack-200">
              <Td className="py-10 text-center text-2xl font-semibold text-richblack-5">
                No companies found with payment approval request
              </Td>
            </Tr>
          ) : (
            companies.map((company) => (
              <Tr
                key={company._id}
                className="flex gap-x-1 border-b border-richblack-800 px-6 py-8 bg-richblack-200 justify-between"
              >
                <Td className="text-lg font-semibold text-richblack-5 text-center">
                  {company.name}
                </Td>
                <Td className="text-lg font-semibold text-richblack-5 text-center">
                  {packageNames[company.requestedPackage] || "Loading..."}
                </Td>
                <Td className="text-lg font-semibold text-richblack-5 text-center">
                  {company.paymentStatus}
                </Td>
                <Td>
                  <button
                    className="bg-caribbeangreen-500 text-white py-1 px-3 rounded mr-2"
                    onClick={() =>
                      handleApprovePayment(
                        company._id,
                        company.requestedPackage
                      )
                    }
                  >
                    Approve
                  </button>
                  <button
                    className="bg-red-500 text-white py-1 px-3 rounded"
                    onClick={() =>
                      handleRejectPayment(
                        company._id,
                        company.requestedPackage
                      )
                    }
                  >
                    Reject
                  </button>
                </Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
    </div>
  );
};

export default PaymentApprovalPage;

