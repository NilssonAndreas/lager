import { View, Text, Button } from "react-native";
import { useState, useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';
import orderModel from '../models/orders';
import invoiceModel from '../models/invoice'
import config from "../config/config.json";
import { Order } from '../interfaces/OrderList';
import { Typography, Base } from "../styles";
import DateTimePicker from '@react-native-community/datetimepicker';

// status_id 600

function DateDropDown(props) {
    const [dropDownDate, setDropDownDate] = useState<Date>(new Date());
    const [show, setShow] = useState<Boolean>(false);

    const showDatePicker = () => {
        setShow(true);
    };

    const payDay = (date) => {
        let result = date.setDate(date.getDate(date) + 30);
        result = date.toISOString().slice(0, 10);
        props.setPickDate(result);
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
                        payDay(date)
                        setShow(false);
                    }}
                    value={dropDownDate}
                />
            )}
        </View>
    );
};

function OrderDropDown(props) {
    const [orders, setOrders] = useState([]);
    let productsHash: any = {};

    useEffect(async () => {
        console.log("Till api i Invoice From")
        setOrders(await orderModel.getOrders());
    }, []);
 
    const itemsList = orders
    .filter(order => order.status === "Packad" || order.status === "Skickad" )
    .map((order, index) => {
        productsHash[order.id] = order;
        return <Picker.Item key={index} label={order.name} value={order.id} />;
    });

    return (
        <Picker
            style={Base.picker}
            selectedValue={props.order?.id}
            onValueChange={(itemValue) => {
                props.setOrder(productsHash[itemValue]);
            }}>
            {itemsList}
        </Picker>
    );
};

export default function InvoiceForm({ route, navigation }) {
    const [order, setOrder] = useState<Partial<Order>>({});
    const [pickDate, setPickDate] = useState<Date>();


    async function invoiceCreator() {
        let creationDate = new Date();
        let newDate = creationDate.toISOString().slice(0, 10);
        let totalPrice = 0;
        for (let item of order.order_items) {
            const temp = item.amount * item.price
            totalPrice = totalPrice + temp
        };

        const invoiceInfo = {
            api_key: config.api_key,
            order_id: order.id,
            total_price: totalPrice,
            creation_date: newDate,
            due_date: pickDate
        };

        const orderToUpdate = {
            api_key: config.api_key,
            id: order.id,
            name: order.name,
            status_id: 600
        };

        try {
            await invoiceModel.createInvoice(invoiceInfo);
            await orderModel.updateOrder(orderToUpdate);
        } catch (error) {
            console.log(error)
        }
        navigation.navigate("Invoice", { reload: true });
        
    }

    return (
        <View style={Base.base}>
            <Text style={Typography.form}>Välj order att fakturera</Text>
            <OrderDropDown
                order={order}
                setOrder={setOrder}
            />

            <Text style={Typography.form}>Välj fakturadatum</Text>
            <DateDropDown
                pickDate={pickDate}
                setPickDate={setPickDate}
            />
            <Text style={Typography.form}>Förfallodag: {pickDate}</Text>
            <Button
                title="Skapa ny faktura"
                onPress={() => {
                    invoiceCreator()
                }}
            />
            
        </View>
    )
};