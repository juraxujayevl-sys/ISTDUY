import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import { AdminPanel } from './pages/AdminPanel';
import { AppDataProvider } from './context/AppDataContext';
import { ThemeLanguageProvider } from './context/ThemeLanguageContext';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeLanguageProvider>
        <AppDataProvider>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
        </AppDataProvider>
      </ThemeLanguageProvider>
    </BrowserRouter>
  </StrictMode>,
);
