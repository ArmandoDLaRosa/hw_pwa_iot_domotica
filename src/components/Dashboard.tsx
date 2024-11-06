import React, { useState, useEffect } from 'react';
import useMQTT from '../hooks/useMQTT';
import SensorCard from './SensorCard';
import './Dashboard.css';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Define the type for the temperature history
interface TemperatureDataPoint {
  time: string;
  temperature: number | undefined;
}

const Dashboard: React.FC = () => {
  // MQTT hooks to fetch live data
  const { data: temperatureData, isOffline: isTemperatureOffline } = useMQTT('sensor/temperature');
  const { data: humidityData, isOffline: isHumidityOffline } = useMQTT('sensor/humidity');
  const { data: motionData, isOffline: isMotionOffline } = useMQTT('sensor/motion');

  // State to store historical data for charts with the defined type
  const [temperatureHistory, setTemperatureHistory] = useState<TemperatureDataPoint[]>([]);
  const [humidityHistory, setHumidityHistory] = useState<{ time: string; humidity: number | undefined }[]>([]);

  // Update historical data whenever new data comes in
  useEffect(() => {
    if (temperatureData) {
      setTemperatureHistory(prevHistory => [
        ...prevHistory,
        {
          time: new Date().toLocaleTimeString(), // Use a timestamp or relevant key
          temperature: temperatureData.value,
        }
      ]);
    }
  }, [temperatureData]);

  useEffect(() => {
    if (humidityData) {
      setHumidityHistory(prevHistory => [
        ...prevHistory,
        {
          time: new Date().toLocaleTimeString(), // Use a timestamp or relevant key
          humidity: humidityData.value,
        }
      ]);
    }
  }, [humidityData]);

  // Loading state check
  if (!temperatureData && !humidityData && !motionData) {
    return <div className="loading-spinner">Loading...</div>;
  }

  return (
    <div className="dashboard-container">
      {temperatureData && (
        <SensorCard data={temperatureData} isOffline={isTemperatureOffline} />
      )}
      {humidityData && <SensorCard data={humidityData} isOffline={isHumidityOffline} />}
      {motionData && <SensorCard data={motionData} isOffline={isMotionOffline} />}

      {/* Real-time Line Chart for Temperature */}
      {temperatureHistory.length > 0 && (
        <div className="chart-container">
          <h3>Temperature History</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={temperatureHistory}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="temperature" stroke="#ff7300" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Real-time Line Chart for Humidity */}
      {humidityHistory.length > 0 && (
        <div className="chart-container">
          <h3>Humidity History</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={humidityHistory}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="humidity" stroke="#387908" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
