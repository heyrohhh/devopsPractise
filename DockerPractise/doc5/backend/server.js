const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

// Middleware
app.use(cors()); // This is crucial for your React app to talk to this server
app.use(express.json());

// Comprehensive Data for Bihar Portfolio
const biharData = {
  history: {
    ancient: "Home to Magadh Empire and Nalanda University.",
    spiritual: "Birthplace of Buddhism (Bodh Gaya) and Jainism (Vaishali)."
  },
  stats: {
    districts: 38,
    population: [
      { year: "2011", count: 10.4 },
      { year: "2021", count: 12.7 },
      { year: "2025", count: 13.1 }
    ],
    migration: [
      { destination: "Delhi", rate: 25 },
      { destination: "Mumbai", rate: 18 },
      { destination: "Punjab", rate: 12 }
    ]
  },
  business: ["Agriculture", "Makhana Export", "Tourism", "Handicrafts (Madhubani Art)"]
};

// 1. Added a Root Route (To test if server is alive)
app.get('/', (req, res) => {
  res.send('Server is running! Navigate to /api/bihar to see the data.');
});

// 2. The API Route (Matches your React fetch)
app.get('/api/bihar', (req, res) => {
  console.log("Data requested from React app...");
  res.status(200).json(biharData);
});

// Start Server
app.listen(PORT, () => {
  console.log(`-----------------------------------------`);
  console.log(`🚀 Server running at: http://localhost:${PORT}`);
  console.log(`📊 API endpoint: http://localhost:${PORT}/api/bihar`);
  console.log(`-----------------------------------------`);
});