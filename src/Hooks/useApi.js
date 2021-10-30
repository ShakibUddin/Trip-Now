import { useEffect, useState } from "react";
import { developmentUrl, productionUrl } from "../Constants/Constants";
const axios = require('axios').default;

let useApi = () => {
    const development = true;
    const serverUrl = development ? developmentUrl : productionUrl;

    const [trips, setTrips] = useState([]);
    const [popularPlaces, setPopularPlaces] = useState([]);
    const [hotels, setHotels] = useState([]);
    const [allBookings, setAllBookings] = useState([]);
    const [tripBooked, setTripBooked] = useState(-1);
    const [tripAdded, setTripAdded] = useState(-1);
    const [addTripError, setAddTripError] = useState("");
    const [locationState, setLocationState] = useState();

    const tripsUrl = `${serverUrl}/trips`;
    const addTripUrl = `${serverUrl}/trip`;
    const hotelsUrl = `${serverUrl}/hotels`;
    const popularPlacesUrl = `${serverUrl}/popularplaces`;
    const bookingUrl = `${serverUrl}/booking`;
    const allBookingsUrl = `${serverUrl}/allbookings`;
    const deleteBookingUrl = `${serverUrl}/delete/booking`;//need to add _id
    const updateBookingUrl = `${serverUrl}/update/booking`;//need to add _id

    const fetchTrips = () => {
        axios.get(tripsUrl)
            .then(response => {
                setTrips(response.data);
            })
            .catch(e => console.log(e));
    }
    const fetchPopularPlaces = () => {
        axios.get(popularPlacesUrl)
            .then(response => {
                setPopularPlaces(response.data);
            })
            .catch(e => console.log(e));
    }
    const fetchHotels = () => {
        axios.get(hotelsUrl)
            .then(response => {
                setHotels(response.data);
            })
            .catch(e => console.log(e));
    }
    const fetchBookings = () => {
        axios.get(allBookingsUrl)
            .then(response => {
                setAllBookings(response.data);
            })
            .catch(e => console.log(e));
    }

    const handleAddTrip = ({ name, description, imageUrl, price, day, night, breakfast, lunch, dinner }) => {
        axios.post(addTripUrl, {
            name, description, image: imageUrl, price, day, night, breakfast, lunch, dinner
        })
            .then(function (response) {
                if (response.data) {
                    console.log(response)
                    //if trip is added set 1 else 0
                    fetchTrips();
                    setTripAdded(1);
                    setAddTripError("");
                }
                else {
                    setTripAdded(0);
                }
            })
            .catch(function (error) {
                console.log(error);
                setTripAdded(0);
                setAddTripError(error);
            });
    }

    const handleBooking = (tripId, destination, name, email, contact, address) => {
        axios.post(bookingUrl, {
            tripId, destination, name, email, contact, address, "status": "Pending"
        })
            .then(function (response) {
                if (response.data) {
                    //if trip is booked set 1 else 0
                    setTripBooked(1);
                }
                else {
                    setTripBooked(0);
                }
            })
            .catch(function (error) {
                console.log(error);
                setTripBooked(0);
            });
    }

    const updateLocationState = (state) => {
        setLocationState(state);
    }

    const handleDeleteBooking = (id) => {
        axios.delete(`${deleteBookingUrl}/${id}`)
            .then(function (response) {
                if (response.data) {
                    //fetch new data
                    fetchBookings();
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const handleUpdateBooking = (id) => {
        axios.put(`${updateBookingUrl}/${id}`)
            .then(function (response) {
                if (response.data) {
                    //fetch new data
                    fetchBookings();
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    useEffect(() => {
        fetchTrips();
    }, []);
    useEffect(() => {
        fetchPopularPlaces();
    }, []);
    useEffect(() => {
        fetchHotels();
    }, []);
    useEffect(() => {
        fetchBookings();
    }, []);

    return { trips, hotels, allBookings, handleBooking, tripBooked, locationState, updateLocationState, handleDeleteBooking, fetchTrips, fetchHotels, fetchBookings, handleUpdateBooking, fetchPopularPlaces, popularPlaces, handleAddTrip, tripAdded, addTripError };
}

export default useApi;