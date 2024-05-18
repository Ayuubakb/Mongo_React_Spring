import { BrowserRouter, Routes ,Route } from 'react-router-dom';
import LoginPages from './pages/LoginPages';
import AdminDash from './pages/Admin/AdminDash';
import AjouterMan from './pages/Admin/AjouterMan';
import ListeMan from './pages/Admin/ListeMan';
import ModifierMan from './pages/Admin/ModifierMan';
import ManDash from './pages/Manager/ManDash';
import CarsList from './pages/Manager/CarsList';
import ClientsList from './pages/Manager/ClientsList';
import UpdateCar from './pages/Manager/UpdateCar';
import ResList from './pages/Manager/ResList';
import Demandes from './pages/Manager/Demandes';
import './App.css';
import { useEffect, useState } from 'react';
import AuthContext from './controllers/AuthentifiacationContext';
import Waiting from './components/Waiting';
import { checkLogin } from './controllers/Authentification';
import AddCar from './pages/Manager/AddCar';
import Car from './pages/Manager/Car';
import AddRes from './pages/Manager/AddRes';
import Factures from './pages/Manager/Factures';

function App() {
  const [isLogged,setIsLogged]=useState(null);
  const [role,setRole]=useState("");
  let idT;
  useEffect(()=>{
    console.log("new");
    idT=setTimeout(()=>{
      checkLogin(setIsLogged,setRole)
    },1000)
    return ()=>clearTimeout(idT)
  },[])
  return (
    <div className="App">
      {isLogged!==null?
      <BrowserRouter>
      <AuthContext.Provider value={{isLogged:isLogged,setIsLogged:setIsLogged,role:role,setRole:setRole}}>    
          <Routes>
            <Route path='/'>
              <Route index element={<LoginPages/>}/>
                  <Route path='admin'>
                    <Route index element={<AdminDash/>}/>
                    <Route path='ajouterManager' element={<AjouterMan/>}/>
                    <Route path='listeManagers' element={<ListeMan/>}/>
                    <Route path='modifierManager' element={<ModifierMan/>}/>
                  </Route>
                  <Route path='manager'>
                    <Route index element={<ManDash/>}/>
                    <Route path='voitures'>
                      <Route index element={<CarsList/>}/>
                      <Route path='voiture' element={<Car/>}/>
                      <Route path='ajouterVoitures' element={<AddCar/>}/>
                      <Route path='modifierVoiture' element={<UpdateCar/>}/>
                      <Route path='ajouterReservation' element={<AddRes/>}/>
                    </Route>
                    <Route path='clients' element={<ClientsList/>}/>
                    <Route path='reservations' element={<ResList/>}/>
                    <Route path='demandes' element={<Demandes/>}/>
                  </Route>
            </Route>
          </Routes>
      </AuthContext.Provider>
      </BrowserRouter>
      :
      <Waiting/>
      }
    </div>
  );
}

export default App;
