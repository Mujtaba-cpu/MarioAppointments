import React, { useEffect, useState } from 'react';
import AppointmentDetails from '../components/AppointmentDetails';


const Search = () => {
    const [appointments, setAppointments] = useState([]);
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [range, setRange] = useState('today');


    const updateAppointments = () => {
        fetchAppointmentsByDateRange(range);
    };
    const fetchAppointmentsByDateRange = async (range) => {
        const currentDate = new Date();
        let startDate, endDate;

        if (range === 'today') {
            startDate = currentDate.toISOString().split('T')[0];
            endDate = startDate;
            console.log(startDate, endDate);
        } else if (range === 'thisWeek') {
            const firstDayOfWeek = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay()));
            const lastDayOfWeek = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 6));
            startDate = firstDayOfWeek.toISOString().split('T')[0];
            endDate = lastDayOfWeek.toISOString().split('T')[0];
            console.log(startDate, endDate);
        } else if (range === 'thisMonth') {
            const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
            const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
            startDate = firstDayOfMonth.toISOString().split('T')[0];
            endDate = lastDayOfMonth.toISOString().split('T')[0];
            console.log(startDate, endDate);
        } else if (range === 'customRange') {
            startDate = start;
            endDate = end;
            console.log(startDate, endDate);
        }

        const response = await fetch('https://mario-appointments-server.vercel.app/appointments/date', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ startDate, endDate }),
        });
        console.log(response);
        const json = await response.json();
        console.log(json.appointments);
        if (response.ok) {
            if (json.appointments && Array.isArray(json.appointments)) {
                setAppointments(json.appointments);
            } else {
                console.error('Data from server is not in the expected format' + JSON.stringify(json));
            }
        }
    };
    useEffect(() => {
        fetchAppointmentsByDateRange(range);
        updateAppointments();
    }, []);

    const handleFetchButtonClick = () => {
        if (range !== 'customRange') {
            fetchAppointmentsByDateRange(range);
        } else {
            if (start && end) {
                fetchAppointmentsByDateRange(range);
            } else {
                alert({message: 'Please select both start and end dates for custom range.'});
            }
        }
    }



    return (
        <div className='search-box'>
            <div className='search-form-container' >
                <select value={range} onChange={(e) => setRange(e.target.value)}>
                    <option value="today">Today</option>
                    <option value="thisWeek">This Week</option>
                    <option value="thisMonth">This Month</option>
                    <option value="customRange">Custom Range</option>
                </select>

                {range === 'customRange' && (
                    <>
                        <input type="date" value={start} onChange={(e) => setStart(e.target.value)} />
                        <label>End Date:</label>
                        <input type="date" value={end} onChange={(e) => setEnd(e.target.value)} />
                    </>
                )}
            </div>

             <button style={{ marginRight: '10px' }} onClick={handleFetchButtonClick}>Fetch Appointments</button>
            {/* <button onClick={fetchAppointments}>View All</button> */}

            <div className='workouts'>
                {appointments.map(appointment => (
                    <AppointmentDetails key={appointment._id} appointment={appointment} updateAppointments={updateAppointments} />
                ))}
            </div>
        </div>
    );
};

export default Search;
