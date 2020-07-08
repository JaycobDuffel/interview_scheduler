import React, { useState, useEffect } from "react";
import axios from "axios"

import "components/Application.scss";
import DayList from "components/DayList"
import Appointment from "components/Appointment";

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: "last",
    time: "2pm",
  },
  {
    id: 4,
    time: "3pm",
    interview: {
      student: "Jaycob Conrad-Jones",
      interviewer: {
        id: 2,
        name: "Tori Malcolm",
        avatar: "https://i.imgur.com/Nmx0Qxo.png"
      }
    }
  },
  {
    id: 5,
    time: "4pm",
    interview: {
      student: "Jordanna Daly",
      interviewer: {
        id: 4,
        name: "Cohana Roy",
        avatar: "https://i.imgur.com/FK8V841.jpg"
      }
    }
  },
  {
    id: "last",
    time: "5pm",
  }
];

export default function Application(props) {

  const [days, setDays] = useState([])
  const [day, setDay] = useState("Monday")

  useEffect(() => {
    axios.get('/api/days')
      .then(response => {
        setDays(response.data)
      })
  }, [])

  const appointmentList = appointments.map(appointment => {
    return (
      <Appointment
        key={appointment.id}
        {...appointment}
      />
    );
  });



  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={days}
            day={day}
            setDay={setDay}
          />

        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointmentList}
      </section>


    </main>

  );
}


