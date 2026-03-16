import React, { useState } from 'react';
import { mockRequests } from '../data/mockData';
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
    <div className="technician-dashboard">
      <div className="dashboard-header">
        <h1>
          X-ray Requests 
          <span className="badge">{requests.length} total</span>
        </h1>
        <div className="header-actions">
          <input 
            type="text" 
            placeholder="Search by patient name..." 
            className="search-box"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="filters-row">
        <button 
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All Requests
        </button>
        <button 
          className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
          onClick={() => setFilter('pending')}
        >
          Pending Upload
        </button>
        <button 
          className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
          onClick={() => setFilter('completed')}
        >
          Completed
        </button>
        <button 
          className={`filter-btn urgent-filter ${filter === 'urgent' ? 'active' : ''}`}
          onClick={() => setFilter('urgent')}
        >
          Urgent
        </button>
      </div>

      <div className="requests-table-container">
        <table className="requests-table">
          <thead>
            <tr>
              <th>Request ID</th>
              <th>Patient</th>
              <th>X-ray Type</th>
              <th>Doctor</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests.length > 0 ? (
              filteredRequests.map(request => (
                <tr 
                  key={request.id} 
                  className={request.priority === 'urgent' ? 'urgent-row' : ''}
                >
                  <td>
                    <span className="request-id">{request.id}</span>
                  </td>
                  <td>
                    <div className="patient-info">
                      <strong>{request.patientName}</strong>
                      <small>{request.patientId}</small>
                    </div>
                  </td>
                  <td>{request.type}</td>
                  <td>{request.doctor}</td>
                  <td>{request.date}</td>
                  <td>
                    <span className={`status-badge ${request.status}`}>
                      {request.status === 'pending' ? 'Pending' : 'Completed'}
                    </span>
                  </td>
                  <td>
                    {request.status === 'pending' ? (
                      <button 
                        className="action-btn upload-btn"
                        onClick={() => onSelectRequest(request)}
                      >
                        Upload Images
                      </button>
                    ) : (
                      <button className="action-btn view-btn" disabled>
                        Completed
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="no-results">
                  No requests found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="stats-cards">
        <div className="stat-card">
          <span className="stat-value">{pendingCount}</span>
          <span className="stat-label">Pending Upload</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{completedCount}</span>
          <span className="stat-label">Completed</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{urgentCount}</span>
          <span className="stat-label">Urgent</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{requests.length}</span>
          <span className="stat-label">Total Requests</span>
        </div>
      </div>
    </div>
  );
};

export default TechnicianRequests;