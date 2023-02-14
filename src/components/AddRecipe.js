import React, { useState } from 'react';
import './../styles/AddRecipe.css';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from './Header';

const AddRecipe = () => {
  const {state} = useLocation();
  const [recipeName, setRecipeName] = useState(state?state.name:'');
  const [ingredients, setIngredients] = useState(state?state.ingredients:[{ name: '', quantity: '', unit: ''}]);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const recipe = {
      name: recipeName,
      ingredients: ingredients.filter((ingredient) => ingredient.name && ingredient.quantity && ingredient.unit),
    };
    const recipes = JSON.parse(localStorage.getItem('recipes')) || [];
    localStorage.setItem('recipes', JSON.stringify([...recipes, recipe]));
    setRecipeName('');
    setIngredients([{ name: '', quantity: '', unit: ''}]);
    navigate('/recipes');
  };

  const handleIngredientChange = (e, index, key) => {
    const newIngredients = [...ingredients];
    newIngredients[index][key] = e.target.value;
    setIngredients(newIngredients);
  };

  const addIngredient = () => {
    setIngredients([...ingredients, { name: '', quantity: '', unit: ''}]);
  };

  const removeIngredient = (index) => {
    const newIngredients = [...ingredients];
    newIngredients.splice(index, 1);
    setIngredients(newIngredients);
  };

  return (
    <div>
      <Header/>
    <form className="add-recipe-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="recipe-name">Recipe name:</label>
        <input
          type="text"
          id="recipe-name"
          className="form-control"
          value={recipeName}
          onChange={(e) => setRecipeName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="ingredients">Ingredients:</label>
        {ingredients.map((ingredient, index) => (
          <div key={index} className="ingredient-group">
            <input
              type="text"
              className="form-control ingredient-name"
              placeholder="Name"
              value={ingredient.name}
              onChange={(e) => handleIngredientChange(e, index, 'name')}
            />
            <input
              type="text"
              className="form-control ingredient-quantity"
              placeholder="Quantity"
              value={ingredient.quantity}
              onChange={(e) => handleIngredientChange(e, index, 'quantity')}
            />
            <input
              type="text"
              className="form-control ingredient-unit"
              placeholder="Unit"
              value={ingredient.unit}
              onChange={(e) => handleIngredientChange(e, index, 'unit')}
            />
            <button type="button" className="btn btn-danger" onClick={() => removeIngredient(index)}>
              Remove
            </button>
          </div>
        ))}
        <button type="button" className="btn btn-success" onClick={addIngredient}>
          Add ingredient
        </button>
      </div>
      <button type="submit" className="btn btn-primary">
        Add recipe
      </button>
    </form>
    </div>
  );
};

export default AddRecipe;
