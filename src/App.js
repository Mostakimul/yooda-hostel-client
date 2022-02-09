import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import FoodForm from './pages/FoodForm';
import ShowFoods from './pages/ShowFoods';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-food" element={<FoodForm />} />
        <Route path="/show-foods" element={<ShowFoods />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
