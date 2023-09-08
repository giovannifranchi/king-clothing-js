
import './App.scss';
import { subscribeToAuthChange, createUserDocumentFromAuth } from './utils/firebase/firebase.utils';
import { setCurrentUser } from './store/user/user.action';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import Home from './routes/home/home.component';
import NavBar from './routes/navbar/navbar.component';
import Shop from './routes/shop/shop.component';
import Contacts from './routes/contacts/contacts.component';
import Authentication from './routes/authentication/authentication.component';
import Checkout from './routes/checkout/checkout.component';

const App = ()=> {

  const dispatch = useDispatch();

  useEffect(()=> {
    const unsubscribe = subscribeToAuthChange((user)=>{
      if(user){
        createUserDocumentFromAuth(user);
      }
      dispatch(setCurrentUser(user))
    })
    return unsubscribe;
  }, [dispatch]) //it is here just because of lint error

  return (
    <Routes>
      <Route path='/' element={<NavBar/>}>
        <Route index element={<Home/>}/>
        <Route path='shop/*' element={<Shop/>}/>
        <Route path='signin' element={<Authentication/>}/>
        <Route path='contacts' element={<Contacts/>}/>
        <Route path='checkout' element={<Checkout/>} />
      </Route>
    </Routes>
  )
}

export default App;
