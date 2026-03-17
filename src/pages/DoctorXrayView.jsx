import React, { useState } from 'react';
import { mockRequests, mockImages } from '../data/mockData';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { MotionDiv } from '../components/animations/motionPresets';
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
    <div className="doctor-view mx-auto max-w-6xl px-1 py-3 sm:px-2 md:px-0 md:py-4">
      {/* Top Bar */}
      <div className="view-header mb-5 flex flex-col gap-3 border-b border-slate-800 pb-4 md:mb-6 md:flex-row md:items-center md:justify-between">
        <div className="patient-info">
          <h1 className="bg-gradient-to-r from-sky-400 via-cyan-300 to-emerald-300 bg-clip-text text-2xl font-semibold tracking-tight text-transparent md:text-3xl">
            {selectedPatient.patientName}
          </h1>
          <div className="patient-details mt-2 flex flex-wrap gap-2 text-xs text-slate-300">
            <span className="patient-id rounded-full bg-slate-900/80 px-3 py-1">
              ID: {selectedPatient.patientId}
            </span>
            <span className="patient-age rounded-full bg-slate-900/80 px-3 py-1">
              Age: {selectedPatient.patientAge}
            </span>
            <span className="doctor-name rounded-full bg-slate-900/80 px-3 py-1">
              Doctor: {selectedPatient.doctor}
            </span>
            <span className="exam-date rounded-full bg-slate-900/80 px-3 py-1">
              Date: {selectedPatient.date}
            </span>
          </div>
        </div>

        <div className="header-actions flex flex-wrap items-center gap-2">
          <Button
            size="sm"
            variant="primary"
            className="download-all-btn"
            onClick={handleDownloadAll}
          >
            ⬇️ Download All
          </Button>
          <Button size="sm" variant="outline" className="share-btn">
            🔗 Share
          </Button>
          <Button size="sm" variant="secondary" className="print-btn">
            🖨️ Print
          </Button>
        </div>
      </div>

      <div className="viewer-container grid gap-4 rounded-2xl border border-slate-800/80 bg-slate-950/70 p-3 shadow-soft-elevated md:grid-cols-[260px,minmax(0,1fr)] md:p-4">
        {/* Sidebar with thumbnails */}
        <div className="thumbnails-sidebar flex flex-col overflow-y-auto rounded-2xl border border-slate-800/80 bg-slate-950/80 px-3 py-4">
          <h3 className="mb-3 border-b border-slate-800 pb-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
            X-ray Images
          </h3>
          <div className="thumbnails-list flex flex-col gap-2">
            {images.map((image) => (
              <button
                key={image.id}
                type="button"
                className={`thumbnail-item flex items-center gap-2 rounded-xl border px-2 py-2 text-left text-xs transition-all ${
                  selectedImage?.id === image.id
                    ? 'border-sky-400/80 bg-sky-500/10 shadow-soft-card'
                    : 'border-slate-800/80 bg-slate-900/80 hover:border-sky-400/60 hover:bg-slate-900'
                }`}
                onClick={() => setSelectedImage(image)}
              >
                <img
                  src={image.thumbnail}
                  alt={image.type}
                  className="h-12 w-12 rounded-md object-cover"
                />
                <div className="thumbnail-info flex flex-col">
                  <span className="image-type text-[11px] font-semibold text-slate-50">
                    {image.type}
                  </span>
                  <span className="image-date text-[10px] text-slate-400">
                    {image.date}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Main viewer area */}
        <div className="main-viewer flex flex-col gap-3 overflow-y-auto">
          {selectedImage ? (
            <>
              {/* Toolbar */}
              <div className="image-toolbar flex flex-wrap items-center gap-2 rounded-2xl bg-slate-900/80 px-3 py-2 text-xs shadow-soft-card">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => adjustImage('zoomIn')}
                  title="Zoom In"
                >
                  🔍+ Zoom In
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => adjustImage('zoomOut')}
                  title="Zoom Out"
                >
                  🔍- Zoom Out
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => adjustImage('reset')}
                  title="Reset"
                >
                  ↩️ Reset
                </Button>

                <div className="toolbar-divider h-6 w-px bg-slate-700/80" />

                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleBrightnessUp}
                  title="Brightness Up"
                >
                  ☀️ Brightness +
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleBrightnessDown}
                  title="Brightness Down"
                >
                  ☀️ Brightness -
                </Button>

                <div className="toolbar-divider h-6 w-px bg-slate-700/80" />

                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleContrastUp}
                  title="Contrast Up"
                >
                  ◐ Contrast +
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleContrastDown}
                  title="Contrast Down"
                >
                  ◐ Contrast -
                </Button>

                <div className="toolbar-divider h-6 w-px bg-slate-700/80" />

                <Button
                  size="sm"
                  className="ml-auto download-single-btn"
                  onClick={() => handleDownload(selectedImage)}
                >
                  ⬇️ Download
                </Button>
              </div>

              {/* Image display */}
              <div className="image-container flex min-h-[380px] flex-1 items-center justify-center rounded-2xl bg-[radial-gradient(circle_at_center,_#020617_0,_#020617_30%,_#000000_100%)] p-4 shadow-soft-elevated">
                <img
                  src={selectedImage.url}
                  alt={selectedImage.type}
                  style={{
                    transform: `scale(${zoomLevel})`,
                    filter: `brightness(${brightness}%) contrast(${contrast}%)`,
                  }}
                  className="max-h-[480px] max-w-full transition-transform duration-200 ease-out"
                />
              </div>

              {/* Image details */}
              <Card className="image-details border-slate-800/80 bg-slate-950/80">
                <CardContent className="px-5 py-4 md:px-6 md:py-5">
                  <div className="mb-3 flex flex-wrap items-center gap-3">
                    <h4 className="text-sm font-semibold text-slate-100 md:text-base">
                      {selectedImage.description}
                    </h4>
                    <Badge variant="info" className="text-[11px]">
                      {selectedImage.type}
                    </Badge>
                  </div>
                  <div className="details-grid grid gap-3 text-xs text-slate-300 md:grid-cols-3">
                    <p>
                      <strong className="font-medium text-slate-400">
                        Date:
                      </strong>{' '}
                      {selectedImage.date}
                    </p>
                    <p>
                      <strong className="font-medium text-slate-400">
                        Patient ID:
                      </strong>{' '}
                      {selectedImage.patientId}
                    </p>
                    <p>
                      <strong className="font-medium text-slate-400">
                        Zoom:
                      </strong>{' '}
                      {Math.round(zoomLevel * 100)}%
                    </p>
                    <p>
                      <strong className="font-medium text-slate-400">
                        Brightness:
                      </strong>{' '}
                      {brightness}%
                    </p>
                    <p>
                      <strong className="font-medium text-slate-400">
                        Contrast:
                      </strong>{' '}
                      {contrast}%
                    </p>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <div className="no-image-selected flex min-h-[420px] flex-col items-center justify-center rounded-2xl bg-slate-950/80 text-center text-slate-400">
              <div className="placeholder-icon mb-4 text-5xl">🖼️</div>
              <h3 className="mb-1 text-sm font-semibold text-slate-100">
                Select an image to view
              </h3>
              <p className="text-xs text-slate-500">
                Click on any thumbnail from the sidebar to open it in the viewer
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorXrayView;