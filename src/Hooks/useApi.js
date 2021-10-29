import { useEffect, useState } from "react";
import { developmentUrl, productionUrl } from "../Constants/Constants";
const axios = require('axios').default;

let useApi = () => {
    const development = true;
    const serverUrl = development ? developmentUrl : productionUrl;

    const [trips, setTrips] = useState([]);
    const [hotels, setHotels] = useState([]);
    const [allBookings, setAllBookings] = useState([]);
    const [tripBooked, setTripBooked] = useState();
    const [bookingDeleted, setBookingDeleted] = useState();
    const [locationState, setLocationState] = useState();

    const tripsUrl = `${serverUrl}/trips`;
    const hotelsUrl = `${serverUrl}/hotels`;
    const bookingUrl = `${serverUrl}/booking`;
    const allBookingsUrl = `${serverUrl}/allbookings`;
    const deleteBookingUrl = `${serverUrl}/delete/booking`;//need to add _id

    useEffect(() => {
        axios.get(tripsUrl)
            .then(response => {
                setTrips(response.data);
            })
            .catch(e => console.log(e));
    }, []);
    useEffect(() => {
        axios.get(hotelsUrl)
            .then(response => {
                setHotels(response.data);
            })
            .catch(e => console.log(e));
    }, []);
    useEffect(() => {
        axios.get(allBookingsUrl)
            .then(response => {
                setAllBookings(response.data);
            })
            .catch(e => console.log(e));
    }, []);


    const handleBooking = (tripId, email, contact, address) => {
        axios.post(bookingUrl, {
            tripId, email, contact, address, "approved": false
        })
            .then(function (response) {
                if (response.data) {
                    //if trip is booked set true else false
                    setTripBooked(true);
                }
                else {
                    setTripBooked(false);
                }
            })
            .catch(function (error) {
                console.log(error);
                setTripBooked(false);
            });
    }

    const updateLocationState = (state) => {
        setLocationState(state);
    }

    const handleDeleteBooking = (id) => {
        axios.delete(`${deleteBookingUrl}/${id}`)
            .then(function (response) {
                if (response.data) {
                    //if booking is deleted set true else false
                    setBookingDeleted(true);
                    //fetch new data
                    axios.get(allBookingsUrl)
                        .then(response => {
                            setAllBookings(response.data);
                        })
                        .catch(e => console.log(e));
                }
                else {
                    setBookingDeleted(false);
                }
            })
            .catch(function (error) {
                console.log(error);
                setTripBooked(false);
            });
    }
    return { trips, hotels, allBookings, handleBooking, tripBooked, locationState, updateLocationState, handleDeleteBooking };
}

export default useApi;