import React from 'react';
import './SensorCard.css';

interface SensorCardProps {
    data: {
      sensor_type: string;
      unit?: string;
      value?: number;
      timestamp: string;
      location: string;
      status?: string;
      motion_detected?: boolean;
    };
    isOffline?: boolean; // Add this line to include isOffline in the props
  }

const SensorCard: React.FC<SensorCardProps> = ({ data, isOffline }) => {
if (!data) return null;

return (
    <div className={`sensor-card ${data.sensor_type}`}>
    <div className="card-header">
        <h3>{data.sensor_type}</h3>
        <span className="location">{data.location}</span>
    </div>
    <div className="card-content">
        {data.value !== undefined && (
        <p className="value">
            {data.value} <small>{data.unit}</small>
        </p>
        )}
        {data.sensor_type === 'motion' && (
        <p className={`motion-status ${data.motion_detected ? 'active' : 'inactive'}`}>
            {data.motion_detected ? 'Motion Detected' : 'No Motion'}
        </p>
        )}
        <small className="timestamp">
        {new Date(data.timestamp).toLocaleString()}
        </small>
        {isOffline && <p className="offline-status">Offline</p>}
    </div>
    </div>
);
};
    

export default SensorCard;
