/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

/** 
  All of the routes for the Material Dashboard 2 React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
// import RTL from "layouts/rtl";
import Notifications from "layouts/notifications";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignInBidan from "layouts/authentication/sign-in/bidan";
import SignUp from "layouts/authentication/sign-up";
import LogOut from "layouts/authentication/log-out";
import User from "layouts/user";
import CreateUser from "layouts/user/create";
import EditUser from "layouts/user/edit";
import UserDetail from "layouts/user/view";
import ProfilDetailUser from "layouts/user/profile/profile";
import Anak from "layouts/anak";
import CreateAnak from "layouts/anak/create";
import EditAnak from "layouts/anak/edit";
import DetailAnak from "layouts/anak/view";
import Penimbangan from "layouts/penimbangan";
import CreatePenimbangan from "layouts/penimbangan/create";
import DetailPenimbangan from "layouts/penimbangan/view";
import Imunisasi from "layouts/imunisasi";
import CreateImunisasi from "layouts/imunisasi/create";
import DetailImunisasi from "layouts/imunisasi/view";
import Medical from "layouts/medical";
import CreateMedical from "layouts/medical/create";
import MedicalDetail from "layouts/medical/view";
import GraphicChild from "layouts/anak/detailGrafik";

// import { Medical, CreateMedical, MedicalDetail } from 'layouts/medical';

// @mui icons
import Icon from "@mui/material/Icon";
import GroupIcon from '@mui/icons-material/Group';
import EscalatorWarningIcon from '@mui/icons-material/EscalatorWarning';
import KaderLogin from "layouts/auth/login/kaderLogin";
import ScaleIcon from '@mui/icons-material/Scale';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import icon from "assets/theme/components/icon";
import Riwayat from "layouts/riwayat";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  // {
  //   type: "collapse",
  //   name: "Tables",
  //   key: "tables",
  //   icon: <Icon fontSize="small">table_view</Icon>,
  //   route: "/tables",
  //   component: <Tables />,
  // },
  {
    type: "collapse",
    name: "Billing",
    key: "billing",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/billing",
    component: <Billing />,
  },
  // {
  //   type: "collapse",
  //   name: "RTL",
  //   key: "rtl",
  //   icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
  //   route: "/rtl",
  //   component: <RTL />,
  // },
  {
    type: "collapse",
    name: "Notifications",
    key: "notifications",
    icon: <Icon fontSize="small">notifications</Icon>,
    route: "/notifications",
    component: <Notifications />,
  },
  // {
  //   type: "collapse",
  //   name: "Profile",
  //   key: "profile",
  //   icon: <Icon fontSize="small">person</Icon>,
  //   route: "/profile",
  //   component: <Profile />,
  // },

        //Sign In
  {
    // type: "collapse",
    name: "Sign In",
    key: "sign-in",
    // icon: <Icon fontSize="small">login</Icon>, 
    route: "/authentication/sign-in",
    component: <SignIn />,
  },

        //Penimbangan
  {
    type: "divider",
    name : "create-penimbangan",
    key : "create-penimbangan",
    route : "/penimbangan/create",
    component : <CreatePenimbangan />,
  },

  {
    type: "collapse",
    name: "Penimbangan",
    key: "penimbangan",
    icon: <ScaleIcon fontSize="medium" />,
    route: "/penimbangan",
    component: <Penimbangan />,
  },

  {
    name: "detail-penimbangan",
    key: "detail-penimbangan",
    route: "/penimbangan/detail/:id",
    component: <DetailPenimbangan />,
  },

        //Imunisasi
  {
    type: "collapse",
    name : "Imunisasi",
    key : "imunisasi",
    icon : <VaccinesIcon fontSize="medium" />,
    route : "/imunisasi",
    component : <Imunisasi />,
  },

  {
    name : "create-imunisasi",  
    key : "create-imunisasi",
    route : "/imunisasi/create",
    component : <CreateImunisasi />,

  },

  {
    name : "detail-imunisasi",
    key : "detail-imunisasi",
    route : "/imunisasi/detail/:id",
    component : <DetailImunisasi />,
  },

  //Riwayat Penyakit Anak

  {
    type: "collapse",
    name : "Riwayat Penyakit",
    key : "medical-information",
    icon : <MedicalInformationIcon fontSize="medium" />,
    route : "/medical",
    component : <Medical />,
  },

  {
    type: "divider",
    name : "create-medical",
    key : "create-medical",
    route : "/medical/create",
    component : <CreateMedical />,
  },

  {
    name : "detail-medical",
    key : "detail-medical",
    route : "/medical/detail/:id",
    component : <MedicalDetail />,
  },

  //Riwayat Kegiatan
  {
    type: "collapse",
    name: "Riwayat Kegiatan",
    key: "riwayat-kegiatan",
    icon: <Icon fontSize="small">event</Icon>,
    route: "/riwayat-kegiatan",
    component : <Riwayat />,
  
  },

        //Anak

  {
    type: "collapse",
    name: "Daftar Anak",
    key: "anak",
    icon: <EscalatorWarningIcon fontSize="medium" />,
    route: "/anak",
    component: <Anak />,
  },

  {
    name: "Tambah Anak",
    key: "create-anak",
    route: "/anak/create",
    component: <CreateAnak />,
  },

  {
    name: "Edit Anak",
    key : "edit-anak",
    route: "/anak/edit/:nik",
    component: <EditAnak />,

  },

  {
    name : "detail-anak",
    key : "detail-anak",
    route : "/anak/detail/:nik",
    component : <DetailAnak />,
  },
  {
    name: "grafik-anak",
    key: "grafik-anak",
    route: "/anak/detail/grafik/:nik",
    component: <GraphicChild />,
  },

            //User

  {
    type: "collapse",
    name: "Daftar User",
    key: "user",
    //
    icon: <GroupIcon fontSize="medium" />,
    route: "/user",
    component: <User />,
  },

  {
    name: "create-user",
    key: "create-user",
    route: "/user/create",
    component: <CreateUser />,
  },

  {
    name: "edit-user",
    key: "edit-user",
    route: "/user/edit/:id",
    component: <EditUser />,
  },

  {
    name: "detail-user",
    key: "detail-user",
    route: "/user/detail/:id",
    component: <ProfilDetailUser />,
  },

        //Login
  {
    name: "Login Kader",
    key: "login-kader",
    route: "/login-kader",
    component: <KaderLogin />,
  },

  {
    name : "Login Bidan",
    key : "login-bidan",
    route : "/authentication/sign-in/bidan",
    component : <SignInBidan />,
  },

  {
    type: "divider",
    name: "Sign Up",
    key: "sign-up",
    // icon: <Icon fontSize="small">assignment</Icon>,
    route: "/authentication/sign-up",
    component: <SignUp />,
  },

        //Log Out

  {
    type: "collapse",
    name: "Log Out",
    key: "log-out",
    icon: <Icon fontSize="small">logout</Icon>,
    route: "/authentication/log-out",
    component: <LogOut />,
  },

  {
    type: "divider",
  }
];

export default routes;
