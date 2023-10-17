import React from 'react';
import { Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import NewContact from "./pages/NewContact";
import { Container as EditContact } from "./pages/EditContact";

export default function Routes() {
	return (
		<Switch>
			<Route path="/edit/:id" component={EditContact} />
			<Route path="/new" component={NewContact} />
			<Route path="/" component={Home} exact />
			{/* <Route path='/delete/:id' exact/> */}
		</Switch>
	);
}
