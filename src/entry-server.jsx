import { renderToString } from 'react-dom/server';
import App from './App.jsx';

/**
 * Server-side entry used ONLY at build time by `scripts/prerender.mjs`.
 * It renders each route to an HTML string so the deployed site serves real
 * markup on first byte instead of an empty <div id="root">.
 */
export function render(path = '/') {
  return renderToString(<App initialPath={path} />);
}

export default render;
