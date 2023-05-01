import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import {useState } from 'react';
export enum StatusEnum {
  Pending = 'pending',
  InProgress = 'in-progress',
  Delivered = 'delivered',
}

export enum Condition {
  CargoWorthy = 'cargo-worthy',
  New = 'new',
  WindWatertight = 'wind-watertight',
}

export enum TypeEnum {
  Standard = 'standard',
  HighCube = 'high-cube',
}
export const filterOptions = {
  status: [
    { key: 'Pending', value: StatusEnum.Pending },
    { key: 'In Progress', value: StatusEnum.InProgress },
    { key: 'Delivered', value: StatusEnum.Delivered },
  ],

  size: [
    { key: '20 ft', value: '20ft' },
    { key: '40 ft', value: '40ft' },
    { key: '45 ft', value: '45ft' },
  ],

  condition: [
    { key: 'New', value: 'new' },
    { key: 'Cargo Worthy', value: 'cargo-worthy' },
    { key: 'Wind-Watertight', value: 'wind-watertight' },
  ],

  type: [
    { key: 'High Cube', value: 'high-cube' },
    { key: 'Standard', value: 'standard' },
  ],
};

const initialObject = {
  status: '',
  size: '',
  condition: '',
  type: '',
};

interface iFiltersProp {
  onFilterChange(any): void;
}

const Filters: React.FC<iFiltersProp> = (props) => {
  const [selectedFilters, setSelectedFilters] = useState(initialObject);

  const updateFilters = (filter: string, item: string) => {
    const newFilter = {
      ...selectedFilters,
      [filter]: selectedFilters[filter] === item ? '' : item,
    };
    setSelectedFilters(newFilter);
    props.onFilterChange(newFilter);
  };

  return (
    <Box>
      <Toolbar />
      <Divider />
      {Object.keys(filterOptions).map((filter) => (
        <Box key={filter}>
          <Typography
            variant="h6"
            sx={{ fontSize: '14px', fontWeight: 'bold', mx: '10px' }}
          >
            {filter.toUpperCase()}
          </Typography>
          <List>
            {filterOptions[filter].map((item) => (
              <ListItem key={item.key} disablePadding>
                <ListItemButton
                  selected={selectedFilters[filter] === item.value}
                  onClick={() => updateFilters(filter, item.value)}
                >
                  <ListItemText primary={item.key} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
        </Box>
      ))}
    </Box>
  );
};

export default Filters;
