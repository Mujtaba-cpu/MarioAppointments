import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import AppointmentDetails from "../components/AppointmentDetails";


const Home = () => {
    const [field, setField] = useState('');
    const [appointments, setAppointments] = useState(null);

    const fetchAppointments = async () => {
       if(field === 'customerName'){
           const response = await fetch('https://mario-appointments-server.vercel.app/appointments/search/customerName', {
               method: 'POST',
               headers: {
                   'Content-Type': 'application/json',
               },
               body: JSON.stringify({ field }),
           });
           const json = await response.json();
           if (response.ok) {
               if (json.appointments && Array.isArray(json.appointments)) {
                   setAppointments(json.appointments);
               } else {
                   console.error('Data from server is not in the expected format' + JSON.stringify(json));
               }
           }
       } else if(field === 'pickupLocation'){
              const response = await fetch('https://mario-appointments-server.vercel.app/appointments/search/pickupLocation', {
                method: 'POST',
                headers: {
                     'Content-Type': 'application/json',
                },
                body: JSON.stringify({ field }),
              });
              const json = await response.json();
              if (response.ok) {
                if (json.appointments && Array.isArray(json.appointments)) {
                     setAppointments(json.appointments);
                } else {
                     console.error('Data from server is not in the expected format' + JSON.stringify(json));
                }
              }
         } else if(field === 'destination'){
              const response = await fetch('https://mario-appointments-server.vercel.app/appointments/search/destination', {
                method: 'POST',
                headers: {
                     'Content-Type': 'application/json',
                },
                body: JSON.stringify({ field }),
              });
              const json = await response.json();
              if (response.ok) {
                if (json.appointments && Array.isArray(json.appointments)) {
                     setAppointments(json.appointments);
                } else {
                     console.error('Data from server is not in the expected format' + JSON.stringify(json));
                }
              }
         } else if(field === 'username'){
              const response = await fetch('https://mario-appointments-server.vercel.app/appointments/search/username', {
                method: 'POST',
                headers: {
                     'Content-Type': 'application/json',
                },
                body: JSON.stringify({ field }),
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
        <div className="home">
            <div className="workouts">
                <h2>Welcome to Custom Search</h2>
                <button onClick={() => window.location.href = '/search'}>Search by Date</button>

                <select value={field} onChange={(e) => setField(e.target.value)}>
                    <option value="">Select the field you want to search on</option>
                    <option value="customerName">Customer Name</option>
                    <option value="pickupLocation">Pickup Location</option>
                    <option value="destination">Destination</option>
                    <option value="username">Created by</option>
                </select>

                <h2>{field}</h2>

                {appointments &&
                    appointments.map(appointment => (
                        <AppointmentDetails key={appointment._id} appointment={appointment} updateAppointments={updateAppointments} />
                    ))}
            </div>
        </div>
    );
}

export default Home;