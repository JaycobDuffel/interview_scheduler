import React, { useState } from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList"

export default function Form(props) {
  const [name, setName] = useState( props.name || props.student || "")
  const [interviewer, setInterviewer] = useState(props.interviewerId ||  null)
  const [error, setError] = useState("");
  
  const reset = function () {
    setName("");
    setInterviewer(null);
  };

  const cancel = function () {
    reset();
    props.onCancel()
  };

  function validate() {
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    }
    if (interviewer === null) {
      return;
    }
    props.onSave(name, interviewer);
    
    setError("");
    
  };

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder={"Enter Student Name"}
            value={name}
            onChange={(e) => setName(e.target.value)}
            data-testid="student-name-input"
          />
        <section className="appointment__validation">{error}</section>
        </form>
        <InterviewerList interviewers={props.interviewers} value={interviewer} onChange={setInterviewer}/>
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button onClick={() => cancel()} danger>Cancel</Button>
          <Button onClick={() => validate()} confirm>Save</Button>
        </section>
      </section>
    </main>
  )
}