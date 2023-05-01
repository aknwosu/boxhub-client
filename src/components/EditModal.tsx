import React, { useState, useEffect } from 'react';
import { OrdersInterface } from './OrdersList';
import { Alert, Box, Button, MenuItem, Modal, Stack, TextField } from '@mui/material';
import { Condition, filterOptions, StatusEnum, TypeEnum } from './Filters';

interface iEditModalProps {
  order?: OrdersInterface;
  open: boolean;
  handleClose(event: object, reason: string): void;
  onUpdate(order: OrdersInterface): void;
  errorMessage
}
const initialValues: OrdersInterface = {
  status: StatusEnum.Pending,
  customer: '',
  sku: '',
  photo: '',
  condition: Condition.New,
  size: '',
  origin_address: '',
  shipping_address: '',
  type: TypeEnum.Standard,
};
const EditModal: React.FC<iEditModalProps> = ({
  order,
  open,
  handleClose,
  onUpdate,
  errorMessage
}) => {
  const [updateOrder, setUpdateOrder] =
    useState<OrdersInterface>(initialValues);

  const [inputErrors, setInputErrors] = useState({});

  useEffect(() => {
    if (order) {
      setUpdateOrder({
        status: order.status || StatusEnum.Pending,
        customer: order.customer,
        sku: order.sku,
        photo: order.photo,
        condition: order.condition || Condition.New,
        size: order.size,
        origin_address: order.origin_address,
        type: order.type,
        shipping_address: order.shipping_address || '',
      });
    }
  }, [order]);

  const handleChange = ({ target }) => {
    const obj = { ...updateOrder };
    obj[target.name] = target.value;
    setUpdateOrder(obj);
  };

  const handleUpdate = () => {
    let errors = {};

    Object.keys(updateOrder).forEach((stateKey) => {
      if (!updateOrder[stateKey]) errors[stateKey] = true;
    });
    setInputErrors(errors);
    if (JSON.stringify(errors) === '{}') {
      onUpdate(updateOrder);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        <Box width={'100%'}>
          <TextField
            fullWidth
            required
            label="Customer Name"
            value={updateOrder.customer}
            sx={{ marginY: '15px' }}
            name="customer"
            onChange={handleChange}
            error={inputErrors['customer']}
          />
          <TextField
            select
            label="Status"
            name="status"
            value={updateOrder.status}
            helperText="Please select the order status"
            sx={{ marginY: '15px' }}
            onChange={handleChange}
          >
            {filterOptions['status'].map((option) => (
              <MenuItem key={option.key} value={option.value}>
                {option.key}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            required
            label="SKU"
            fullWidth
            name="sku"
            value={updateOrder.sku}
            sx={{ marginY: '15px' }}
            onChange={handleChange}
            error={inputErrors['sku']}
          />
          <TextField
            required
            label="Photo URL"
            fullWidth
            value={updateOrder.photo}
            sx={{ marginY: '15px' }}
            name="photo"
            onChange={handleChange}
            error={inputErrors['photo']}
          />

          <TextField
            select
            label="Condition"
            value={updateOrder.condition}
            name="condition"
            helperText="Please select the order status"
            onChange={handleChange}
          >
            {filterOptions['condition'].map((option) => (
              <MenuItem key={option.key} value={option.value}>
                {option.key}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Container Size"
            name="size"
            value={updateOrder.size}
            helperText="Please select the order status"
            onChange={handleChange}
          >
            {filterOptions['size'].map((option) => (
              <MenuItem key={option.key} value={option.value}>
                {option.key}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Container Type"
            name="type"
            value={updateOrder.type}
            helperText="Please select the container type"
            onChange={handleChange}
          >
            {filterOptions['type'].map((option) => (
              <MenuItem key={option.key} value={option.value}>
                {option.key}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            required
            label="Origin Address"
            fullWidth
            name="origin_address"
            value={updateOrder.origin_address}
            sx={{ marginY: '15px' }}
            onChange={handleChange}
            error={inputErrors['origin_address']}
          />

          <TextField
            required
            fullWidth
            label="Shipping Address"
            value={updateOrder.shipping_address}
            name="shipping_address"
            sx={{ marginY: '15px' }}
            onChange={handleChange}
            error={inputErrors['shipping_address']}
          />
        </Box>
        <Stack spacing={2} direction="row">
          <Button
            variant="outlined"
            color="error"
            onClick={(e) => handleClose(e, '')}
          >
            Close
          </Button>
          <Button variant="contained" onClick={handleUpdate}>
            {order ? 'Update' : 'Create'}
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default EditModal;

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
