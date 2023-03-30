// import './App.css';
import axios from "axios";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import PrivateRoute from "./utils/PrivateRoute";
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { Profile, Login, Signup, Home, PostPage, OtherUserProf, CommunityResources, Jobs } from "./pages";
import Applications from "./components/Applications";
import { Navbar } from "./components";

export const DataContext = React.createContext();

function App() {
  //user & auth
  const [currentUser, setCurrentUser] = useState('');
  const [mOpen, setMOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [pfp, setPfp] = useState()
  const [header, setHeader] = useState()

  //modal stuff
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false)
  const [modalType, setModalType] = useState()

  useEffect(() => {
    let token;
    if (!localStorage.getItem('jwtToken')) {
      setIsAuthenticated(false);
      console.log('====> Authenticated is now FALSE');
      <Navigate to="/"/>
    } else {
      token = jwt_decode(localStorage.getItem('jwtToken'));
      setAuthToken(localStorage.getItem('jwtToken'));
      setCurrentUser(token);
      axios.get(`http://localhost:8000/user/${token.id}`)
        .then(response => {
          setCurrentUser(prev => ({...prev, pfp: response.data.foundUser.pfp, header: response.data.foundUser.header, following: response.data.foundUser.following}))
        }).catch(err => console.log(err))  
    }
  }, []);
console.log(currentUser)
  const nowCurrentUser = (userData) => {
    console.log('===> nowCurrent is here.');
    setCurrentUser(userData);
    setIsAuthenticated(true);
  }

  const handleLogout = () => {
    if (localStorage.getItem('jwtToken')) {
      // remove token for localStorage
      localStorage.removeItem('jwtToken');
      setCurrentUser(null);
      setIsAuthenticated(false);
      <Navigate to="/"/>
    }
  }



  return (
    <BrowserRouter>      
    
    <DataContext.Provider value={{ currentUser, setCurrentUser, open2, setOpen2, handleLogout, nowCurrentUser, isAuthenticated, setIsAuthenticated, open, setOpen, mOpen, setMOpen, modalType, setModalType}}>
    <Navbar/>
          <Routes>
              <Route path='/' element={ <Home />} />

              <Route path='/post/:id' element={ <PostPage />} />
              

              <Route path='/profile' element={ <PrivateRoute><Profile /></PrivateRoute>}/>
              <Route path='/jobs' element={ <Jobs />}/> 
              <Route exact path='/profile/:userid' element={ <OtherUserProf />} />
              <Route path='/resources' element={ <CommunityResources/>}/> 
              <Route path='applications' element={ <Applications />} />

              <Route path='/login' element={ <Login />} />
              <Route path='/signup' element={ <Signup />} />
          </Routes>
      </DataContext.Provider>
    </BrowserRouter>
  );
}

export default App;
