const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const app = express();
app.use(express.json());

// Create patient and ECG data
app.post('/add-ecg', async (req, res) => {
  const { patientId, ecgSignal, heartRate, abnormal } = req.body;
  
  const ecgData = await prisma.eCGData.create({
    data: {
      patientId: patientId,
      ecgSignal: ecgSignal,
      heartRate: heartRate,
      abnormal: abnormal,
    },
  });
  
  res.json({ message: 'ECG data added', ecgData });
});

// Fetch ECG data for a patient
app.get('/ecgs/:patientId', async (req, res) => {
  const { patientId } = req.params;
  
  const ecgs = await prisma.eCGData.findMany({
    where: { patientId: Number(patientId) },
  });
  
  res.json(ecgs);
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
