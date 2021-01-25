const getMeals = async () => {
  const response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772"
  );
  const data = await response.json();
  console.log(data);
};

getMeals();
