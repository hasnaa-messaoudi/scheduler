import React from "react";
import "./style.scss";

import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";

export default function Appointment(props) {
  return (
    <article className="appointment">
      <Header time={props.time} />
      {!props.interview && <Empty onAdd={props.onAdd} />}
      {props.interview && <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        onEdit={props.onEdit}
        onDelete={props.onDelete}
      />}
    </article>
  );
}




