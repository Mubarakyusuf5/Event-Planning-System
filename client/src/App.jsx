import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Home } from './pages/Home';
import { Login } from './pages/auth/Login';
import { Signup } from './pages/auth/Signup';
import { AdminDash } from './pages/admin/AdminDash';
import { OrganzerDash } from './pages/organizer/OrganzerDash';
import { AttendeePage } from './pages/attendee/AttendeePage';
import { Navbar } from './components/Navbar';
import { Toaster } from 'react-hot-toast';
import { CompleteDetailsPage } from './CompleteDetailsPage';
import { ManageEvent } from './pages/organizer/ManageEvent';
import { AllVendor } from './pages/AllVendor';
import ProtectedRoute from './components/ProtectedRoute'; // Import ProtectedRoute
import { AuthProvider } from './Context/AuthContext'; // Import AuthProvider
import axios from 'axios';
import { VendorDash } from './pages/Vendor/VendorDash';
import { ManageUser } from './pages/admin/ManageUser';
import { ManageRequest } from './pages/admin/ManageRequest';
import { RequestPage } from './RequestPage';

axios.defaults.baseURL = 'http://localhost:4500';
axios.defaults.withCredentials = true;

export const App = () => {
  const location = useLocation();
  const isSignInPage = location.pathname === '/auth/login';
  const isSignupPage = location.pathname === '/auth/create-account';
  const DetailsPage = location.pathname === '/completeDetails';

  return (
    <AuthProvider>
      <Toaster position="top-center" duration={3000} />
      {!isSignInPage && !isSignupPage && !DetailsPage && <Navbar />}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/create-account" element={<Signup />} />
        <Route path="/vendor-search" element={<AllVendor />} />
        <Route path="/plan-my-event" element={<RequestPage />} />

        {/* Protected Routes */}
        <Route
          path="/admin/dashboard"
          element={<ProtectedRoute element={<AdminDash />} allowedRoles={['Admin']} />}
        />
        <Route
          path="/admin/manage-users"
          element={<ProtectedRoute element={<ManageUser />} allowedRoles={['Admin']} />}
        />
        <Route
          path="/admin/manage-request"
          element={<ProtectedRoute element={<ManageRequest />} allowedRoles={['Admin']} />}
        />
        
        <Route path="/completeDetails" 
        element={<ProtectedRoute element={<CompleteDetailsPage />} allowedRoles={['Vendor']} />} />
        <Route path="/vendor/dashboard" 
        element={<ProtectedRoute element={<VendorDash />} allowedRoles={['Vendor']} />} />

        <Route
          path="/organizer/dashboard"
          element={<ProtectedRoute element={<OrganzerDash />} allowedRoles={['Organizer']} />}
        />
        <Route
          path="/organizer/manageEvent"
          element={<ProtectedRoute element={<ManageEvent />} allowedRoles={['Organizer']} />}
        />
        <Route
          path="/dashboard"
          element={<ProtectedRoute element={<AttendeePage />} allowedRoles={['Attendee']} />}
        />

        {/* Catch-all Routes */}
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
        <Route path="/unauthorized" element={<h1>Unauthorized</h1>} />
      </Routes>
    </AuthProvider>
  );
};
