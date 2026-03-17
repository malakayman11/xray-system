import React, { useState } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { MotionDiv } from '../components/animations/motionPresets';
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
    <div className="upload-page mx-auto max-w-6xl px-1 py-3 sm:px-2 md:px-0 md:py-4">
      <div className="upload-header mb-5 flex items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <Button
          type="button"
          variant="secondary"
          size="pill"
          className="back-btn"
          onClick={onBack}
        >
          ← Back to List
        </Button>
        <h2 className="text-lg font-semibold tracking-tight text-slate-50 md:text-xl">
          Upload X-ray Images – {request.patientName}
        </h2>
      </div>

      <div className="upload-container flex flex-col gap-4 md:flex-row">
        <Card className="patient-info-card flex-1 border-slate-800/80 bg-slate-950/70">
          <CardContent className="px-5 py-4 md:px-6 md:py-5">
            <h3 className="mb-4 border-b border-slate-800 pb-2 text-sm font-semibold text-slate-100">
              Request Details
            </h3>
            <div className="info-grid grid gap-3 text-sm md:grid-cols-2">
              <div className="info-item rounded-xl bg-slate-900/80 px-3 py-2">
                <strong className="text-xs uppercase tracking-[0.18em] text-slate-400">
                  Request ID
                </strong>
                <div className="mt-1 text-slate-50">{request.id}</div>
              </div>
              <div className="info-item rounded-xl bg-slate-900/80 px-3 py-2">
                <strong className="text-xs uppercase tracking-[0.18em] text-slate-400">
                  Patient
                </strong>
                <div className="mt-1 text-slate-50">{request.patientName}</div>
              </div>
              <div className="info-item rounded-xl bg-slate-900/80 px-3 py-2">
                <strong className="text-xs uppercase tracking-[0.18em] text-slate-400">
                  Patient ID
                </strong>
                <div className="mt-1 text-slate-50">{request.patientId}</div>
              </div>
              <div className="info-item rounded-xl bg-slate-900/80 px-3 py-2">
                <strong className="text-xs uppercase tracking-[0.18em] text-slate-400">
                  X-ray Type
                </strong>
                <div className="mt-1 text-slate-50">{request.type}</div>
              </div>
              <div className="info-item rounded-xl bg-slate-900/80 px-3 py-2">
                <strong className="text-xs uppercase tracking-[0.18em] text-slate-400">
                  Doctor
                </strong>
                <div className="mt-1 text-slate-50">{request.doctor}</div>
              </div>
              <div className="info-item full-width rounded-xl bg-slate-900/80 px-3 py-2 md:col-span-2">
                <strong className="text-xs uppercase tracking-[0.18em] text-slate-400">
                  Notes
                </strong>
                <div className="mt-1 text-xs text-slate-300">
                  {request.notes || 'No additional notes'}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <MotionDiv
          className="upload-area-card flex-[1.6] rounded-2xl border border-slate-800/80 bg-slate-950/70 p-5 shadow-soft-elevated md:p-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          <div className="upload-zone relative mb-5 cursor-pointer rounded-2xl border border-dashed border-sky-500/60 bg-slate-900/60 px-4 py-6 text-center shadow-soft-card backdrop-blur-xl md:px-6 md:py-8">
            <input
              type="file"
              accept="image/*,.dicom"
              multiple
              onChange={handleFileUpload}
              id="xray-upload"
              className="file-input"
            />
            <label htmlFor="xray-upload" className="upload-label block">
              <div className="upload-icon mb-3 text-4xl drop-shadow-[0_0_20px_rgba(56,189,248,0.7)]">
                📤
              </div>
              <h3 className="mb-1 text-sm font-semibold text-slate-50 md:text-base">
                Click or Drag X-ray images here
              </h3>
              <p className="mb-1 text-xs text-slate-400">
                Supported formats: JPG, PNG, DICOM, JPEG
              </p>
              <small className="text-[11px] text-slate-500">
                Maximum size: 50 MB per file
              </small>
            </label>
          </div>

          {uploadedFiles.length > 0 && (
            <div className="files-list mt-4">
              <h4 className="mb-3 text-sm font-semibold text-slate-100">
                Uploaded Files ({uploadedFiles.length})
              </h4>

              {uploadedFiles.map((file, index) => (
                <div
                  key={index}
                  className="file-item mb-2 flex items-center rounded-2xl border border-slate-800/80 bg-slate-900/80 px-3 py-3 text-sm shadow-soft-card transition-colors hover:bg-slate-900"
                >
                  <div className="file-info flex flex-1 items-center">
                    <div className="file-icon mr-3 text-2xl">
                      {getFileIcon(file.type)}
                    </div>
                    <div className="file-details flex flex-col">
                      <span className="file-name max-w-[260px] truncate text-slate-50">
                        {file.name}
                      </span>
                      <span className="file-size text-xs text-slate-400">
                        {file.size} KB
                      </span>
                    </div>
                  </div>

                  <div className="file-progress mx-3 flex-1 min-w-[160px]">
                    {uploadProgress[file.name] < 100 ? (
                      <>
                        <div className="progress-bar h-1.5 overflow-hidden rounded-full bg-slate-800">
                          <div
                            className="progress-fill h-full rounded-full bg-gradient-to-r from-sky-400 via-cyan-400 to-emerald-400"
                            style={{
                              width: `${uploadProgress[file.name] || 0}%`,
                            }}
                          ></div>
                        </div>
                        <span className="progress-text mt-1 block text-[11px] font-medium text-emerald-300">
                          {uploadProgress[file.name] || 0}%
                        </span>
                      </>
                    ) : (
                      <span className="completed-check text-sm font-medium text-emerald-300">
                        ✓ Uploaded
                      </span>
                    )}
                  </div>

                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    className="remove-file-btn ml-2 h-7 w-7 rounded-full border-rose-500/60 p-0 text-xs text-rose-300"
                    onClick={() => removeFile(file.name)}
                    disabled={uploadProgress[file.name] === 100}
                  >
                    ✕
                  </Button>
                </div>
              ))}

              <div className="upload-actions mt-4">
                <Button
                  type="button"
                  className="complete-upload-btn w-full justify-center py-3 text-sm"
                  onClick={handleComplete}
                  disabled={uploadedFiles.length === 0 || isUploading}
                >
                  {isUploading
                    ? 'Uploading...'
                    : 'Confirm Upload & Complete Request'}
                </Button>
              </div>
            </div>
          )}

          {uploadedFiles.length > 0 && (
            <div className="preview-section mt-5">
              <h4 className="mb-3 text-sm font-semibold text-slate-100">
                Preview
              </h4>
              <div className="preview-grid grid gap-3 md:grid-cols-4">
                {uploadedFiles.map(
                  (file, index) =>
                    file.preview && (
                      <div
                        key={index}
                        className="preview-item aspect-square overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/80"
                      >
                        <img
                          src={file.preview}
                          alt={`Preview ${index}`}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ),
                )}
              </div>
            </div>
          )}
        </MotionDiv>
      </div>
    </div>
  );
};

export default UploadXray;