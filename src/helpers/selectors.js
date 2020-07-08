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