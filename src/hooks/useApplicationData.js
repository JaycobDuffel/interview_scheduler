import { useState, useEffect } from "react";
import axios from "axios";

export function useApplicationData() {
  const setDay = (day) => setState({ ...state, day });

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get("/api/days")),
      Promise.resolve(axios.get("/api/appointments")),
      Promise.resolve(axios.get("/api/interviewers")),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.put(`/api/appointments/${id}`, { interview })
    .then(() => {
      numOfSpots(id, -1);
      setState({ ...state, appointments });
    });
  }

  function editInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.put(`/api/appointments/${id}`, { interview })
    .then(() => {
      setState({ ...state, appointments });
    });
  }

  const numOfSpots = (id, diff) => {
    const daysArr = [...state.days]
    daysArr.map(day => {
      for(let appointment of day.appointments) {
        if (appointment === id) {
          day.spots += diff;
        }
      }
      
    })
    return daysArr;
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    
    return axios.delete(`/api/appointments/${id}`).then(() => {
      numOfSpots(id, 1);
      setState({ ...state, appointments });
    });
  }

  return {
    editInterview,
    bookInterview,
    cancelInterview,
    setDay,
    state
  };
}
