import Auth from "../Auth";
import ContactsList from "../Contacts/ContactsList";
import NewContact from "../Contacts/NewContact";

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
    protectedRoute: true,
    component: ContactsList
  },
  {
    path: "/contacts/new",
    key: "/contacts/new",
    exact: true,
    protectedRoute: true,
    component: NewContact
  }
];

export default routes;
