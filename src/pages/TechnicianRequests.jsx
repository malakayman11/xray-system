import React, { useState } from 'react';
import { mockRequests } from '../data/mockData';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { MotionDiv } from '../components/animations/motionPresets';
import '../styles/TechnicianRequests.css';

const TechnicianRequests = ({ onSelectRequest }) => {
  const [requests] = useState(mockRequests);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRequests = requests.filter(request => {
    // Apply status filter
    if (filter !== 'all' && filter !== 'urgent' && request.status !== filter) {
      return false;
    }
    if (filter === 'urgent' && request.priority !== 'urgent') {
      return false;
    }
    
    // Apply search filter
    if (searchTerm && !request.patientName.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  const pendingCount = requests.filter(r => r.status === 'pending').length;
  const completedCount = requests.filter(r => r.status === 'completed').length;
  const urgentCount = requests.filter(r => r.priority === 'urgent').length;

  return (
    <div className="technician-dashboard mx-auto max-w-6xl px-1 py-3 sm:px-2 md:px-0 md:py-4">
      <div className="dashboard-header mb-5 flex flex-col gap-4 border-b border-slate-800 pb-4 md:mb-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-semibold tracking-tight text-slate-50 md:text-3xl">
            X-ray Requests
            <Badge className="badge text-[11px] uppercase tracking-[0.16em]">
              {requests.length} total
            </Badge>
          </h1>
          <p className="mt-1 text-xs text-slate-500">
            Monitor incoming X-ray orders, prioritize urgent cases, and launch
            image uploads.
          </p>
        </div>
        <div className="header-actions flex items-center gap-2">
          <Input
            type="text"
            placeholder="Search by patient name..."
            className="search-box w-64 md:w-72"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="filters-row mb-4 flex flex-wrap gap-2">
        <div className="inline-flex rounded-full bg-slate-900/70 p-1 shadow-inner shadow-slate-900/60">
          <Button
            variant={filter === 'all' ? 'primary' : 'ghost'}
            size="pill"
            className="filter-btn px-3 text-xs md:px-4"
            onClick={() => setFilter('all')}
          >
            All Requests
          </Button>
          <Button
            variant={filter === 'pending' ? 'primary' : 'ghost'}
            size="pill"
            className="filter-btn px-3 text-xs md:px-4"
            onClick={() => setFilter('pending')}
          >
            Pending Upload
          </Button>
          <Button
            variant={filter === 'completed' ? 'primary' : 'ghost'}
            size="pill"
            className="filter-btn px-3 text-xs md:px-4"
            onClick={() => setFilter('completed')}
          >
            Completed
          </Button>
          <Button
            variant={filter === 'urgent' ? 'destructive' : 'ghost'}
            size="pill"
            className="filter-btn urgent-filter px-3 text-xs md:px-4"
            onClick={() => setFilter('urgent')}
          >
            Urgent
          </Button>
        </div>
      </div>

      <MotionDiv
        className="requests-table-container mb-6 overflow-x-auto rounded-2xl border border-slate-800/80 bg-slate-950/60 shadow-soft-card backdrop-blur-xl"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      >
        <table className="requests-table min-w-[800px] w-full border-collapse text-sm">
          <thead>
            <tr className="bg-slate-900/80">
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                Request ID
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                Patient
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                X-ray Type
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                Doctor
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                Date
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                Status
              </th>
              <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests.length > 0 ? (
              filteredRequests.map((request) => (
                <tr
                  key={request.id}
                  className={`transition-colors ${
                    request.priority === 'urgent'
                      ? 'bg-amber-500/5 hover:bg-amber-500/10'
                      : 'hover:bg-slate-900/60'
                  }`}
                >
                  <td className="px-4 py-3 align-top">
                    <span className="request-id inline-flex rounded-full bg-slate-800 px-3 py-1 text-[11px] font-semibold tracking-wide text-slate-100 shadow-soft-card">
                      {request.id}
                    </span>
                  </td>
                  <td className="px-4 py-3 align-top">
                    <div className="patient-info flex flex-col">
                      <strong className="text-sm font-semibold text-slate-50">
                        {request.patientName}
                      </strong>
                      <small className="text-xs text-slate-400">
                        {request.patientId}
                      </small>
                    </div>
                  </td>
                  <td className="px-4 py-3 align-top text-slate-100">
                    {request.type}
                  </td>
                  <td className="px-4 py-3 align-top text-slate-100">
                    {request.doctor}
                  </td>
                  <td className="px-4 py-3 align-top text-slate-300">
                    {request.date}
                  </td>
                  <td className="px-4 py-3 align-top">
                    <Badge
                      variant={
                        request.status === 'pending' ? 'warning' : 'success'
                      }
                      className="status-badge text-[11px]"
                    >
                      {request.status === 'pending' ? 'Pending' : 'Completed'}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 align-top text-right">
                    {request.status === 'pending' ? (
                      <Button
                        size="sm"
                        className="action-btn upload-btn"
                        onClick={() => onSelectRequest(request)}
                      >
                        Upload Images
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        className="action-btn view-btn opacity-60"
                        disabled
                      >
                        Completed
                      </Button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="no-results px-4 py-10 text-center text-sm text-slate-400"
                >
                  No requests found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </MotionDiv>

      <div className="stats-cards grid gap-4 md:grid-cols-4">
        <Card className="stat-card border-slate-800/80 bg-slate-950/70">
          <CardContent className="flex flex-col items-start gap-1 px-5 py-4">
            <span className="stat-label text-xs uppercase tracking-[0.18em] text-slate-400">
              Pending Upload
            </span>
            <span className="stat-value text-2xl font-semibold text-amber-300">
              {pendingCount}
            </span>
          </CardContent>
        </Card>
        <Card className="stat-card border-slate-800/80 bg-slate-950/70">
          <CardContent className="flex flex-col items-start gap-1 px-5 py-4">
            <span className="stat-label text-xs uppercase tracking-[0.18em] text-slate-400">
              Completed
            </span>
            <span className="stat-value text-2xl font-semibold text-emerald-300">
              {completedCount}
            </span>
          </CardContent>
        </Card>
        <Card className="stat-card border-slate-800/80 bg-slate-950/70">
          <CardContent className="flex flex-col items-start gap-1 px-5 py-4">
            <span className="stat-label text-xs uppercase tracking-[0.18em] text-slate-400">
              Urgent
            </span>
            <span className="stat-value text-2xl font-semibold text-rose-300">
              {urgentCount}
            </span>
          </CardContent>
        </Card>
        <Card className="stat-card border-slate-800/80 bg-slate-950/70">
          <CardContent className="flex flex-col items-start gap-1 px-5 py-4">
            <span className="stat-label text-xs uppercase tracking-[0.18em] text-slate-400">
              Total Requests
            </span>
            <span className="stat-value text-2xl font-semibold text-sky-300">
              {requests.length}
            </span>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TechnicianRequests;