import { RouterProvider } from 'react-router-dom';
// import routes from './Routes/routes';
import Routes from './Routes/routes';
import useAuthPolling from './useAuthPolling';

function App() {
  useAuthPolling();

  return (
    <>
      <RouterProvider router={Routes()} />
    </>
  )
}

export default App
