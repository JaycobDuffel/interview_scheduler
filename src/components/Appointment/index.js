import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import Confirm from "components/Appointment/Confirm";
import Status from "components/Appointment/Status";
import Error from "components/Appointment/Error";

import { useVisualMode } from "hooks/useVisualMode";

const CONFIRM = "CONFIRM";
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function edit(name,interviewer) {
    transition(SAVING)
    props
      .editInterview(props.id, { student: name, interviewer })
      .then(() => transition(SHOW))
      .catch((error) => transition(ERROR_SAVE));
  }

  function save(name, interviewer) {
    transition(SAVING)
    props
      .bookInterview(props.id, { student: name, interviewer })
      .then(() => transition(SHOW))
      .catch((error) => transition(ERROR_SAVE));
  }

  function confirm() {
    transition(CONFIRM);
  }

  function cancel() {
    transition(DELETING, true);
    props
      .cancelInterview(props.id)
      .then(() => {
        transition(EMPTY);
      })
      .catch((error) => transition(ERROR_DELETE, true));
  }

  return (
    <article data-testid="appointment" className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}

      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer.name}
          onDelete={confirm}
          onEdit={() => transition(EDIT)}
        />
      )}

      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={() => back()}
          onSave={save}
        />
      )}

      {mode === SAVING && <Status message={"Saving"} />}

      {mode === DELETING && <Status replace={true} message={"Deleting"} />}

      {mode === CONFIRM && (
        <Confirm onCancel={() => back()} onConfirm={cancel} />)}

      {mode === EDIT && (
        <Form
          interviewerId={props.interview.interviewer.id}
          student={props.interview.student}
          interviewers={props.interviewers}
          onCancel={() => back()}
          onSave={edit}
        />
      )}

      {mode === ERROR_DELETE && (
        <Error
          message={"Could not delete appointment"}
          onClose={() => back()}
        />
      )}

      {mode === ERROR_SAVE && (
        <Error message={"Could not save appointment"} onClose={() => back()} />
      )}
    </article>
  )
}
