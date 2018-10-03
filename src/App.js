import React from 'react';
import {Switch, Route, BrowserRouter as Router} from 'react-router-dom';
// import { BrowserRouter as Router, Route } from 'react-router-dom';

// import logo from './assets/logo.svg';
import styles from './App.css';

import Login from './pages/Login'
import Register from './pages/Register'
import Chat from './pages/Chat'
import Home from './pages/Home'


class App extends React.Component
{
	render()
	{
		return (
			<div className={styles.App}>
				{/*<header className={styles.App_header}>
					<img src={logo} className={styles.App_logo} alt="logo" />
					<h1 className={styles.App_title}>Welcome to React</h1>
				</header>
				<p className={styles.App_intro}>
					To get started, edit <code>src/App.js</code> and save to reload.
				</p>*/}

				<Router>
					<Switch>
						<Route path="/login/" component={Login} />
						<Route path="/register/" component={Register} />
						<Route path="/friend/:friend_id/" component={Chat} />
						<Route path="/" component={Home} />
					</Switch>
				</Router>

			</div>
		);
	}
}


export default App;
