import { Provider } from 'react-redux';
import Navigation from './src/navigation/Navigation';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './src/redux/store';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Navigation />
      </PersistGate>
    </Provider>
  );
}