import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/auth';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
