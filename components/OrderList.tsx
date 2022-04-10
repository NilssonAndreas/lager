import { useState, useEffect } from 'react';
import { View, Text, Button } from "react-native";
import orderModel from '../models/orders'

export default function OrderList({ route, navigation }) {
    const { reload } = route.params || false;
    const [allOrders, setAllOrders] = useState([]);
   
    if (reload) {
        reloadOrders();
    }

    async function reloadOrders() {
        setAllOrders(await orderModel.getOrders());
        //För att stoppa evighetsloop
        navigation.navigate("List", { reload: false });
    }

    useEffect(() => {
        reloadOrders();
    }, []);

    const listOfOrders = allOrders
        .filter(order => order.status === "Ny")
        .map((order, index) => {
            return <Button
                title={order.name}
                key={index}
                color={'green'}
                onPress={() => {
                    navigation.navigate('Details', {
                        order: order
                    });
                }}

            />
        });
    return (
        <View>
            <Text>Ordrar redo att plockas</Text>
            {listOfOrders}
        </View>
    );
}