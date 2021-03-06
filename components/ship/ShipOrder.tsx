import { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Base, Typography } from "../../styles";
import MapView from 'react-native-maps';
import { Marker } from "react-native-maps";
import getCoordinates from "../../models/nominatim";
import * as Location from 'expo-location';
import OrderModule from '../../models/orders'

export  default function ShipOrder({ route }) {

    const { order } = route.params;

    const [marker, setMarker] = useState(null);
    const [locationMarker, setLocationMarker] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
    
            if (status !== 'granted') {
                setErrorMessage('Permission to access location was denied');
                return;
            }
    
            const currentLocation = await Location.getCurrentPositionAsync({});
    
            setLocationMarker(<Marker
                coordinate={{
                    latitude: currentLocation.coords.latitude,
                    longitude: currentLocation.coords.longitude
                }}
                title="Min plats"
                pinColor="blue"
            />);
        })();
    }, []);

    useEffect(() => {
        (async () => {
            const results = await getCoordinates(`${order.address}, ${order.city}`);

            setMarker(<Marker
                coordinate={{ latitude: parseFloat(results[0].lat), longitude: parseFloat(results[0].lon) }}
                title={results[0].display_name}
            />);
        })();
    }, []);

   
    return (
        <View style={Base.base}>
            <Text style={Typography.header3}>Order information</Text>
            <Text > Namn: {order.name}</Text>
            <Text > Adress: {order.address}, {order.city} {order.zip }</Text>
            <Text > Beställt: {OrderModule.shippingInfo(order)}</Text>
            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: 56.1612,
                        longitude: 15.5869,
                        latitudeDelta: 0.1,
                        longitudeDelta: 0.1,
                    }}>
                    {marker}
                    {locationMarker}
                </MapView>
            </View>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});