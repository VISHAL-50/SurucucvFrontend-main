// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { fetchCompanyPackages, unenrollCompanyFromPackage } from '../../../../services/operations/profileAPI';
// import { useSelector } from 'react-redux';

// const CompanyPackages = () => {
//     const [packages, setPackages] = useState([]);
//     const { user } = useSelector((state) => state.profile);
//     const navigate = useNavigate();

//     // Fetching packages
//     useEffect(() => {
//         const fetchPackages = async () => {
//             try {
//                 const response = await fetchCompanyPackages({ companyId: user?.companyDetails?._id });
//                 console.log(response)
//                 console.log(response.data.data)
//                 if (response.data.success) {
//                     setPackages(response.data.data);
//                 }
//             } catch (error) {
//                 console.error('Error fetching packages:', error);
//             }
//         };
//         fetchPackages();
//     }, [user?.companyDetails?._id]);

//     // Redirect to package details
//     const handleRowClick = (packageId) => {
//         navigate(`/company/package-details/${packageId}`);
//     };

//     // Unenroll company from package
//     const handleUnenroll = async (packageId) => {
//         try {
//             const response = await unenrollCompanyFromPackage({ companyId: user?.companyDetails?._id, packageId });
//             if (response.data.success) {
//                 setPackages((prevPackages) => prevPackages.filter((pkg) => pkg._id !== packageId));
//                 alert('Successfully unenrolled from the package.');
//             }
//         } catch (error) {
//             console.error('Error unenrolling from package:', error);
//             alert('Failed to unenroll from the package.');
//         }
//     };

