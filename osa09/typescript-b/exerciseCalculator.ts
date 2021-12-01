interface exerciseStatistics {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number 
}

interface ratingMessage {
  msg1: string,
  msg2: string
}

interface arguments {
  dailyExercises: Array<number>,
  target: number
}

interface argumentsValidated {
  dailyExercisesValid: Array<number>,
  target: number
}


export const calculateExercises = (vals: Array <number>, target: number) : exerciseStatistics => {

  const average = vals.reduce((x, y) => (x + y)) / vals.length;
  const periodLength = vals.length;
  const trainingDays = (vals.filter(v => v !== 0)).length;
  const success = average >= target ? true : false;
  const ratingMessages = createRating(success, average);
  const ratingDescription = `${ratingMessages.msg1} - ${ratingMessages.msg2}`;
  
  let rating =  Math.abs(average - target) > 1.5 ?  1 : 2;
  rating =  Math.abs(average - target) < 0.3 ?  3 : 2;


  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };

};

const createRating = (success: boolean, average: number) : ratingMessage => {
  let msg1 = '';
  let msg2 = '';
  switch (success) {
    case true:
      msg1 = 'Good job buddy!! You made it';
      break;
    case false:
      msg1 =  'It did not work out as you can see';
      break;
  }
  switch (true) {
    case average >= 5:
      msg2 = 'That really is a great achievement';
      break;
    case average < 5:
      msg2 = 'Try to increase your daily exercise hours';
      break;
  }
  return {
    msg1,
    msg2
  }; 
};

export const validateExParameters = (dailyExercises: Array <string>, target: number) : argumentsValidated  => {
  if (isNaN(Number(target))) throw new Error('targeted hour must be a number');
  const isValidArray = dailyExercises.every( n => {
    const v = Math.abs(Number(n));
    return v >= 0;
  });

  if (!isValidArray) throw new Error('exercise hours must be numbers');

  const dailyExercisesValid = dailyExercises.map(v => Number(v));

  return {
    dailyExercisesValid,
    target
  };
};

const parseExArguments = (args: Array<string>) : arguments => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length === 4) throw new Error('You should probably work out more often');  

  const { dailyExercisesValid, target } = validateExParameters(args.splice(0, 3), Number(args[2]));

  return {
    dailyExercises: dailyExercisesValid,
    target
  };
};

//////////////// START /////////////////
try {
  const { dailyExercises, target } = parseExArguments(process.argv);
  const calculatedHours = calculateExercises(dailyExercises, target);
  console.log(calculatedHours);

} catch(e) {
  if (e instanceof Error) console.log(e.message);  
}

