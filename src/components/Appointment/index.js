import React from "react";
import "components/Appointment/styles.scss"
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";


export default function Appointment(props) {


  if (props.interview) {
    const student = props.interview.student
    const interviewer = props.interview.interviewer.name
    console.log(props)
    return (

      <article className="appointment">
        <Header time={props.time} />
        <Show student={student} interviewer={interviewer} />
      </article>
    )
  } else {
    return (
      <article className="appointment">
        <Header time={props.time} />
        <Empty />
      </article>
    )
  }


}
