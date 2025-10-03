function Course({ course }) {
  const totalExercises = course.parts.reduce((acc, item) => acc += item.exercises, 0);

  return (
    <section key={course.id}>
        <h2>{course.name}</h2>
        
        <ol>
            {course.parts.map(item => <li key={item.id}>{item.name} {item.exercises}</li>)}
        </ol>

        <p><b>total of {totalExercises} exercises</b></p>
    </section>
  )
}

export default Course;