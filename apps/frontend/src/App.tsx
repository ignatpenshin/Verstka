import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { EditorPage } from './pages/EditorPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EditorPage />} />
        <Route path="/editor/:documentId?" element={<EditorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
