
import React from 'react';
import { BrowserRouter, Route, Switch as RouteSwitch } from 'react-router-dom';
import AuthProvider from '../../../Contexts/AuthProvider';
import DataProvider from '../../../Contexts/DataProvider';
import About from "../../About/About";
import CheckOut from '../../CheckOut/CheckOut';
import Home from "../../Home/Home";
import ManageTrips from '../../ManageTrips/ManageTrips';
import MyTrips from '../../MyTrips/MyTrips';
import NotFound from "../../NotFound/NotFound";
import SignIn from '../../SignIn/SignIn';
import SignUp from '../../SignUp/SignUp';
import NavBar from './NavBar/NavBar';
import PrivateRoute from './PrivateRoute/PrivateRoute';
const Navigation = () => {

    return (
        <DataProvider>
            <AuthProvider>
                <BrowserRouter>
                    <NavBar></NavBar>
                    <RouteSwitch>
                        {/* using exact keyword to match with exact path */}
                        <Route exact path="/"><Home></Home></Route>
                        <Route exact path="/home"><Home></Home></Route>
                        <Route exact path="/about"><About></About></Route>
                        <PrivateRoute exact path="/checkout/:trainingId"><CheckOut></CheckOut></PrivateRoute>
                        <PrivateRoute exact path="/trip/:tripId"><CheckOut></CheckOut></PrivateRoute>
                        <Route exact path="/mytrips"><MyTrips></MyTrips></Route>
                        <Route exact path="/managetrips"><ManageTrips></ManageTrips></Route>
                        <Route exact path="/signin"><SignIn></SignIn></Route>
                        <Route exact path="/signup"><SignUp></SignUp></Route>
                        <Route path="*"><NotFound></NotFound></Route>
                    </RouteSwitch>
                </BrowserRouter>
            </AuthProvider>
        </DataProvider>
    );
};

export default Navigation;