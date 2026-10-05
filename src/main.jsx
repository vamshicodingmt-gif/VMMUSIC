import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles/index.css';

/**
 * Client entry.
 *
 * The build prerenders every route, so in production `#root` already contains
 * the page markup and we HYDRATE it (fast first paint, no flash of empty
 * content). In `npm run dev` the container is empty, so we mount normally.
 */
const container = document.getElementById('root');

if (!container) {
  throw new Error('Root container #root was not found in index.html');
}

const tree = (
  <StrictMode>
    <App />
  </StrictMode>
);

const hasPrerenderedMarkup = container.firstElementChild !== null;

if (hasPrerenderedMarkup) {
  hydrateRoot(container, tree);
} else {
  createRoot(container).render(tree);
}
