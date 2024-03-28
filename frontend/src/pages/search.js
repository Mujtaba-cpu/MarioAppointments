import React, { useEffect, useState } from 'react';
import AppointmentDetails from '../components/AppointmentDetails';
import { Link, useParams } from 'react-router-dom';


const Search = () => {
    const { username } = useParams();
    const [appointments, setAppointments] = useState([]);
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [range, setRange] = useState('today');
    const [error, setError] = useState(null);   


    const updateAppointments = () => {
        fetchAppointmentsByDateRange(range);
    };
    const fetchAppointments = async () => {
        setAppointments([]);
        setError('');
        const response = await fetch('https://mario-appointments-server.vercel.app/appointments');
        const json = await response.json();
        console.log(json.appointments);
        if (response.ok) {
            if (json.appointments && Array.isArray(json.appointments)) {
                if (json.appointments.length === 0) {
                    setError('No appointments found')
                } else {
                    setAppointments(json.appointments);
                }
            } else {
                console.error('Data from server is not in the expected format' + JSON.stringify(json));
            }
        }
    };
    const fetchAppointmentsByDateRange = async (range) => {
        setAppointments([]);
        setError('');
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
        } else if (range === 'all') {
            fetchAppointments();
            return;
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
                if (json.appointments.length === 0) {
                    setError('No appointments found')
                } else {
                    setAppointments(json.appointments);
                }
            } else {
                console.error('Data from server is not in the expected format' + JSON.stringify(json));
            }
        }
    };
    useEffect(() => {
        if (range === 'today') {
            fetchAppointmentsByDateRange(range);
        } else if (range === 'thisWeek') {
            fetchAppointmentsByDateRange(range);
        } else if (range === 'thisMonth') {
            fetchAppointmentsByDateRange(range);
        } else if (range === 'all') {
            fetchAppointments();
        }
        updateAppointments();
    }, [range,start,end]);

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
        <div className='custom-search'>
            <div className='workouts' >
                <select value={range} onChange={(e) => setRange(e.target.value)}>
                    <option value="today">Today</option>
                    <option value="thisWeek">This Week</option>
                    <option value="thisMonth">This Month</option>
                    <option value="customRange">Custom Range</option>
                    <option value="all">All</option>
                </select>

                {range === 'customRange' && (
                    <>
                        <input type="date" value={start} onChange={(e) => setStart(e.target.value)} />
                        <label>End Date:</label>
                        <input type="date" value={end} onChange={(e) => setEnd(e.target.value)} /> 
                        <button style={{ marginRight: '10px', marginBottom: '10px' }} onClick={handleFetchButtonClick}>Fetch Bookings</button>
                    </>
                )}
            </div>

            
             <Link to={`/search/${username}`}>
                <button>Custom Search</button>
            </Link>
            {/* <button onClick={fetchAppointments}>View All</button> */}

            <div className='workouts'>
                {appointments.map(appointment => (
                    <AppointmentDetails key={appointment._id} appointment={appointment} updateAppointments={updateAppointments} />
                ))}
            </div>
            {error && <div className='error'>{error}</div>}
        </div>
    );
};

export default Search;
