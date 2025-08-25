import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { checkAuth } from './Redux/Reducers/AuthReducer';

export default function useAuthPolling() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(checkAuth());

        const interval = setInterval(() => {
            dispatch(checkAuth());
        }, 5 * 60 * 1000);

        return () => clearInterval(interval);
    }, [dispatch]);
}
