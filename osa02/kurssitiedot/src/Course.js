import React from 'react'

const Course = ({courses}) => {
 
    const total = (partsArray) => partsArray.reduce( (s, p) => {
        return s + p.exercises
        }, 0)

    const contents = () => courses.map(course =>
        <div key={course.id}>
            <h3 key={course.id}>{course.name}</h3>
            
            {course.parts.map(content => 
                <p key={content.id}> {content.name} {content.exercises}</p>
            )}
            
            <p><strong>total of {total(course.parts)} exercises</strong></p>
        </div>            
        )

return (
    <div>
        <div>
            <h2>Web development curriculum</h2>
        </div>
        <div>
            {contents()}
        </div>
    </div>
)
}

export default Course
