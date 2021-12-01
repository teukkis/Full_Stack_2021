import React from 'react';

interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface CourseCoolPart extends CoursePartBase {
  type: string;
  description: string;
}

interface CourseSpecialPart extends CoursePartBase {
  type: "special";
  description: string;
  exerciseCount: number;
  requirements: Array<string>
}

interface CourseNormalPart extends CourseCoolPart {
  type: "normal";
}
interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CourseCoolPart {
  type: "submission";
  exerciseSubmissionLink: string;
}

type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart;

const Header = ({ name }: { name: string}) => {
  return (
    <div>
      <h1>{name}</h1>
    </div>
  )
}

const Content = ({ courseParts }: { courseParts: Array<CoursePart> }) => {
  return (
    <div>
      { courseParts.map( (p, i) =>  <Part key={i} part={p}/> )}
    </div>
  )
}

const Total = ({ courseParts }: { courseParts: Array<CoursePart> }) => {
  return (
    <div>
      <p>
      Number of exercises{" "}
        {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
    </div>
  )
}

const Part = ({ part }: { part: CoursePart }): JSX.Element  => {
  switch (part.type) {
    case "normal":
      return (
        <div>
          <p><b>{part.name} {part.exerciseCount}</b><br/>
          <i>{part.description}</i></p>
        </div>
      )

    case "groupProject":
      return (
        <div>
          <p><b>{part.name} {part.exerciseCount}</b><br/>
          project exercises {part.exerciseCount}</p>
        </div>
      )

    case "submission":
      return (
        <div>
          <p>
            <b>{part.name} {part.exerciseCount}</b><br/>
          <i>{part.description}</i><br/>
          submit to: {part.exerciseSubmissionLink}
          </p>
        </div>
      )

    case "special":
      return (
        <div>
          <p>
            <b>{part.name} {part.exerciseCount}</b><br/>
          <i>{part.description}</i>
          required skills: {part.requirements.join(", ")}
          </p>
        </div>
      )
    default:
        return <div style={{display: 'none'}}></div>
  }
}


const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is the leisured course part",
      type: "normal"
    },
    {
      name: "Advanced",
      exerciseCount: 7,
      description: "This is the harded course part",
      type: "normal"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      type: "groupProject"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
      type: "submission"
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      type: "special"
    }
  ]

  return (
    <div>
      <Header name={courseName}/>
      <Content courseParts={courseParts}/>
      <Total courseParts={courseParts}/>
    </div>
  );
};

export default App;