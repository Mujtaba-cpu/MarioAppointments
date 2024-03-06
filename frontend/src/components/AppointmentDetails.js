import React from "react";
import { useEffect, useState } from "react";


const AppointmentDetails = ({ appointment, updateAppointments }) => {
    const [deleteSuccess, setDeleteSuccess] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [id, setid] = useState('');
    const [numberOfPassengers, setNumberOfPassengers] = useState('');
    const [isReturn, setIsReturn] = useState('');
    const [pickupTime, setPickupTime] = useState('');
    const [pickupLocation, setPickupLocation] = useState('');
    const [destination, setDestination] = useState('');
    const [returnTime, setReturnTime] = useState('');
    const [returnLocation, setReturnLocation] = useState('');
    const [returnDestination, setReturnDestination] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        setDeleteSuccess(false);
    }, [appointment]);

    const handleClick = async () => {
        const response = await fetch(`http://localhost:5000/appointments/${appointment._id}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            setDeleteSuccess(true);
            updateAppointments();
            setTimeout(() => {
                setDeleteSuccess(false);
            }, 5000);
        } else {
            setError('Failed to delete appointment');
        }
    };

    const handleEdit = async () => {
        setEditMode(true);
        setid(appointment.id);
        setNumberOfPassengers(appointment.numberOfPassengers);
        setIsReturn(appointment.isReturn);
        setPickupTime(appointment.pickupTime);
        setPickupLocation(appointment.pickupLocation);
        setDestination(appointment.destination);
        setReturnTime(appointment.returnTime);
        setReturnLocation(appointment.returnLocation);
        setReturnDestination(appointment.returnDestination);
        setContactNumber(appointment.contactNumber);
    };

    const handleCancel = () => {
        setEditMode(false);
        setid('');
        setNumberOfPassengers('');
        setIsReturn('');
        setPickupTime('');
        setPickupLocation('');
        setDestination('');
        setReturnTime('');
        setReturnLocation('');
        setReturnDestination('');
        setContactNumber('');
        setError(null);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/appointments/${appointment._id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id,
                numberOfPassengers,
                isReturn,
                pickupTime,
                pickupLocation,
                destination,
                returnTime,
                returnLocation,
                returnDestination,
                contactNumber
            })
        });
        const json = await response.json();
        if (!response.ok) {
            setError(json.error);
            setSuccessMessage('');
        }
        if (response.ok) {
            setError(null);
            setid('');
            setNumberOfPassengers('');
            setIsReturn('');
            setPickupTime('');
            setPickupLocation('');
            setDestination('');
            setReturnTime('');
            setReturnLocation('');
            setReturnDestination('');
            setContactNumber('');
            setSuccessMessage('Appointment updated successfully');
            setEditMode(false);
            updateAppointments();
            setTimeout(() => {
                setSuccessMessage('');
            }, 5000);
        }
    };

    return (
        <div className="appointment-details">
            <h4>{appointment._id}</h4>
            <p>
                <strong>Number of Passengers:</strong> {appointment.numberOfPassengers}
            </p>
            <p>
                <strong>Pickup Time:</strong> {appointment.pickupTime}
            </p>
            <p>
                <strong>Pickup Location:</strong> {appointment.pickupLocation}
            </p>
            <p>
                <strong>Destination:</strong> {appointment.destination}
            </p>
            {appointment.isReturn && (
                <>
                    <p>
                        <strong>Return Time:</strong> {appointment.returnTime}
                    </p>
                    <p>
                        <strong>Return Location:</strong> {appointment.returnLocation}
                    </p>
                    <p>
                        <strong>Return Destination:</strong> {appointment.returnDestination}
                    </p>
                </>
            )}
            <p>
                <strong>Contact Number:</strong> {appointment.contactNumber}
            </p>
            {/* <p>{formatDistanceToNow(new Date(appointment.createdAt), { addSuffix: true })}</p> */}
            <div className="button-group">
                <span className='material-symbols-outlined' onClick={handleClick}>delete</span>
                <span className='material-symbols-outlined' style={{ cursor: 'pointer', marginRight: '45px' }} onClick={handleEdit} >edit
                </span>
            </div>

            {deleteSuccess && (
                <div className="success">
                    Appointment deleted successfully
                </div>
            )}
            {editMode ? (
                <div>
                    <form className="create" onSubmit={handleSubmit}>
                        <h3>Edit Appointment</h3>

                        <label>Number of Passengers:</label>
                        <input
                            type="text"
                            value={numberOfPassengers}
                            onChange={(e) => setNumberOfPassengers(e.target.value)}
                        />
                        <label>Is Return:</label>
                        <input
                            type="text"
                            value={isReturn}
                            onChange={(e) => setIsReturn(e.target.value)}
                        />
                        <label>Pickup Time:</label>
                        <input
                            type="text"
                            value={pickupTime}
                            onChange={(e) => setPickupTime(e.target.value)}
                        />
                        <label>Pickup Location:</label>
                        <input
                            type="text"
                            value={pickupLocation}
                            onChange={(e) => setPickupLocation(e.target.value)}
                        />
                        <label>Destination:</label>
                        <input
                            type="text"
                            value={destination}
                            onChange={(e) => setDestination(e.target.value)}
                        />
                        {isReturn && (
                            <>
                                <label>Return Time:</label>
                                <input
                                    type="text"
                                    value={returnTime}
                                    onChange={(e) => setReturnTime(e.target.value)}
                                />
                                <label>Return Location:</label>
                                <input
                                    type="text"
                                    value={returnLocation}
                                    onChange={(e) => setReturnLocation(e.target.value)}
                                />
                                <label>Return Destination:</label>
                                <input
                                    type="text"
                                    value={returnDestination}
                                    onChange={(e) => setReturnDestination(e.target.value)}
                                />
                            </>
                        )}
                        <label>Contact Number:</label>
                        <input
                            type="text"
                            value={contactNumber}
                            onChange={(e) => setContactNumber(e.target.value)}
                        />

                        <button style={{ marginRight: '10px' }}>Update</button>
                        <button onClick={handleCancel}>Cancel</button>
                    </form>
                </div>
            ) : null}
            {error && <div className="error">{error}</div>}
            {successMessage && <div className="success">{successMessage}</div>}
        </div>
    );
};
export default AppointmentDetails;