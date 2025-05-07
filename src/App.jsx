import { BrowserRouter } from 'react-router-dom';
import AnimatedRoutes from './components/AnimatedRoutes';
import ScrollToTop from './components/ScrollToTop';



export default function App() {

  return (
    <BrowserRouter>
      <ScrollToTop />
      <AnimatedRoutes />
    </BrowserRouter>
  );
}