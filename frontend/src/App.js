import {BrowserRouter,Routes, Route} from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import AddApointment from './pages/AddApointmnet';
import Landing from './pages/Landing';
import Login from './pages/login';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/main" element={<Landing />} />
            <Route path="/add-appointment" element={<AddApointment />} />
            <Route path="/appointments" element={<Home />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
