import { Route, Routes } from "react-router-dom";
import { AuthorizedRoute } from "./auth/AuthorizedRoute";
import Login from "./auth/Login";
import Register from "./auth/Register";
import { Home } from "./Home";
import { UserProfileList } from "./userProfiles/UserProfileList";
import { UserProfileDetails } from "./userProfiles/UserProfileDetails";
import { ChoresList } from "./chores/ChoresList";
import { ChoreDetails } from "./chores/ChoreDetails";
import { CreateChore } from "./chores/CreateChore";
import { MyChores } from "./chores/MyChores";


export default function ApplicationViews({ loggedInUser, setLoggedInUser }) {
  return (
    <Routes>
      <Route path="/">

        <Route
          index
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <Home />
            </AuthorizedRoute>
          }
        />

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
