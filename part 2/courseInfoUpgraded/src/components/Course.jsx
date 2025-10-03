function Course({ course }) {
  

  return (
    <section key={course.id}>
        <h2>{course.name}</h2>

        <ol>
            {course.parts.map(item => <li key={item.id}>{item.name} {item.exercises}</li>)}
        </ol>

        
    </section>
  )
}

export default Course;