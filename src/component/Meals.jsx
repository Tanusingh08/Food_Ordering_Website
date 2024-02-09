import MealItem from "./MealItem.jsx";
import useHttp from "./hooks/useHttp.js";
import Error from "./Error.jsx";

const requestMethod = {};
export default function Meals() {
  const {
    data: loadedMeals,
    isLoading,
    error,
  } = useHttp("http://localhost:3000/meals",requestMethod,[]);

  if(isLoading){
    return <p className="center">Fetching Meals...</p>
  }

  if(error){
    return <Error title="Failed to fetched meals" message={error}/>
  }
 
  return (
    <ul id="meals">
      {loadedMeals.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}
