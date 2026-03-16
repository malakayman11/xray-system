import React, { useState } from 'react';
import { patients, xrayTypes } from '../data/mockData';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Badge } from '../components/ui/badge';
import { MotionDiv } from '../components/animations/motionPresets';
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
    <div className="xray-request-page mx-auto max-w-5xl px-1 py-3 sm:px-2 md:px-0 md:py-4">
      <div className="request-header mb-6 md:mb-8">
        <h1 className="bg-gradient-to-r from-sky-400 via-cyan-300 to-emerald-300 bg-clip-text text-2xl font-semibold tracking-tight text-transparent md:text-3xl">
          New X-ray Request
        </h1>
        <div className="steps-indicator relative mt-4 flex items-center justify-between gap-2">
          <div className="pointer-events-none absolute left-4 right-4 top-1/2 h-px -translate-y-1/2 bg-slate-700/70" />
          {['Select Patient', 'X-ray Details', 'Review'].map((label, index) => {
            const value = index + 1;
            return (
              <div
                key={label}
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
                  {label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <MotionDiv
        key={step}
        initial={{ opacity: 0, y: 12, scale: 0.99 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      >
        <Card className="request-container border-slate-700/70 bg-slate-900/80 shadow-soft-elevated">
          <CardContent className="step-content px-5 py-5 sm:px-6 sm:py-6 md:px-8 md:py-7">
            {step === 1 && (
              <>
                <h2 className="mb-5 text-lg font-semibold text-slate-50 md:text-xl">
                  Select Patient
                </h2>

                <div className="search-section mb-4">
                  <Input
                    type="text"
                    placeholder="Search by patient name or ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="patient-search"
                  />
                </div>

                <div className="patients-list flex flex-col gap-3">
                  {filteredPatients.length > 0 ? (
                    filteredPatients.map((patient) => (
                      <button
                        key={patient.id}
                        type="button"
                        className="patient-card flex items-center gap-4 rounded-2xl border border-slate-700/70 bg-slate-900/70 px-4 py-4 text-left shadow-soft-card transition-all hover:border-sky-400/80 hover:bg-slate-900"
                        onClick={() => handleSelectPatient(patient)}
                      >
                        <div className="patient-avatar text-3xl drop-shadow-[0_0_18px_rgba(56,189,248,0.7)]">
                          👤
                        </div>
                        <div className="patient-info flex-1">
                          <h3 className="mb-1 text-sm font-semibold text-slate-50">
                            {patient.name}
                          </h3>
                          <p className="text-xs text-slate-400">
                            ID: {patient.id} · Age: {patient.age} · Phone:{' '}
                            {patient.phone}
                          </p>
                          <p className="last-visit mt-1 text-xs text-emerald-300">
                            Last Visit: {patient.lastVisit}
                          </p>
                        </div>
                        <Button size="sm" className="select-patient-btn">
                          Select
                        </Button>
                      </button>
                    ))
                  ) : (
                    <div className="no-patients rounded-2xl border border-slate-700/70 bg-slate-900/70 px-6 py-8 text-center text-sm text-slate-300">
                      <p className="mb-4 text-slate-400">No patients found</p>
                      <Button className="new-patient-btn" size="sm">
                        + Register New Patient
                      </Button>
                    </div>
                  )}
                </div>
              </>
            )}

            {step === 2 && selectedPatient && (
              <>
                <h2 className="mb-5 text-lg font-semibold text-slate-50 md:text-xl">
                  X-ray Details for {selectedPatient.name}
                </h2>

                <form className="xray-details-form grid max-w-2xl gap-4">
                  <div className="form-group">
                    <label className="mb-1.5 block text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
                      X-ray Type <span className="text-rose-400">*</span>
                    </label>
                    <select
                      value={requestData.xrayType}
                      onChange={(e) =>
                        setRequestData({
                          ...requestData,
                          xrayType: e.target.value,
                        })
                      }
                      required
                      className="w-full rounded-xl border border-slate-700/60 bg-slate-900/60 px-3 py-2 text-sm text-slate-100 shadow-soft-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                    >
                      <option value="">Select X-ray type</option>
                      {xrayTypes.map((type) => (
                        <option key={type.id} value={type.name}>
                          {type.name} - {type.description}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="mb-1.5 block text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
                      Priority
                    </label>
                    <div className="priority-options flex flex-wrap gap-3">
                      <label className="priority-option inline-flex cursor-pointer items-center gap-2">
                        <input
                          type="radio"
                          name="priority"
                          value="normal"
                          checked={requestData.priority === 'normal'}
                          onChange={(e) =>
                            setRequestData({
                              ...requestData,
                              priority: e.target.value,
                            })
                          }
                        />
                        <span className="priority-label normal inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-medium text-emerald-300">
                          <span>🟢</span> Normal
                        </span>
                      </label>
                      <label className="priority-option inline-flex cursor-pointer items-center gap-2">
                        <input
                          type="radio"
                          name="priority"
                          value="urgent"
                          checked={requestData.priority === 'urgent'}
                          onChange={(e) =>
                            setRequestData({
                              ...requestData,
                              priority: e.target.value,
                            })
                          }
                        />
                        <span className="priority-label urgent inline-flex items-center gap-1 rounded-full bg-rose-500/15 px-3 py-1 text-xs font-medium text-rose-300">
                          <span>🔴</span> Urgent
                        </span>
                      </label>
                    </div>
                  </div>

                  {requestData.priority === 'urgent' && (
                    <div className="form-group">
                      <label className="mb-1.5 block text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
                        Reason for Urgency <span className="text-rose-400">*</span>
                      </label>
                      <Textarea
                        value={requestData.urgentReason}
                        onChange={(e) =>
                          setRequestData({
                            ...requestData,
                            urgentReason: e.target.value,
                          })
                        }
                        placeholder="Explain why this X-ray is urgent..."
                        rows="3"
                        required
                      />
                    </div>
                  )}

                  <div className="form-group">
                    <label className="mb-1.5 block text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
                      Special Instructions
                    </label>
                    <Textarea
                      value={requestData.instructions}
                      onChange={(e) =>
                        setRequestData({
                          ...requestData,
                          instructions: e.target.value,
                        })
                      }
                      placeholder="Any specific instructions for the technician..."
                      rows="4"
                    />
                  </div>

                  <div className="form-group">
                    <label className="mb-1.5 block text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
                      Clinical Notes
                    </label>
                    <Textarea
                      placeholder="Add clinical notes or diagnosis..."
                      rows="3"
                    />
                  </div>

                  <div className="form-actions mt-4 flex flex-col items-stretch justify-between gap-3 sm:flex-row">
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
                      className="next-btn min-w-[160px]"
                      onClick={() => setStep(3)}
                      disabled={
                        !requestData.xrayType ||
                        (requestData.priority === 'urgent' &&
                          !requestData.urgentReason)
                      }
                    >
                      Review Request →
                    </Button>
                  </div>
                </form>
              </>
            )}

            {step === 3 && selectedPatient && (
              <>
                <h2 className="mb-5 text-lg font-semibold text-slate-50 md:text-xl">
                  Review X-ray Request
                </h2>

                <div className="review-card grid gap-4 rounded-2xl border border-slate-700/70 bg-slate-900/70 px-5 py-4 shadow-soft-card md:grid-cols-3 md:px-6 md:py-5">
                  <div className="review-section md:col-span-1">
                    <h3 className="mb-3 border-b border-slate-700/70 pb-2 text-sm font-semibold text-slate-100">
                      Patient Information
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="review-row flex items-start gap-2 border-b border-slate-800/80 pb-2">
                        <span className="label w-20 text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
                          Name
                        </span>
                        <span className="value text-slate-50">
                          {selectedPatient.name}
                        </span>
                      </div>
                      <div className="review-row flex items-start gap-2 border-b border-slate-800/80 pb-2">
                        <span className="label w-20 text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
                          ID
                        </span>
                        <span className="value text-slate-50">
                          {selectedPatient.id}
                        </span>
                      </div>
                      <div className="review-row flex items-start gap-2 border-b border-slate-800/80 pb-2">
                        <span className="label w-20 text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
                          Age
                        </span>
                        <span className="value text-slate-50">
                          {selectedPatient.age}
                        </span>
                      </div>
                      <div className="review-row flex items-start gap-2 text-sm">
                        <span className="label w-20 text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
                          Phone
                        </span>
                        <span className="value text-slate-50">
                          {selectedPatient.phone}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="review-section md:col-span-1">
                    <h3 className="mb-3 border-b border-slate-700/70 pb-2 text-sm font-semibold text-slate-100">
                      X-ray Details
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="review-row flex items-start gap-2 border-b border-slate-800/80 pb-2">
                        <span className="label w-20 text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
                          Type
                        </span>
                        <span className="value text-slate-50">
                          {requestData.xrayType}
                        </span>
                      </div>
                      <div className="review-row flex items-start gap-2 border-b border-slate-800/80 pb-2">
                        <span className="label w-20 text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
                          Priority
                        </span>
                        <span className="value">
                          <Badge
                            variant={
                              requestData.priority === 'urgent'
                                ? 'danger'
                                : 'success'
                            }
                          >
                            {requestData.priority === 'urgent'
                              ? '🔴 Urgent'
                              : '🟢 Normal'}
                          </Badge>
                        </span>
                      </div>
                      {requestData.priority === 'urgent' && (
                        <div className="review-row flex items-start gap-2 border-b border-slate-800/80 pb-2">
                          <span className="label w-20 text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
                            Urgent Reason
                          </span>
                          <span className="value text-slate-50">
                            {requestData.urgentReason}
                          </span>
                        </div>
                      )}
                      <div className="review-row flex items-start gap-2 text-sm">
                        <span className="label w-20 text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
                          Instructions
                        </span>
                        <span className="value text-slate-50">
                          {requestData.instructions || 'None'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="review-section md:col-span-1">
                    <h3 className="mb-3 border-b border-slate-700/70 pb-2 text-sm font-semibold text-slate-100">
                      Doctor Information
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="review-row flex items-start gap-2 border-b border-slate-800/80 pb-2">
                        <span className="label w-20 text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
                          Doctor
                        </span>
                        <span className="value text-slate-50">
                          Dr. Mona Abdallah
                        </span>
                      </div>
                      <div className="review-row flex items-start gap-2 text-sm">
                        <span className="label w-20 text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
                          Date
                        </span>
                        <span className="value text-slate-50">
                          {new Date().toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="form-actions mt-4 flex flex-col items-stretch justify-between gap-3 sm:flex-row">
                  <Button
                    type="button"
                    variant="secondary"
                    className="back-btn min-w-[120px]"
                    onClick={() => setStep(2)}
                  >
                    ← Edit
                  </Button>
                  <Button
                    type="button"
                    className="confirm-btn min-w-[170px]"
                    onClick={handleSubmit}
                  >
                    ✓ Submit Request
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

export default DoctorXrayRequest;