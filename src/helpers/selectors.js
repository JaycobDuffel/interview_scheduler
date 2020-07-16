export function getAppointmentsForDay(state, day) {

  const filteredAppoinments = [];
  for (const stateDay of state.days) {
    for (const app in state.appointments) {
      if (stateDay.name === day) {
        const thisAppointment = state.appointments[app];
        if (stateDay.appointments.includes(thisAppointment.id)) {
          filteredAppoinments.push(thisAppointment)
        }
      }
    };
  }
  if (filteredAppoinments.length === 0) {
    return [];
  }
  return filteredAppoinments;
}

export function getInterview(state, interview) {
  let interviewObj = {};
  if (!interview) {
    return null;
  }

  const interviewerId = interview.interviewer;
  const name = state.interviewers[interviewerId].name
  const avatar = state.interviewers[interviewerId].avatar

  interviewObj["student"] = interview.student;
  interviewObj["interviewer"] = {
    id: interviewerId,
    name,
    avatar
  }

  return interviewObj;
}

export function getInterviewersByDay(state, day) {
  let interviewersArray = [];
  const interviewerData = [];
  state.days.map(dayObj => {
    if (dayObj.name === day) {
     return interviewersArray = dayObj.interviewers
    }
  })
  for(let interviewer of interviewersArray) {
    for(const [key,value] of Object.entries(state.interviewers)) {
      if (interviewer.toString() === key) {
        interviewerData.push(value)
      }
    }
  }
  return interviewerData;
}