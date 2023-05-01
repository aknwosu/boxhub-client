import React from 'react';
import axios from 'axios';
import { render, screen } from '@testing-library/react';
import App from '../App';
import mockBoxOrders from '../boxhub-orders.json'

jest.mock('axios')
// const mockedAxios = axios as jest.Mocked<typeof axios>;


describe('App.tsx', () => {
  it('renders learn app bar with expected text', () => {
    render(<App />);
    const linkElement = screen.getByText(/BoxHub Orders/i);
    expect(linkElement).toBeInTheDocument();
  });
  
  it('should render loading text and result', async () => {
    axios.get = jest.fn().mockResolvedValue({ data: mockBoxOrders.orders })

    const { findByText } = render(<App />);

    await findByText('loading...')
    expect(axios.get).toHaveBeenCalled();
    await findByText('A. Young')
  });
})
