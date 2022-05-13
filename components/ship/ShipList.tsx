import { useState, useEffect } from 'react';
import { View, Text, Button } from "react-native";
import orderModel from '../../models/orders';
import { Base, Typography } from "../../styles";

export default function ShipList({ route, navigation }) {
    const { reload } = route.params || false;
    const [shipOrders, setShipOrders] = useState([]);
   
    if (reload) {
        reloadOrders();
    }

    async function reloadOrders() {
        setShipOrders(await orderModel.getOrders());
        //För att stoppa evighetsloop
        navigation.navigate("List", { reload: false });
    }

    useEffect(() => {
        reloadOrders();
    }, []);

    const ShipList = shipOrders
        .filter(order => order.status === "Packad")
        .map((order, index) => {
            return <Button
                title={order.name}
                key={index}
                color={'green'}
                onPress={() => {
                    navigation.navigate('ship', {
                        order: order
                    });
                }}

            />
        });
    return (
        <View>
            <Text style={Typography.header3}>Ordrar redo att Levereras</Text>
            {ShipList}
        </View>
    );
}