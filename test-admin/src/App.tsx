import React from 'react';
import { Admin, Layout, Resource, CustomRoutes, ListGuesser, EditGuesser } from 'react-admin';
import { Route } from 'react-router-dom';
import { ChartPage } from './ChartPage';
import CustomMenu from './CustomMenu';
import { titanicDataProvider } from './titanicDataProvider';
import { MyFirstPage } from './MyFirstPage';
import Homework from './homework';

const CustomLayout = (props: any) => <Layout {...props} menu={CustomMenu} />;

export const App = () => (
     <Admin layout={CustomLayout} dataProvider={titanicDataProvider}>
    <Resource name="titanic" list={ListGuesser} edit={EditGuesser} />
    <Resource name="students" list={ListGuesser} edit={EditGuesser} />
    <CustomRoutes>
     <Route path="/chart" element={<ChartPage />} />
     <Route path="/my_component" element={<MyFirstPage name={'Hong Derui'} />} />
     <Route path="/homework" element={<Homework />} />
   </CustomRoutes>
    </Admin>
);

export default App;