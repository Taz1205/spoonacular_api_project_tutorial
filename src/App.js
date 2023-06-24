import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';


function App() {

  const [recipe, setRecipe] = useState();


  // Link to Spoonacular Search API Documentation: https://spoonacular.com/food-api/docs#Get-Random-Recipes
  async function getRandomRecipe() {
    try {
      //IMPORTANT! Update the below variable with your own api key!!
      const apiKey = '';

      //making spoonacular api call to get a random recipe
      let resp = await axios.get(`https://api.spoonacular.com/recipes/random?apiKey=${apiKey}`);
      console.log(21, resp.data);

      //store the random recipe into the recipe variable
      setRecipe(resp.data.recipes[0]);
    } catch (e) {
      console.log(e);
    }

  }

  useEffect(() => {
    getRandomRecipe();
  }, []);



  return (

    <div className="row">

      <button onClick={getRandomRecipe}>
        Generate Random Recipie
      </button>


      <div>
        Name:
        <a target="_blank" href={recipe?.sourceUrl}>
          {recipe?.title}
        </a>2
      </div>
      <img src={recipe?.image} />

      <div className="ingredients">
        <div>
          Ingredients needed:
        </div>
        {recipe?.extendedIngredients.map((ingredient, index) =>
          <span key={index}>

            {index != recipe?.extendedIngredients.length - 1 ? ingredient.name + ", " : ingredient.name}
          </span>
        )}
        {recipe?.analyzedInstructions.map((instruction) =>
          <ol>
            {instruction.steps?.map((step) =>
              <li>
                {step.step}
              </li>
            )}
          </ol>
        )
        }
      </div >
      <div>

      </div>

    </div >

  );
}

export default App;