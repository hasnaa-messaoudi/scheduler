import { useState, useEffect } from "react";
import axios from "axios";

export function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
  });

  const setDay = day => setState({ ...state, day });


  

  useEffect(() => {
    Promise.all([
      axios.get('api/days'),
      axios.get('api/appointments'),
      axios.get('api/interviewers'),
    ]).then((all) => {

      setState(prev => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      }));
    });
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

    const days = [...state.days];
    
    for (const day of days) {
       if (day['name'] === state.day){
         day['spots']++;
      }
    }

    const deletePromise = axios.delete(`http://localhost:8001/api/appointments/${id}`, appointment ).then(response => {
      setState({
        ...state,
        appointments,
        days
      });
      console.log(state.days);
      
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


    const days = [...state.days];
    
    for (const day of days) {
       if (day['name'] === state.day){
         day['spots']--;
      }
    }
    

    const savePromise = axios.put(`http://localhost:8001/api/appointments/${id}`, appointment ).then(response => {
      setState({
        ...state,
        appointments,
        days
      });
      console.log(state.days);
    })
    return savePromise;
  };
  return {state, setDay, bookInterview, cancelInterview}; 

}