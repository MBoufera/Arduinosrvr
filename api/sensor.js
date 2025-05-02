const axios = require('axios');

const FIREBASE_URL = 'https://corrosionmonitor-a7505-default-rtdb.europe-west1.firebasedatabase.app/devices/arduino-001/readings.json';

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).send('Method not allowed');
  }

  const gasValue = req.body.value;
  const timestamp = Date.now();

  if (!gasValue) {
    return res.status(400).send('Missing gas value');
  }

  const payload = {
    gasValue: gasValue,
    timestamp: timestamp
  };

  try {
    await axios.post(FIREBASE_URL, payload);
    console.log('Data sent to Firebase:', payload);
    res.status(200).send('Data received and forwarded');
  } catch (error) {
    console.error('Failed to send to Firebase:', error.message);
    res.status(500).send('Failed to send to Firebase');
  }
};
