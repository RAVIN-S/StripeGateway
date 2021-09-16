import 'bootstrap/dist/css/bootstrap.min.css';
import StripeContainer from './Stripe/StripeContainer';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
 import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <div>
      <Router>
      <Switch>
              <Route path='/paymentgateway/:userId' component={StripeContainer} />
          </Switch>
          </Router>
      <ToastContainer/>
    </div>
  );
}

export default App;
