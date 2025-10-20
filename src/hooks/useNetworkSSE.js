import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { connectToNetworkSSE,sseDisconnected } from '../Redux/Reducers/NetworkListReducer';

export const useNetworkSSE = () => {
  const dispatch = useDispatch();
  const eventSourceRef = useRef(null);
  
  const sseStatus = useSelector(state => state.NetworkList.sseStatus);
  const sseError = useSelector(state => state.NetworkList.sseError);

  useEffect(() => {
    const url = 'http://127.0.0.1:8000/api/sse/network-monitor/'; // Your SSE endpoint
    
    // Start SSE connection
    dispatch(connectToNetworkSSE(url));

    // Cleanup on unmount
    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
      dispatch(sseDisconnected());
    };
  }, [dispatch]);

  const reconnect = () => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }
    dispatch(connectToNetworkSSE('http://127.0.0.1:8000/api/sse/network-monitor/'));
  };

  return {
    sseStatus,
    sseError,
    reconnect
  };
};