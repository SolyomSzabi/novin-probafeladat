import { useState } from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import { createItem } from "../services/ItemService";

export default function AddNewItemForm({ customerID }) {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [addItem, setAddItem] = useState({
    itemName: '',
    price: '',
    comment: '',
    customer: customerID
  });

  const handleDialogChange = event => {
    setAddItem({ ...addItem, [event.target.name]: event.target.value });
  };

  const handleDialogSubmit = async event => {
    setOpen(false);
    event.preventDefault();
    await createItem(addItem);
    window.location.reload();
  };

  return (
    <>
      <Button sx={{ m: 0.5 }} variant="outlined" color="success" onClick={handleClickOpen}>
        Add item
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New item</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            fullWidth
            name="itemName"
            variant="standard"
            type="text"
            value={addItem.itemName}
            onChange={handleDialogChange}
          />
          <TextField
            autoFocus
            margin="dense"
            id="price"
            label="Price"
            name="price"
            fullWidth
            type="number"
            variant="standard"
            value={addItem.price}
            onChange={handleDialogChange}
          />
          <TextField
            autoFocus
            name="comment"
            margin="dense"
            id="comment"
            label="Comment"
            fullWidth
            type="text"
            variant="standard"
            value={addItem.comment}
            onChange={handleDialogChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDialogSubmit}>Add</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};