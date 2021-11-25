import { Route, HashRouter,Switch} from 'react-router-dom'



import Dashboard from './Dashboard'
import Home from './Home'
import Income from './Income';
import Expense from './Expense';
import Navbar from './Navbar';


function Routes() {
    

    return (
        <HashRouter>
            <Navbar />
            <Switch>
                <Route path='/income' component={Income} exact></Route>
                <Route path='/expense' component={Expense} exact></Route>
                <Route path='/' component={Home} exact></Route>
                <Route path='/dashboard' component={Dashboard} exact></Route>
            </Switch>
        </HashRouter>
    )
}


export default Routes;
