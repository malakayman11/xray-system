import React, { useState } from 'react';
import '../styles/UploadXray.css';

const UploadXray = ({ request, onBack, onUploadComplete }) => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    const newFiles = files.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      name: file.name,
      size: (file.size / 1024).toFixed(2),
      type: file.type,
      progress: 0
    }));
    
    setUploadedFiles([...uploadedFiles, ...newFiles]);
    
    // Simulate file upload
    newFiles.forEach((file) => {
      simulateUpload(file.name);
    });
  };

  const simulateUpload = (fileName) => {
    setIsUploading(true);
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(prev => ({
        ...prev,
        [fileName]: progress
      }));
      
      if (progress >= 100) {
        clearInterval(interval);
        setIsUploading(false);
      }
    }, 200);
  };

  const removeFile = (fileName) => {
    setUploadedFiles(uploadedFiles.filter(f => f.name !== fileName));
    setUploadProgress(prev => {
      const newProgress = {...prev};
      delete newProgress[fileName];
      return newProgress;
    });
  };

  const handleComplete = () => {
    if (uploadedFiles.length === 0) {
      alert('Please upload at least one image');
      return;
    }

    // Check if all files are uploaded
    const allUploaded = uploadedFiles.every(file => uploadProgress[file.name] === 100);
    
    if (!allUploaded) {
      alert('Please wait for all files to finish uploading');
      return;
    }

    onUploadComplete(request.id, uploadedFiles);
  };

  const getFileIcon = (fileType) => {
    if (fileType.includes('image')) return '🖼️';
    return '📄';
  };

  return (
    <div className="upload-page">
      <div className="upload-header">
        <button className="back-btn" onClick={onBack}>
          ← Back to List
        </button>
        <h2>Upload X-ray Images - {request.patientName}</h2>
      </div>

      <div className="upload-container">
        <div className="patient-info-card">
          <h3>Request Details</h3>
          <div className="info-grid">
            <div className="info-item">
              <strong>Request ID:</strong> {request.id}
            </div>
            <div className="info-item">
              <strong>Patient:</strong> {request.patientName}
            </div>
            <div className="info-item">
              <strong>Patient ID:</strong> {request.patientId}
            </div>
            <div className="info-item">
              <strong>X-ray Type:</strong> {request.type}
            </div>
            <div className="info-item">
              <strong>Doctor:</strong> {request.doctor}
            </div>
            <div className="info-item full-width">
              <strong>Notes:</strong> {request.notes}
            </div>
          </div>
        </div>

        <div className="upload-area-card">
          <div className="upload-zone">
            <input
              type="file"
              accept="image/*,.dicom"
              multiple
              onChange={handleFileUpload}
              id="xray-upload"
              className="file-input"
            />
            <label htmlFor="xray-upload" className="upload-label">
              <div className="upload-icon">📤</div>
              <h3>Click or Drag X-ray images here</h3>
              <p>Supported formats: JPG, PNG, DICOM, JPEG</p>
              <small>Maximum size: 50 MB per file</small>
            </label>
          </div>

          {uploadedFiles.length > 0 && (
            <div className="files-list">
              <h4>Uploaded Files ({uploadedFiles.length})</h4>
              
              {uploadedFiles.map((file, index) => (
                <div key={index} className="file-item">
                  <div className="file-info">
                    <div className="file-icon">
                      {getFileIcon(file.type)}
                    </div>
                    <div className="file-details">
                      <span className="file-name">{file.name}</span>
                      <span className="file-size">{file.size} KB</span>
                    </div>
                  </div>
                  
                  <div className="file-progress">
                    {uploadProgress[file.name] < 100 ? (
                      <>
                        <div className="progress-bar">
                          <div 
                            className="progress-fill"
                            style={{width: `${uploadProgress[file.name] || 0}%`}}
                          ></div>
                        </div>
                        <span className="progress-text">
                          {uploadProgress[file.name] || 0}%
                        </span>
                      </>
                    ) : (
                      <span className="completed-check">✓ Uploaded</span>
                    )}
                  </div>

                  <button 
                    className="remove-file-btn"
                    onClick={() => removeFile(file.name)}
                    disabled={uploadProgress[file.name] === 100}
                  >
                    ✕
                  </button>
                </div>
              ))}

              <div className="upload-actions">
                <button 
                  className="complete-upload-btn"
                  onClick={handleComplete}
                  disabled={uploadedFiles.length === 0 || isUploading}
                >
                  {isUploading ? 'Uploading...' : 'Confirm Upload & Complete Request'}
                </button>
              </div>
            </div>
          )}

          {uploadedFiles.length > 0 && (
            <div className="preview-section">
              <h4>Preview</h4>
              <div className="preview-grid">
                {uploadedFiles.map((file, index) => (
                  file.preview && (
                    <div key={index} className="preview-item">
                      <img src={file.preview} alt={`Preview ${index}`} />
                    </div>
                  )
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadXray;