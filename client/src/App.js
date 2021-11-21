import { Route } from 'react-router-dom';
import Landing from './components/landing/landing';
import { useDispatch} from 'react-redux'
import { useEffect } from 'react';
import './App.css';
import Home from './components/home/home';
import { allPokemon, db_types } from './actions/actions';
import Details from './components/detail/details';


function App() {
  const dispatch= useDispatch()
  useEffect(() => {
    dispatch(allPokemon())
    dispatch(db_types()) 
  }, [dispatch])

  return (
    <div className="App">
      <Route exact path="/" component={Landing}/>      
      <Route exact path="/home" component={Home}/>   
      <Route exact path="/details/:name" component={Details}/>
         
    </div>
  );
}

export default App;
