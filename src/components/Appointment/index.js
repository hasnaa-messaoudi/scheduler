import React from "react";
import "./style.scss";

import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Form from "components/Appointment/Form";

import { useVisualMode } from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";



export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  return (
    <article className="appointment">
      <Header time={props.time} />

      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
      {mode === CREATE && <Form
        interviewers={[]}
        onSave={console.log("OnSave")}
        onCancel={back}
      />}


      {/*!props.interview && <Empty onAdd={props.onAdd} />}
      {props.interview && <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        onEdit={props.onEdit}
      onDelete={props.onDelete}
      />*/}
    </article>
  );
}




