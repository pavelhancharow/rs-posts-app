import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router';
import { setupStore } from './store/store.ts';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary.tsx';
import Fallback from './components/Fallback/Fallback.tsx';
import ThemeContextProvider from './context/ThemeContext.tsx';
import App from './App.tsx';
import './index.css';

const store = setupStore();
const root = document.getElementById('root') as HTMLElement;

createRoot(root).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter basename="/">
        <ErrorBoundary FallbackComponent={Fallback}>
          <ThemeContextProvider root={root}>
            <App />
          </ThemeContextProvider>
        </ErrorBoundary>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
