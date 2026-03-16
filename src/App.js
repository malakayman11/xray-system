import React, { useState } from 'react';
import PatientBooking from './pages/PatientBooking';
import DoctorXrayRequest from './pages/DoctorXrayRequest';
import TechnicianRequests from './pages/TechnicianRequests';
import UploadXray from './pages/UploadXray';
import DoctorXrayView from './pages/DoctorXrayView';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('patient'); // patient, doctor-request, technician, upload, doctor-view
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [userRole, setUserRole] = useState('patient'); // patient, doctor, technician

  const handleSelectRequest = (request) => {
    setSelectedRequest(request);
    setCurrentPage('upload');
  };

  const handleUploadComplete = (requestId, files) => {
    console.log('Upload completed:', requestId, files);
    alert('Images uploaded successfully!');
    setCurrentPage('technician');
  };

  const handleBack = () => {
    setCurrentPage('technician');
  };

  const handleBookingComplete = () => {
    setCurrentPage('patient');
    alert('Thank you! Your appointment has been booked.');
  };

  const handleXrayRequestSubmit = (request) => {
    setCurrentPage('doctor-request');
  };

  return (
    <div className="App">
      {/* Role switcher for demo */}
      <div className="role-switcher">
        <div className="role-buttons">
          <button 
            className={`role-btn ${userRole === 'patient' ? 'active' : ''}`}
            onClick={() => {
              setUserRole('patient');
              setCurrentPage('patient');
            }}
          >
            👤 Patient Mode
          </button>
          <button 
            className={`role-btn ${userRole === 'doctor' ? 'active' : ''}`}
            onClick={() => {
              setUserRole('doctor');
              setCurrentPage('doctor-request');
            }}
          >
            👨‍⚕️ Doctor Mode
          </button>
          <button 
            className={`role-btn ${userRole === 'technician' ? 'active' : ''}`}
            onClick={() => {
              setUserRole('technician');
              setCurrentPage('technician');
            }}
          >
            👨‍🔬 Technician Mode
          </button>
        </div>
        <span className="current-role">
          Current Role: <strong>
            {userRole === 'patient' ? 'Patient' : 
             userRole === 'doctor' ? 'Dentist' : 'X-ray Technician'}
          </strong>
        </span>
      </div>

      {/* Main content */}
      <div className="main-content">
        {userRole === 'patient' && (
          <>
            {currentPage === 'patient' && (
              <PatientBooking onBookingComplete={handleBookingComplete} />
            )}
          </>
        )}

        {userRole === 'doctor' && (
          <>
            {currentPage === 'doctor-request' && (
              <DoctorXrayRequest onRequestSubmit={handleXrayRequestSubmit} />
            )}
            {currentPage === 'doctor-view' && (
              <DoctorXrayView />
            )}
          </>
        )}

        {userRole === 'technician' && (
          <>
            {currentPage === 'technician' && (
              <TechnicianRequests onSelectRequest={handleSelectRequest} />
            )}
            
            {currentPage === 'upload' && selectedRequest && (
              <UploadXray 
                request={selectedRequest}
                onBack={handleBack}
                onUploadComplete={handleUploadComplete}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;