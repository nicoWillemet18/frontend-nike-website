import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/routes";
import "react-toastify/dist/ReactToastify.css";
import ToastProvider from "./ui/ToastProvider";

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
      <ToastProvider/>
    </BrowserRouter>
  );
}

export default App;

