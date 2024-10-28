
function App() {

  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
    
       {
        name: 'Using props to pass data',
        exercises: 7
      },
    
       {
        name: 'State of a component',
        exercises: 14
      }
    ]
  } 

  return (
    <div>
      <Header name={course.name} />

      <Content parts={course.parts} />

      <Total parts={course.parts} />
      
    </div>
  );
}

const Header = (props) => {
  return(
    <>
      <h1>{props.name}</h1>
    </>
  )
}

const Content = (props) => {
  return(
    <>
        {props.parts.map((part, index) => <Part key={index} part={part.name} exercises={part.exercises} />)}
     
    </>
  )
}

const Part = (props) => {
  return(
    <>
      <p>
      {props.part} {props.exercises}
    </p>
    </>
  )
}

const Total = (props) => {
  return(
    <>
      <p>Number of exercises {props.parts.reduce((sum, part) => sum + part.exercises, 0)}</p>
    </>
  )
}


export default App;
