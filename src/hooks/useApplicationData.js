import { useState, useEffect } from "react";
import axios from "axios";

export function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  const setDay = day => setState({ ...state, day });

  //const setDays = days => setState(prev => ({ ...prev, days }));

  

  useEffect(() => {
    Promise.all([
      axios.get('api/days'),
      axios.get('api/appointments'),
      axios.get('api/interviewers'),
    ]).then((all) => {

      //const setDays = days => setState(prev => ({ ...prev, days }));
      setState(prev => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      }));



    });

    // axios.get('api/days').then(response => {setDays([...response.data])}, [state.days])
  }
  , []);

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    

    const deletePromise = axios.delete(`http://localhost:8001/api/appointments/${id}`, appointment ).then(response => {
      setState({
        ...state,
        appointments
      });
    })
    return deletePromise;
  };

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    

    const savePromise = axios.put(`http://localhost:8001/api/appointments/${id}`, appointment ).then(response => {
      setState({
        ...state,
        appointments
      });
    })
    return savePromise;
  };
  return {state, setDay, bookInterview, cancelInterview}; 

}