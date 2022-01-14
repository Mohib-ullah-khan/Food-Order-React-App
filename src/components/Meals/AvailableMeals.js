import Card from "../UI/Card";
import meals from "../../assets/dummy-meals";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";
import { useEffect, useState } from "react";
const axios = require("axios");

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  // Fetching Data from Firebase API
  useEffect(() => {
    const fetchMeals = async () => {
      setIsLoading(true);
      const response = await fetch(
        "https://food-order-app-cf0b8-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json"
      );

      if (!response.ok) throw new Error("Something went wrong!");

      const data = await response.json();

      // Data Transformation
      const meals = [];
      Object.keys(data).map((mealID) => {
        const meal = {
          id: mealID,
          ...data[mealID],
        };

        meals.push(meal);
      });
      setMeals(meals);
      setIsLoading(false);
    };

    fetchMeals().catch(() => {
      setError(true);
      setIsLoading(false);
    });
  }, []);

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  const mealsLoading = <p className={classes["meals-loading"]}>Loading...</p>;
  const errorMessage = (
    <p className={classes["error-message"]}>Failed to fetch.</p>
  );

  return (
    <Card className={classes.meals}>
      {isLoading && mealsLoading}
      {!isLoading && error && errorMessage}
      {!isLoading && !error && <ul>{mealsList}</ul>}
    </Card>
  );
};

export default AvailableMeals;
