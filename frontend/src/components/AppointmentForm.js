import { useState, useEffect } from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useParams } from 'react-router-dom';


const AppointmentForm = ({ updateAppointments }) => {
    const [numberOfPassengers, setNumberOfPassengers] = useState('');
    const [isReturn, setIsReturn] = useState(false);
    const [pickupDate, setPickupDate] = useState('');
    const [pickupTime, setPickupTime] = useState('');
    const [pickupLocation, setPickupLocation] = useState('');
    const [destination, setDestination] = useState('');
    const [returnTime, setReturnTime] = useState('');
    const [returnLocation, setReturnLocation] = useState('');
    const [returnDestination, setReturnDestination] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [adInfo, setAdInfo] = useState('');
    const [priceQuote, setPriceQuote] = useState('');
    const [email, setEmail] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [emptyFields, setEmptyFields] = useState([]);
    const [searchResultsPickup, setSearchResultsPickup] = useState([]);
    const [searchResultsDestination, setSearchResultsDestination] = useState([]);
    const [searchResultsReturn, setSearchResultsReturn] = useState([]);
    const [searchResultsReturnDestination, setSearchResultsReturnDestination] = useState([]);
    const { username } = useParams();

    useEffect(() => {
        // Fetch search results based on pickupLocation
        const fetchSearchResultsPickup = async () => {
            try {
                const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${pickupLocation}`);
                const data = await response.json();
                setSearchResultsPickup(data);

            } catch (error) {
                console.error('Error fetching search results:', error);
            }
        };

        //fetch search resduls based on destination
        const fetchSearchResultsDestination = async () => {
            try {
                const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${destination}`);
                const data = await response.json();
                setSearchResultsDestination(data);
            } catch (error) {
                console.error('Error fetching search results:', error);
            }
        };

        //fetch searchresults based on return location
        const fetchSearchResultsReturn = async () => {
            try {
                const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${returnLocation}`);
                const data = await response.json();
                setSearchResultsReturn(data);
            } catch (error) {
                console.error('Error fetching search results:', error);
            }
        };

        //fetch searchresults based on return destination
        const fetchSearchResultsReturnDestination = async () => {
            try {
                const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${returnDestination}`);
                const data = await response.json();
                setSearchResultsReturnDestination(data);
            } catch (error) {
                console.error('Error fetching search results:', error);
            }
        };


        if (pickupLocation) {
            fetchSearchResultsPickup();
        } else {
            setSearchResultsPickup([]);
        }

        if (destination) {
            fetchSearchResultsDestination();
        } else {
            setSearchResultsDestination([]);
        }

        if (returnLocation) {
            fetchSearchResultsReturn();
        } else {
            setSearchResultsReturn([]);
        }

        if (returnDestination) {
            fetchSearchResultsReturnDestination();
        } else {
            setSearchResultsReturnDestination([]);
        }

    }, [pickupLocation, destination, returnLocation, returnDestination]);

    const handlePassengerChange = (e) => {
        const inputValue = e.target.value;
        const newNumberOfPassengers = inputValue < 0 ? 0 : inputValue;
        setNumberOfPassengers(newNumberOfPassengers);
    };

    const handleIsReturnChange = (e) => {
        setIsReturn(e.target.checked);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('pickupTime', pickupTime);
        const appointment = { numberOfPassengers, isReturn, pickupDate, pickupTime, pickupLocation, destination, returnTime, returnLocation, returnDestination, contactNumber, adInfo, priceQuote, email, username, customerName };
        console.log('appointment', username)
        console.log('appointment', appointment)
        const response = await fetch('https://mario-appointments-server.vercel.app/appointments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(appointment),
        });
        const json = await response.json();
        if (!response.ok) {
            setError(json.error);
            setSuccessMessage('');
            setEmptyFields(json.emptyFields);
        }
        if (response.ok) {
            setError(null);
            setEmptyFields([]);
            setNumberOfPassengers('');
            setIsReturn(false);
            setPickupDate('');
            setPickupTime('');
            setPickupLocation('');
            setDestination('');
            setReturnTime('');
            setReturnLocation('');
            setReturnDestination('');
            setContactNumber('');
            setAdInfo('');
            setPriceQuote('');
            setEmail('');
            setCustomerName('');
            setSuccessMessage('Appointment created successfully');
            updateAppointments();
            setTimeout(() => {
                setSuccessMessage('');
            }, 5000);
        }
    };

    return (
        <form className='create' onSubmit={handleSubmit}>
            <h3>Create a new appointment, {username}!</h3>

            <label>Customer Name</label>
            <input
                type='text'
                placeholder='Enter customer name'
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                required
            />

            <label>Email</label>
            <input
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />


            <label>Number of Passengers</label>
            <input
                type='number'
                placeholder='Enter number of passengers'
                value={numberOfPassengers}
                onChange={handlePassengerChange}
                required
                min="0"
                className={(emptyFields && emptyFields.includes('load')) ? 'error' : ''}
            />

            <label>Pickup Date</label>
            <input
                type='date'
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                required
            />

            <label>Pickup Time</label>
            <input
                type='time'
                value={pickupTime}
                onChange={(e) => setPickupTime(e.target.value)}
                required
            />

            <label>Pickup Location</label>
            <input
                type='text'
                value={pickupLocation} onChange={(e) => setPickupLocation(e.target.value)}
                required
            />

            {searchResultsPickup.length > 0 && (
                <select onChange={(e) => setPickupLocation(e.target.value)}>
                    {searchResultsPickup.map((result) => (
                        <option key={result.place_id} value={result.display_name}>{result.display_name}</option>
                    ))}
                </select>
            )}

            <label>Destination</label>
            <input
                type='text'
                value={destination} onChange={(e) => setDestination(e.target.value)}
                required
            />

            {searchResultsDestination.length > 0 && (
                <select onChange={(e) => setDestination(e.target.value)}>
                    {searchResultsDestination.map((result) => (
                        <option key={result.place_id} value={result.display_name}>{result.display_name}</option>
                    ))}
                </select>
            )}
            <label>Contact Number</label>
            <input type='text' value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} required />
            <label>Price Quote</label>
            <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '8px' }}>£</span>
                <input type='number' placeholder="00.00" style={{ paddingLeft: '20px' }} value={priceQuote} onChange={(e) => setPriceQuote(e.target.value)} required />
            </div>
            <label>Additional Information</label>
            <input type='text' value={adInfo} onChange={(e) => setAdInfo(e.target.value)} />
            <FormControlLabel
                control={
                    <Checkbox
                        checked={isReturn}
                        onChange={handleIsReturnChange}
                        color="primary"
                    />
                }
                label="Is this a return ride?"
                labelPlacement="end"
                className="fcl"
            />
            <br />


            {isReturn && (
                <>
                    <label>Return Time</label>
                    <input type='time' value={returnTime} onChange={(e) => setReturnTime(e.target.value)} required />

                    <label>Return Location</label>
                    <input type='text' value={returnLocation} onChange={(e) => setReturnLocation(e.target.value)} required />
                    {searchResultsReturn.length > 0 && (
                        <select onChange={(e) => setReturnLocation(e.target.value)}>
                            {searchResultsReturn.map((result) => (
                                <option key={result.place_id} value={result.display_name}>{result.display_name}</option>
                            ))}
                        </select>
                    )}

                    <label>Return Destination</label>
                    <input type='text' value={returnDestination} onChange={(e) => setReturnDestination(e.target.value)} required />
                    {searchResultsReturnDestination.length > 0 && (
                        <select onChange={(e) => setReturnDestination(e.target.value)}>
                            {searchResultsReturnDestination.map((result) => (
                                <option key={result.place_id} value={result.display_name}>{result.display_name}</option>
                            ))}
                        </select>
                    )}
                </>
            )}

            <button>Add Appointment</button>
            {error && <div className='error'>{error}</div>}
            {successMessage && <div className='success'>{successMessage}</div>}
        </form>
    );
};

export default AppointmentForm;
