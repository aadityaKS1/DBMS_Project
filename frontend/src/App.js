import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./Pages/Home"
import AboutUs from "./Pages/AboutUs";
import ContactUs from "./Pages/ContactUs";
import Login from "./Pages/Login";
import Damages from "./Pages/Damages";
import JoinAsOrganization from "./Pages/JoinAsOrganization";
import JoinAsVolunteer from "./Pages/JoinAsVolunteer";
import VerifyEmail from "./Pages/VerifyEmail";
import Donate from "./Pages/Donate";
import Report from "./Pages/Report";
import OrganizationDashboard from "./Pages/OrganizationDashboard";
import VolunteerDashboard from "./Pages/VolunteerDashboard";
import LoginComponent from "./Components/LoginComponenet";
import Event_details from "./Pages/Event_details";
import Attendance from './Pages/Attendance'




function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />
    },
    {
      path: "/about",
      element: <AboutUs/>
    },
    {
      path: "/damages",
      element: <Damages />
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/contact",
      element: <ContactUs />
    },
    {
      path: "/register_club",
      element: <JoinAsOrganization />
    },
    {
      path: "/register_volunteer",
      element: <JoinAsVolunteer />
    },
    {
      path: "/verify/:uid/:token",
      element: <VerifyEmail />
    },
    {
      path: "/donate",
      element: <Donate/>
    },
    {
      path: "/report",
      element: <Report/>
    },
    {
      path: "/club",
      element: <OrganizationDashboard />
    },
    {
      path: "/event/:id",
      element: <Event_details />
    },
    {
      path: "/attendance",
      element: <Attendance/>
    },
    {
      path: "/volunteer",
      element: <VolunteerDashboard />
    }
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App
