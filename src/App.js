import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import FoodForm from './pages/FoodForm';
import ShowFoods from './pages/ShowFoods';
import StudentForm from './pages/StudentForm';
import ShowStudents from './pages/ShowStudents';
import EditStudent from './pages/EditStudent';
import DistributeFood from './pages/DistributeFood';
import ServeForm from './pages/ServeForm';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-food" element={<FoodForm />} />
        <Route path="/show-foods" element={<ShowFoods />} />
        <Route path="/add-students" element={<StudentForm />} />
        <Route path="/show-students" element={<ShowStudents />} />
        <Route path="/show-students/:id" element={<EditStudent />} />
        <Route path="/distribution-food" element={<DistributeFood />} />
        <Route path="/serve-students/:id/:shift" element={<ServeForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