//     return (
//         <div className="p-6 lg:mt-20">
//             <h2 className="text-2xl font-bold mb-6">Purchased Packages</h2>
//             {packages.length > 0 ? (
//                 <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
//                     <thead>
//                         <tr className="bg-gray-100 border-b">
//                             <th className="py-3 px-5 text-left">Package Name</th>
//                             <th className="py-3 px-5 text-left">Price</th>
//                             <th className="py-3 px-5 text-left">Discounted Price</th>
//                             <th className="py-3 px-5 text-left">Payment Status</th>
//                             <th className="py-3 px-5 text-left">Purchased Date</th>
//                             <th className="py-3 px-5 text-left">Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {packages.map((pkg) => (
//                             <tr
//                                 key={pkg._id}
//                                 className="cursor-pointer hover:bg-gray-50 border-b"
//                             >
//                                 <td className="py-3 px-5" onClick={() => handleRowClick(pkg._id)}>
//                                     {pkg.packageName}
//                                 </td>
//                                 <td className="py-3 px-5">{pkg.packagePrice}</td>
//                                 <td className="py-3 px-5">{pkg.discountedPrice}</td>
//                                 <td className="py-3 px-5">{pkg.paymentStatus}</td>
//                                 <td className="py-3 px-5">{new Date(pkg.createdAt).toLocaleDateString()}</td>
//                                 <td className="py-3 px-5">
//                                     <button
//                                         className="text-red-500 hover:underline"
//                                         onClick={() => handleUnenroll(pkg._id)}
//                                     >
//                                         Unenroll
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             ) : (
//                 <div className="text-center">
//                     <p className="text-gray-600 text-lg">
//                         You currently have no purchased packages. Get a package and start creating jobs and posting ads!
//                     </p>
//                     <button
//                         className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//                         onClick={() => navigate('/packages')}
//                     >
//                         View Packages
//                     </button>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default CompanyPackages;


// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { fetchCompanyPackages, unenrollCompanyFromPackage } from '../../../../services/operations/profileAPI';
// import { useSelector } from 'react-redux';

// const CompanyPackages = () => {
//     const [packages, setPackages] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const { user } = useSelector((state) => state.profile);
//     const navigate = useNavigate();

//     // Fetching packages
//     useEffect(() => {
//         const fetchPackages = async () => {
//             try {
//                 const response = await fetchCompanyPackages({ companyId: user?.companyDetails?._id });
//                 if (response?.data?.success) {
//                     setPackages(response?.data?.data?.[0] || []);
//                 }
//             } catch (error) {
//                 console.error('Error fetching packages:', error);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchPackages();
//     }, [user?.companyDetails?._id]);

//     // Redirect to package details
//     const handleRowClick = (packageId) => {
//         navigate(`/company/package-details/${packageId}`);
//     };

//     // Unenroll company from package
//     const handleUnenroll = async (packageId) => {
//         try {
//             const response = await unenrollCompanyFromPackage({ companyId: user?.companyDetails?._id, packageId });
//             if (response.data.success) {
//                 setPackages((prevPackages) => prevPackages.filter((pkg) => pkg._id !== packageId));
//                 alert('Successfully unenrolled from the package.');
//             }
//         } catch (error) {
//             console.error('Error unenrolling from package:', error);
//             alert('Failed to unenroll from the package.');
//         }
//     };

//     if (loading) {
//         return <p className="text-center text-gray-600">Loading packages...</p>;
//     }

//     return (
//         <div className="p-6 lg:mt-20">
//             <h2 className="text-2xl font-bold mb-6">Purchased Packages</h2>
//             {packages.length > 0 ? (
//                 <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
//                     <thead>
//                         <tr className="bg-gray-100 border-b">
//                             <th className="py-3 px-5 text-left">Package Name</th>
//                             <th className="py-3 px-5 text-left">Price</th>
//                             <th className="py-3 px-5 text-left">Discounted Price</th>
//                             <th className="py-3 px-5 text-left">Payment Status</th>
//                             <th className="py-3 px-5 text-left">Purchased Date</th>
//                             <th className="py-3 px-5 text-left">Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {packages.map((pkg) => (
//                             <tr
//                                 key={pkg._id}
//                                 className="cursor-pointer hover:bg-gray-50 border-b"
//                             >
//                                 <td className="py-3 px-5" onClick={() => handleRowClick(pkg._id)}>
//                                     {pkg.packageName}
//                                 </td>
//                                 <td className="py-3 px-5">{pkg.packagePrice}</td>
//                                 <td className="py-3 px-5">{pkg.discountedPrice}</td>
//                                 <td className="py-3 px-5">{pkg.paymentStatus}</td>
//                                 <td className="py-3 px-5">{new Date(pkg.createdAt).toLocaleDateString()}</td>
//                                 <td className="py-3 px-5">
//                                     {pkg.paymentStatus === 'Purchased' ? (
//                                         <button
//                                             className="text-red-500 hover:underline"
//                                             onClick={() => handleUnenroll(pkg._id)}
//                                         >
//                                             Unenroll
//                                         </button>
//                                     ) : (
//                                         <span className="text-gray-500">Not Enrolled</span>
//                                     )}
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             ) : (
//                 <div className="text-center">
//                     <p className="text-gray-600 text-lg">
//                         You currently have no purchased packages. Get a package and start creating jobs and posting ads!
//                     </p>
//                     <button
//                         className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//                         onClick={() => navigate('/packages')}
//                     >
//                         View Packages
//                     </button>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default CompanyPackages;


import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCompanyPackages, unenrollCompanyFromPackage } from "../../../../services/operations/profileAPI";
import { useSelector } from "react-redux";
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
// const CompanyPackages = () => {
//     const [packages, setPackages] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const { user } = useSelector((state) => state.profile);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchPackages = async () => {
//             try {
//                 setLoading(true);
//                 setError(null);

//                 const response = await fetchCompanyPackages({
//                     companyId: user?.companyDetails?._id,
//                 });

//                 console.log("API Response:", response);

//                 if (response?.success) {
//                     const requestedPackages = response?.data?.requestedPackages || [];
//                     const approvedPackages = response?.data?.approvedPackages || [];
//                     const allPackages = [...requestedPackages, ...approvedPackages];

