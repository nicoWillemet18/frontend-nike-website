import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastProvider = () => (
  <ToastContainer
    autoClose={800}
    hideProgressBar={false}
    newestOnTop
    closeOnClick
    pauseOnHover={false}
    draggable
    theme="colored"
    toastStyle={{
      backgroundColor: '#111',
      borderRadius: '10px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.7)',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      fontSize: '1rem',
      color: 'white',
    }}
  />
);

export default ToastProvider;
