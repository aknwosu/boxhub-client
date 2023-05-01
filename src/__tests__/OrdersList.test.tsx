import React from 'react';
import OrdersList from '../components/OrdersList'
import { StatusEnum, Condition } from '../components/Filters';
import { render, fireEvent } from '@testing-library/react';

describe('OrdersList', () => {

    const orders = [
        {
            "id":"JMB007",
            "created":"2021-05-05",
            "status": StatusEnum.Pending,
            "customer":"James B.",
            "sku":"JX-20-ST-NEW",
            "photo":"https://store.boxhub.com/media/catalog/product/cache/a573a389a04b7edc268a8a9eac02fd84/2/0/20ft_cw_16_1_1_3.jpg",
            "condition": Condition.New,
            "size":"20ft",
            "type":"standard",
            "origin_address":"120 Gun Club Rd, Jacksonville, FL 32218",
            "shipping_address":"4550 NE 94 Pl, Bronson, FL 32621"
       },
       {
            "id":"GHK523",
            "created":"2021-05-01",
            "status": StatusEnum.Pending,
            "customer":"María Hill",
            "sku":"JX-45-HC-CWO",
            "photo":"https://store.boxhub.com/media/catalog/product/cache/a573a389a04b7edc268a8a9eac02fd84/4/5/45ft_cw_12_1_2.jpg",
            "condition": Condition.CargoWorthy,
            "size":"45ft",
            "type":"high-cube",
            "origin_address":"120 Gun Club Rd, Jacksonville, FL 32218",
            "shipping_address":"868 Blanding Blvd 117, Orange Park, FL 32065"
        },
    ];

    it('should render properly', async () => {
        const { findByText } = render(
        <OrdersList
            fetchOrders={jest.fn()}
            orders={orders} 
        />
        );

        await findByText('James B.')
        await findByText('María Hill')
    });

    it('should display modal when edit button is clicked', async () => {
        const { findByText, findAllByText } = render(
            <OrdersList
                fetchOrders={jest.fn()}
                orders={orders} 
            />
        );

        const editButton = (await findAllByText('Edit'))[0]

        fireEvent.click(editButton)
        
        await findByText('Close')
        await findByText('Update')
    })
})