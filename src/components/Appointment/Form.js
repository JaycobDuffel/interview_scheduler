import React, { useState } from "react";
import Button from "components/Button";
import InterviewList from "components/InterviewerList"

export default function Form(props) {
  
  const [name, setName] = useState(props.name || "")
  const [interviewer, setInterviewer] = useState(props.interviewer || null)
  
  const reset = function () {
    setName("");
    setInterviewer(null);
    
  }

  const cancel = function () {
    reset();
    props.onCancel()
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            value={name}
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            onChange={(e) => setName(e.target.value)}
          />
        </form>
        <InterviewList interviewers={props.interviewers} value={interviewer} onChange={setInterviewer}/>
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button onClick={() => props.onCancel()} danger>Cancel</Button>
          <Button onClick={() => props.onSave(name, interviewer)} confirm>Save</Button>
        </section>
      </section>
    </main>
  )
}