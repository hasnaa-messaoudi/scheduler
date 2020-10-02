export function getAppointmentsForDay(state, day) {
  const filteredDays = state.days.filter(item => item.name === day);
  const result = filteredDays[0] ? filteredDays[0].appointments.map(key => state.appointments[key]) : [];
  return result;
}