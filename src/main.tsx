import { hydrateRoot, createRoot } from 'react-dom/client';
import App from './App';
import './styles/global.css';
const root = document.getElementById('root')!;
const app = <App privacy={window.location.pathname.startsWith('/privacidade')} />;
if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
