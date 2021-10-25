import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import MiComponente from './vistas/formulario/MiComponente';
import OtroComponente from './vistas/OtroComponente';
import PersonaMaterial from './vistas/PersonaMaterial';


function App() {


  function Navbar() {
    return (
      <nav className="topnav">
        <Link to="/Pestana1">Integrantes</Link>
        <Link to="/personas">Personas</Link>
        <Link to="/Componente">Componente</Link>
      </nav>
    )
  }

  return (
    <Router>
       <Navbar />
    <Switch>
      <Route path="/Pestana1" component={OtroComponente} />
      <Route path="/personas" component={PersonaMaterial} />
      <Route path="/Componente" component={MiComponente} />
    </Switch>
  </Router>
  );

}

export default App;
