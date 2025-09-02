import { RouterProvider } from 'react-router-dom';
// import routes from './Routes/routes';
import Routes from './Routes/routes';
import useAuthPolling from './useAuthPolling';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from './Redux/Reducers/AuthReducer';

function App() {
  useAuthPolling();
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(logout());
    };
  }, [])

  return (
    <>
      <RouterProvider router={Routes()} />
    </>
  )
}

export default App
