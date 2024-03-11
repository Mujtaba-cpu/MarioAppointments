import { Link } from 'react-router-dom'

const Navbar = () => {

  return (
    <header>
      <div className="container">
        <Link to="/main">
          <h1>Mario Appointments</h1>
        </Link>
        
      </div>
    </header>
  )
}

export default Navbar