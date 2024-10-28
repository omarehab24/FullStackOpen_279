import React from "react";
const Course = (props) => {
    return (
      <>
        <h1>Web development curriculum</h1>
        {props.course.map((course) => (
          <React.Fragment key={course.id}>
            <Header name={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
          </React.Fragment>
        ))}
      </>
    );
  };

const Header = ({name}) => {
    return (
      <>
        <h2>{name}</h2>
      </>
    );
  };
  
  const Content = ({parts}) => {
    return (
      <>
          {parts.map((part, index) => (
            <Part key={index} part={part.name} exercises={part.exercises} />
          ))
  }
      </>
    );
  };
  
  const Part = ({part, exercises}) => {
    return (
      <>
        <p>
          {part} {exercises}
        </p>
      </>
    );
  };
  
  const Total = ({parts}) => {
    return (
      <>
        <b>
          Number of exercises{" "}
          {parts.reduce((sum, part) => sum + part.exercises, 0)}
         
        </b>
      </>
    );
  };
  
  export default Course