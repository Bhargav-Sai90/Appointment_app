// Write your code here
import {Component} from 'react'
import {format} from 'date-fns'
import {v4} from 'uuid'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {appointmentList: [], name: '', date: '', isFiltered: false}

  toggleStarred = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(appointment => {
        if (appointment.id === id) {
          return {...appointment, isStarred: !appointment.isStarred}
        }
        return appointment
      }),
    }))
  }

  onChangeName = event => {
    this.setState({name: event.target.value})
  }

  onChangeDate = event => {
    this.setState({date: event.target.value})
  }

  onFilter = () => {
    this.setState(prevState => ({isFiltered: !prevState.isFiltered}))
  }

  onSubmit = event => {
    event.preventDefault()
    const {name, date} = this.state
    const newDate = date ? format(new Date(date), 'dd MMMM yyyy, EEEE') : ''
    const newAppointment = {
      id: v4(),
      name,
      date: newDate,
      isStarred: false,
    }
    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointment],
      name: '',
      date: '',
    }))
  }

  filterAppointment = () => {
    const {appointmentList, isFiltered} = this.state
    if (isFiltered) {
      return appointmentList.filter(eachItem => eachItem.isStarred === true)
    }
    return appointmentList
  }

  render() {
    const {name, date, isFiltered} = this.state
    const filterName = isFiltered ? 'filter-filled' : 'filter-Empty'
    const filteredAppointmentList = this.filterAppointment()

    return (
      <div className="container">
        <div className="card">
          <div className="content">
            <div className="content-display">
              <h1 className="heading">Add Appointment</h1>
              <form
                id="appointment"
                className="input-field"
                onSubmit={this.onSubmit}
              >
                <label htmlFor="name" className="label">
                  NAME
                </label>
                <br />
                <input
                  type="text"
                  id="name"
                  className="input"
                  placeholder="Name"
                  value={name}
                  onChange={this.onChangeName}
                />
                <br />
                <label htmlFor="date" className="label">
                  DATE
                </label>
                <br />
                <input
                  type="date"
                  id="date"
                  className="input"
                  value={date}
                  onChange={this.onChangeDate}
                />
                <br />
                <button className="btn" type="submit">
                  Add
                </button>
              </form>
            </div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="image"
            />
          </div>
          <hr />
          <div className="appointments-container">
            <div className="sub-info">
              <h1 className="sub-heading">Appointments</h1>
              <button
                className={`filter-btn ${filterName}`}
                type="button"
                onClick={this.onFilter}
              >
                Starred
              </button>
            </div>
            <ul className="appointments">
              {filteredAppointmentList.map(appointment => (
                <AppointmentItem
                  key={appointment.id}
                  appointment={appointment}
                  toggleStarred={this.toggleStarred}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
