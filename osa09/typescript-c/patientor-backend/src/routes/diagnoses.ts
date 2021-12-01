import express from 'express';

const diagnoseRouter = express.Router();

import diagnoseService from '../services/diagnoseService';


diagnoseRouter.get('/', (_req, res) => {
  res.send(diagnoseService.getDiagnoses());
});


export default diagnoseRouter;