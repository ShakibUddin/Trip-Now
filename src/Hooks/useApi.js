import { useEffect, useState } from "react";
import { developmentUrl, productionUrl } from "../Constants/Constants";
const axios = require('axios').default;

let useApi = () => {
    const development = true;
    const serverUrl = development ? developmentUrl : productionUrl;

    const [trips, setTrips] = useState([]);

    const tripsUrl = `${serverUrl}/trips`;

    useEffect(() => {
        axios.get(tripsUrl)
            .then(response => {
                setTrips(response.data);
            })
            .catch(e => console.log(e));
    }, []);

    return { trips };
}

export default useApi;