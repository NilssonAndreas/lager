import { useState, useEffect } from 'react';
import { Platform, ScrollView, Text, TextInput, Button, View } from "react-native";
import { Base, Typography, Forms } from '../styles';
import config from "../config/config.json";
import { Delivery } from '../interfaces/delivery';
import { OrderItem } from '../interfaces/Order'

import { Picker } from '@react-native-picker/picker';
import productModel from "../models/Products";
import deliveryModel from "../models/deliveries"

import DateTimePicker from '@react-native-community/datetimepicker';


function DateDropDown(props) {
    const [dropDownDate, setDropDownDate] = useState<Date>(new Date());
    const [show, setShow] = useState<Boolean>(false);

    const showDatePicker = () => {
        setShow(true);
    };

    return (
        <View>
            {Platform.OS === "android" && (
                <Button onPress={showDatePicker} title="Visa datumväljare" />
            )}
            {(show || Platform.OS === "ios") && (
                <DateTimePicker
                    onChange={(event, date) => {
                        setDropDownDate(date);

                        props.setDelivery({
                            ...props.delivery,
                            delivery_date: date.toLocaleDateString('se-SV'),
                        });

                        setShow(false);
                    }}
                    value={dropDownDate}
                />
            )}
        </View>
    );
}

function ProductDropDown(props) {
    const [products, setProducts] = useState<OrderItem[]>([]);
    let productsHash: any = {};
    useEffect(async () => {
        setProducts(await productModel.getProducts());
    }, []);
 
    const itemsList = products.map((prod, index) => {
        productsHash[prod.id] = prod;
        return <Picker.Item key={index} label={prod.name} value={prod.id} />;
    });

    return (
        <Picker
            selectedValue={props.delivery?.product_id}
            onValueChange={(itemValue) => {
                props.setDelivery({ ...props.delivery, product_id: itemValue });
                props.setCurrentProduct(productsHash[itemValue]);
            }}>
            {itemsList}
        </Picker>
    );
}

async function addDelivery(delivery, currentProduct, navigation) {
    const deliveryDetails = {
        product_id: delivery.product_id,
        amount: delivery.amount,
        delivery_date: delivery.delivery_date,
        comment: delivery.comment,
        api_key: config.api_key,
    }

    await deliveryModel.addDelivery(deliveryDetails);

    const updatedProduct = {
        id: currentProduct.id,
        name: currentProduct.name,
        stock: (currentProduct.stock || 0) + (delivery.amount || 0),
        api_key: config.api_key
    };
    await productModel.updateProductStock(updatedProduct);

    navigation.navigate("List", { reload: true });
}

export default function DeliveryForm({ navigation }) {
    const [delivery, setDelivery] = useState<Partial<Delivery>>({});
    const [currentProduct, setCurrentProduct] = useState<Partial<OrderItem>>({});

    return (
        <ScrollView style={{ ...Base.base }}>
            <Text style={{ ...Typography.header2 }}>Ny inleverans</Text>

            <Text style={{ ...Typography.normal }}>Datum</Text>
            <DateDropDown
                delivery={delivery}
                setDelivery={setDelivery}
            />

            <Text style={{ ...Typography.normal }}>Kommentar</Text>
            <TextInput
                style={{ ...Forms.input }}
                onChangeText={(content: string) => {
                    setDelivery({ ...delivery, comment: content })
                }}
                value={delivery?.comment}
            />

            <Text style={{ ...Typography.normal }}>Antal</Text>
            <TextInput
                style={{ ...Forms.input }}
                onChangeText={(content: string) => {
                    setDelivery({ ...delivery, amount: parseInt(content) })
                }}
                value={delivery?.amount?.toString()}
                keyboardType="numeric"
            />
            <Text style={{ ...Typography.normal }}>Produkt</Text>

            <ProductDropDown
                delivery={delivery}
                setDelivery={setDelivery}
                setCurrentProduct={setCurrentProduct}
            />
         
            <Button
                title="Gör inleverans"
                onPress={() => {
                    addDelivery(delivery, currentProduct, navigation);
                }}
            />
        </ScrollView>
    );
};