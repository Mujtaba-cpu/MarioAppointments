import { Link, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import AppointmentDetails from '../components/AppointmentDetails';





const Landing = () => {
    const { username } = useParams();
    const [appointments, setAppointments] = useState([]);

    const [error, setError] = useState(null);
    
    const updateAppointments = () => {
        fetchAppointments();
    };

    const fetchAppointments = async () => {
        setError('');
        const currentDate = new Date();
        console.log(currentDate);
        let startDate, endDate;
        startDate = currentDate.toISOString().split('T')[0];
            const lastDayOfWeek = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 6));
            
            endDate = lastDayOfWeek.toISOString().split('T')[0];
            console.log('Start Date:', startDate, endDate);
        const response = await fetch('https://mario-appointments-server.vercel.app/appointments/date', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ startDate, endDate }),
        });
        console.log(response);
        const json = await response.json();
        console.log('JSON APPOINTMENTS:',json.appointments);
        if (response.ok) {
            if (json.appointments && Array.isArray(json.appointments)) {
                if (json.appointments.length === 0) {
                    setError('No appointments found')
                } else {
                    setAppointments(json.appointments);
                    console.log("Appointments set", appointments);
                }
            } else {
                console.error('Data from server is not in the expected format' + JSON.stringify(json));
            }
        }
    };
    useEffect(() => {
        fetchAppointments();
    }, []);

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
            <div className='workouts'>
                <h3>Upcoming Bookings:</h3>
                {appointments.map(appointment => (
                    <AppointmentDetails key={appointment._id} appointment={appointment} updateAppointments={updateAppointments} />
                ))}
            </div>

        </div>
    );
}

export default Landing;