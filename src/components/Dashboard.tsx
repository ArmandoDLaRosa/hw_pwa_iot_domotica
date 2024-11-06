import React from 'react';
import useMQTT from '../hooks/useMQTT';
import SensorCard from './SensorCard';

const Dashboard: React.FC = () => {
  const { data: temperatureData, isOffline } = useMQTT('sensor/temperature');
  const { data: humidityData } = useMQTT('sensor/humidity');
  const { data: motionData } = useMQTT('sensor/motion');

  if (!temperatureData && !humidityData && !motionData) {
    return <p>Loading...</p>;
  }

  return (
    <div className="dashboard">
      {temperatureData && <SensorCard data={temperatureData} isOffline={isOffline} />}
      {humidityData && <SensorCard data={humidityData} isOffline={isOffline} />}
      {motionData && <SensorCard data={motionData} isOffline={isOffline} />}
    </div>
  );
};

export default Dashboard;
