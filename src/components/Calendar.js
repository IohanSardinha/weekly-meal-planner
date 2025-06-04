import React, { useState, useEffect } from 'react';
import './../styles/Calendar.css';
import Header from './Header';

const Calendar = () => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const meals = ['Breakfast', 'Lunch', 'Tea', 'Dinner'];
  const [shoppingList, setShoppingList] = useState(localStorage.getItem("shoppingList")?JSON.parse(localStorage.getItem("shoppingList")):{});

  let meals_keys = {};
  meals.forEach((meal) => (meals_keys[meal] = null));

  let week_meals = {};

  days.forEach((day) => (week_meals[day] = { ...meals_keys }));

  const [weekPlan, setWeekPlan] = useState(
    JSON.parse(localStorage.getItem('weekPlan')) || week_meals
  );

  const recipes = JSON.parse(localStorage.getItem('recipes')) || [];

  const updateShoppingList = () =>{
    const newShoppingList = {};
    for(let day of Object.keys(weekPlan)){
      for(let meal of Object.keys(weekPlan[day])){
        if(weekPlan[day][meal] == null) continue;
        const recipe = recipes.find((e)=>e.name === weekPlan[day][meal]);
        if(!recipe) continue;
        for(let ingredient of recipe.ingredients){
          if(Object.keys(newShoppingList).includes(ingredient.name))
            newShoppingList[ingredient.name].quantity += parseFloat(ingredient.quantity);
          else
            newShoppingList[ingredient.name] = {quantity:parseFloat(ingredient.quantity), unit:ingredient.unit}
        }
      }
    }

    setShoppingList(newShoppingList);
    localStorage.setItem("shoppingList", JSON.stringify(newShoppingList));
  }

  const handleChange = (e, day, meal) => {
    const updatedWeekPlan = { ...weekPlan };
    updatedWeekPlan[day][meal] = e.target.value;
    setWeekPlan(updatedWeekPlan);
    localStorage.setItem('weekPlan', JSON.stringify(updatedWeekPlan));
    updateShoppingList();
  };


  useEffect(() => {
    document.title = "Weekly Meal Planner 1.0";

    const handlePrintShortcut = (e) => {
      if (e.ctrlKey && e.key === 'p') {
        e.preventDefault();
        window.open('/print', '_blank');
      }
    };

    window.addEventListener('keydown', handlePrintShortcut);
    
    return () => {
      window.removeEventListener('keydown', handlePrintShortcut);
    };
  }, []);

  return (
    <div>
    <Header/>
    <div className="calendar">
      <table className="calendar__table">
        <thead>
          <tr>
            <th></th>
            {days.map((day) => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {meals.map((meal) => (
            <tr key={meal}>
              <td>{meal}</td>
              {days.map((day) => (
                <td key={day}>
                  <select
                    className="calendar__select"
                    value={weekPlan[day][meal]}
                    onChange={(e) => handleChange(e, day, meal)}
                  >
                    <option value="">Select Recipe</option>
                    {recipes.map((recipe) => (
                      <option key={recipe.name} value={recipe.name}>
                        {recipe.name}
                      </option>
                    ))}
                  </select>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div className='shoppingList'>
      <table className="calendar__table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
        {Object.keys(shoppingList).map((name)=>(
          <tr>
            <td>{name}</td>
            <td>{shoppingList[name].quantity}{shoppingList[name].unit}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default Calendar;
