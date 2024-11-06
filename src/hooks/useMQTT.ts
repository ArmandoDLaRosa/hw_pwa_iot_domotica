import { useState, useEffect } from 'react';
import client from '../mqttClient';

interface SensorData {
  sensor_type: string;
  unit?: string;
  value?: number;
  timestamp: string;
  location: string;
  status?: string;
  motion_detected?: boolean;
}

const useMQTT = (topic: string) => {
    const [data, setData] = useState<SensorData | null>(null);
    const [isOffline, setIsOffline] = useState<boolean>(!navigator.onLine);
  
    useEffect(() => {
      const handleOnline = () => setIsOffline(false);
      const handleOffline = () => setIsOffline(true);
  
      window.addEventListener('online', handleOnline);
      window.addEventListener('offline', handleOffline);
  
      const handleMessage = (receivedTopic: string, message: Buffer) => {
        if (receivedTopic === topic) {
          setData(JSON.parse(message.toString()));
        }
      };
  
      client.on('message', handleMessage);
  
      return () => {
        client.off('message', handleMessage);
        window.removeEventListener('online', handleOnline);
        window.removeEventListener('offline', handleOffline);
      };
    }, [topic]);
  
    return { data, isOffline };
  };
  

export default useMQTT;


