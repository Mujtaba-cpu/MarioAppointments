import React, { useEffect, useState } from 'react';
import AppointmentDetails from '../components/AppointmentDetails';


const Search = () => {
    const [appointments, setAppointments] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [range, setRange] = useState('today');

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
    
    const updateAppointments = () => {
        fetchAppointments();
    };
    const fetchAppointmentsByDateRange = async (range) => {
        const currentDate = new Date();
        let startDate, endDate;

        if (range === 'today') {
            startDate = currentDate.toISOString().split('T')[0];
            endDate = startDate;
            console.log(startDate, endDate);
            fetchAppointmentsByDate();
        } else if (range === 'thisWeek') {
                    const firstDayOfWeek = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay()));
                    const lastDayOfWeek = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 6));
                    startDate = firstDayOfWeek.toISOString().split('T')[0];
                    endDate = lastDayOfWeek.toISOString().split('T')[0];
                    fetchAppointmentsByDate();

            console.log(startDate, endDate);
        } else if (range === 'thisMonth') {
            const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
            const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
            startDate = firstDayOfMonth.toISOString().split('T')[0];
            endDate = lastDayOfMonth.toISOString().split('T')[0];
            console.log(startDate, endDate);
        } else if (range === 'customRange') {
            startDate = startDate;
            endDate = endDate;
            console.log(startDate, endDate);
        }
    };
    useEffect(() => {
        fetchAppointmentsByDateRange(range);
    }, []);



    return (
        <div className='search-box'>
            <div className='search-form-container'>
            <select value={range} onChange={(e) => setRange(e.target.value)}>
                <option value="today">Today</option>
                <option value="thisWeek">This Week</option>
                <option value="thisMonth">This Month</option>
                <option value="customRange">Custom Range</option>
            </select>
            
            {range === 'customRange' && (
                <>
                    <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                    <label>End Date:</label>
                    <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                </>
            )}
            </div>
            
            <button style={{ marginRight: '10px'}} onClick={() => fetchAppointmentsByDateRange(range)} >Fetch Appointments</button>
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
