import React, { useState } from 'react';
import { patients, xrayTypes } from '../data/mockData';
import '../styles/DoctorXrayRequest.css';

const DoctorXrayRequest = ({ onRequestSubmit }) => {
  const [step, setStep] = useState(1);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [requestData, setRequestData] = useState({
    patientId: '',
    xrayType: '',
    priority: 'normal',
    instructions: '',
    urgentReason: ''
  });

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectPatient = (patient) => {
    setSelectedPatient(patient);
    setRequestData({...requestData, patientId: patient.id});
    setStep(2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newRequest = {
      id: `XR-${Date.now()}`,
      ...requestData,
      patientName: selectedPatient.name,
      patientAge: selectedPatient.age,
      doctor: 'Dr. Mona Abdallah', // Current logged in doctor
      date: new Date().toISOString().split('T')[0],
      status: 'pending',
      notes: requestData.instructions
    };

    console.log('X-ray Request Created:', newRequest);
    alert('X-ray request submitted successfully!');
    onRequestSubmit(newRequest);
  };

  return (
    <div className="xray-request-page">
      <div className="request-header">
        <h1>New X-ray Request</h1>
        <div className="steps-indicator">
          <div className={`step ${step >= 1 ? 'active' : ''}`}>
            <span className="step-number">1</span>
            <span>Select Patient</span>
          </div>
          <div className={`step ${step >= 2 ? 'active' : ''}`}>
            <span className="step-number">2</span>
            <span>X-ray Details</span>
          </div>
          <div className={`step ${step >= 3 ? 'active' : ''}`}>
            <span className="step-number">3</span>
            <span>Review</span>
          </div>
        </div>
      </div>

      <div className="request-container">
        {step === 1 && (
          <div className="step-content">
            <h2>Select Patient</h2>
            
            <div className="search-section">
              <input
                type="text"
                placeholder="Search by patient name or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="patient-search"
              />
            </div>

            <div className="patients-list">
              {filteredPatients.length > 0 ? (
                filteredPatients.map(patient => (
                  <div 
                    key={patient.id}
                    className="patient-card"
                    onClick={() => handleSelectPatient(patient)}
                  >
                    <div className="patient-avatar">👤</div>
                    <div className="patient-info">
                      <h3>{patient.name}</h3>
                      <p>ID: {patient.id} | Age: {patient.age} | Phone: {patient.phone}</p>
                      <p className="last-visit">Last Visit: {patient.lastVisit}</p>
                    </div>
                    <button className="select-patient-btn">Select</button>
                  </div>
                ))
              ) : (
                <div className="no-patients">
                  <p>No patients found</p>
                  <button className="new-patient-btn">+ Register New Patient</button>
                </div>
              )}
            </div>
          </div>
        )}

        {step === 2 && selectedPatient && (
          <div className="step-content">
            <h2>X-ray Details for {selectedPatient.name}</h2>
            
            <form className="xray-details-form">
              <div className="form-group">
                <label>X-ray Type *</label>
                <select
                  value={requestData.xrayType}
                  onChange={(e) => setRequestData({...requestData, xrayType: e.target.value})}
                  required
                >
                  <option value="">Select X-ray type</option>
                  {xrayTypes.map(type => (
                    <option key={type.id} value={type.name}>
                      {type.name} - {type.description}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Priority</label>
                <div className="priority-options">
                  <label className="priority-option">
                    <input
                      type="radio"
                      name="priority"
                      value="normal"
                      checked={requestData.priority === 'normal'}
                      onChange={(e) => setRequestData({...requestData, priority: e.target.value})}
                    />
                    <span className="priority-label normal">🟢 Normal</span>
                  </label>
                  <label className="priority-option">
                    <input
                      type="radio"
                      name="priority"
                      value="urgent"
                      checked={requestData.priority === 'urgent'}
                      onChange={(e) => setRequestData({...requestData, priority: e.target.value})}
                    />
                    <span className="priority-label urgent">🔴 Urgent</span>
                  </label>
                </div>
              </div>

              {requestData.priority === 'urgent' && (
                <div className="form-group">
                  <label>Reason for Urgency *</label>
                  <textarea
                    value={requestData.urgentReason}
                    onChange={(e) => setRequestData({...requestData, urgentReason: e.target.value})}
                    placeholder="Explain why this X-ray is urgent..."
                    rows="3"
                    required
                  />
                </div>
              )}

              <div className="form-group">
                <label>Special Instructions</label>
                <textarea
                  value={requestData.instructions}
                  onChange={(e) => setRequestData({...requestData, instructions: e.target.value})}
                  placeholder="Any specific instructions for the technician..."
                  rows="4"
                />
              </div>

              <div className="form-group">
                <label>Clinical Notes</label>
                <textarea
                  placeholder="Add clinical notes or diagnosis..."
                  rows="3"
                />
              </div>

              <div className="form-actions">
                <button className="back-btn" onClick={() => setStep(1)}>← Back</button>
                <button 
                  type="button"
                  className="next-btn"
                  onClick={() => setStep(3)}
                  disabled={!requestData.xrayType || (requestData.priority === 'urgent' && !requestData.urgentReason)}
                >
                  Review Request →
                </button>
              </div>
            </form>
          </div>
        )}

        {step === 3 && selectedPatient && (
          <div className="step-content">
            <h2>Review X-ray Request</h2>
            
            <div className="review-card">
              <div className="review-section">
                <h3>Patient Information</h3>
                <div className="review-row">
                  <span className="label">Name:</span>
                  <span className="value">{selectedPatient.name}</span>
                </div>
                <div className="review-row">
                  <span className="label">ID:</span>
                  <span className="value">{selectedPatient.id}</span>
                </div>
                <div className="review-row">
                  <span className="label">Age:</span>
                  <span className="value">{selectedPatient.age}</span>
                </div>
                <div className="review-row">
                  <span className="label">Phone:</span>
                  <span className="value">{selectedPatient.phone}</span>
                </div>
              </div>

              <div className="review-section">
                <h3>X-ray Details</h3>
                <div className="review-row">
                  <span className="label">Type:</span>
                  <span className="value">{requestData.xrayType}</span>
                </div>
                <div className="review-row">
                  <span className="label">Priority:</span>
                  <span className={`value priority-badge ${requestData.priority}`}>
                    {requestData.priority === 'urgent' ? '🔴 Urgent' : '🟢 Normal'}
                  </span>
                </div>
                {requestData.priority === 'urgent' && (
                  <div className="review-row">
                    <span className="label">Urgent Reason:</span>
                    <span className="value">{requestData.urgentReason}</span>
                  </div>
                )}
                <div className="review-row">
                  <span className="label">Instructions:</span>
                  <span className="value">{requestData.instructions || 'None'}</span>
                </div>
              </div>

              <div className="review-section">
                <h3>Doctor Information</h3>
                <div className="review-row">
                  <span className="label">Doctor:</span>
                  <span className="value">Dr. Mona Abdallah</span>
                </div>
                <div className="review-row">
                  <span className="label">Date:</span>
                  <span className="value">{new Date().toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            <div className="form-actions">
              <button className="back-btn" onClick={() => setStep(2)}>← Edit</button>
              <button className="confirm-btn" onClick={handleSubmit}>
                ✓ Submit Request
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorXrayRequest;