import React, { useState } from "react";
/*
* Appointment booking application with time slot management
* TODO:
  Select date 
    Fetch the time slot available for that date

  Logic:

  New date is selected
    Fetch reserved appointments from that date 
      @returns T[] (reserved time slots)
    Fetch all time slots from opening hour to closing hour using average time taken in mins (t)
      @returns T[] (All total time slots of that day)
    Return unique time slots from all that doesn't match with reserved appointments
      @returns T[] (Unique that slots that doesn't exist on reserved time slot)
*/

const bookedDates = JSON.parse(localStorage.getItem("appointments")) || {};
const averageTimeTakenInMins = 30;
const openingTime = "08:00";
const closingTime = "18:00";

/**
 * @param  {string} date
 * @returns available time slots of this date
 */
function fetchAvailableSlots(date) {
  const totalTimeSlots = getTotalTimeSlots();
  const reservedTimeSlots = getReservedTimeSlots(date);
  const availableSlots = totalTimeSlots.map((slot) => {
    if (reservedTimeSlots.includes(slot)) return { available: false, slot };
    return { available: true, slot };
  });

  return availableSlots;
}
/**
 * @param  {string} date
 * @returns {string[]} get all reserved time slots
 */
function getReservedTimeSlots(date) {
  const reservedSlots = bookedDates[date] ? bookedDates[date] : [];

  return reservedSlots.map((slot) =>
    utils.getAndFormatTime(
      new Date(slot).getHours(),
      new Date(slot).getMinutes()
    )
  );
}
/**
 * @returns {string[]} get total time slots using opening and closing time
 */
function getTotalTimeSlots() {
  const totalTimeSlots = [];
  let _openingTime = utils.timeToMilliseconds(openingTime);
  let _closingTime = utils.timeToMilliseconds(closingTime);

  if (openingTime >= closingTime)
    throw new Error("Opening time cannot be greater than closing time");

  for (
    let i = _openingTime;
    i < _closingTime;
    i = new Date(i + averageTimeTakenInMins * 60000).getTime()
  ) {
    totalTimeSlots.push(
      utils.getAndFormatTime(new Date(i).getHours(), new Date(i).getMinutes())
    );
  }
  return totalTimeSlots;
}

const utils = {
  /**
   * Date doesn't matter
   * @param  {string} time
   * @returns {number} return milliseconds of the date created with time parameter
   */
  timeToMilliseconds(time) {
    const [hours, mins] = time.split(":");
    const updateHours = new Date().setHours(hours);
    const updateMinsAndHours = new Date(updateHours).setMinutes(mins);
    return updateMinsAndHours;
  },
  /**
   * @param {Date} Date object
   * @return {string} formatted date i.e. 2020-02-23
   */
  getAndFormatDate(date) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(date.getDate()).padStart(2, "0")}`;
  },
  /**
   * @param  {number | string} hours
   * @param  {number | string} mins
   * @returns {string} returns formatted time i.e. 09:00, 18:30
   */
  getAndFormatTime(hours, mins) {
    return `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
  }
};

export default function App() {
  const [date, setDate] = useState("");
  const [slots, setSlots] = useState([]);
  const [time, setTime] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const [hours, mins] = time.split(":");
    const newDate = new Date(date);
    newDate.setHours(hours);
    newDate.setMinutes(mins);

    const appointments = JSON.parse(localStorage.getItem("appointments")) || {};
    localStorage.setItem(
      "appointments",
      JSON.stringify({
        ...appointments,
        [date]: [...(appointments[date] || []), newDate]
      })
    );

    // Sync bookingDates with localstorage, too lazy to make SPA
    window.location.reload();
  }

  function handleDateChange(e) {
    setSlots([]);
    setTime("");

    const { value } = e.target;
    setDate(value);
    setSlots(fetchAvailableSlots(value));
  }

  function handleTimeChange(e) {
    const { value } = e.target;
    setTime(value);
  }
  return (
    <div class="contact-container">
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <form onSubmit={handleSubmit} className="App">
        <input type="date" value={date} onChange={handleDateChange} />
        <div style={{ margin: "1rem 0" }}>
          {slots.map(({ slot, available }) => (
            <button
              style={
                slot === time
                  ? { backgroundColor: "blue", marginRight: 8 }
                  : { marginRight: 8 }
              }
              type="button"
              onClick={handleTimeChange}
              key={slot}
              value={slot}
              disabled={!available}
            >
              {slot}
            </button>
          ))}
        </div>
        <button type="submit" disabled={!time}>
          Book
        </button>
      </form>
      <div>
        <h3>Appointments</h3>
        {Object.keys(bookedDates).map((date) => (
          <div key={date}>
            <div>{date}</div>
            <ul>
              {bookedDates[date].map((appointment) => (
                <li key={appointment}>
                  {new Date(appointment).toLocaleString().split(",")[1]}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div> </div>
  );
}
