import React from "react";
import { StatusBar } from "react-native";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import createStore from './redux';
import NavigationMain from './contanier/Navigation';
const { store, persistor } = createStore();

const App = () => {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<StatusBar
					translucent={true}
					backgroundColor="transparent"
					barStyle="dark-content"
				/>
				<NavigationMain />
			</PersistGate>
		</Provider>
	);
}
export default App;