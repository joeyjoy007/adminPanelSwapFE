import 'antd/dist/reset.css';
import { BrowserRouter} from "react-router-dom";

import Navigation from './navigation/Navigation'
import { AuthProvider } from './context/context';
import React from 'react';
import { setUpAxios } from './server/server';

const App = () => {

  React.useEffect(() => {
    setUpAxios();
});

  return (
  <BrowserRouter>
  <AuthProvider>
  <Navigation/>
  </AuthProvider>
  </BrowserRouter>
  )
}

export default App