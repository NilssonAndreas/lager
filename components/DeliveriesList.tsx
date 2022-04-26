import { ScrollView, Text, View, Button } from "react-native";
import { Base, Typography } from "../styles";
import { useState, useEffect } from 'react';
import deliveryModel from '../models/deliveries'

export default function DelivieriesList({ route, navigation }) {
    const { reload } = route.params || false;
    const [allDeliveries, setAllDeliveries] = useState([]);

    if (reload) {
        reloadDeliveries();
    }

    async function reloadDeliveries() {
        console.log("API D-LIST")
        setAllDeliveries(await deliveryModel.getDeliveries());
        //För att stoppa evighetsloop
        navigation.navigate("List", { reload: false });
    };
    useEffect(() => {
        reloadDeliveries();
    }, []);

    const listOfDeliveries = allDeliveries
        .map((delivery, index) => {
            return <Text
            key={index}
            style={{ ...Typography.listText }}
            >
              { delivery.amount } st {delivery.product_name} Anländer: {delivery.delivery_date}
            </Text>
        });

    return (
        <ScrollView style={Base.base}>
            <Text style={Typography.header2}>Inleveranser</Text>
            {listOfDeliveries.length === 0 ? <Text style={Typography.normal}>Inga inleveranser</Text> : listOfDeliveries}
            
            <Button
                title="Skapa ny inleverans"
                onPress={() => {
                    navigation.navigate('Form');
                }}
            />
        </ScrollView>
    );
}