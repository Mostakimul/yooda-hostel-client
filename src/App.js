import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import FoodForm from './pages/FoodForm';
import ShowFoods from './pages/ShowFoods';
import StudentForm from './pages/StudentForm';
import ShowStudents from './pages/ShowStudents';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-food" element={<FoodForm />} />
        <Route path="/show-foods" element={<ShowFoods />} />
        <Route path="/add-students" element={<StudentForm />} />
        <Route path="/show-students" element={<ShowStudents />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
