import React from "react";
import { useState } from "react";
import Modal from 'react-modal';

const AppointmentDetails = ({ appointment, updateAppointments }) => {
    const [deleteSuccess, setDeleteSuccess] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [id, setid] = useState('');
    const [numberOfPassengers, setNumberOfPassengers] = useState('');
    const [pickupDate, setPickupDate] = useState('');
    const [isReturn, setIsReturn] = useState('');
    const [pickupTime, setPickupTime] = useState('');
    const [pickupLocation, setPickupLocation] = useState('');
    const [destination, setDestination] = useState('');
    const [returnTime, setReturnTime] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [returnLocation, setReturnLocation] = useState('');
    const [returnDestination, setReturnDestination] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [adInfo, setAdInfo] = useState('');
    const [priceQuote, setPriceQuote] = useState('');
    const [email, setEmail] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false);

    

    const handleClick = async () => {
        const response = await fetch(`https://mario-appointments-server.vercel.app/appointments/${appointment._id}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            setDeleteSuccess(true);
            updateAppointments();
            setTimeout(() => {
                setDeleteSuccess(false);
            }, 5000);
        } else {
            setError('Failed to delete Booking');
        }
    };

    const handleEdit = async () => {
        setEditMode(true);
        setModalIsOpen(true)
        setid(appointment.id);
        setNumberOfPassengers(appointment.numberOfPassengers);
        setPickupDate(appointment.pickupDate);
        setIsReturn(appointment.isReturn);
        setPickupTime(appointment.pickupTime);
        setPickupLocation(appointment.pickupLocation);
        setDestination(appointment.destination);
        setReturnTime(appointment.returnTime);
        setReturnDate(appointment.returnDate);
        setReturnLocation(appointment.returnLocation);
        setReturnDestination(appointment.returnDestination);
        setContactNumber(appointment.contactNumber);
        setAdInfo(appointment.adInfo);
        setPriceQuote(appointment.priceQuote);
        setEmail(appointment.email);
        setUsername(appointment.username);
        setCustomerName(appointment.customerName);
    };

    const handleCancel = () => {
        setModalIsOpen(false)
        setEditMode(false);
        setid('');
        setNumberOfPassengers('');
        setPickupDate('');
        setIsReturn('');
        setPickupTime('');
        setPickupLocation('');
        setDestination('');
        setReturnTime('');
        setReturnDate('');
        setReturnLocation('');
        setReturnDestination('');
        setContactNumber('');
        setAdInfo('');
        setPriceQuote('');
        setEmail('');
        setCustomerName('');
        setError(null);
    };

    const handleSubmit = async (e) => {
        setModalIsOpen(false)
        e.preventDefault();
        const response = await fetch(`https://mario-appointments-server.vercel.app/appointments/${appointment._id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id,
                numberOfPassengers,
                pickupDate,
                isReturn,
                pickupTime,
                pickupLocation,
                destination,
                returnTime,
                returnDate,
                returnLocation,
                returnDestination,
                contactNumber,
                adInfo,
                priceQuote,
                email,
                username,
                customerName

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
            setPickupDate('');
            setIsReturn('');
            setPickupTime('');
            setPickupLocation('');
            setDestination('');
            setReturnTime('');
            setReturnDate('');
            setReturnLocation('');
            setReturnDestination('');
            setContactNumber('');
            setAdInfo('');
            setPriceQuote('');
            setEmail('');
            setCustomerName('');
            setSuccessMessage('Booking updated successfully');
            setEditMode(false);
            updateAppointments();
            setTimeout(() => {
                setSuccessMessage('');
            }, 5000);
        }
    };

    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear().toString(); // Extract last two digits of the year
    
        // Function to get the ordinal suffix for the day
        function getOrdinalSuffix(day) {
            if (day >= 11 && day <= 13) {
                return 'th';
            }
            switch (day % 10) {
                case 1: return 'st';
                case 2: return 'nd';
                case 3: return 'rd';
                default: return 'th';
            }
        }
    
        const ordinalSuffix = getOrdinalSuffix(day);
    
        return `${day}${ordinalSuffix} ${month}, ${year}`;
    };
    
    
    

    return (
        <div className="appointment-details">
            <div className="appointment-grid">
                <h4>{formatDate(appointment.pickupDate)}</h4>
                <p>
                    <strong>Customer Name:</strong> <br /> {appointment.customerName}
                </p>
                <p>
                    <strong>PickupLocation:</strong> <br /> {appointment.pickupLocation}
                </p>
                <p>
                    <strong>Destination:</strong> <br /> {appointment.destination}
                </p>

                <p>
                    <strong>Number of Passengers:</strong> <br /> {appointment.numberOfPassengers}
                </p>



                


                <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
                    <button style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '1.5rem',
                        color: '#555',
                        zIndex: '9999', // Ensure it appears above the modal content
                    }} onClick={() => setModalIsOpen(false)}>✖</button>
                    <h4 style={{ color: '#e96914' }}>{new Date(appointment.pickupDate).toLocaleDateString('en-GB')}</h4>
                    {appointment.customerName && (
                        <p>
                            <strong >Customer Name:</strong> {appointment.customerName}
                        </p>
                    )}
                    {appointment.email && (
                        <p>
                            <strong >Email:</strong> {appointment.email}
                        </p>
                    )}

                    <p>
                        <strong >Appointment created by:</strong> {appointment.username}
                    </p>
                    <p>
                        <strong >Number of Passengers:</strong> {appointment.numberOfPassengers}
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
                    <p>
                        <strong>Is Return:</strong> {appointment.isReturn ? 'Yes' : 'No'}
                    </p>
                    {appointment.isReturn && (
                        <>
                            <p>
                                <strong>Return Time:</strong> {appointment.returnTime}
                            </p>
                            <p>
                                <strong>Return Date:</strong> {appointment.returnDate}
                            </p>
                            <p>
                                <strong>Return Location:</strong> {appointment.returnLocation}
                            </p>
                            <p>
                                <strong>Return Destination:</strong> {appointment.returnDestination}
                            </p>
                        </>
                    )}
                    {appointment.contactNumber && (
                        <p>
                            <strong>Contact Number:</strong> {appointment.contactNumber}
                        </p>
                    )}

                    {appointment.priceQuote && (
                        <p>
                            <strong>Price Quote:</strong> £ {appointment.priceQuote}
                        </p>
                    )}
                    {appointment.adInfo && (
                        <p>
                            <strong>Additional Information:</strong> {appointment.adInfo}
                        </p>
                    )}

                </Modal>

                {editMode ? (
                    console.log("modal"),
                    <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
                        <button style={{
                            position: 'absolute',
                            top: '10px',
                            right: '10px',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '1.5rem',
                            color: '#555',
                            zIndex: '9999', // Ensure it appears above the modal content
                        }} onClick={() => setModalIsOpen(false)}>✖</button>
                        <div className="edit-form container">
                            <form className="create" onSubmit={handleSubmit}>
                                <h3>Edit Appointment</h3>

                                <label>Pickup Date:</label>
                                <input
                                    type="date"
                                    id="pickupDate"
                                    value={pickupDate.substring(0, 10)}
                                    onChange={(e) => setPickupDate(e.target.value)}
                                />

                                <label>Customer Name:</label>
                                <input
                                    type="text"
                                    value={customerName}
                                    onChange={(e) => setCustomerName(e.target.value)}
                                />
                                <label>Email:</label>
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />

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
                                    type="time"
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
                                            type="time"
                                            value={returnTime}
                                            onChange={(e) => setReturnTime(e.target.value)}
                                        />
                                        <label>Return Date:</label>
                                        <input
                                            type="date"
                                            id="returnDate"
                                            value={returnDate ? returnDate.substring(0, 10) : ''}
                                            onChange={(e) => setReturnDate(e.target.value)}
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
                                <label>Additional Information:</label>
                                <input
                                    type="text"
                                    value={adInfo}
                                    onChange={(e) => setAdInfo(e.target.value)}
                                />
                                <label>Price Quote:</label>
                                <input
                                    type="text"
                                    value={priceQuote}
                                    onChange={(e) => setPriceQuote(e.target.value)}
                                />

                                <button style={{ marginRight: '10px' }}>Update</button>
                                <button onClick={handleCancel}>Cancel</button>
                            </form>
                        </div>

                    </Modal>
                ) : null}

            </div>
            <div className="button-group">
                    
                        <button onClick={() => setModalIsOpen(true)}>View Details</button>
                        <button style={{ marginLeft: '10px' }} onClick={handleEdit} >Edit</button>
                        <button style={{ marginLeft: '10px' }} onClick={handleClick}>Delete</button>
                    
                </div>
            {deleteSuccess && (
                <div className="success">
                    Booking deleted successfully
                </div>
            )}
            {error && <div className="error">{error}</div>}
            {successMessage && <div className="success">{successMessage}</div>}
        </div>
    );
};

export default AppointmentDetails;