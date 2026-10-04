import Home from './pages/Home';
import Privacy from './pages/Privacy';

export default function App({ privacy = false }: { privacy?: boolean }) {
  return privacy ? <Privacy /> : <Home />;
}
