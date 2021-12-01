
interface bmiArguments {
  height: number,
  weight: number
}

export const calculateBmi = (height: number, weight: number) => {
  height = height / 100;
  const bmi = Number((weight / (height * height)).toFixed(1));
  return createMessage(bmi);
};

const createMessage = (bmi: number) => {
  switch (true) {
    case bmi < 18.5:
      return `You are in the underweight range with a BMI of ${bmi}`;
    case bmi < 24.9:
      return `You are in the healthy weight range with a BMI of ${bmi}`;
    case bmi < 29.9:
      return `You are in the overweight range with a BMI of ${bmi}`;
    case bmi < 39.9:
      return `You are in the obese range with a BMI of ${bmi}`;
    default:
      return `We are sorry but you can not even fit to the scale with a BMI of ${bmi}`;
  }
};

export const validateParameters = (height: number, weight: number) => {
  if (isNaN(Number(height))) throw new Error('height must be a number');
  if (isNaN(Number(weight))) throw new Error('weight must be a number');
};


const parseBmiArguments = (args: Array<string>): bmiArguments => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');  
  
  validateParameters(Number(args[2]), Number(args[3]));

  return {
    height: Number(args[2]), 
    weight: Number(args[3])
  };
};


try {
  const { height, weight } = parseBmiArguments(process.argv);
  const bmi = calculateBmi(height, weight);
  console.log(bmi);

} catch(e) {
  if (e instanceof Error) console.log(e.message);
}

