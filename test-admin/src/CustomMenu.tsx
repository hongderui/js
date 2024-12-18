import React from 'react';
import { Menu, MenuItemLink } from 'react-admin';
import BarChartIcon from '@mui/icons-material/BarChart';
import DirectionsBoatIcon from '@mui/icons-material/DirectionsBoat';
import PersonIcon from '@mui/icons-material/Person';

const CustomMenu = (props: any) => (
    <Menu {...props}>
        <MenuItemLink to="/titanic" primaryText="Titanic passengers" leftIcon={<DirectionsBoatIcon />} />
        <MenuItemLink to="/students" primaryText="Students" leftIcon={<PersonIcon />} />
        <MenuItemLink to="/chart" primaryText="Charts" leftIcon={<BarChartIcon />} />
        <MenuItemLink to="/my_component" primaryText="MyFirstPage" leftIcon={<BarChartIcon />} />
        <MenuItemLink to="/homework" primaryText="Homework" leftIcon={<BarChartIcon />} />
    </Menu>
);

export default CustomMenu;