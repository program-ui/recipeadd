const heading = document.querySelector('.heading')
const firstSearch = sessionStorage.getItem('search-input')
const forms = document.querySelector('#form')
const input = document.querySelector('.input')
const warning = document.querySelector('.warning')
const apiKey = '3392c31fb2ac46fd98daba7ecc420ac9'
// const baseURL = `https://api.spoonacular.com/recipes/complexSearch?number=10&query=${search}&instructionsRequired=true&apiKey=${apiKey}&addRecipeInformation=true&fillIngredients=true`
// const baseURL2 = `https://api.spoonacular.com/recipes/complexSearch?number=10&query=${search}&instructionsRequired=true&apiKey=6116c9a704804aeaad7bd2360ff4564c&addRecipeInformation=true&fillIngredients=true` 



forms.addEventListener('submit', (e) => {
    e.preventDefault();
    sessionStorage.setItem('search-input', input.value)
    input.value = ''
    getRecipe(input.value)
})



async function fetchURL(input) {
    let search = input
    const baseURL = `https://api.spoonacular.com/recipes/complexSearch?number=10&query=${search}&apiKey=6116c9a704804aeaad7bd2360ff4564c`
    const response = await fetch(baseURL)
    return response.json()
}

async function getRecipe(input) {
    const info = await fetchURL(input)
    const data = info.results
    if(data.length == 0 || data === undefined )
    {
        warning.style.display = 'block'
    }
    else {
    window.location.href = 'index2.html'
    }
}