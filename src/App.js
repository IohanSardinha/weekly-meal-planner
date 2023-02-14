import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Recipes from "./components/Recipes";
import AddRecipe from "./components/AddRecipe";
import Calendar from "./components/Calendar";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Calendar />} />
          <Route path="/add-recipe" element={<AddRecipe />} />
          <Route path="/recipes" element={<Recipes />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));