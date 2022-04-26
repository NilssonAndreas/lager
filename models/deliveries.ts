import config from "../config/config.json";
import { Delivery } from "../interfaces/delivery";

const Deliveries = {

    getDeliveries: async function getDeliveries(): Promise<Delivery[]> {
        console.log("TILL API i Delivery");
        const response = await fetch(`${config.base_url}/deliveries?api_key=${config.api_key}`);
        const result = await response.json();
        return result.data;
    },

    addDelivery: async function addDelivery(deliveryToUpdate) {
        await fetch(`${config.base_url}/deliveries`, {
            body: JSON.stringify(deliveryToUpdate),
            headers: {
            'content-type': 'application/json'
            },
            method: 'POST'
        })
        .then(function (response) {
            console.log("Added Delivery")
        });

    }
}

export default Deliveries;