import React, { useState, useEffect } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from './components/store/auth-context';

function App() {
	const storedUserLoggedInInfo = localStorage.getItem('isLoggedIn');

	const [ isLoggedIn, setIsLoggedIn ] = useState(false);

	useEffect(() => {
		if (storedUserLoggedInInfo === '1') {
			setIsLoggedIn(true);
		}
	}, []);

	const loginHandler = (email, password) => {
		// We should of course check email and password
		// But it's just a dummy/ demo anyways
		localStorage.setItem('isLoggedIn', '1');
		setIsLoggedIn(true);
	};

	const logoutHandler = () => {
		localStorage.setItem('isLoggedIn', '0');
		setIsLoggedIn(false);
	};

	return (
		<AuthContext.Provider
			value={{
				isLoggedIn: isLoggedIn,
				onLogout: logoutHandler
			}}
		>
			{/* all chlidren inside this have access to it. if i wrap only login with this then only login gets access to it */}
			<MainHeader />
			<main>
				{!isLoggedIn && <Login onLogin={loginHandler} />}
				{isLoggedIn && <Home onLogout={logoutHandler} />}
			</main>
		</AuthContext.Provider>
	);
}

export default App;
