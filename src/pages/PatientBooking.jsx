import React, { useState } from 'react';
import { doctors, appointments } from '../data/mockData';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { MotionDiv } from '../components/animations/motionPresets';
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
    <div className="booking-page mx-auto max-w-5xl px-1 py-3 sm:px-2 md:px-0 md:py-4">
      <div className="booking-header mb-6 md:mb-8">
        <h1 className="bg-gradient-to-r from-sky-400 via-cyan-300 to-emerald-300 bg-clip-text text-2xl font-semibold tracking-tight text-transparent md:text-3xl">
          Book an Appointment
        </h1>
          <div className="steps-indicator relative mt-4 flex items-center justify-between gap-2">
          <div className="pointer-events-none absolute left-4 right-4 top-1/2 h-px -translate-y-1/2 bg-slate-700/70" />
          {[1, 2, 3, 4].map((value, index) => (
            <div
              key={value}
              className={`step relative z-10 flex flex-col items-center rounded-full px-2 py-1 text-xs ${
                step >= value ? 'active' : ''
              }`}
            >
              <span
                className={`step-number flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold shadow-soft-card ${
                  step >= value
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-slate-800 text-slate-400'
                }`}
              >
                {step > value ? '✓' : value}
              </span>
              <span className="mt-1 text-[11px] uppercase tracking-[0.16em] text-slate-400">
                {['Patient Info', 'Select Doctor', 'Date & Time', 'Confirm'][
                  index
                ]}
              </span>
            </div>
          ))}
        </div>
      </div>

      <MotionDiv
        key={step}
        initial={{ opacity: 0, y: 12, scale: 0.99 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      >
        <Card className="booking-container border-slate-700/70 bg-slate-900/80 shadow-soft-elevated">
          <CardContent className="step-content px-5 py-5 sm:px-6 sm:py-6 md:px-8 md:py-7">
            {step === 1 && (
              <>
                <h2 className="mb-5 text-lg font-semibold text-slate-50 md:text-xl">
                  Patient Information
                </h2>
                <form className="booking-form grid max-w-2xl gap-4">
                  <div className="form-group">
                    <label className="mb-1.5 block text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
                      Full Name <span className="text-rose-400">*</span>
                    </label>
                    <Input
                      type="text"
                      name="patientName"
                      value={bookingData.patientName}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="mb-1.5 block text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
                      Phone Number <span className="text-rose-400">*</span>
                    </label>
                    <Input
                      type="tel"
                      name="patientPhone"
                      value={bookingData.patientPhone}
                      onChange={handleInputChange}
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="mb-1.5 block text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
                      Email Address
                    </label>
                    <Input
                      type="email"
                      name="patientEmail"
                      value={bookingData.patientEmail}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                    />
                  </div>

                  <div className="form-group">
                    <label className="mb-1.5 block text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
                      Reason for Visit
                    </label>
                    <Textarea
                      name="reason"
                      value={bookingData.reason}
                      onChange={handleInputChange}
                      placeholder="Briefly describe your dental issue"
                      rows="3"
                    />
                  </div>

                  <div className="form-actions mt-4 flex flex-col items-stretch justify-between gap-3 sm:flex-row">
                    <span className="text-xs text-slate-500">
                      Step 1 of 4 • Patient details
                    </span>
                    <Button
                      type="button"
                      className="next-btn min-w-[140px]"
                      onClick={() => setStep(2)}
                      disabled={
                        !bookingData.patientName || !bookingData.patientPhone
                      }
                    >
                      Next →
                    </Button>
                  </div>
                </form>
              </>
            )}

            {step === 2 && (
              <>
                <h2 className="mb-5 text-lg font-semibold text-slate-50 md:text-xl">
                  Select Doctor
                </h2>
                <div className="doctors-grid mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {doctors.map((doctor) => (
                    <button
                      key={doctor.id}
                      type="button"
                      onClick={() =>
                        setBookingData({ ...bookingData, doctor: doctor.name })
                      }
                      className={`doctor-card group flex flex-col items-center rounded-2xl border px-4 py-4 text-center transition-all ${
                        bookingData.doctor === doctor.name
                          ? 'border-sky-400/80 bg-sky-500/10 shadow-soft-card'
                          : 'border-slate-700/70 bg-slate-900/70 hover:border-sky-400/60 hover:bg-slate-900'
                      }`}
                    >
                      <div className="doctor-avatar mb-2 text-4xl drop-shadow-[0_0_20px_rgba(56,189,248,0.6)]">
                        👨‍⚕️
                      </div>
                      <h3 className="mb-1 text-sm font-semibold text-slate-50">
                        {doctor.name}
                      </h3>
                      <p className="specialty mb-3 text-xs text-slate-400">
                        {doctor.specialty}
                      </p>
                      <span
                        className={`select-btn inline-flex items-center justify-center rounded-full px-3 py-1 text-xs font-medium ${
                          bookingData.doctor === doctor.name
                            ? 'bg-primary text-primary-foreground shadow-soft-card'
                            : 'border border-slate-600/70 text-slate-200 group-hover:border-sky-400/80'
                        }`}
                      >
                        {bookingData.doctor === doctor.name
                          ? '✓ Selected'
                          : 'Select'}
                      </span>
                    </button>
                  ))}
                </div>

                <div className="form-actions mt-2 flex flex-col items-stretch justify-between gap-3 sm:flex-row">
                  <Button
                    type="button"
                    variant="secondary"
                    className="back-btn min-w-[120px]"
                    onClick={() => setStep(1)}
                  >
                    ← Back
                  </Button>
                  <Button
                    type="button"
                    className="next-btn min-w-[140px]"
                    onClick={() => setStep(3)}
                    disabled={!bookingData.doctor}
                  >
                    Next →
                  </Button>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <h2 className="mb-5 text-lg font-semibold text-slate-50 md:text-xl">
                  Select Date &amp; Time
                </h2>

                <div className="datetime-selection grid gap-6 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1.4fr)]">
                  <div className="date-picker">
                    <label className="mb-1.5 block text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
                      Select Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={bookingData.date}
                      onChange={handleInputChange}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full rounded-xl border border-slate-700/60 bg-slate-900/60 px-3 py-2 text-sm text-slate-100 shadow-soft-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                    />
                  </div>

                  <div className="time-slots">
                    <label className="mb-1.5 block text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
                      Available Time Slots
                    </label>
                    <div className="times-grid grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
                      {availableTimes.map((time) => (
                        <button
                          key={time}
                          type="button"
                          className={`time-slot rounded-xl px-3 py-2 text-xs font-medium transition-all ${
                            bookingData.time === time
                              ? 'bg-primary text-primary-foreground shadow-soft-card'
                              : 'border border-slate-700/70 bg-slate-900/60 text-slate-200 hover:border-sky-400/80 hover:bg-slate-900'
                          }`}
                          onClick={() =>
                            setBookingData({ ...bookingData, time })
                          }
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="form-actions mt-6 flex flex-col items-stretch justify-between gap-3 sm:flex-row">
                  <Button
                    type="button"
                    variant="secondary"
                    className="back-btn min-w-[120px]"
                    onClick={() => setStep(2)}
                  >
                    ← Back
                  </Button>
                  <Button
                    type="button"
                    className="next-btn min-w-[140px]"
                    onClick={() => setStep(4)}
                    disabled={!bookingData.date || !bookingData.time}
                  >
                    Next →
                  </Button>
                </div>
              </>
            )}

            {step === 4 && (
              <>
                <h2 className="mb-5 text-lg font-semibold text-slate-50 md:text-xl">
                  Confirm Your Appointment
                </h2>

                <div className="confirmation-card mb-6 rounded-2xl border border-slate-700/70 bg-slate-900/70 px-5 py-4 shadow-soft-card md:px-6 md:py-5">
                  <h3 className="mb-4 border-b border-slate-700/70 pb-3 text-sm font-semibold text-slate-100 md:text-base">
                    Appointment Summary
                  </h3>

                  <div className="space-y-2">
                    <div className="summary-row flex items-start gap-3 border-b border-slate-800/80 pb-2 text-sm">
                      <span className="label w-24 shrink-0 text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
                        Patient
                      </span>
                      <span className="value text-slate-50">
                        {bookingData.patientName}
                      </span>
                    </div>

                    <div className="summary-row flex items-start gap-3 border-b border-slate-800/80 pb-2 text-sm">
                      <span className="label w-24 shrink-0 text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
                        Phone
                      </span>
                      <span className="value text-slate-50">
                        {bookingData.patientPhone}
                      </span>
                    </div>

                    <div className="summary-row flex items-start gap-3 border-b border-slate-800/80 pb-2 text-sm">
                      <span className="label w-24 shrink-0 text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
                        Doctor
                      </span>
                      <span className="value text-slate-50">
                        {bookingData.doctor}
                      </span>
                    </div>

                    <div className="summary-row flex items-start gap-3 border-b border-slate-800/80 pb-2 text-sm">
                      <span className="label w-24 shrink-0 text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
                        Date
                      </span>
                      <span className="value text-slate-50">
                        {bookingData.date}
                      </span>
                    </div>

                    <div className="summary-row flex items-start gap-3 border-b border-slate-800/80 pb-2 text-sm">
                      <span className="label w-24 shrink-0 text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
                        Time
                      </span>
                      <span className="value text-slate-50">
                        {bookingData.time}
                      </span>
                    </div>

                    <div className="summary-row flex items-start gap-3 text-sm">
                      <span className="label w-24 shrink-0 text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
                        Reason
                      </span>
                      <span className="value text-slate-50">
                        {bookingData.reason || 'Not specified'}
                      </span>
                    </div>
                  </div>

                  <div className="terms mt-4 flex items-start gap-2 text-xs text-slate-400">
                    <input
                      type="checkbox"
                      id="terms"
                      className="mt-0.5 h-4 w-4 rounded border-slate-600 bg-slate-900 text-sky-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                    />
                    <label htmlFor="terms" className="leading-relaxed">
                      I confirm that the information provided is correct
                    </label>
                  </div>
                </div>

                <div className="form-actions mt-2 flex flex-col items-stretch justify-between gap-3 sm:flex-row">
                  <Button
                    type="button"
                    variant="secondary"
                    className="back-btn min-w-[120px]"
                    onClick={() => setStep(3)}
                  >
                    ← Back
                  </Button>
                  <Button
                    type="button"
                    className="confirm-btn min-w-[170px]"
                    onClick={handleSubmit}
                  >
                    ✓ Confirm Booking
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </MotionDiv>
    </div>
  );
};

export default PatientBooking;