import { Alert } from "react-native";
import config from "../config/config.json";
import { Order } from "../interfaces/OrderList";
import products from "./Products";

const orders = {

    getOrders: async function getOrders(): Promise<Order[]> {
        console.log("TILL API")
        const response = await fetch(`${config.base_url}/orders?api_key=${config.api_key}`);
        const result = await response.json();
        return result.data;
    },

    pickOrder: async function pickOrder(order: Partial<Order>) {
        let inStock: boolean = true;

        for (let item of order.order_items){
            if(item.amount > item.stock) {
                inStock = false
                break
            }
        };

        if (inStock === true) {
            await Promise.all(order.order_items.map(async (order_item) =>{
                let updateInfo = {
                    name: order_item.name,
                    stock: order_item.stock - order_item.amount,
                    api_key: config.api_key,
                    id: order_item.product_id,
                };

                await products.updateProductStock(updateInfo)
            }));

        // TODO: Ändra status för ordern till packad
            let updateOrderInfo = {
                id: order.id,
                name: order.name,
                status_id: 200,
                api_key: config.api_key,
            }
            this.updateOrder(updateOrderInfo)
        } else {
            Alert.alert(`out of stock`)
        };

    },

    updateOrder: async function updateOrder(orderToUpdate) {
        await fetch(`${config.base_url}/orders`, {
            body: JSON.stringify(orderToUpdate),
            headers: {
            'content-type': 'application/json'
            },
            method: 'PUT'
        })
        .then(function (response) {
            console.log("update complete")
        });

    }
};

export default orders;