
import LoginComponent from './LoginComponent.jsx';
import RegistrationComponent from './RegistrationComponent.jsx';
import MenuTableComponent from './MenuTableComponent.jsx';
import ShoppingBagComponent from './ShoppingBagComponent.jsx';
import OrderPageComponent from './OrderPageCompnent.jsx';
import AccountInfo from './AccountInfo.jsx';
import PastOrderDetail from './PastOrderDetail.jsx';
import OrderConfirmation from './OrderConfirmation.jsx';
import Page from "./Page.jsx";
import LandingPage from './LandingPage.jsx';
import NotFound from './NotFound.jsx';

const routes = [
  {path: '/Home', component: LandingPage},
  {path: '/Login', component: LoginComponent},
  {path: '/Register', component: RegistrationComponent},
  {path: '/AccountInformation', component: AccountInfo},
  {path: '/Confirmation/:id', component: OrderConfirmation},
  {path: '/Menu', component: MenuTableComponent},
  {path: '/OrderSummary', component: OrderPageComponent},
  {path: '/PastOrder/:id', component: PastOrderDetail},
  {path: '*', component: NotFound },
]

export default routes;
