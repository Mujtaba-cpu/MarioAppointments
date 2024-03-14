import { Link, useParams } from 'react-router-dom';


const Landing = () => {
    const { username } = useParams();
    return (
        <div>
            <h1>Welcome to the Mario Bookings, {username}!</h1>
            <p>
                Book or view existing Bookings
            </p>
            <Link to={`/appointments/${username}`}>
                <button style={{ marginRight: '10px', marginBottom: '10px' }}>View Bookings</button>
            </Link>

            <Link to={`/add-appointment/${username}`}>
                <button>Add Bookings</button>
            </Link>

        </div>
    );
}

export default Landing;