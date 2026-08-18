import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { PrivacidadPage } from './pages/PrivacidadPage';
import { NotFound } from './pages/NotFound';
import StreamingTextDemo from './components/StreamingTextDemo';
import { PRIVACY_ROUTE } from './lib/constants';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path={PRIVACY_ROUTE} element={<PrivacidadPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="/demo/streaming-text" element={<StreamingTextDemo />} />
    </Routes>
  );
}

export default App;
