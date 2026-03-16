import React, { useEffect, useState } from 'react';
import PatientBooking from './pages/PatientBooking';
import DoctorXrayRequest from './pages/DoctorXrayRequest';
import TechnicianRequests from './pages/TechnicianRequests';
import UploadXray from './pages/UploadXray';
import DoctorXrayView from './pages/DoctorXrayView';
import { Button } from './components/ui/button';
import { Card, CardContent } from './components/ui/card';
import { MotionDiv } from './components/animations/motionPresets';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('patient'); // patient, doctor-request, technician, upload, doctor-view
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [userRole, setUserRole] = useState('patient'); // patient, doctor, technician
  const [theme, setTheme] = useState('dark'); // dark, light

  useEffect(() => {
    const stored = window.localStorage.getItem('xray-theme');
    if (stored === 'dark' || stored === 'light') {
      setTheme(stored);
    }
  }, []);

  useEffect(() => {
    document.body.classList.remove('theme-dark', 'theme-light');
    document.body.classList.add(theme === 'light' ? 'theme-light' : 'theme-dark');
    document.documentElement.style.colorScheme = theme === 'light' ? 'light' : 'dark';
    window.localStorage.setItem('xray-theme', theme);
  }, [theme]);

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

  const isDark = theme === 'dark';

  return (
    <div
      className={`App min-h-screen ${
        isDark
          ? 'bg-[radial-gradient(circle_at_top,_#0B1C2C_0,_#0F2438_38%,_#020617_80%,_#000000_100%)] text-slate-100'
          : 'bg-gradient-to-b from-[#F6F9FC] via-[#F9FBFF] to-[#ECF2FA] text-slate-900'
      } transition-colors duration-300`}
    >
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 py-6 md:px-8 md:py-10">
        {/* Top bar: theme + role switcher */}
        <MotionDiv
          className={`mb-6 flex flex-col gap-3 rounded-3xl border px-4 py-3 shadow-soft-card backdrop-blur-2xl md:mb-8 md:px-6 md:py-4 ${
            isDark
              ? 'border-slate-700/70 bg-slate-900/80'
              : 'border-[color:var(--border-subtle)] bg-[color:var(--bg-surface)]'
          }`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-slate-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.9)]" />
                Clinic workspace
              </div>
              <p className="text-xs text-slate-500">
                Switch theme and simulation role without affecting any data.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 md:gap-4">
              {/* Theme toggle */}
              <div
                className={`inline-flex items-center rounded-full border px-1 py-0.5 text-[11px] font-medium shadow-inner transition-colors ${
                  isDark
                    ? 'border-slate-700/70 bg-slate-900/80 text-slate-200'
                    : 'border-[color:var(--border-subtle)] bg-[color:var(--bg-surface-subtle)] text-[color:var(--text-secondary)]'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setTheme('dark')}
                  className={`flex items-center gap-1 rounded-full px-2 py-1 transition-all ${
                    isDark
                      ? 'bg-[color:var(--accent-primary)] text-[color:var(--accent-primary-foreground)] shadow-soft-card'
                      : 'text-slate-500'
                  }`}
                >
                  <span className="text-xs">🌙</span>
                  <span>Dark</span>
                </button>
                <button
                  type="button"
                  onClick={() => setTheme('light')}
                  className={`flex items-center gap-1 rounded-full px-2 py-1 transition-all ${
                    !isDark
                      ? 'bg-[color:var(--accent-primary)] text-[color:var(--accent-primary-foreground)] shadow-soft-card'
                      : 'text-slate-400'
                  }`}
                >
                  <span className="text-xs">☀️</span>
                  <span>Light</span>
                </button>
              </div>

              {/* Role switcher for demo */}
              <div
                className={`inline-flex rounded-full p-1 shadow-inner transition-colors ${
                  isDark
                    ? 'bg-slate-900/70 shadow-slate-900/60'
                    : 'bg-[color:var(--bg-surface-subtle)] shadow-slate-200/80'
                }`}
              >
                <Button
                  variant={userRole === 'patient' ? 'primary' : 'ghost'}
                  size="pill"
                  className="gap-1.5 px-3 text-xs md:px-4"
                  onClick={() => {
                    setUserRole('patient');
                    setCurrentPage('patient');
                  }}
                >
                  <span className="text-base leading-none">👤</span>
                  <span>Patient</span>
                </Button>
                <Button
                  variant={userRole === 'doctor' ? 'primary' : 'ghost'}
                  size="pill"
                  className="gap-1.5 px-3 text-xs md:px-4"
                  onClick={() => {
                    setUserRole('doctor');
                    setCurrentPage('doctor-request');
                  }}
                >
                  <span className="text-base leading-none">👨‍⚕️</span>
                  <span>Doctor</span>
                </Button>
                <Button
                  variant={userRole === 'technician' ? 'primary' : 'ghost'}
                  size="pill"
                  className="gap-1.5 px-3 text-xs md:px-4"
                  onClick={() => {
                    setUserRole('technician');
                    setCurrentPage('technician');
                  }}
                >
                  <span className="text-base leading-none">👨‍🔬</span>
                  <span>Technician</span>
                </Button>
              </div>
              <Card className="px-4 py-2 text-xs md:text-sm">
                <CardContent className="flex items-center gap-2 px-0 py-0">
                  <span className="text-[color:var(--text-secondary)]">
                    Current role
                  </span>
                  <span className="h-1 w-6 rounded-full bg-gradient-to-r from-sky-400/80 via-cyan-400/90 to-emerald-400/80 shadow-[0_0_14px_rgba(56,189,248,0.9)]" />
                  <span className="font-semibold text-[color:var(--text-primary)]">
                    {userRole === 'patient'
                      ? 'Patient'
                      : userRole === 'doctor'
                      ? 'Dentist'
                      : 'X-ray Technician'}
                  </span>
                </CardContent>
              </Card>
            </div>
          </div>
        </MotionDiv>

        {/* Main content */}
        <MotionDiv
          className="main-content flex-1"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut', delay: 0.1 }}
        >
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
              {currentPage === 'doctor-view' && <DoctorXrayView />}
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
        </MotionDiv>
      </div>
    </div>
  );
}

export default App;