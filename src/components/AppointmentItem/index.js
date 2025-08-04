// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {appointment, toggleStarred} = props
  const {id, name, date, isStarred} = appointment

  const starUrl = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onToggle = () => {
    toggleStarred(id)
  }

  return (
    <li className="appointment-container">
      <div className="sub-info">
        <p className="name">{name}</p>
        <button
          type="button"
          onClick={onToggle}
          className="button"
          data-testid="star"
        >
          <img src={starUrl} alt="star" className="icon" />
        </button>
      </div>
      <p className="date">Date: {date}</p>
    </li>
  )
}

export default AppointmentItem
