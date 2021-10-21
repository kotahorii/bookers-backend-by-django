import { Route, Routes } from "react-router";
import { Auth } from "./components/pages/Auth";
import { Books } from "./components/pages/Books";
import { Users } from "./components/pages/Users";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="books/" element={<Books />} />
        <Route path="users/" element={<Users />} />
      </Routes>
    </>
  );
};

export default App;
