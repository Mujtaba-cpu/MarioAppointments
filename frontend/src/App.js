import {BrowserRouter,Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import AddApointment from './pages/AddApointmnet';
import Landing from './pages/Landing';
import Login from './pages/login';
import Search from './pages/search';
import Home from './pages/Home';


function App() {
  return (
    
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/main/:username" element={<Landing />} />
            <Route path="/add-appointment/:username" element={<AddApointment />} />
            <Route path="/appointments/:username" element={<Search />} />
            <Route path="/search/:username" element={<Home />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
