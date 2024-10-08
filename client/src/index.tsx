import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './context/authProvider';
import {BrowserRouter, Routes, Route} from 'react-router-dom'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/*" element={<App/>} />
      </Routes>
    </AuthProvider>
  </BrowserRouter>
);
