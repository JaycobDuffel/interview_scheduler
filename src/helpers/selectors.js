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

export function getInterviewersForDay(state, day) {

  const filteredInterviewers = [];
  for (const stateDay of state.days) {
    for (const app in state.appointments) {
      const thisAppointment = state.appointments[app]

      if (stateDay.name === day) {
        for (const int in state.interviewers) {
          if (thisAppointment.interview !== null) {
            if (thisAppointment.interview.interviewer === state.interviewers[int].id) {
              if (!filteredInterviewers.includes(state.interviewers[int])) {
                filteredInterviewers.push(state.interviewers[int])
              }
            }
          }
        }
      }
    };
  }
  if (filteredInterviewers.length === 0) {
    return [];
  }
  return filteredInterviewers;
}