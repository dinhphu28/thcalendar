import { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import SVuCalendar from './components/SVuCalendar';
import NotFound from './components/NotFound';

function App() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <BrowserRouter basename={process.env.REACT_APP_ROUTER_BASE || ''} >
          <Routes>
            <Route path="/*" element={<SVuCalendar />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </Suspense>
      {/* <SVuCalendar /> */}
    </div>
  );
}

export default App;
