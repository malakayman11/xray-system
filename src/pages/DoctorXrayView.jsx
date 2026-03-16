import React, { useState } from 'react';
import { mockRequests, mockImages } from '../data/mockData';
import '../styles/DoctorXrayView.css';

const DoctorXrayView = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [selectedPatient] = useState(mockRequests[0]);
  const [images] = useState(mockImages);

  const handleDownload = (image) => {
    // Simulate download
    alert(`Downloading: ${image.description}`);
  };

  const handleDownloadAll = () => {
    alert('Downloading all images');
  };

  const adjustImage = (action) => {
    switch(action) {
      case 'zoomIn':
        setZoomLevel(prev => Math.min(prev + 0.2, 3));
        break;
      case 'zoomOut':
        setZoomLevel(prev => Math.max(prev - 0.2, 0.5));
        break;
      case 'reset':
        setZoomLevel(1);
        setBrightness(100);
        setContrast(100);
        break;
      default:
        break;
    }
  };

  const handleBrightnessUp = () => {
    setBrightness(prev => Math.min(prev + 10, 200));
  };

  const handleBrightnessDown = () => {
    setBrightness(prev => Math.max(prev - 10, 0));
  };

  const handleContrastUp = () => {
    setContrast(prev => Math.min(prev + 10, 200));
  };

  const handleContrastDown = () => {
    setContrast(prev => Math.max(prev - 10, 0));
  };

  return (
    <div className="doctor-view">
      {/* Top Bar */}
      <div className="view-header">
        <div className="patient-info">
          <h1>{selectedPatient.patientName}</h1>
          <div className="patient-details">
            <span className="patient-id">ID: {selectedPatient.patientId}</span>
            <span className="patient-age">Age: {selectedPatient.patientAge}</span>
            <span className="doctor-name">Doctor: {selectedPatient.doctor}</span>
            <span className="exam-date">Date: {selectedPatient.date}</span>
          </div>
        </div>
        
        <div className="header-actions">
          <button className="download-all-btn" onClick={handleDownloadAll}>
            ⬇️ Download All
          </button>
          <button className="share-btn">🔗 Share</button>
          <button className="print-btn">🖨️ Print</button>
        </div>
      </div>

      <div className="viewer-container">
        {/* Sidebar with thumbnails */}
        <div className="thumbnails-sidebar">
          <h3>X-ray Images</h3>
          <div className="thumbnails-list">
            {images.map(image => (
              <div 
                key={image.id}
                className={`thumbnail-item ${selectedImage?.id === image.id ? 'active' : ''}`}
                onClick={() => setSelectedImage(image)}
              >
                <img src={image.thumbnail} alt={image.type} />
                <div className="thumbnail-info">
                  <span className="image-type">{image.type}</span>
                  <span className="image-date">{image.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main viewer area */}
        <div className="main-viewer">
          {selectedImage ? (
            <>
              {/* Toolbar */}
              <div className="image-toolbar">
                <button onClick={() => adjustImage('zoomIn')} title="Zoom In">
                  🔍+ Zoom In
                </button>
                <button onClick={() => adjustImage('zoomOut')} title="Zoom Out">
                  🔍- Zoom Out
                </button>
                <button onClick={() => adjustImage('reset')} title="Reset">
                  ↩️ Reset
                </button>
                
                <div className="toolbar-divider"></div>
                
                <button onClick={handleBrightnessUp} title="Brightness Up">
                  ☀️ Brightness +
                </button>
                <button onClick={handleBrightnessDown} title="Brightness Down">
                  ☀️ Brightness -
                </button>
                
                <div className="toolbar-divider"></div>
                
                <button onClick={handleContrastUp} title="Contrast Up">
                  ◐ Contrast +
                </button>
                <button onClick={handleContrastDown} title="Contrast Down">
                  ◐ Contrast -
                </button>
                
                <div className="toolbar-divider"></div>
                
                <button 
                  className="download-single-btn" 
                  onClick={() => handleDownload(selectedImage)}
                >
                  ⬇️ Download
                </button>
              </div>

              {/* Image display */}
              <div className="image-container">
                <img 
                  src={selectedImage.url} 
                  alt={selectedImage.type}
                  style={{
                    transform: `scale(${zoomLevel})`,
                    filter: `brightness(${brightness}%) contrast(${contrast}%)`
                  }}
                />
              </div>

              {/* Image details */}
              <div className="image-details">
                <h4>{selectedImage.description}</h4>
                <div className="details-grid">
                  <p><strong>Type:</strong> {selectedImage.type}</p>
                  <p><strong>Date:</strong> {selectedImage.date}</p>
                  <p><strong>Patient ID:</strong> {selectedImage.patientId}</p>
                </div>
              </div>
            </>
          ) : (
            <div className="no-image-selected">
              <div className="placeholder-icon">🖼️</div>
              <h3>Select an image to view</h3>
              <p>Click on any thumbnail from the sidebar</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorXrayView;