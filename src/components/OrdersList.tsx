import React, { useState } from 'react';
import OrderCard from './OrderCard';
import EditModal from './EditModal';
import { Condition, StatusEnum } from './Filters';
import axios from 'axios';
import { Box, Button } from '@mui/material';
const apiURL  = process.env.REACT_APP_API

export interface OrdersInterface {
  _id?: string;
  id?: string;
  created?: string;
  status: StatusEnum;
  customer: string;
  sku: string;
  photo: string;
  condition: Condition;
  type: string;
  size: string;
  origin_address: string;
  shipping_address: string;
}

export interface iOrdersProps {
  orders: OrdersInterface[];
  fetchOrders(): void;
}
const OrdersList: React.FC<iOrdersProps> = ({ orders, fetchOrders }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleEdit = (order: OrdersInterface) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const closeModal = (event: object, reason: string) => {
    if (reason !== 'escapeKeyDown' && reason !== 'backdropClick') {
      setSelectedOrder(null);
      setShowModal(false);
    }
  };

  const createError = (text) => {
    setErrorMessage(text);

    setTimeout(() => {
      setErrorMessage('');
    }, 5000);
  };

  const handleSendData = async (order: OrdersInterface) => {
    if (selectedOrder) {
      updateOrder(order);
    } else {
      createOrder(order);
    }
  };

  const createOrder = async (order) => {
    try {
      await axios.post(`${apiURL}/orders`, order);
      fetchOrders();
      closeModal(null, '');
    } catch (error) {
      createError(error.message);
    }
  };

  const updateOrder = async (order) => {
    order._id = selectedOrder._id;
    try {
      await axios.put(`${apiURL}/orders/${selectedOrder._id}`, order);
      fetchOrders();
      closeModal(null, '');
    } catch (error) {
      createError(error.message);
    }
  };

  const handleCreateClick = () => {
    setShowModal(true);
  };

  return (
    <Box>
      <Button variant="contained" onClick={handleCreateClick} size="large">
        Create New Order
      </Button>
      {!orders.length && <h3>No results for this selection</h3>}
      <Box>
        {orders.map((order) => (
          <OrderCard order={order} key={order._id} updateOrder={handleEdit} />
        ))}
      </Box>

      {showModal && (
        <EditModal
          errorMessage={errorMessage}
          open={showModal}
          order={selectedOrder}
          handleClose={closeModal}
          onUpdate={handleSendData}
        />
      )}
    </Box>
  );
};

export default OrdersList;
