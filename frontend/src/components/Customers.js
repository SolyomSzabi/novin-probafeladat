import { List, ListItemText, Button, Grid, TextField, ListItem, Typography } from "@mui/material";

import AddNewItemForm from "./AddItemForm";

import { useState, useEffect } from "react";

import { getCustomers, deleteCustomer, createCustomer } from "../services/CustomerService";
import { deleteItem } from "../services/ItemService";

export default function Customers() {
  const [customers, setCustomers] = useState();
  const [newCustomer, setNewCustomer] = useState();

  useEffect(() => {
    getCustomers().then(queryData => {
      setCustomers(queryData.data);
    });
  }, []);

  function handleDeleteCustomer(e) {
    deleteCustomer(e.target.value);
    window.location.reload();
  };

  function handleDeleteItem(e) {
    deleteItem(e.target.value);
    window.location.reload();
  };

  const handleTextFieldChange = e => {
    setNewCustomer({ ...newCustomer, [e.target.name]: e.target.value });
  };

  const addNewCustomer = async event => {
    event.preventDefault();
    await createCustomer(newCustomer);
    window.location.reload();
  };

  return (
    <Grid container spacing={2}
      direction="row"
      justifyContent="center"
      alignItems="flex-start">
      <Grid
        container
        sx={{ m: 5 }}
        xs={5}
        direction="column"
        justifyContent="center"
        alignItems="center">
        <Typography variant="h3" gutterBottom>
          Customers
        </Typography>
        <List
          sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
          component="nav">
          {customers && customers.map(customer => (
            <ListItem sx={{ flexDirection: 'column', border: 1, m: 1 }}>
              <ListItem sx={{ flexDirection: 'row' }}>
                <ListItemText primary={customer.name} />
                <Button sx={{ m: 0.5 }} variant="outlined" color="error" value={customer.customerID} onClick={handleDeleteCustomer}>
                  Delete</Button>
                <AddNewItemForm customerID={customer.customerID} />
              </ListItem>
              <List component="div" disablePadding>
                {customer.items.map(item => (
                  <ListItem sx={{ pl: 4, border: 1, m: 2 }}>
                    <ListItemText primary={item.itemName} secondary={item.comment} />
                    <ListItemText primary={item.price + "$"} />
                    <Button sx={{ m: 0.5 }} variant="outlined" color="error" value={item.itemID} onClick={handleDeleteItem}>
                      Delete</Button>
                  </ListItem>
                ))}
              </List>
            </ListItem>
          ))}
        </List>
      </Grid>
      <Grid container sx={{ m: 5 }} xs={5}
        direction="column"
        justifyContent="center"
        alignItems="center">
        <Typography sx={{ m: 2 }} variant="h4" gutterBottom>
          Add Customer
        </Typography>
        <TextField id="outlined-basic" label="Name" name="name" variant="outlined" onChange={handleTextFieldChange} />
        <Button sx={{ m: 2 }} variant="outlined" color="success" onClick={addNewCustomer}>
          Add customer
        </Button>
      </Grid>
    </Grid>
  );
};
