import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import { FaLocationArrow } from 'react-icons/fa';

interface GPSCoordinates {
  lat: string | null;
  lon: string | null;
}

const App: React.FC = () => {
  const [gpsCoordinates, setGpsCoordinates] = useState<GPSCoordinates>({ lat: null, lon: null });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setGpsCoordinates({
          lat: position.coords.latitude.toFixed(4),
          lon: position.coords.longitude.toFixed(4),
        });
      },
      (error) => {
        console.error('Error fetching GPS data:', error);
        setGpsCoordinates({ lat: 'Unavailable', lon: 'Unavailable' });
      }
    );
  }, []);

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1>My Application</h1>
          <div className="gps-coordinates">
            <FaLocationArrow className="gps-icon" />
            <p>{gpsCoordinates.lat}, {gpsCoordinates.lon}</p>
          </div>
        </div>
      </header>

      <main className="app-main">
        <Dashboard />
      </main>

      <footer className="app-footer">
        <p>&copy; {new Date().getFullYear()} Tec De Monterrey. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
