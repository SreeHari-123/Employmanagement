import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Adduser from './components/Adduser';
import ProfileCard from './components/Profile';
import Document from './components/Document';
function App(): JSX.Element {

  return (
  <div className="App">
  <Router>
  <Routes>
  <Route path='/' element={<Home/>}/>
  <Route path='/add' element={<Adduser/>}/>
  <Route path='/profile/:id' element={<ProfileCard/>}/>
  <Route path='/document/:id' element={<Document/>}/>
  </Routes>
  </Router>
  </div>
  );
  }
  
  export default App;