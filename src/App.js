import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';

import { useSelector } from 'react-redux';
import { selectUser } from './redux/authSlice';

import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Posts from './pages/Posts';

const App = () => {
  const user = useSelector(selectUser);

  return (
    <Router>
      <main className="App">
        <Header />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
            <Route path="/posts" element={user ? <Posts /> : <Navigate to="/login" />} />
          </Routes>
        </div>
      </main>
    </Router>
  )
}

export default App;