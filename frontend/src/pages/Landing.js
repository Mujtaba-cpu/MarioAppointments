import { Link, useParams } from 'react-router-dom';


const Landing = () => {
    const { username } = useParams();
    return (
        <div>
            <h1>Welcome to the Appointments, {username}!</h1>
            <p>
                Book an appointment or view existing appointments
            </p>
            <Link to={`/appointments/${username}`}>
                <button style={{ marginRight: '10px', marginBottom: '10px' }}>View Appointments</button>
            </Link>

            <Link to={`/add-appointment/${username}`}>
                <button>Add Appointments</button>
            </Link>

        </div>
    );
}

export default Landing;