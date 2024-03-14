import { Link } from 'react-router-dom';

const Navbar = ({ username }) => {
  return (
    <header>
      <div className="container">
        <Link to={`/`}>
          <h1>Mario Bookings</h1>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
