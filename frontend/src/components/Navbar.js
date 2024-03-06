import { Link } from 'react-router-dom'

const Navbar = () => {

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Mario Appointments</h1>
        </Link>
        <Link to="/appointments">
          <h6>View Appointments</h6>
          </Link>
          <Link to="/add-appointment">
          <h6>Add Appointments</h6>
            </Link>
      </div>
    </header>
  )
}

export default Navbar