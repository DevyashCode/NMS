import { RouterProvider } from 'react-router-dom';
import routes from './Routes/routes';
import store from './Redux/store';
import { Provider } from 'react-redux';

import './App.css'

function App() {
  return (
    <>
      <Provider store={store}>
        <RouterProvider router={routes} />
      </Provider>
    </>
  )
}

export default App
