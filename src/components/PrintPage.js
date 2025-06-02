import React, { useEffect } from 'react';
import './../styles/PrintPage.css';

const PrintPage = () => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const meals = ['Breakfast', 'Lunch', 'Tea', 'Dinner'];
  
  const weekPlan = JSON.parse(localStorage.getItem('weekPlan')) || {};
  const shoppingList = JSON.parse(localStorage.getItem('shoppingList')) || {};

  useEffect(() => {
    window.print();
  }, []);

  return (
    <div className="print-container">
      {/* Meal Plan Section */}
      <div className="meal-plan-section">
        <h1>Weekly Meal Plan</h1>
        <table className="print-table">
          <thead>
            <tr>
              <th></th>
              {days.map(day => <th key={day}>{day}</th>)}
            </tr>
          </thead>
          <tbody>
            {meals.map(meal => (
              <tr key={meal}>
                <td>{meal}</td>
                {days.map(day => (
                  <td key={`${day}-${meal}`}>
                    {weekPlan[day]?.[meal] || '-'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Shopping List Section */}
      <div className="shopping-list-section">
        <h1>Shopping List</h1>
        <table className="print-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(shoppingList).map(([name, details]) => (
              <tr key={name}>
                <td>{name}</td>
                <td>{details.quantity}{details.unit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PrintPage;