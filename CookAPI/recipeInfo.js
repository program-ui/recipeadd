async function fetchID (id) {
    let getID = id
    const infoURL = `https://api.spoonacular.com/recipes/${getID}/information?includeNutrition=false&&apiKey=3392c31fb2ac46fd98daba7ecc420ac9`
    const response = await fetch(infoURL)
    return response.json()
}



async function generateModal(id) {
const data = await fetchID(id)
const popUp = document.querySelector('.recipe-info')
const loadingRecipe = document.querySelector('.loading2')
let list = ''
data.extendedIngredients.forEach ((i) =>{
list += 
`<li>
    <p class="amount">${i.amount + " " + i.unit}</p>
    <img class="ingredient-img" onerror="this.src='./image/noimage.png'" src="https://spoonacular.com/cdn/ingredients_100x100/${i.image}" alt="">

    <p class="ingredient-name">${i.name}</p>
</li>`
})

let instruction = ''
data.analyzedInstructions[0].steps.forEach((i) => {
   instruction += `<li class="step">${i.step}</li>`
})

let output = ''
output += 
`<button class="recipe-close"><i class="fas fa-times"></i></button>

<div class="recipe-summary">
    
 <h1 class="recipe-title">${data.title}</h1>
    <div class="recipe-ingredient">
    <h3 class="ingredient-title">Ingredients</h3>
     <ul class="ingredient-list">
         
     ${list}
     
        </ul>
        </div>
        <div class="recipe-instruction">
        <h3>Instructions</h3>
        <ul class="instruction-list">
       ${instruction}
    </ul>
    </div>
     
    <img class="recipe-img" src="" alt="">
    <a class="more-info" target="_blank" href="${data.spoonacularSourceUrl}">More Info</a>
    <div class="last"></div>
</div>`
loadingRecipe.classList.remove('show')
popUp.innerHTML = output
  
 
  const closeBtn = document.querySelector('.recipe-close')
  closeBtn.addEventListener('click', () => {
      overlay.style.display = 'none'
    document.body.style.overflow = 'auto'
    const body = document.body;
    const scrollY = body.style.top;
    body.style.position = '';
    body.style.top = '';
    window.scrollTo(0, parseInt(scrollY || '0') * -1);
  })
} 



window.addEventListener('click', (e) => exitModal(e))

document.addEventListener('touchstart', (e) => exitModal(e));


function exitModal(e) {

  if(e.target == document.getElementById('modal1')){
    
    document.getElementById('modal1').style.display = 'none';
    document.body.style.overflow = 'auto'
    const body = document.body;
    const scrollY = body.style.top;
    body.style.position = '';
    body.style.top = '';
    window.scrollTo(0, parseInt(scrollY || '0') * -1);
  }
}