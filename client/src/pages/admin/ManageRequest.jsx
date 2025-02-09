import React, { useEffect, useState } from "react";
import { Sidebar } from "../../components/Sidebar";
import { NavbarOrg } from "../../components/Navbar/NavbarOrg";
import { RequestViewModal } from "../../components/Modal/RequestViewModal";
import { DeleteModal } from "../../components/Modal/DeleteModal";
import DataTable from "react-data-table-component";
import { format } from 'date-fns';
import toast from "react-hot-toast";
import axios from "axios";
import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { RequestUpdateModal } from "../../components/Modal/RequestUpdateModal";


// Custom styles for DataTable
const ActionButton = ({ icon: Icon, onClick, ariaLabel, bgColor }) => (
  <button
    onClick={onClick}
    className={`p-1 rounded-full ${bgColor} text-white hover:opacity-80 transition-opacity`}
    aria-label={ariaLabel}
  >
    <Icon className="w-4 h-4" />
  </button>
);



const customStyles = {
  headRow: {
    style: {
      backgroundColor: '#f3f4f6',
      color: '#374151',
    },
  },
  headCells: {
    style: {
      fontSize: '0.875rem',
      fontWeight: '600',
      textTransform: 'uppercase',
      paddingLeft: '16px',
      paddingRight: '16px',
    },
  },
  cells: {
    style: {
      paddingLeft: '16px',
      paddingRight: '16px',
    },
  },
};

export const ManageRequest = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [requestData, setRequestData] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedRequest, setSelectedRequestselectedRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  // const { user } = useAuth();

  const fetchRequests = async () => {
    try {
      const response = await axios.get("/api/request/displayRequest");
      setRequestData(response.data);
      // console.log(response.data)
      setLoading(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch Requests")
      console.error("Failed to fetch Requests:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleUpdateBtn = (requestData) => {
    setSelectedRequestselectedRequest(requestData);
    setShowUpdateModal(true);
  };

  const handleViewModal = (requestData) => {
    setSelectedRequestselectedRequest(requestData);
    setShowViewModal(true);
  };

  const handleDeleteModal = (requestData) => {
    setSelectedRequestselectedRequest(requestData);
    setShowDeleteModal(true);
  };

  const handleDeleteBtn = async (id) => {
    try {
      const response = await axios.delete(`/api/request/deleteRequest/${id}`);
      toast.success(response.data.message);
      setShowDeleteModal(false);
      fetchRequests();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Error deleting event. Please try again."
      );
      console.error("Failed to delete event:", error);
    }
  };

  const formatNaira = (amount) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(amount);
  };

  const handleToggle = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const columns = [
    {
      name: "User FullName",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Phone Number",
      selector: (row) => row.phone,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Event Name",
      selector: (row) => row.eventName,
      sortable: true,
    },
    {
      name: "Budget",
      selector: (row) => row.budget,
      sortable: true,
      cell: (row) => formatNaira(row.budget),
    },
    {
      name: "Date",
      selector: (row) => row.date,
      sortable: true,
      cell: (row) => format(new Date(row.date), "MMM dd, yyyy "),
    },
    // {
    //   name: "Time",
    //   selector: (row) => row.time,
    //   sortable: true,
    //   cell: (row) => format(new Date(`1970-01-01T${row.time}Z`), "hh:mm a"), // Add 'a' for AM/PM
    // },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
      cell: (row) => (
        <span
          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
            row.status === "Pending"
              ? "bg-yellow-100 text-yellow-800"
              : row.status === "Completed"
              ? "bg-green-100 text-green-800"
              : row.status === "Rejected"
              ? "bg-red-100 text-red-800"
              : "bg-blue-100 text-blue-500"
          }`}
        >
          {row.status}
        </span>
      ),
    },
    {
      name: "Location",
      selector: (row) => row.location,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex space-x-2">
          <ActionButton
            icon={EyeIcon}
            onClick={() => handleViewModal(row)}
            ariaLabel="View request"
            bgColor="bg-blue-500"
          />
          <ActionButton
            icon={PencilIcon}
            onClick={() => handleUpdateBtn(row)}
            ariaLabel="Edit request"
            bgColor="bg-yellow-500"
          />
          <ActionButton
            icon={TrashIcon}
            onClick={() => handleDeleteModal(row)}
            ariaLabel="Delete request"
            bgColor="bg-red-500"
          />
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  return (
    <div className="bg-gray-50 flex min-h-screen font-roboto">
      <Sidebar isOpen={isOpen} />
      <div className="flex-1 flex flex-col lg:ml-[270px]">
        <NavbarOrg onclick={handleToggle} />
        <main className="flex-1 p-6 bg-gray-50">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold font-poppins text-[#00539c] mb-6">
              Manage Requests
            </h1>
          </div>
          {loading ? (
            <p className="text-xl text-center mt-20 font-bold">
              Loading requests...
            </p>
          ) : (
            <div className="bg-white rounded-xl overflow-x-auto w-[390px] md:w-[850px] lg:w-full shadow-md p-6">
              <DataTable
                columns={columns}
                data={requestData}
                pagination
                customStyles={customStyles}
                highlightOnHover
                pointerOnHover
                responsive
              />
            </div>
          )}
        </main>
      </div>
      {/* {showModal && <AddEventDetail fetchEvents={fetchEvents} onClose={() => setShowModal(false)} />} */}
            {showUpdateModal && <RequestUpdateModal requestData={selectedRequest} fetchRequests={fetchRequests} onClose={() => setShowUpdateModal(false)} />}
            {showDeleteModal && <DeleteModal onClose={() => setShowDeleteModal(false)} onDelete={() => handleDeleteBtn(selectedRequest._id)} />}
            {showViewModal && <RequestViewModal onClose={() => setShowViewModal(false)} requestData={selectedRequest} />}
      {/* <RequestViewModal /> */}
    </div>
  );
};
