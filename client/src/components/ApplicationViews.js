import { Route, Routes } from "react-router-dom";
import { AuthorizedRoute } from "./auth/AuthorizedRoute";
import Login from "./auth/Login";
import Register from "./auth/Register";
import { Home } from "./Home/Home";
import { OrdersList } from "./Orders/OrdersList/OrdersList";
import { CreateDeliveryOrder } from "./Orders/CreateOrders/CreateDeliveryOrder";
import { CreateDineInOrder } from "./Orders/CreateOrders/CreateDineInOrder";
import { ChooseOrderType } from "./Orders/CreateOrders/ChooseOrderType";
import { OrderDetails } from "./Orders/OrderDetails/OrderDetails";
import { CompleteOrder } from "./Orders/CompleteOrders/CompleteOrder";

export default function ApplicationViews({ loggedInUser, setLoggedInUser }) {
  return (
    <Routes>
      <Route path="/">

        <Route
          index
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <Home loggedInUser={loggedInUser}/>
            </AuthorizedRoute>
          }
        />

        <Route path="orders">
          <Route index element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <OrdersList loggedInUser={loggedInUser}/>
            </AuthorizedRoute>}>
          </Route>
          <Route path="complete">
            <Route path=":id" element={
              <AuthorizedRoute loggedInUser={loggedInUser}>
                <CompleteOrder loggedInUser={loggedInUser}/>
              </AuthorizedRoute>}
            />
          </Route>
          <Route path="details">
            <Route path=":id" element={
              <AuthorizedRoute loggedInUser={loggedInUser}>
                <OrderDetails loggedInUser={loggedInUser}/>
              </AuthorizedRoute>}
            />
          </Route>
        </Route>

        <Route path="create">
            <Route index element={
              <AuthorizedRoute loggedInUser={loggedInUser}>
                <ChooseOrderType loggedInUser={loggedInUser}/>
              </AuthorizedRoute>} 
            />
            <Route path="delivery" element={
              <AuthorizedRoute loggedInUser={loggedInUser}>
                <CreateDeliveryOrder loggedInUser={loggedInUser}/>
              </AuthorizedRoute>} 
            />
            <Route path="dinein" element={
              <AuthorizedRoute loggedInUser={loggedInUser}>
                <CreateDineInOrder loggedInUser={loggedInUser}/>
              </AuthorizedRoute>} 
            />
        </Route>

        <Route
          path="login"
          element={<Login setLoggedInUser={setLoggedInUser} />}
        />
        <Route
          path="register"
          element={<Register setLoggedInUser={setLoggedInUser} />}
        />
      </Route>
      <Route path="*" element={<p>Whoops, nothing here...</p>} />
    </Routes>
  );
}
