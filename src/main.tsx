import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import { store } from './app/store';
import App from './App';
import './app/styles/global.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>,
);
