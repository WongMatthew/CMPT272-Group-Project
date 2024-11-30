import React, { useState } from "react";

const ReportFormModal = ({ isOpen, onClose, onSubmit }) => {
  const [locationName, setLocationName] = useState("");
  const [reporterName, setReporterName] = useState("");
  const [reporterPhone, setReporterPhone] = useState("");
  const [emergencyInfo, setEmergencyInfo] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [comments, setComments] = useState("");
  const [coords, setCoords] = useState({ lat: "", lng: "" });

  const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;

  const handleSubmit = () => {
    if (
      !locationName ||
      !reporterName ||
      !phoneRegex.test(reporterPhone) ||
      !emergencyInfo
    ) {
      alert("Please fill in all required fields with valid data.");
      return;
    }

    const lat = parseFloat(coords.lat);
    const lng = parseFloat(coords.lng);
    const validCoords =
      !isNaN(lat) &&
      !isNaN(lng) &&
      lat >= -90 &&
      lat <= 90 &&
      lng >= -180 &&
      lng <= 180;

    onSubmit({
      locationName,
      reporterName,
      reporterPhone,
      emergencyInfo,
      imageUrl: imageUrl || null,
      comments: comments || "No additional comments",
      coords: validCoords ? [lat, lng] : null,
    });

    onClose(); // Close modal after submission
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Report an Emergency</h2>
        <div>
          <label>Location Name:</label>
          <input
            type="text"
            value={locationName}
            onChange={(e) => setLocationName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Reporter Name:</label>
          <input
            type="text"
            value={reporterName}
            onChange={(e) => setReporterName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Reporter Phone (format: 123-456-7890):</label>
          <input
            type="text"
            value={reporterPhone}
            onChange={(e) => setReporterPhone(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Emergency Info:</label>
          <input
            type="text"
            value={emergencyInfo}
            onChange={(e) => setEmergencyInfo(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Image URL (optional):</label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>
        <div>
          <label>Additional Comments (optional):</label>
          <textarea
            value={comments}
            onChange={(e) => setComments(e.target.value)}
          />
        </div>
        <div>
          <label>Latitude (optional):</label>
          <input
            type="text"
            value={coords.lat}
            onChange={(e) => setCoords({ ...coords, lat: e.target.value })}
          />
        </div>
        <div>
          <label>Longitude (optional):</label>
          <input
            type="text"
            value={coords.lng}
            onChange={(e) => setCoords({ ...coords, lng: e.target.value })}
          />
        </div>
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default ReportFormModal;
