import config from "./../config/config.json";

const products = {

    getProducts: async function getProducts() {

        const response = await fetch(`${config.base_url}/products?api_key=${config.api_key}`);
        const result = await response.json();
        return result.data;
    },

    updateProductStock: async function updateProduct(product) {
            await fetch(`${config.base_url}/products`, {
            body: JSON.stringify(product),
            headers: {
            'content-type': 'application/json'
            },
            method: 'PUT'
            })
            .then(function (response) {
                console.log("DEt gick bra")
            });
    }

}

export default products;