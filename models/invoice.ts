import config from "../config/config.json";
import storage from "./storage";

const Invoices = {

    getInvoices: async function getInvoices() {
        let token = await storage.readToken()
        const response = await fetch(`${config.base_url}/invoices?api_key=${config.api_key}`, {
            headers: {
                'x-access-token': token.token
                },
        } );
        const result = await response.json();
        return result.data;
    },

    createInvoice: async function createInvoice(invoiceInfo: object) {
        let token = await storage.readToken()
        const response = await fetch(`${config.base_url}/invoices`, {
            body: JSON.stringify(invoiceInfo),
            headers: {
            'content-type': 'application/json',
            'x-access-token': token.token
            },
            method: 'POST'
        });
        const result = await response.json();
        return result.data;

    }
};

export default Invoices;