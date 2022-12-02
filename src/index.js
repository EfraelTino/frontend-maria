import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import {PayPalScriptProvider} from '@paypal/react-paypal-js'
import './index.css';
import App from './routes/App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { StoreProvider } from './Stores';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <StoreProvider>
      <HelmetProvider>
        <PayPalScriptProvider
          deferLoading={true}
        >
          <App />
        </PayPalScriptProvider>
      </HelmetProvider>
    </StoreProvider>
  </>
);
