import React from "react";
import InterviewerListItem from "components/InterviewerListItem"
import "components/InterviewerList.scss"
const classNames = require('classnames');


export default function InterviewList(props) {
  const interviewerClass = classNames("interviewers", {
    "interviewers__item--selected": props.selected
  })

  const interviewersList = props.interviewers.map(interviewer => {
  return (
    <InterviewerListItem
      key={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected={interviewer.id === props.value}
      setInterviewer={event => props.onChange(interviewer.id)}
    />
  );
});
  return (
    <section className={interviewerClass}>
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewersList}</ul>
    </section>
  )
}
