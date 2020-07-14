import React from 'react';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import {store, persistor} from './redux';
import NavigationMain from './contanier/Navigation';
import TopView from 'teaset/components/Overlay/TopView';
const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <TopView>
          <StatusBar
            translucent={true}
            backgroundColor="transparent"
            barStyle="dark-content"
          />
          <NavigationMain />
        </TopView>
      </PersistGate>
    </Provider>
  );
};
export default App;
