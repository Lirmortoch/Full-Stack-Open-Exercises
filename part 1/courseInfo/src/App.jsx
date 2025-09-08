function Header(props) {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  )
}
function Part(props) {
  return (
    <>
      <p><b>{props.part}</b> - {props.exercise} exs</p>
    </>
  )
}
function Content(props) {
  return (
    <div>
      <Part part={props.parts[0].name} exercise={props.parts[0].exercises}/>
      <Part part={props.parts[1].name} exercise={props.parts[1].exercises}/>
      <Part part={props.parts[2].name} exercise={props.parts[2].exercises}/>
    </div>
  )
}
function Total(props) {
  return (
    <>
      <p>Number of exercises: {props.parts.reduce((acc, item) => acc+=item.exercises, 0)}</p>
    </>
  )
}

function App() {
  const course = 'Half Stack application development';
  const parts = [ 
    {
      name: "Fundamentals of React",
      exercises: 10,
    },
    {
      name: "Using props to pass data",
      exercises: 7,
    },
    {
      name: "State of a component",
      exercises: 14,
    },
  ];

  return (
    <>
      <div>
        <Header course={course}/>

        <Content parts={parts}/>

        <Total parts={parts}/>
      </div>
    </>
  )
}

export default App