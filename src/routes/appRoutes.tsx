import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../pages/dashboard/Dashboard";
import ErrorPage from "../pages/error/ErrorPage";
import Login from "../pages/login/Login";
import ProtectedRoute from "../routers/Protected.route";
import SelectLocationPutAway from "../pages/put-away/put-away-select-location/SelectLocationPutAway";
import PutAwayScanPallet from "../pages/put-away/scan-pallet/PutAwayScanPallet";
import ScanGridPutAway from "../pages/put-away/scan-grid/ScanGridPutAway";
import SelectLocationPicking from "../pages/picking-pallet/picking-select-location/SelectLocationPicking";
import GridListPicking from "../pages/picking-pallet/grid-list/GridListPicking";
import ScanGridPicking from "../pages/picking-pallet/scan-grid/ScanGridPicking";
import { IMAGES } from "../images";
import SelectLocationCreateBag from "../pages/create-bag/create-bag-select-location/SelectLocationCreateBag";
import CreateBag from "../pages/create-bag/create-bag/CreateBag";

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "/create-bag/select-location",
        element: <SelectLocationCreateBag />,
      },
      {
        path: "/create-bag/scan-pallet/:location",
        element: <CreateBag />,
      },
      {
        path: "/put-away/select-location",
        element: <SelectLocationPutAway />,
      },
      {
        path: "/put-away/scan-pallet/:location",
        element: <PutAwayScanPallet />,
      },
      {
        path: "/put-away/scan-grid/:location/:palletId",
        element: <ScanGridPutAway />,
      },
      {
        path: "/picking/select-location",
        element: <SelectLocationPicking />,
      },
      {
        path: "/picking/grid-list",
        element: <GridListPicking />,
      },
      {
        path: "/picking/scan-grid/:shipmentId",
        element: <ScanGridPicking />,
      },
    ],
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
]);
