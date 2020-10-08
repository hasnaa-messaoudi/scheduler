import React, { useState } from "react";
import "./style.scss";

import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Form from "components/Appointment/Form";
import Confirm from "components/Appointment/Confirm";
import Status from "components/Appointment/Status";
import Error from "components/Appointment/Error";

import { useVisualMode } from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_DELETE = "ERROR_DELETE";
const ERROR_SAVE = "ERROR_SAVE";


export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  
  const [name,setName] = useState();
  const [interviewer, setInterviewer] = useState();

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    
    // transition(SAVING);
    // props.bookInterview(props.id, interview);
    // transition(SHOW);

    transition(SAVING);

    props
    .bookInterview(props.id, interview)
    .then(() => transition(SHOW))
    .catch(error => transition(ERROR_SAVE, true));
  }

  function cancel() {
    transition(DELETING);

    props
    .cancelInterview(props.id)
    .then(() => transition(EMPTY))
    .catch(error => transition(ERROR_DELETE, true));
  }

  function confirm() {
    transition(CONFIRM);
  }
  function edit(name, interviewer) {
    setName(name);
    setInterviewer(interviewer);
    transition(EDIT);
  }
  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === CONFIRM && <Confirm
        message="Delete the appointment?"
        onConfirm={cancel}
        onCancel={back}
      />}
      {mode === SHOW  && (
        <Show
          student={props.interview ? props.interview.student : name}
          interviewer={props.interview ? props.interview.interviewer : interviewer}
          onDelete={confirm}
          onEdit={edit}
        />
      )}
      {mode === ERROR_DELETE && <Error
        message="Could not delete appointment."
        onClose={back}
      />}
      {mode === ERROR_SAVE && <Error
        message="Could not save appointment."
        onClose={back}
      />}
      {mode === CREATE && <Form
        interviewers={props.interviewers}
        onSave={save}
        onCancel={back}
      />}
      {mode === EDIT && <Form
        name={name}
        interviewer={interviewer}
        interviewers={props.interviewers}
        onSave={save}
        onCancel={back}
      />}
    </article>
  );
}