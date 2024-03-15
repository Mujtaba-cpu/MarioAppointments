import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import AppointmentDetails from "../components/AppointmentDetails";


const Home = () => {
    const [field, setField] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [pickupLocation, setPickupLocation] = useState('');
    const [destination, setDestination] = useState('');
    const [username, setUsername] = useState('');
    const [appointments, setAppointments] = useState(null);

    const fetchAppointments = async () => {
        if (field === 'customerName') {
            const response = await fetch('https://mario-appointments-server.vercel.app/appointments/search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ field , customerName }),
            });
            const json = await response.json();
            if (response.ok) {
                if (json.appointments && Array.isArray(json.appointments)) {
                    setAppointments(json.appointments);
                } else {
                    console.error('Data from server is not in the expected format' + JSON.stringify(json));
                }
            }
        } else if (field === 'pickupLocation') {
            const response = await fetch('https://mario-appointments-server.vercel.app/appointments/search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ field, pickupLocation }),
            });
            const json = await response.json();
            if (response.ok) {
                if (json.appointments && Array.isArray(json.appointments)) {
                    setAppointments(json.appointments);
                } else {
                    console.error('Data from server is not in the expected format' + JSON.stringify(json));
                }
            }
        } else if (field === 'destination') {
            const response = await fetch('https://mario-appointments-server.vercel.app/appointments/search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ field, destination }),
            });
            const json = await response.json();
            if (response.ok) {
                if (json.appointments && Array.isArray(json.appointments)) {
                    setAppointments(json.appointments);
                } else {
                    console.error('Data from server is not in the expected format' + JSON.stringify(json));
                }
            }
        } else if (field === 'username') {
            const response = await fetch('https://mario-appointments-server.vercel.app/appointments/search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ field, username }),
            });
            const json = await response.json();
            if (response.ok) {
                if (json.appointments && Array.isArray(json.appointments)) {
                    setAppointments(json.appointments);
                } else {
                    console.error('Data from server is not in the expected format' + JSON.stringify(json));
                }
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
        <div className="custom-search">
            <div className="workouts">
                <h2>Welcome to Custom Search</h2>

                <select value={field} onChange={(e) => setField(e.target.value)}>
                    <option value="">Select the field you want to search on</option>
                    <option value="customerName">Customer Name</option>
                    <option value="pickupLocation">Pickup Location</option>
                    <option value="destination">Destination</option>
                    <option value="username">Created by</option>
                </select>

                {field === 'customerName' && (
                    <>
                        <input placeholder="Input Customer Name" type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
                    </>
                )}
                {field === 'pickupLocation' && (
                    <>
                        <input placeholder="Input Pickup Location" type="text" value={pickupLocation} onChange={(e) => setPickupLocation(e.target.value)} />
                    </>
                )}
                {field === 'destination' && (
                    <>
                        <input placeholder="Input Destination" type="text" value={destination} onChange={(e) => setDestination(e.target.value)} />
                    </>
                )}
                {field === 'username' && (
                    <>
                        <input placeholder="Input username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </>
                )}

                <button onClick={fetchAppointments}>Search</button>

                {appointments &&
                    appointments.map(appointment => (
                        <AppointmentDetails key={appointment._id} appointment={appointment} updateAppointments={updateAppointments} />
                    ))}
            </div>
        </div>
    );
}

export default Home;