//                     console.log("All Packages:", allPackages);
//                     setPackages(allPackages);
//                 } else {
//                     setError("Failed to load packages.");
//                 }
//             } catch (error) {
//                 console.error("Error fetching packages:", error);
//                 setError("An unexpected error occurred.");
//             } finally {
//                 setLoading(false);
//             }
//         };

//         if (user?.companyDetails?._id) {
//             fetchPackages();
//         }
//     }, [user?.companyDetails?._id]);

//     const handleRowClick = (packageId) => {
//         navigate(`/company/package-details/${packageId}`);
//     };

//     if (loading) {
//         return (
//             <div className="p-6 lg:mt-20 text-center">
//                 <p className="text-lg font-medium text-gray-600">
//                     Loading packages, please wait...
//                 </p>
//             </div>
//         );
//     }

//     if (error) {
//         return (
//             <div className="p-6 lg:mt-20 text-center">
//                 <p className="text-lg font-medium text-red-600">{error}</p>
//             </div>
//         );
//     }

//     return (
//         <div className="p-6 lg:mt-20">
//             <h2 className="text-2xl font-bold mb-6 text-center">Company Packages</h2>

//             {packages.length > 0 ? (
//                 <div className="overflow-x-auto shadow-lg rounded-lg">
//                     <table className="min-w-full bg-white border rounded-lg">
//                         <thead className="bg-gray-100 border-b">
//                             <tr>
//                                 <th className="py-3 px-5 text-left font-semibold">Package Name</th>
//                                 <th className="py-3 px-5 text-left font-semibold">Price</th>
//                                 <th className="py-3 px-5 text-left font-semibold">Discounted Price</th>
//                                 <th className="py-3 px-5 text-left font-semibold">Payment Status</th>
//                                 <th className="py-3 px-5 text-left font-semibold">Date</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {packages.map((pkg) => (
//                                 <tr
//                                     key={pkg._id}
//                                     className="cursor-pointer hover:bg-gray-50 border-b"
//                                     onClick={() => handleRowClick(pkg._id)}
//                                 >
//                                     <td className="py-3 px-5">{pkg.packageName || "N/A"}</td>
//                                     <td className="py-3 px-5">{pkg.packagePrice || "N/A"}</td>
//                                     <td className="py-3 px-5">{pkg.discountedPrice || "N/A"}</td>
//                                     <td className="py-3 px-5 capitalize">
//                                         {pkg.paymentStatus || "N/A"}
//                                     </td>
//                                     <td className="py-3 px-5">
//                                         {pkg.paymentStatus === "Requested"
//                                             ? new Date(pkg.createdAt).toLocaleDateString()
//                                             : pkg.approvedDate
//                                             ? new Date(pkg.approvedDate).toLocaleDateString()
//                                             : "N/A"}
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             ) : (
//                 <div className="text-center">
//                     <p className="text-gray-600 text-lg">
//                         No packages found. Please request or purchase a package to get started.
//                     </p>
//                     <button
//                         className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//                         onClick={() => navigate("/packages")}
//                     >
//                         View Packages
//                     </button>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default CompanyPackages;







// const PackagesForCompany = () => {
//   const [packages, setPackages] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();
//   const { user } = useSelector((state) => state.profile);

//   useEffect(() => {
//     const fetchPackages = async () => {
//       try {
//         const response = await fetchCompanyPackages({
//           companyId: user?.companyDetails?._id,
//         });

//         console.log("API Response:", response);

//         const requestedPackages = response?.requestedPackages || [];
//         const approvedPackages = response?.packages || [];
//         console.log("Requested Packages:", requestedPackages);
//         console.log("Approved Packages:", approvedPackages);

//         // Merge requested and approved packages
//         const allPackages = [...requestedPackages, ...approvedPackages];
//         console.log("Merged Packages:", allPackages);
//         setPackages(allPackages);
//       } catch (error) {
//         console.error("Error fetching packages:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPackages();
//   }, [user?.companyDetails?._id]);

//   const handleRowClick = (packageId) => {
//     navigate(`/package-details/${packageId}`);
//   };

//   const handleUnenroll = async (packageId) => {
//     try {
//       setLoading(true);
//       const response = await unenrollCompanyFromPackage({
//         companyId: user?.companyDetails?._id,
//         packageId,
//       });

//       if (response.success) {
//         setPackages((prevPackages) =>
//           prevPackages.filter((pkg) => pkg._id !== packageId)
//         );
//         console.log("Unenrolled successfully:", response.message);
//       }
//     } catch (error) {
//       console.error("Error during unenrollment:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-4 text-center">Company Packages</h1>
//       {loading ? (
//         <p className="text-center text-gray-600">Loading packages...</p>
//       ) : packages.length > 0 ? (
//         <Table className="rounded-xl border bg-black/55 rounded-t-md border-richblack-800">
//           <Thead>
//             <Tr className="flex gap-x-28 items-center rounded-t-md border-b border-richblack-800 px-6 py-2">
//               <Th className="text-center text-sm font-semibold uppercase text-richblack-5 bg-transparent">
//                 Package Name
//               </Th>
//               <Th className="text-center text-sm font-semibold uppercase text-richblack-5 bg-transparent">
//                 Package Price
//               </Th>
//               <Th className="text-center text-sm font-semibold uppercase text-richblack-5 bg-transparent">
//                 Discounted Price
//               </Th>
//               <Th className="text-center text-sm font-semibold uppercase text-richblack-5 bg-transparent">
//                 Payment Status
//               </Th>
//               <Th className="text-center text-sm font-semibold uppercase text-richblack-5 bg-transparent">
//                 Date
//               </Th>
//               <Th className="text-center text-sm font-semibold uppercase text-richblack-5 bg-transparent">
//                 Action
//               </Th>
//             </Tr>
//           </Thead>
//           <Tbody>
//             {packages.map((pkg) => (
//               <Tr
//                 key={pkg._id}
//                 className="flex gap-x-1 border-b border-richblack-800 px-6 py-8 bg-richblack-200 justify-between"
//               >
//                 <Td>
//                   <p className="text-lg font-semibold text-richblack-5 text-center">
//                     {pkg.packageName}
//                   </p>
//                 </Td>
//                 <Td>
//                   <p className="text-lg font-semibold text-richblack-5 text-center">
//                     {pkg.packagePrice}
//                   </p>
//                 </Td>
//                 <Td>
//                   <p className="text-lg font-semibold text-richblack-5 text-center">
//                     {pkg.discountedPrice}
//                   </p>
//                 </Td>
//                 <Td>
//                   <p className="text-lg font-semibold text-richblack-5 text-center">
//                     {pkg.paymentStatus}
//                   </p>
//                 </Td>
//                 <Td>
//                   <p className="text-lg font-semibold text-richblack-5 text-center">
//                     {pkg.paymentStatus === "Requested"
//                       ? new Date(pkg.createdAt).toLocaleDateString()
//                       : new Date(pkg.approvedDate).toLocaleDateString()}
//                   </p>
//                 </Td>
//                 <Td className="flex gap-2 justify-center items-center">
//                   <button
//                     disabled={loading}
//                     onClick={() => handleRowClick(pkg._id)}
//                     className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
//                   >
//                     View Details
//                   </button>
//                   <button
//                     disabled={loading}
//                     onClick={() => handleUnenroll(pkg._id)}
//                     className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
//                   >
//                     Unenroll
//                   </button>
//                 </Td>
//               </Tr>
//             ))}
//           </Tbody>
//         </Table>
//       ) : (
//         <div className="text-center">
//           <p className="text-gray-600 text-lg">
//             No packages found. Please request or purchase a package to get
//             started.
//           </p>
//           <button
//             className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//             onClick={() => navigate("/packages")}
//           >
//             View Packages
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PackagesForCompany;


const PackagesForCompany = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.profile);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetchCompanyPackages({
          companyId: user?.companyDetails?._id,
        });

        const requestedPackages = response?.requestedPackages || [];
        const approvedPackages = response?.packages || [];

        // Merge requested and approved packages
        const allPackages = [...requestedPackages, ...approvedPackages];
        setPackages(allPackages);
      } catch (error) {
        console.error("Error fetching packages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, [user?.companyDetails?._id]);

  const handleRowClick = (packageId) => {
    navigate(`/package-details/${packageId}`);
  };

  const handleUnenroll = async (packageId) => {
    try {
      setLoading(true);
      const response = await unenrollCompanyFromPackage({
        companyId: user?.companyDetails?._id,
        packageId,
      });

      if (response.success) {
        setPackages((prevPackages) =>
          prevPackages.filter((pkg) => pkg._id !== packageId)
        );
        console.log("Unenrolled successfully:", response.message);
      }
    } catch (error) {
      console.error("Error during unenrollment:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p className="text-center text-gray-600">Loading packages...</p>;
  }

  if (packages.length === 0) {
    // Default screen when no packages are found
    return (
      <div className="text-center container lg:mt-8 mx-auto p-6">
        <p className="text-gray-600 text-lg">
          No packages found. Please request or purchase a package to get started.
        </p>
        <button
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => navigate("/packages")}
        >
          View Packages
        </button>
      </div>
    );
  }

  return (
    <div className=" mx-auto p-6 lg:mt-8">
      <h1 className="text-2xl font-bold mb-4 text-center">Company Packages</h1>
      <Table className="rounded-xl border bg-black/55 rounded-t-md border-richblack-800">
        <Thead>
          <Tr className="flex gap-x-28 items-center rounded-t-md border-b border-richblack-800 px-6 py-2">
            <Th className="text-center text-sm font-semibold uppercase text-richblack-5 bg-transparent">
              Package Name
            </Th>
            <Th className="text-center text-sm font-semibold uppercase text-richblack-5 bg-transparent">
              Package Price
            </Th>
            <Th className="text-center text-sm font-semibold uppercase text-richblack-5 bg-transparent">
              Discounted Price
            </Th>
            <Th className="text-center text-sm font-semibold uppercase text-richblack-5 bg-transparent">
              Payment Status
            </Th>
            <Th className="text-center text-sm font-semibold uppercase text-richblack-5 bg-transparent">
              Date
            </Th>
            <Th className="text-center text-sm font-semibold uppercase text-richblack-5 bg-transparent">
              Action
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {packages.map((pkg) => (
            <Tr
              key={pkg._id}
              className="flex gap-x-1 border-b border-richblack-800 px-6 py-8 bg-richblack-200 justify-between"
            >
              <Td>
                <p className="text-lg font-semibold text-richblack-5 text-center">
                  {pkg.packageName}
                </p>
              </Td>
              <Td>
                <p className="text-lg font-semibold text-richblack-5 text-center">
                  {pkg.packagePrice}
                </p>
              </Td>
              <Td>
                <p className="text-lg font-semibold text-richblack-5 text-center">
                  {pkg.discountedPrice}
                </p>
              </Td>
              <Td>
                <p className="text-lg font-semibold text-richblack-5 text-center">
                  {pkg.paymentStatus}
                </p>
              </Td>
              <Td>
                <p className="text-lg font-semibold text-richblack-5 text-center">
                  {pkg.paymentStatus === "Requested"
                    ? new Date(pkg.createdAt).toLocaleDateString()
                    : new Date(pkg.approvedDate).toLocaleDateString()}
                </p>
              </Td>
              <Td className="flex gap-2 justify-center items-center">
                <button
                  disabled={loading}
                  onClick={() => handleRowClick(pkg._id)}
                  className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                >
                  View Details
                </button>
                <button
                  disabled={loading}
                  onClick={() => handleUnenroll(pkg._id)}
                  className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
                >
                  Unenroll
                </button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  );
};

export default PackagesForCompany;

