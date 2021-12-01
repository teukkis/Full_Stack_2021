import express from 'express';
import cors from 'cors';
const app = express();

app.use(express.json());
app.use(cors());

import diagnoseRouter from './routes/diagnoses';
import patientRouter from './routes/patients';

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here again');
  res.send('pong');
});

app.use('/api/diagnoses', diagnoseRouter);
app.use('/api/patients', patientRouter);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});