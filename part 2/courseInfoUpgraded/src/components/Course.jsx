function Course({ course, parts }) {
  const totalExercises = parts.reduce((acc, part) => acc += part.exercises, 0);

  return (
    <section>
        <h2>{course.name}</h2>
        
        <ol>
            {parts.map(item => <li key={item.id}>{item.name} {item.exercises}</li>)}
        </ol>

        <p><b>total of {totalExercises} exercises</b></p>
    </section>
  )
}

export default Course;