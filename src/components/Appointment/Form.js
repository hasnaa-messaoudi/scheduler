import React, { useState } from "react";
import Button from "../Button";
import InterviewerList from "../InterviewerList";

export default function Form(props) {
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [name, setName] = useState(props.name || null);
  const handleChangeName = (event) => {
    setName(event.target.value)
  }

  const reset = function () {
    setName("");
    setInterviewer(null);
  }
  const cancel = function () {
    reset();
    props.onCancel();
  }

  
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            defaultValue={name? name : ""}
            onChange={handleChangeName}
          />
        </form>
        <InterviewerList
          interviewers={props.interviewers}
          defaultValue={interviewer}
          onChange={setInterviewer}
          interviewer={interviewer}
          //setInterviewer={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick = {cancel}>Cancel</Button>
          <Button confirm onClick = {()=>props.onSave(name, interviewer)}>Save</Button>
        </section>
      </section>
    </main>
  );
}

