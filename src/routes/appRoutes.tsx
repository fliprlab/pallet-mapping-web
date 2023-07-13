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
import SelectLocationCreateBag from "../pages/create-bag/create-bag-select-location/SelectLocationCreateBag";
import CreateBag from "../pages/create-bag/create-bag/CreateBag";
import ItemListCreateBag from "../pages/create-bag/create-bag-items-list/ItemListCreateBag";
import ScanItemsCreateBag from "../pages/create-bag/create-bag-scan-item/ScanItemsCreateBag";
import QrCodeScreenCreateBag from "../pages/create-bag/qr-code-screen-create-bag/QrCodeScreenCreateBag";
import MapPallet from "../pages/pallet-mapping/map-pallet/MapPallet";
import LocationScan from "../pages/pallet-mapping/scan-location/LocationScan";
import ScanPallet from "../pages/pallet-mapping/scan-pallet/ScanPallet";
import ScanItem from "../pages/scan-item/scan-item/ScanItem";
import MapPalletItem from "../pages/scan-item/map-item-pallet/MapPalletItem";
import PalletsList from "../pages/view-pallets/list-of-pallets/PalletsList";
import PalletItems from "../pages/view-pallets/pallet-items/PalletItems";
import ScanDispatchPallet from "../pages/dispatch-items/scan-dispatch-pallet/ScanDispatchPallet";

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
        path: "/create-bag/qr-code/:palletId/:virtualId",
        element: <QrCodeScreenCreateBag />,
      },
      // create bag old process
      {
        path: "/create-bag/scan-items",
        element: <ScanItemsCreateBag />,
      },
      {
        path: "/create-bag/scan-pallet/:location/:palletId",
        element: <ItemListCreateBag />,
      },
      {
        path: "/create-bag/select-location",
        element: <SelectLocationCreateBag />,
      },
      {
        path: "/create-bag/scan-pallet/:location",
        element: <CreateBag />,
      },

      // Scan items process
      {
        path: "/scan-items",
        element: <ScanItem />,
      },
      {
        path: "/scan-items/scan-pallet/:location/:itemId/:zone/:lpst",
        element: <MapPalletItem />,
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
      {
        path: "/pallet-mapping",
        element: <MapPallet />,
      },
      {
        path: "/pallet-mapping/scan-location/",
        element: <LocationScan />,
      },
      {
        path: "/pallet-mapping/scan-pallet/:location",
        element: <ScanPallet />,
      },
      {
        path: "/view-pallets/list-of-pallets",
        element: <PalletsList />,
      },
      {
        path: "/view-pallets/list-of-pallets/:destination",
        element: <PalletsList />,
      },
      {
        path: "/view-pallets/items/:pallet",
        element: <PalletItems />,
      },
      {
        path: "/dispatch-items/scan-pallet",
        element: <ScanDispatchPallet />,
      },
      {
        path: "/dispatch-items/scan-pallet/:palletId",
        element: <ScanDispatchPallet />,
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
