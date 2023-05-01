import React, { useState, useEffect } from 'react';
import { OrdersInterface } from './OrdersList';
import axios from 'axios';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
} from '@mui/material';

interface iOrderCardProps {
  order: OrdersInterface;
  updateOrder(order: OrdersInterface): void;
}

const OrderCard: React.FC<iOrderCardProps> = ({ order, updateOrder }) => {
  const [imgSrc, setImgSrc] = useState(require('../assets/Standard-Container.png'));

  useEffect(() => {
    const setSource = async () => {
      
        try {          
          const remoteSrc = await axios.get(order.photo);
          setImgSrc(remoteSrc.data);
        } catch (err) {}
      
    };
    setSource();
  }, [order]);

  return (
    <Card sx={style} className='orderCard'>
      <CardMedia
        component="img"
        src={imgSrc}
        alt={`container_image-${order.sku}}`}
        width={'50%'}
      />
      <CardContent>
        
        <div><Box component={"span"} sx={{fontWeight: "bold"}}>Name: </Box>{order.customer}</div>
        <div><Box component={"span"} sx={{fontWeight: "bold"}}>Condition: </Box>{order.condition}</div>
        <div><Box component={"span"} sx={{fontWeight: "bold"}}>Size: </Box>{order.size}</div>
        <div><Box component={"span"} sx={{fontWeight: "bold"}}>Status: </Box>{order.status}</div>
        <div><Box component={"span"} sx={{fontWeight: "bold"}}>Type: </Box>{order.type}</div>
        <div><Box component={"span"} sx={{fontWeight: "bold"}}>Created: </Box>{order.created}</div>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          fullWidth
          style={{ marginTop: 10 }}
          onClick={() => updateOrder(order)}
        >
          Edit
        </Button>
      </CardActions>
    </Card>
  );
};

export default OrderCard;

const style = {
  p: '10px',
  m: '20px',
  border: '1px solid rgb(197, 193, 193)',
  minWidth: '320px',
  maxWidth: '345px',
  display: 'inline-block',
};
