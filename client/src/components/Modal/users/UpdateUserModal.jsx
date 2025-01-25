import React from "react";
import { Roles, Stats } from "../../../Data";

export const UpdateUserModal = ({ onClose }) => {
    const [formData, setFormData] = useState({
        fullname: "",
        email: "",
        password: "",
        role: "",
        status: ""
    })

    const handleInputChange = (e)=>{
        const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = async (e)=>{
        e.preventDefault()

        console.log(formData)
    }
  return (
    <div className="bg-black py-5 md:px-4 bg-opacity-20 absolute top-0 left-0 right-0 min-h-screen flex justify-center items-center">
      <div>
        <form
          className="bg-white p-4 rounded-lg w-[500px]"
          onSubmit={handleSubmit}
        >
          <div className="text-2xl font-bold text-center mb-5">
            Update User Detail
          </div>
          <div className="mb-2">
            <label htmlFor="fullname" className="text-base font-medium">
              Full Name
            </label>
            <input
              type="text"
              name="fullname"
              id="fullname"
              value={formData.fullname}
              onChange={handleInputChange}
              placeholder="Enter event name"
              className="block w-full p-2 border border-gray-300 rounded-lg focus:border-blue-600 outline-none"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="email" className="text-base font-medium">
              email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter a email ex: address"
              className="block w-full p-2 border border-gray-300 rounded-lg focus:border-blue-600 outline-none"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="password" className="text-base font-medium">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter a password"
              className="block w-full p-2 border border-gray-300 rounded-lg focus:border-blue-600 outline-none"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="role" className="text-base font-medium">
              role
            </label>
            <select
              name="role"
              id="role"
              value={formData.role}
              onChange={handleInputChange}
              className="block w-full p-2 border border-gray-300 rounded-lg focus:border-blue-600 outline-none"
            >
              <option value="" disabled>
                Select a role
              </option>
              {Roles.map((role, index) => (
                <option key={index} value={role.name}>
                  {role.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-2">
            <label htmlFor="status" className="text-base font-medium">
              Status
            </label>
            <select
              name="status"
              id="status"
              value={formData.status}
              onChange={handleInputChange}
              className="block w-full p-2 border border-gray-300 rounded-lg focus:border-blue-600 outline-none"
            >
              <option value="" disabled>
                Select a status
              </option>
              {Stats.map((stat, index) => (
                <option key={index} value={stat.name}>
                  {stat.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex gap-2 justify-end mt-6">
            <button
              type="submit"
              className="bg-blue-500 transition-all duration-300 hover:bg-blue-600 py-2 text-white font-semiBold px-4 rounded-lg"
            >
              Save
            </button>
            <button
              type="button"
              className="bg-gray-500 duration-300 transition-all hover:bg-gray-600 py-2 text-white font-semiBold px-4 rounded-lg"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
