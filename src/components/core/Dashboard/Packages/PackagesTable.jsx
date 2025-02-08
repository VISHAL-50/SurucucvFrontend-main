import { useDispatch, useSelector } from "react-redux"
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table"
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"
import { useState } from "react"
import { FiEdit2 } from "react-icons/fi"
import { RiDeleteBin6Line } from "react-icons/ri"
import { useNavigate } from "react-router-dom"
import ConfirmationModal from "../../../common/ConfirmationModal"
import PackageStatusToggle from "./PackageStatusToggle"
import { deletePackage, getAllPackages } from "../../../../services/operations/packageAPI"

export default function PackagesTable({ packages, setPackages }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { token } = useSelector((state) => state.auth)
  const [loading, setLoading] = useState(false)
  const [confirmationModal, setConfirmationModal] = useState(null)

  const handlePackageDelete = async (packageId) => {
    setLoading(true)
    await deletePackage({ packageId: packageId }, token)
    const result = await getAllPackages(token)
    if (result) {
      setPackages(result)
    }
    setConfirmationModal(null)
    setLoading(false)
  }

  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      <Table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
        <Thead className="bg-purple-600 text-white">
          <Tr className="grid grid-cols-5 gap-4 p-4">
            {["Package Name", "Package Price", "Discounted Price", "Status", "Action"].map((header) => (
              <Th key={header} className="text-center font-semibold uppercase">
                {header}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {packages?.length === 0 ? (
            <Tr className="text-center p-4">
              <Td colSpan="5" className="text-gray-500 font-semibold">
                No packages found
              </Td>
            </Tr>
          ) : (
            packages?.map((pack) => (
              <Tr
                key={pack._id}
                className="grid grid-cols-5 gap-4 p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <Td className="text-center">
                  <p className="text-gray-800 font-medium">{pack.packageName}</p>
                </Td>
                <Td className="text-center">
                  <p className="text-gray-800 font-medium">{pack.packagePrice}</p>
                </Td>
                <Td className="text-center">
                  <p className="text-gray-800 font-medium">{pack.discountedPrice}</p>
                </Td>
                <Td className="flex justify-center items-center">
                  <PackageStatusToggle pack={pack}/>
                </Td>
                
                <Td className="flex justify-center space-x-3">
                  <button
                    disabled={loading}
                    onClick={() => navigate(`/dashboard/edit-package/${pack._id}`)}
                    className="text-purple-600 hover:text-purple-800 transition-colors"
                  >
                    <FiEdit2 size={20} />
                  </button>
                  <button
                    disabled={loading}
                    onClick={() => {
                      setConfirmationModal({
                        text1: "Do you want to delete this package?",
                        text2: "All the data related to this package will be deleted",
                        btn1Text: !loading ? "Delete" : "Loading...  ",
                        btn2Text: "Cancel",
                        btn1Handler: !loading ? () => handlePackageDelete(pack._id) : () => {},
                        btn2Handler: !loading ? () => setConfirmationModal(null) : () => {},
                      })
                    }}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    <RiDeleteBin6Line size={20} />
                  </button>
                </Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  )
}