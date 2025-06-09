import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import NotFound from "./components/NotFound";
import RootLayout from "./layouts/RootLayout";
import CompanyDashboardPage from "../components/dashboard/CompanyDashboardPage";
import CompanyPage from "../components/company/CompanyPage";
// import Login from './components/Login';

const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/" element={<RootLayout />}>
          <Route index element={<CompanyDashboardPage />} />
          <Route path="company/:id" element={<CompanyPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </>
    )
  );  

const RouteProvider = () => {
    return <RouterProvider router={router} />
}

export default RouteProvider;