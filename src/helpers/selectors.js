export function getAppointmentsForDay(state, day) {
  const filteredDays = state.days.filter(item => item.name === day);
  const result = filteredDays[0] ? filteredDays[0].appointments.map(key => state.appointments[key]) : [];
  return result;
}

export function getInterviewersForDay(state, day) {
  const filteredDays = state.days.filter(item => item.name === day);
  const result = filteredDays[0] ? filteredDays[0].interviewers.map(key => state.interviewers[key]) : [];
  return result;
}


export function getInterview(state, interview) {
  let result = null;
  for (const appointmentKey in state.appointments) {
    const interviewItem = state.appointments[appointmentKey].interview;
    if (interviewItem && interview && interviewItem.interviewer === interview.interviewer) {
      result = {};
      result.student = interview.student;
      result.interviewer = {
        id: interviewItem.interviewer,
        name: state.interviewers[interviewItem.interviewer].name,
        avatar: state.interviewers[interviewItem.interviewer].avatar
      };
    }
  }
  return result;
}