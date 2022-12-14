import HomePage from "./pages/HomePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LogInPage from "./pages/LogInPage";
import SignUpPage from "./pages/SignUpPage";
import CategoriesPage from "./pages/CategoriesPage"
import WatchMoviePage from "./pages/WatchMoviePage";
import ProfilePage from "./pages/ProfilePage"

function App() {
  return (
  <div className="App bg-[#082032]">
    <BrowserRouter>
    <Routes>
      <Route exact path='/' element={<HomePage />} />
      <Route path='/LogInPage' element={<LogInPage />} />
      <Route path='/SignUpPage' element={<SignUpPage />} />
      <Route path='/CategoriesPage' element={<CategoriesPage />} />
      <Route path='/WatchMoviePage' element={<WatchMoviePage/>}/>
      <Route path='/ProfilePage' element={<ProfilePage/>}/>
    </Routes>
    </BrowserRouter>
  </div>
  );
}

export default App;
