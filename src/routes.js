import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
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
import KaderLogin from "layouts/auth/login/kaderLogin";
import ScaleIcon from '@mui/icons-material/Scale';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import GroupIcon from '@mui/icons-material/Group';
import EscalatorWarningIcon from '@mui/icons-material/EscalatorWarning';
import Riwayat from "layouts/riwayat";
import Home from "layouts/home";
import DetailForParent from "layouts/home/anak/anak";
import DetailPenimbanganAnak from "layouts/home/anak/detailPenimbangan";
import DetailImunisasiAnak from "layouts/home/anak/detailImunisasi";
import GraphicChildAnak from "layouts/home/anak/detailGrafikAnak";
import Blog from "layouts/blog/blog";
import Icon from "@mui/material/Icon"; // <-- Add this import

const routes = [
  {
    type: "title",
    name: "Home",
    key: "home",
    route: "/home",
    component: <Home />,
  },
  {
    name: "Blog",
    key: "blog",
    route: "/blog",
    component: <Blog />,
  },
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    name: "Sign In",
    key: "sign-in",
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
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
  {
    type: "collapse",
    name: "Riwayat Kegiatan",
    key: "riwayat-kegiatan",
    icon: <Icon fontSize="small">event</Icon>,
    route: "/riwayat-kegiatan",
    component : <Riwayat />,
  },
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
    component: <DetailAnak />,
  },
  {
    name : "detailAnak",
    key : "detailAnak",
    route : "/anak/:nik",
    component : <DetailForParent />,
  },
  {
    name : "detailPenimbangan",
    key : "detailPenimbangan",
    route : "/penimbangan/:id",
    component : <DetailPenimbanganAnak />,
  },
  {
    name : "detailImunisasi",
    key : "detailImunisasi",
    route : "/imunisasi/:id",
    component : <DetailImunisasiAnak />,
  },
  {
    name: "grafik-anak",
    key: "grafik-anak",
    route: "/anak/grafik/:nik",
    component: <GraphicChildAnak />,
  },
  {
    name: "grafik-anak",
    key: "grafik-anak",
    route: "/anak/detail/grafik/:nik",
    component: <GraphicChild />,
  },
  {
    type: "collapse",
    name: "Daftar User",
    key: "user",
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
    route: "/authentication/sign-up",
    component: <SignUp />,
  },
];

export default routes;
