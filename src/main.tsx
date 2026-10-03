import { hydrateRoot, createRoot } from 'react-dom/client';
import App from './App';
import './styles/global.css';
import './styles/glass.css';
const root = document.getElementById('root')!;
const app = <App privacy={/\/privacidade\/?$/.test(window.location.pathname)} />;
if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
