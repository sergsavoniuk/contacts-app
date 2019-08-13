import Auth from "../Auth";
import ContactsList from "../Contacts/ContactsList";

const routes = [
  {
    path: "/login",
    key: "/login",
    exact: true,
    component: Auth
  },
  {
    path: "/register",
    key: "/register",
    exact: true,
    component: Auth
  },
  {
    path: "/contacts",
    key: "/contacts",
    exact: true,
    component: ContactsList
  }
];

export default routes;
