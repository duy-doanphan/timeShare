import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import HomePage from "../pages/Home";
import ViewProfile from "../pages/ViewProfile";
import timeshare from "../pages/Admin/TimeShare";

const routers = [
  { path: "/", components: HomePage },
  { path: "/login", components: Login },
  { path: "/register", components: Register },
  { path: "/view-profile", components: ViewProfile },
  { path: "/timeshare", components: timeshare },
];

export { routers }
