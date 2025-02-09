import { ArrowDownRightIcon, ArrowLeftIcon, ClockIcon, EnvelopeIcon, GlobeAltIcon, MapPinIcon, PhoneIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { NavbarOrg } from '../../components/Navbar/NavbarOrg';

export const VendorDetails = () => {
  const [vendors, setVendor] = useState({});
  const { id } = useParams(); // Extract user ID from the URL
  const location = useLocation();
  const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const handleToggle = () => {
      setIsOpen((prevIsOpen) => !prevIsOpen);
    };

  const fetchVendorById = async () => {
    try {
      const response = await axios.get(`/api/vendor/displayVendorById/${id}`);
      setVendor(response.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error fetching vendor details");
    }
  };

  useEffect(() => {
    fetchVendorById();
  }, [id]);

  return (
    <>
    <NavbarOrg onclick={isOpen} />
    <div className='px-6 lg:px-10 py-10'>
      {/* Back to Search Link */}
      <button
        onClick={() => navigate(-1)}
        className="text-blue-500 text-lg flex items-center gap-3 font-medium hover:underline"
      >
        <ArrowLeftIcon className='w-6 h-6' /> Back to Vendor Search
      </button>
      
      <div className="w-full bg-white border border-gray-200 rounded-2xl shadow-md p-6 mt-6">
        <div className="mt-4">
          <h2 className="text-2xl font-bold text-[#00539c]">{vendors.businessName || 'Vendor Name'}</h2>
          <p className="text-base text-gray-600 mt-2">{vendors.description || 'Vendor description'}</p>

          {/* Info Section */}
          <div className="mt-4 space-y-3 text-base text-gray-600">
            <div className="flex items-center">
              <MapPinIcon className="w-5 h-5 text-gray-500 mr-2" />
              {vendors.state || 'Vendor Location'}
            </div>
            <a href={`tel: ${vendors.phone}`} className="flex items-center text-blue-500 hover:underline">
              <PhoneIcon className="w-5 h-5 text-gray-500 mr-2" />
              {vendors.phone || 'Vendor Phone'}
            </a>
            {/* <div className="flex items-center">
              <ClockIcon className="w-5 h-5 text-gray-500 mr-2" />
              Mon-Fri: 9am-5pm
            </div> */}
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-lg">
            <a href={`mailto:${vendors.email || ''}`} className="flex items-center text-blue-500 hover:underline">
              <EnvelopeIcon className="w-5 h-5 text-gray-500 mr-2" />
              {vendors.email || 'Vendor Email'}
            </a>
            {/* <a href={vendors.website || '#'} className="flex items-center text-blue-500 hover:underline">
              <GlobeAltIcon className="w-5 h-5 text-gray-500 mr-2" />
              {vendors.website || 'Vendor Website'}
            </a> */}
          </div>

          <div className='mt-6 w-full'>
            <a
              href={`mailto:${vendors.email}`}
              className="w-full block text-center bg-[#eea47f] transition-all duration-300 hover:bg-[#e79c76] text-white text-base font-semibold py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
            >
              Contact Vendor
            </a>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};
