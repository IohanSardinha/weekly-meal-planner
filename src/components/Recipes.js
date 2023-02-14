import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './../styles/Recipes.css';
import Header from "./Header";

function Recipes() {

  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    const storedRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
    setRecipes(storedRecipes);
  }, []);

  const handleClick = (recipe) => {
    navigate(`/add-recipe`, { state:recipe });
  };

  const handleRemove = (index, event) => {
    event.stopPropagation();
    if (window.confirm("Are you sure you want to remove this recipe?")) {
      setRecipes((prevRecipes) => {
        const updatedRecipes = [...prevRecipes];
        updatedRecipes.splice(index, 1);
        localStorage.setItem("recipes", JSON.stringify(updatedRecipes));
        return updatedRecipes;
      });
    }
  };

  return (
    <div>
    <Header/>
    <div className="recipes-list">
      <h1>Recipes</h1>
      <Link to="/add-recipe">Add Recipe</Link>
      <ul>
        {recipes.map((recipe, index) => (
          <li key={recipe.name} onClick={() => handleClick(recipe)}>
          {recipe.name}{" "}
          <button className="btn btn-danger" onClick={(event) => handleRemove(index, event)}>
            Remove
          </button>
        </li>
        ))}
      </ul>
    </div>
    </div>
  );
}

export default Recipes;
