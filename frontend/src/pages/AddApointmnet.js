import AppointmentForm from "../components/AppointmentForm";
import { useState } from "react";




const AddAppointment = () => {
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
    const updateAppointments = () => {
        fetchAppointments();
    };
    return (
        <div className="add-appointment">
            <h2>Add Bookings</h2>
            <AppointmentForm updateAppointments={updateAppointments} />
        </div>
    );
}

export default AddAppointment;