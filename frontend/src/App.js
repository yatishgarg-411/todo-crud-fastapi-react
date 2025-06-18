import './App.css';
import LoginSignupPage from './pages/LoginSignupPage';
import Todo from "./pages/Todo";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element = {<LoginSignupPage/>}/>
        <Route path="/todo" element={<Todo/>}/>
      </Routes>
    </Router>
  );
}

export default App;
