const searchBox = document.querySelector('.searchBox');
const searchBtn = document.querySelector('.searchBtn');
const recipeContainer = document.querySelector('.recipe-container');
const recipeCloseBtn = document.querySelector('.recipe-close-btn');
const recipeDetailsContent = document.querySelector('.recipe-details-content');


const heading = document.querySelector('.heading');
heading.addEventListener("click", () => {
    recipeContainer.innerHTML = "<h2>Search your favorite recipes ...</h2>";
});

// Fetch Recipe Function
const fetchRecipe = async (query) => {
    recipeContainer.innerHTML = "<h2>Finding your recipe...</h2>";
    try {
        const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const response = await data.json();

        recipeContainer.innerHTML = "";
        if (response.meals) {
            response.meals.forEach(meal => {
                const recipeDiv = document.createElement('div');
                recipeDiv.classList.add('recipe');
                recipeDiv.innerHTML = `
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}" loading="lazy">
                    <h3>${meal.strMeal}</h3>
                    <p><span>${meal.strArea}</span> Dish</p>
                    <p>Belongs to <span>${meal.strCategory}</span> category</p>
                    <button>View Recipe</button>
                `;

                const button = recipeDiv.querySelector('button');
                button.addEventListener("click", () => {
                    openRecipePopup(meal);
                });

                recipeContainer.appendChild(recipeDiv);
            });
        } else {
            recipeContainer.innerHTML = "<h2>No such meal found!</h2>";
        }
    } catch (error) {
        recipeContainer.innerHTML = "<h2>Error fetching data.</h2>";
    }
};


const fetchIngredients = (meal) => {
    let ingredientsList = "";
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        if (ingredient) {
            const measure = meal[`strMeasure${i}`];
            ingredientsList += `<li>${measure} ${ingredient}</li>`;
        } else {
            break;
        }
    }
    return ingredientsList;
};


const openRecipePopup = (meal) => {
    recipeDetailsContent.innerHTML = `
        <h2 class="recipeName">${meal.strMeal}</h2>
        <h3 class="ingredients">Ingredients:</h3>
        <ul class="ingredientList">${fetchIngredients(meal)}</ul>
        <div class="recipeInstruction">
            <h3>Instructions:</h3>
            <p>${meal.strInstructions}</p>
        </div>
        <a href="${meal.strYoutube}" target="_blank" class="youtubeLink">Watch tutorial</a>
    `;

    // If admin, show edit option
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.role === 'admin') {
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit Recipe';
        editBtn.classList.add('edit-btn');
        recipeDetailsContent.appendChild(editBtn);
    }

    recipeDetailsContent.parentElement.style.display = "block";
};


recipeCloseBtn.addEventListener("click", () => {
    recipeDetailsContent.parentElement.style.display = "none";
});


searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const searchInput = searchBox.value.trim();
    if (!searchInput) {
        showErrorMessage("Type the meal in the search box.");
        return;
    }
    fetchRecipe(searchInput);
});
