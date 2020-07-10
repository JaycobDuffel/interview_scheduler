import React from "react";
import "components/Appointment/styles.scss"
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form"
import { useVisualMode } from "hooks/useVisualMode"

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";


export default function Appointment(props) {
  
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    }
    props.bookInterview()
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      <>
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      </>
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer.name}
        />
      )}
      {mode === CREATE && (
        <Form 
        interviewers={props.interviewers}
        onCancel={() => back()}
        save={save(props.name, props.interviewer)}
        />
      )}
    </article>)


}
