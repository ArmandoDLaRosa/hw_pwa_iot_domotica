import mqtt from 'mqtt';

const client = mqtt.connect('wss://a150e436665a46cf8d998b8c3b61d1e1.s1.eu.hivemq.cloud:8884/mqtt', {
  protocol: 'wss',
  rejectUnauthorized: false,
  username: 'development',
  password: 'iot'
});

client.on('connect', () => {
  console.log('Connected to MQTT broker');
  client.subscribe('sensor/temperature');
  client.subscribe('sensor/humidity');
  client.subscribe('sensor/motion');
});

client.on('error', (error) => {
  console.error('Connection error:', error);
});

export default client;
