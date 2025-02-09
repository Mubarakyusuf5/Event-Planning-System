// "use client"

import { useEffect, useState } from "react"
import { Sidebar } from "../components/Sidebar"
import { NavbarOrg } from "../components/Navbar/NavbarOrg"
import { VendorCard } from "../components/cards/VendorCard"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import toast from "react-hot-toast"
import ReactPaginate from "react-paginate"

export const AllVendor = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [vendors, setVendors] = useState([])
  const [filteredVendors, setFilteredVendors] = useState([])
  const [search, setSearch] = useState("")
  const [currentPage, setCurrentPage] = useState(0)
  const [vendorsPerPage] = useState(8) // Adjust this number as needed
  const navigate = useNavigate()

  const handleToggle = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen)
  }

  const handleNavigate = (vendor) => {
    navigate(`/vendors/${vendor._id}`, { state: { vendor } })
  }

  const fetchVendor = async () => {
    try {
      const response = await axios.get("/api/vendor/displayVendor")
      setVendors(response.data)
      setFilteredVendors(response.data)
    } catch (error) {
      toast.error(error.response?.data?.message || "Error fetching vendor details")
    }
  }

  useEffect(() => {
    fetchVendor()
  }, [])

  // Handle search filter
  const handleSearch = () => {
    const filtered = vendors.filter((vendor) => {
      const searchTerm = search.toLowerCase()
      return (
        vendor.businessName?.toLowerCase().includes(searchTerm) ||
        vendor.state?.toLowerCase().includes(searchTerm) ||
        vendor.service?.toLowerCase().includes(searchTerm)
      )
    })
    setFilteredVendors(filtered)
    setCurrentPage(0) // Reset to first page when searching
  }

  useEffect(() => {
    handleSearch()
  }, [search, vendors]) // Added vendors to dependencies

  // Pagination logic
  const pageCount = Math.ceil(filteredVendors.length / vendorsPerPage)
  const offset = currentPage * vendorsPerPage
  const currentVendors = filteredVendors.slice(offset, offset + vendorsPerPage)

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected)
  }

  return (
    <div className="bg-gray-50 flex min-h-screen font-poppins">
      <Sidebar isOpen={isOpen} />
      <div className="flex-1 flex flex-col lg:ml-[270px]">
        <NavbarOrg onclick={handleToggle} />
        <main className="flex-1 p-6 bg-gray-50">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold font-poppins text-[#00539c] mb-6">Vendor Search</h1>
          </div>
          <div className="flex items-center space-x-2 w-full mb-6 mt-4">
            <input
              type="text"
              placeholder="Search vendors by name, state, or service..."
              className="flex-1 border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00539c]"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              onClick={handleSearch}
              className="bg-[#eea47f] text-white px-4 py-3 rounded-lg text-sm font-medium hover:bg-[#e79c76] focus:outline-none focus:ring-2 focus:ring-[#e79c76]"
            >
              Search
            </button>
          </div>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 min-h-[200px] relative">
            {currentVendors && currentVendors.length > 0 ? (
              currentVendors.map((vendor) => (
                <VendorCard
                  key={vendor._id}
                  title={vendor.businessName}
                  email={vendor.email}
                  phone={vendor.phone}
                  location={vendor.state}
                  service={vendor.service}
                  onNavigate={() => handleNavigate(vendor)}
                />
              ))
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-xl font-medium text-gray-500">No Available Vendors</p>
              </div>
            )}
          </div>
          {filteredVendors.length > vendorsPerPage && (
            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              breakLabel={"..."}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              containerClassName={"pagination flex justify-center mt-8 space-x-2"}
              pageClassName={"page-item"}
              pageLinkClassName={"page-link px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"}
              previousClassName={"page-item"}
              previousLinkClassName={"page-link px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"}
              nextClassName={"page-item"}
              nextLinkClassName={"page-link px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"}
              breakClassName={"page-item"}
              breakLinkClassName={"page-link px-4 py-2 rounded-lg border border-gray-300"}
              activeClassName={"active bg-[#00539c] text-white"}
            />
          )}
        </main>
      </div>
    </div>
  )
}

