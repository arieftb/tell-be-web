import './App.css';
import './style/theme.css';
import './style/responsive.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RegisterPage from './presentation/pages/RegisterPage.jsx';
import LoginPage from './presentation/pages/LoginPage.jsx';

function App () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        {/* Add a default route or redirect if needed */}
        <Route path="*" element={<LoginPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
