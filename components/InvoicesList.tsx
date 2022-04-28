import { View, Text, Button } from "react-native";
import invoiceModel from '../models/invoice'
import { useState, useEffect } from "react";
import { DataTable } from 'react-native-paper';
import authModel from '../models/auth'
import { Base, Typography } from "../styles";

export default function Invoices({ route, navigation, setIsLoggedIn }) {
  const { reload } = route.params || false;
  const [allInvoices, setAllInvoices] = useState([]);

  if (reload) {
    reloadInvoices();
  }

  async function logOutNow() {
    let result = await authModel.logout();
    setIsLoggedIn(false);
    navigation.navigate("Invoice", { reload: false });
  };

  async function reloadInvoices() {
    setAllInvoices(await invoiceModel.getInvoices());
    navigation.navigate("Invoice", { reload: false });
  };

  useEffect(() => {
    console.log("RELOAD")
    reloadInvoices();
  }, []);

  const listOfInvoices = allInvoices
  .map((invoice, index) => {
    return (
        <DataTable.Row
        key={index} >
        <DataTable.Cell >{invoice.name}</DataTable.Cell>
        <DataTable.Cell >{invoice.total_price}</DataTable.Cell>
        <DataTable.Cell >{invoice.due_date}</DataTable.Cell>
        </DataTable.Row>
    )
});

    return (
      <View style={Base.base}>
        <Text style={Typography.normal}> Fakturor</Text>
       
        <Button
                title="Skapa faktura"
                onPress={() => {
                  navigation.navigate('Invoice-Form');
              }}
            />
          <DataTable>
          <DataTable.Header >
              <DataTable.Title >Namn</DataTable.Title>
              <DataTable.Title >Pris</DataTable.Title>
              <DataTable.Title >Förfallodag</DataTable.Title>
          </DataTable.Header>
              {listOfInvoices}
          </DataTable>
          <Button
                title="Logga ut"
                onPress={() => {
                  logOutNow()
                }}
            />
      </View>
    );
  }