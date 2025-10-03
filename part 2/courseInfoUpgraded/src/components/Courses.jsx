import Course from "./Course";

function Courses({ courses }) {
    return (
        <main>
            <h1>Web development curriculum</h1>

            {courses.map(course => <Course key={course.id} course={course} parts={course.parts}/>)}
        </main>
    )
}

export default Courses;