import Access from "./screens/Access";
import Dashboard from "./screens/Dashboard";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="" element={<Dashboard/>}/>
        <Route path="get-access" element={<Access/>}/>
      </Routes>
    </Router>
  );
}

export default App;
