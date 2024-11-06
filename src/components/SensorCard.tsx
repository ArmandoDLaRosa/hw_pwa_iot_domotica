import React from 'react';
import { FaTemperatureHigh, FaTint, FaRunning } from 'react-icons/fa'; // Import icons
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
  isOffline?: boolean;
}

const SensorCard: React.FC<SensorCardProps> = ({ data, isOffline }) => {
  if (!data) return null;

  const getIcon = () => {
    switch (data.sensor_type) {
      case 'temperature':
        return <FaTemperatureHigh className="sensor-icon" />;
      case 'humidity':
        return <FaTint className="sensor-icon" />;
      case 'motion':
        return <FaRunning className="sensor-icon" />;
      default:
        return null;
    }
  };

  return (
    <div className={`sensor-card ${data.sensor_type}`}>
      <div className="card-header">
        {getIcon()}
        <h3>{data.sensor_type}</h3>
        <span className="location">{data.location}</span>
      </div>
      <div className="card-content">
        {data.value !== undefined && (
          <p className="value">
            <strong>{data.value}</strong> <small>{data.unit}</small>
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
