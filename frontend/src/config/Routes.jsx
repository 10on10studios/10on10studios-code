import React from 'react';

import { Route, Switch } from 'react-router-dom';
// import catagaryCartoons from '../components/catagary Cartoons/catagaryCartoons';

import Home from '../pages/Home';
import Catalog from '../pages/Catalog';
import Detail from '../pages/detail/Detail';

const Routes = () => {
    return (
        <Switch>
           
            
            <Route
                path='/:category/search/:keyword'
                component={Catalog}
            />
            <Route
                path='/:category/:id'
                component={Detail}
            />
            <Route
                path='/:category'
                component={Catalog}
            />
            <Route
                path='/'
                exact
                component={Home}
            />

            {/* <Route
                path='/cartoons'
                exact
                component={catagaryCartoons}
            /> */}
        </Switch>
    );
}

export default Routes;
