import { ListItem } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import List from '@mui/material/List';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';

import { useState, useEffect } from "react";

import { getCustomers, deleteCustomer } from "../services/CustomerService";

export default function Customers() {
  const [customers, setCustomers] = useState();

  useEffect(() => {
    getCustomers().then(queryData => {
      setCustomers(queryData.data);
    });
  }, []);

  function handleDeleteCustomer(customer) {
    deleteCustomer(customer);
    window.location.reload();
  }

  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
    >
      {customers && customers.map(customer => (
        <>
          <ListItem sx={{ flexDirection: 'column', border: 1, m: 1 }}>
            <ListItem sx={{ flexDirection: 'row' }}>
              <ListItemText primary={customer.name} />
              <IconButton edge="end" aria-label="delete" onClick={handleDeleteCustomer} >
                <DeleteIcon />
              </IconButton>
            </ListItem>
            <List component="div" disablePadding>
              {customer.items.map(item => (
                <ListItem sx={{ pl: 4, border: 1, m: 2 }}>

                  <ListItemText primary={item.itemName} secondary={item.comment} />
                  <ListItemText primary={item.price + "$"} />
                  <IconButton edge="end" aria-label="delete">
                    <DeleteIcon />
                  </IconButton>

                </ListItem>
              ))}
            </List>
          </ListItem>
        </>
      ))}
    </List>
  );
}


