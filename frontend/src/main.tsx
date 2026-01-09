import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';
import './index.scss'
import { store } from '@app/store/root.store';
import { RouterProvider } from 'react-router-dom';
import { routes } from '@app/routes/root.route';


createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
      <RouterProvider router={routes} />
  </Provider>,
)
