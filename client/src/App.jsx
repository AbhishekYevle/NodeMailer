import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ForgotPassword from './component/ForgotPassword';
import UpdatePassword from './component/UpdatePassword';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" Component={ForgotPassword} />
        <Route path="/update" Component={UpdatePassword} />
      </Routes>
    </Router>
  )
}

export default App;
