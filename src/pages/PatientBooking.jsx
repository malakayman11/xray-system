import React, { useState } from 'react';
import { doctors, appointments } from '../data/mockData';
import '../styles/PatientBooking.css';

const PatientBooking = ({ onBookingComplete }) => {
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    patientName: '',
    patientPhone: '',
    patientEmail: '',
    date: '',
    time: '',
    doctor: '',
    reason: ''
  });

  const [availableTimes] = useState([
    '09:00 AM', '10:00 AM', '11:00 AM', 
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'
  ]);

  const doctors = [
    { id: 1, name: 'Dr. Mona Abdallah', specialty: 'Orthodontics' },
    { id: 2, name: 'Dr. Khaled Hassan', specialty: 'Oral Surgery' },
    { id: 3, name: 'Dr. Amr Mostafa', specialty: 'Pediatric Dentistry' }
  ];

  const handleInputChange = (e) => {
    setBookingData({
      ...bookingData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save booking
    console.log('Booking confirmed:', bookingData);
    alert(`Appointment confirmed for ${bookingData.patientName} on ${bookingData.date} at ${bookingData.time}`);
    onBookingComplete();
  };

  return (
    <div className="booking-page">
      <div className="booking-header">
        <h1>Book an Appointment</h1>
        <div className="steps-indicator">
          <div className={`step ${step >= 1 ? 'active' : ''}`}>
            <span className="step-number">1</span>
            <span>Patient Info</span>
          </div>
          <div className={`step ${step >= 2 ? 'active' : ''}`}>
            <span className="step-number">2</span>
            <span>Select Doctor</span>
          </div>
          <div className={`step ${step >= 3 ? 'active' : ''}`}>
            <span className="step-number">3</span>
            <span>Date & Time</span>
          </div>
          <div className={`step ${step >= 4 ? 'active' : ''}`}>
            <span className="step-number">4</span>
            <span>Confirm</span>
          </div>
        </div>
      </div>

      <div className="booking-container">
        {step === 1 && (
          <div className="step-content">
            <h2>Patient Information</h2>
            <form className="booking-form">
              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  name="patientName"
                  value={bookingData.patientName}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="form-group">
                <label>Phone Number *</label>
                <input
                  type="tel"
                  name="patientPhone"
                  value={bookingData.patientPhone}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                  required
                />
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  name="patientEmail"
                  value={bookingData.patientEmail}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                />
              </div>

              <div className="form-group">
                <label>Reason for Visit</label>
                <textarea
                  name="reason"
                  value={bookingData.reason}
                  onChange={handleInputChange}
                  placeholder="Briefly describe your dental issue"
                  rows="3"
                />
              </div>

              <div className="form-actions">
                <button 
                  type="button" 
                  className="next-btn"
                  onClick={() => setStep(2)}
                  disabled={!bookingData.patientName || !bookingData.patientPhone}
                >
                  Next →
                </button>
              </div>
            </form>
          </div>
        )}

        {step === 2 && (
          <div className="step-content">
            <h2>Select Doctor</h2>
            <div className="doctors-grid">
              {doctors.map(doctor => (
                <div 
                  key={doctor.id}
                  className={`doctor-card ${bookingData.doctor === doctor.name ? 'selected' : ''}`}
                  onClick={() => setBookingData({...bookingData, doctor: doctor.name})}
                >
                  <div className="doctor-avatar">👨‍⚕️</div>
                  <h3>{doctor.name}</h3>
                  <p className="specialty">{doctor.specialty}</p>
                  <button className="select-btn">
                    {bookingData.doctor === doctor.name ? '✓ Selected' : 'Select'}
                  </button>
                </div>
              ))}
            </div>

            <div className="form-actions">
              <button className="back-btn" onClick={() => setStep(1)}>← Back</button>
              <button 
                className="next-btn"
                onClick={() => setStep(3)}
                disabled={!bookingData.doctor}
              >
                Next →
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="step-content">
            <h2>Select Date & Time</h2>
            
            <div className="datetime-selection">
              <div className="date-picker">
                <label>Select Date</label>
                <input
                  type="date"
                  name="date"
                  value={bookingData.date}
                  onChange={handleInputChange}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div className="time-slots">
                <label>Available Time Slots</label>
                <div className="times-grid">
                  {availableTimes.map(time => (
                    <button
                      key={time}
                      className={`time-slot ${bookingData.time === time ? 'selected' : ''}`}
                      onClick={() => setBookingData({...bookingData, time})}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="form-actions">
              <button className="back-btn" onClick={() => setStep(2)}>← Back</button>
              <button 
                className="next-btn"
                onClick={() => setStep(4)}
                disabled={!bookingData.date || !bookingData.time}
              >
                Next →
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="step-content">
            <h2>Confirm Your Appointment</h2>
            
            <div className="confirmation-card">
              <h3>Appointment Summary</h3>
              
              <div className="summary-row">
                <span className="label">Patient:</span>
                <span className="value">{bookingData.patientName}</span>
              </div>
              
              <div className="summary-row">
                <span className="label">Phone:</span>
                <span className="value">{bookingData.patientPhone}</span>
              </div>
              
              <div className="summary-row">
                <span className="label">Doctor:</span>
                <span className="value">{bookingData.doctor}</span>
              </div>
              
              <div className="summary-row">
                <span className="label">Date:</span>
                <span className="value">{bookingData.date}</span>
              </div>
              
              <div className="summary-row">
                <span className="label">Time:</span>
                <span className="value">{bookingData.time}</span>
              </div>
              
              <div className="summary-row">
                <span className="label">Reason:</span>
                <span className="value">{bookingData.reason || 'Not specified'}</span>
              </div>

              <div className="terms">
                <input type="checkbox" id="terms" />
                <label htmlFor="terms">
                  I confirm that the information provided is correct
                </label>
              </div>
            </div>

            <div className="form-actions">
              <button className="back-btn" onClick={() => setStep(3)}>← Back</button>
              <button className="confirm-btn" onClick={handleSubmit}>
                ✓ Confirm Booking
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientBooking;