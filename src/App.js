
import Quiz from './components/Quiz';
import QuizForm from './components/QuizForm';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<QuizForm />}></Route>
      <Route path="/quiz" element={<Quiz />}></Route>
      
    </Routes>
  </BrowserRouter>
  );
}


export default App;
