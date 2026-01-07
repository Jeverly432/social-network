import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';
import './index.css'
import { store } from '@app/store/root.store';
import App from '@app/App';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
