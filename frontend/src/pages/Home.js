import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import AppointmentDetails from "../components/AppointmentDetails";


const Home = () => {
    const [appointments, setAppointments] = useState(null);

    const fetchAppointments = async () => {
        const response = await fetch('https://mario-appointments-server.vercel.app/appointments');
        const json = await response.json();
        if (response.ok) {
            if (json.appointments && Array.isArray(json.appointments)) {
                setAppointments(json.appointments);
            } else {
                console.error('Data from server is not in the expected format' + JSON.stringify(json));
            }
        }
    };

    useEffect(() => {
        fetchAppointments();
    }, []);

    const updateAppointments = () => {
        fetchAppointments();
    };
    return (
        <div className="home">
            <div className="workouts">
            <button onClick={() => window.location.href = '/search'}>Search by Date</button>
                {appointments &&
                    appointments.map(appointment => (
                        <AppointmentDetails key={appointment._id} appointment={appointment} updateAppointments={updateAppointments} />
                    ))}
            </div>
        </div>
    );
}

export default Home;