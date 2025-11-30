import { RouterProvider } from 'react-router-dom';
// import routes from './Routes/routes';
import Routes from './Routes/routes';
import useAuthPolling from './useAuthPolling';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { checkAuth,logout } from './Redux/Reducers/AuthReducer';
function App() {
  // useAuthPolling();
  const dispatch = useDispatch();

  const checkUserAuth = async () => {
    await dispatch(checkAuth());
  }

  useEffect(() => {
    console.log("App Mounted");
    checkUserAuth();
  }, [])

  return (
    <>
      <RouterProvider router={Routes()} />
    </>
  )
}

export default App
