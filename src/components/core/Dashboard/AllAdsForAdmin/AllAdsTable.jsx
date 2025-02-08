import { useDispatch, useSelector } from "react-redux";
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import { HiClock } from "react-icons/hi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../../../common/ConfirmationModal";
import { deleteAd, fetchAllAds } from "../../../../services/operations/adsAPI";
import ApproveAdButton from "./ApproveAdButton";

export default function AllAdsTable({ ads, setAds }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(null);

  const handleAdDelete = async (adId) => {
    setLoading(true);
    await deleteAd({ adId }, token);
    const result = await fetchAllAds();
    if (result) {
      setAds(result);
    }
    setConfirmationModal(null);
    setLoading(false);
  };

  return (
    <>
      <Table className="rounded-xl border bg-black/55 rounded-t-md border-richblack-800">
        <Thead>
          <Tr className="flex gap-x-28 items-center text-center rounded-t-md border-b border-b-richblack-800 px-6 py-2">
            <Th className="text-left text-sm font-semibold bg-transparent uppercase text-richblack-5">
              Company Name
            </Th>
            <Th className="text-left text-sm font-semibold uppercase bg-transparent text-richblack-5">
              Ad Title
            </Th>
            <Th className="text-left text-sm font-semibold uppercase bg-transparent text-richblack-5">
              Start Date
            </Th>
            <Th className="text-left text-sm font-semibold uppercase bg-transparent text-richblack-5">
              End Date
            </Th>
            <Th className="text-left text-sm font-semibold uppercase bg-transparent text-richblack-5">
              Manage Status
            </Th>
            <Th className="text-left text-sm font-semibold uppercase bg-transparent text-richblack-5">
              Action
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {ads?.length === 0 ? (
            <Tr className="bg-richblack-200">
              <Td className="py-10 text-center text-2xl font-semibold text-richblack-5">
                No advertisements found
              </Td>
            </Tr>
          ) : (
            ads?.map((ad) => (
              <Tr
                key={ad._id}
                className="flex gap-x-16 justify-between border-b border-richblack-800 px-6 py-8 bg-richblack-200"
              >
                <Td className="flex flex-col gap-x-4">
                  <div className="text-lg font-semibold text-richblack-5">{ad.companyName}</div>
                  <div className="flex flex-col justify-between">
                    {ad.status === "Inactive" ? (
                      <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-pink-100">
                        <HiClock size={14} />
                        Inactive
                      </p>
                    ) : (
                      <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-white">
                        <div className="flex h-3 w-3 items-center justify-center rounded-full bg-black/75 text-white">
                          <FaCheck size={8} />
                        </div>
                        Active
                      </p>
                    )}
                  </div>
                </Td>
                <Td>
                  <p className="text-lg font-semibold text-richblack-5">{ad.title}</p>
                </Td>
                <Td>
                  <p className="text-xs text-richblack-5">{new Date(ad.startDate).toLocaleDateString()}</p>
                </Td>
                <Td>
                  <p className="text-xs text-richblack-5">{new Date(ad.endDate).toLocaleDateString()}</p>
                </Td>
                <Td>
                  <ApproveAdButton ad={ad} />
                </Td>
                <Td className="text-xs text-richblack-5">
                  <button
                    disabled={loading}
                    onClick={() => {
                      navigate(`/dashboard/edit-ad/${ad._id}`);
                    }}
                    title="Edit"
                    className="px-2 transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300"
                  >
                    <FiEdit2 size={20} />
                  </button>
                  <button
                    disabled={loading}
                    onClick={() => {
                      setConfirmationModal({
                        text1: "Do you want to delete this advertisement?",
                        text2: "All the data related to this ad will be deleted.",
                        btn1Text: !loading ? "Delete" : "Loading...",
                        btn2Text: "Cancel",
                        btn1Handler: !loading ? () => handleAdDelete(ad._id) : () => {},
                        btn2Handler: !loading ? () => setConfirmationModal(null) : () => {},
                      });
                    }}
                    title="Delete"
                    className="px-1 transition-all duration-200 hover:scale-110 hover:text-[#ff0000]"
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
    </>
  );
}
