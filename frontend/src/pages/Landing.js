
import { Link } from 'react-router-dom';


const Landing = () => {


    return (
        <div>
            <h1>Welcome to the Appointments</h1>
            <p>
                Book an appointment or view existing appointments
            </p>
            <Link to="/appointments">
                <button style={{ marginRight: '10px', marginBottom: '10px' }}>View Appointments</button>
            </Link>

            <Link to="/add-appointment">
                <button>Add Appointments</button>
            </Link>

        </div>
    );
}

export default Landing;