import './App.css';
import { BrowserRouter,Route, Routes } from 'react-router-dom';
import Home from './Home';
import Welcome from './Welcome';
function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/welcome' element={<Welcome/>}/>
      {/* <Route path='/*' element={<Error/>}/> */}
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
