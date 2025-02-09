import React, { useEffect, useState } from "react";
import { Sidebar } from "../../components/Sidebar";
import { BellIcon, MagnifyingGlassIcon, PlusIcon, EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import DataTable from 'react-data-table-component';
import { format } from 'date-fns';
import { NavbarOrg } from "../../components/Navbar/NavbarOrg";
import { AddEventDetail } from "../../components/Modal/AddEventDetail";
import axios from "axios";
import { DeleteModal } from "../../components/Modal/DeleteModal";
import { ViewEventModal } from "../../components/Modal/ViewEventModal";
import { UpdateEventModal } from "../../components/Modal/UpdateEventModal";
import toast from "react-hot-toast";
import { useAuth } from "../../Context/AuthContext";

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

export const ManageEvent = () => {
  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [eventData, setEventData] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false)
  const { user } = useAuth();

  const fetchEvents = async () => {
    try {
      const response = await axios.get("/api/event/displayEvent");
      setEventData(response.data);
      setLoading(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch events")
      console.error("Failed to fetch events:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleUpdateBtn = (eventData) => {
    setSelectedEvent(eventData);
    setShowUpdateModal(true);
  };

  const handleViewModal = (eventData) => {
    setSelectedEvent(eventData);
    setShowViewModal(true);
  };

  const handleDeleteModal = (eventData) => {
    setSelectedEvent(eventData);
    setShowDeleteModal(true);
  };

  const handleDeleteBtn = async (id) => {
    try {
      const response = await axios.delete(`/api/event/deleteEvent/${id}`);
      toast.success(response.data.message)
      setShowDeleteModal(false);
      fetchEvents();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating event. Please try again.")
      console.error("Failed to delete event:", error);
    }
  };

  const formatNaira = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
    }).format(amount);
  };
  

  
  const columns = [
    {
      name: 'Event Name',
      selector: row => row.eventName,
      sortable: true,
    },
    {
      name: 'Budget',
      selector: row => row.budget,
      sortable: true,
      cell: row => formatNaira(row.budget),
    },    
    {
      name: 'Date',
      selector: row => row.date,
      sortable: true,
      cell: row => format(new Date(row.date), 'MMM dd, yyyy '),
    },
    {
      name: 'Time',
      selector: row => row.time,
      sortable: true,
      cell: row => format(new Date(`1970-01-01T${row.time}Z`), 'hh:mm a'), // Add 'a' for AM/PM
    },
    {
      name: 'Status',
      selector: row => row.status,
      sortable: true,
      cell: row => (
        <span
          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
            row.status === 'Scheduled' ? 'bg-yellow-100 text-yellow-800'
              : row.status === 'Completed' ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {row.status}
        </span>
      ),
    },
    {
      name: 'Location',
      selector: row => row.location,
      sortable: true,
    },
    {
      name: 'Actions',
      cell: row => (
        <div className="flex space-x-2">
          <ActionButton
            icon={EyeIcon}
            onClick={() => handleViewModal(row)}
            ariaLabel="View event"
            bgColor="bg-blue-500"
          />
          <ActionButton
            icon={PencilIcon}
            onClick={() => handleUpdateBtn(row)}
            ariaLabel="Edit event"
            bgColor="bg-yellow-500"
          />
          <ActionButton
            icon={TrashIcon}
            onClick={() => handleDeleteModal(row)}
            ariaLabel="Delete event"
            bgColor="bg-red-500"
          />
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];
  const handleToggle = ()=>{
    setIsOpen(prevIsOpen => !prevIsOpen)
    // console.log(isOpen)
  }
  return (
    <div className="bg-gray-50 flex min-h-screen font-roboto">
      <Sidebar isOpen={isOpen} />
      <div className="flex-1 flex flex-col lg:ml-[270px]">
        <NavbarOrg onclick={handleToggle} />
        <main className="flex-1 p-6 bg-gray-50">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-[#00539c] font-poppins">Manage Events</h1>
            <button onClick={() => setShowModal(true)} className="py-2 px-4 bg-[#eea47f] text-white rounded-lg hover:bg-[#e8956f] transition-colors flex items-center">
              <PlusIcon className="w-5 h-5 mr-2" />
              Create Event
            </button>
          </div>
          {loading ? (
            <p className="text-xl text-center mt-20 font-bold">Loading events...</p>
          ) : (
            <div className="bg-white rounded-xl shadow-md p-6">
              <DataTable
                columns={columns}
                data={eventData}
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

      {showModal && <AddEventDetail fetchEvents={fetchEvents} onClose={() => setShowModal(false)} />}
      {showUpdateModal && <UpdateEventModal eventData={selectedEvent} fetchEvents={fetchEvents} onClose={() => setShowUpdateModal(false)} />}
      {showDeleteModal && <DeleteModal onClose={() => setShowDeleteModal(false)} onDelete={() => handleDeleteBtn(selectedEvent._id)} />}
      {showViewModal && <ViewEventModal onClose={() => setShowViewModal(false)} eventData={selectedEvent} />}
    </div>
  );
};
