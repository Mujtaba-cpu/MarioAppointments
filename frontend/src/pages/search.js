import React, { useEffect, useState } from 'react';
import AppointmentDetails from '../components/AppointmentDetails';


const Search = () => {
    const [appointments, setAppointments] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const fetchAppointmentsByDate = async () => {

        const response = await fetch('/appointments/date', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ startDate, endDate }),
        });
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
        fetchAppointmentsByDate();
    }, []);


    const fetchAppointments = async () => {
        setStartDate('');
        setEndDate('');
        const response = await fetch('/appointments');
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
        <div>
            <label>Start Date:</label>
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            <label>End Date:</label>
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            <button style={{ marginRight: '10px', opacity: (!startDate || !endDate) ? '0.5' : '1' }} onClick={fetchAppointmentsByDate} disabled={!startDate || !endDate}>Fetch Appointments</button>
            <button onClick={fetchAppointments}>View All</button>
            <div className='workouts'>
                {appointments.map(appointment => (
                    <AppointmentDetails key={appointment._id} appointment={appointment} updateAppointments={updateAppointments} />
                ))}
            </div>
        </div>
    );
};

export default Search;
