import { useEffect, useState } from "react";
import { developmentUrl, productionUrl } from "../Constants/Constants";
const axios = require('axios').default;

let useApi = () => {
    const development = true;
    const serverUrl = development ? developmentUrl : productionUrl;

    const [trips, setTrips] = useState([]);
    const [hotels, setHotels] = useState([]);

    const tripsUrl = `${serverUrl}/trips`;
    const hotelsUrl = `${serverUrl}/hotels`;
    const bookingUrl = `${serverUrl}/booking`;

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


    const handleBooking = (tripId, email, contact, address) => {
        axios.post(bookingUrl, {
            tripId, email, contact, address
        })
            .then(function (response) {
                console.log(response);
                if (response.data) {
                    console.log("Trip Booked Successfully")
                }
                else {
                    console.log("Trip Booked Failed.")
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    return { trips, hotels, handleBooking };
}

export default useApi;