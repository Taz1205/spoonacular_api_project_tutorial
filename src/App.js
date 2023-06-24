import { useEffect, useState, Fragment } from 'react';
import axios from 'axios';
import './App.css';


function App() {

  const [recipe, setRecipe] = useState();


  // Link to Spoonacular Search API Documentation: https://spoonacular.com/food-api/docs#Search-Recipes-Complex
  async function getRecipes() {
    try {
      //IMPORTANT! Update the below variable with your own api key!!
      const apiKey = '056a638f92044e68818aadaa4e2293a9';

      //making spoonacular api call to search for photos based on search query
      let resp = await axios.get(`https://api.spoonacular.com/recipes/random?apiKey=${apiKey}`);
      console.log(21, resp.data.recipes[0]);

      //store the array of results into urlsToDisplay variable
      setRecipe(resp.data.recipes[0]);
    } catch (e) {
      console.log(e);
    }

  }

  useEffect(() => {
    getRecipes();
  }, []);



  return (

    <div className="row">

      <button onClick={getRecipes}>
        Generate Random Recipie
      </button>


      <div>
        Name:
        <a target="_blank" href={recipe?.sourceUrl}>
          {recipe?.title}
        </a>
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