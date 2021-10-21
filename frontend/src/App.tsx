import { Route, Routes } from "react-router";
import { Auth } from "./components/pages/Auth";
import { Books } from "./components/pages/Books";
import { MainPage } from "./components/pages/MainPage";
import { Users } from "./components/pages/Users";
import { UserList } from "./components/templates/auth/UserList";
import { BookList } from "./components/templates/book/BookList";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="login/" element={<Auth />} />
        <Route path="/" element={<MainPage />}>
          <Route path="books/" element={<Books />}>
            <Route path="" element={<BookList />} />
          </Route>
          <Route path="users/" element={<Users />}>
            <Route path="" element={<UserList />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
