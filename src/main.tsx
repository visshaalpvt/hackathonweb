import { StrictMode } from 'react';
import * as ReactDOMClient from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import ErrorBoundary from './components/ErrorBoundary.tsx';

console.log('Main.tsx executing...');

const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error('Failed to find the root element');
} else {
  // @ts-ignore
  const createRoot = ReactDOMClient.createRoot || ReactDOMClient.default?.createRoot;

  if (typeof createRoot !== 'function') {
    console.error('Failed to resolve createRoot function. Exports:', ReactDOMClient);
  } else {
    try {
      const root = createRoot(rootElement);
      root.render(
        <StrictMode>
          <ErrorBoundary>
            <App />
          </ErrorBoundary>
        </StrictMode>
      );
    } catch (err) {
      console.error('Error during render:', err);
    }
  }
}
