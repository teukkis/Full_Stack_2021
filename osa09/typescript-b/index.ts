import express from 'express';
import bodyParser from 'body-parser';
import { calculateBmi, validateParameters } from './bmiCalculator';
import { calculateExercises, validateExParameters } from './exerciseCalculator';

const app = express();

app.use(bodyParser.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  try {
    validateParameters(Number(req.query.height), Number(req.query.weight));
    const bmiResults = calculateBmi(Number(req.query.height), Number(req.query.weight));

    res.status(200).json({
      weight: req.query.weight,
      height: req.query.height,
      bmi: bmiResults
    });

  } catch (error) {
    res.status(400).json({error: "malformatted parameters"});
  }
});'';

app.post('/exercises', (req, res) => {  
  try {
    const { dailyExercisesValid, target } = validateExParameters(req.body.daily_exercises, req.body.target);
    const calculatedHours = calculateExercises(dailyExercisesValid, target);
    res.status(201).json(calculatedHours);

  } catch (error) {
    res.status(400).json({error: "parameters missing"});
  }

});


const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Up and running on port ${PORT}`);
});