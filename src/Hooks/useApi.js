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

    return { trips, hotels };
}

export default useApi;