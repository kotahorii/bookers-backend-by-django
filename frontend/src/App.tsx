import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router";
import { AllBook } from "./components/organisms/AllBook";
import { SelectedUser } from "./components/organisms/SelectedUser";
import { Auth } from "./components/pages/Auth";
import { MainPage } from "./components/pages/MainPage";
import { UserList } from "./components/templates/auth/UserList";
import { BookList } from "./components/templates/book/BookList";

const App = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <>
      <Routes>
        <Route path="login" element={<Auth />} />
        <Route path="/" element={<MainPage />}>
          <Route path="books" element={<BookList />}>
            <Route path="" element={<AllBook />} />
            <Route path=":id" element={<SelectedUser />} />
          </Route>
          <Route path="users" element={<UserList />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
