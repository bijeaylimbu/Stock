import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import Dashboard from './DashBoard/Dashboard';
import Homepage from './Homepage/Homepage';
import Login from './Login/Login';
import StockDashBoard from './StockDashboard/StockDashboard';
import Sidenav from './Widget/Stocklist/Sidenav/SideNav';

function App() {
  return (
   <>
   <BrowserRouter>
   <Switch>

   <Route exact path="/" component={Login}/>
   <Route path="/homepage" component={Homepage}/>
   <Route path="/dashboard" component={Dashboard}/>
   <Route path="/stock-dashboard" component={StockDashBoard}/>
   <Route path="/sidenav" component={Sidenav}/>
   </Switch>
   
   
   </BrowserRouter>


   </>
  );
}

export default App;
