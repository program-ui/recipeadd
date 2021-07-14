const heading = document.querySelector('.heading')
const form = document.querySelector('#form')
const input = document.querySelector('.input')
const warning = document.querySelector('.warning')
const apiKey = '3392c31fb2ac46fd98daba7ecc420ac9'
const searchItems = document.querySelector('.search-items')
const popUp = document.querySelector('.recipe-info')
const loadBtn = document.querySelector('.load')
const swipe = document.querySelector('.swipe')
const loadingRecipe = document.querySelector('.loading2')
const last = document.querySelector('.loading')
const overlay = document.getElementById('modal1')
// const baseURL = `https://api.spoonacular.com/recipes/complexSearch?number=${x}&query=${search}&offset=${page*x}&apiKey=3392c31fb2ac46fd98daba7ecc420ac9`

// const baseURL2 = `https://api.spoonacular.com/recipes/complexSearch?number=${x}&query=${search}&offset=${page*x}&apiKey=6116c9a704804aeaad7bd2360ff4564c` 

// const infoURL = `https://api.spoonacular.com/recipes/${getID}/information?includeNutrition=false&&apiKey=3392c31fb2ac46fd98daba7ecc420ac9`

// const infoURL2 = `https://api.spoonacular.com/recipes/${getID}/information?includeNutrition=false&&apiKey=6116c9a704804aeaad7bd2360ff4564c`


let options = {
threshold : 0.9
};



const onIntersection = (entries) => {
   if (entries[0].isIntersecting) {
   document.addEventListener('touchstart', touchStart);        
    document.addEventListener('touchmove', touchMove)
}
    else if (!entries[0].isintersecting) {
    document.removeEventListener('touchstart', touchStart);        
    document.removeEventListener('touchmove', touchMove);
    }
}

const io = new IntersectionObserver(onIntersection, options)


io.unobserve(last)



let yDown = null;  
let page = 1                                                    
function touchStart(e) {                                         
                                        
    yDown = e.touches[0].clientY;                                      
};                                                
function touchMove(e) {
    if ( ! yDown ) {
        return;
    }

    let yUp = e.touches[0].clientY;

    let yDiff = yDown - yUp;
    if(Math.abs( yDiff )>50){ //to deal with to short swipes
    if ( yDiff > 0 ) {
     if (prevInputs === undefined || prevInputs.length == 0) {
         let input = sessionStorage.getItem('search-input')
         swipe.style.display = 'none'
         getRecipe(input, 10, page)
      }
      else {
     swipe.style.display = 'none'
     getRecipe(prevInputs[prevInputs.length - 1], 10, page)
     }

     page += 1
   

    }                                                                
    
    /* reset values */
   
    yDown = null;
    }
}






const prevInputs = [];


form.addEventListener("submit", (e) => {
    e.preventDefault();
    sessionStorage.clear()
    searchItems.innerHTML = ""
    warning.style.display = 'none'
    prevInputs.push(input.value)
    loadBtn.style.display = 'none'
    swipe.style.display = 'none'
    getRecipes(0)
    page = 1
    form.reset()
    io.observe(last)
    
    
})


loadBtn.addEventListener('click', (e) => {
    e.preventDefault()
    loadBtn.style.display = 'none'
    getRecipe(prevInputs[prevInputs.length - 1], 20, page)
    page += 1
   
    
})





let firstRecipe = () => {
    let input = sessionStorage.getItem('search-input')
    let page = 0
if (screen && screen.width > 767){
    getRecipe(input, 20, page)
    
    
}
else {
   getRecipe(input, 10, page) 
}
}


function getFirstRecipe() {
if(sessionStorage.getItem("search-input") === null) { 
  return; }

 else {
     firstRecipe()
      io.observe(last)
 } 
}

getFirstRecipe()

window.onbeforeunload = function() {
  sessionStorage.clear();
};








searchItems.addEventListener('click', (e) => {
    e.preventDefault()
    let button = e.target
  if(button.textContent === 'Recipe') {
        popUp.innerHTML = `
    <div class="loading2">
    <div class="ball2"></div>
    <div class="ball2"></div>
    <div class="ball2"></div>
    </div>`
    const loadingRecipe = document.querySelector('.loading2')
    loadingRecipe.classList.add('show')
    //changed
    overlay.classList.add('fadeIn')
    overlay.classList.remove('fadeOut')
    //changed
    const recipeID = button.parentElement.parentElement.id
      generateModal(recipeID)
    document.body.style.overflow = 'hidden'
    //do overflow or fixed
    // const scrollY = document.documentElement.style.getPropertyValue('--scroll-y');
    // const body = document.body;
    // body.style.position = 'fixed';
    // body.style.top = `-${scrollY}`;
    ////////changed
    
    }
   
})


  

window.addEventListener('scroll', () => {
  document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}px`);
});




let getRecipes = (page) => {
    if (screen && screen.width > 767){
    getRecipe(input.value, 20, page)
    
}
else {
   getRecipe(input.value, 10, page) 
}
}








// async function fetchID (id) {
//     let getID = id
//     const infoURL = `https://api.spoonacular.com/recipes/${getID}/information?includeNutrition=false&&apiKey=6116c9a704804aeaad7bd2360ff4564c`
//     const response = await fetch(infoURL)
//     return response.json()
// }



// async function generateModal(id) {
// const data = await fetchID(id)
// const popUp = document.querySelector('.recipe-info')
// const loadingRecipe = document.querySelector('.loading2')
// let list = ''
// data.extendedIngredients.forEach ((i) =>{
// list += 
// `<li>
//     <p class="amount">${i.amount + " " + i.unit}</p>
//     <img class="ingredient-img" onerror="this.src='./image/noimage.png'" src="https://spoonacular.com/cdn/ingredients_100x100/${i.image}" alt="">

//     <p class="ingredient-name">${i.name}</p>
// </li>`
// })

// let instruction = ''
// data.analyzedInstructions[0].steps.forEach((i) => {
//    instruction += `<li class="step">${i.step}</li>`
// })

// let output = ''
// output += 
// `<button class="recipe-close"><i class="fas fa-times"></i></button>

// <div class="recipe-summary">
    
//  <h1 class="recipe-title">${data.title}</h1>
//     <div class="recipe-ingredient">
//     <h3 class="ingredient-title">Ingredients</h3>
//      <ul class="ingredient-list">
         
//      ${list}
     
//         </ul>
//         </div>
//         <div class="recipe-instruction">
//         <h3>Instructions</h3>
//         <ul class="instruction-list">
//        ${instruction}
//     </ul>
//     </div>
     
//     <img class="recipe-img" src="" alt="">
//     <a class="more-info" target="_blank" href="${data.spoonacularSourceUrl}">More Info</a>
//     <div class="last"></div>
// </div>`
// loadingRecipe.classList.remove('show')
// popUp.innerHTML = output
  
 
//   const closeBtn = document.querySelector('.recipe-close')
//   closeBtn.addEventListener('click', () => {
//       popUp.style.display = 'none'
//     document.body.style.overflow = 'auto'
//     const body = document.body;
//     const scrollY = body.style.top;
//     body.style.position = '';
//     body.style.top = '';
//     window.scrollTo(0, parseInt(scrollY || '0') * -1);
//   })
// } 





async function fetchURL(input, x, page) {
    let search = input
    const baseURL = `https://api.spoonacular.com/recipes/complexSearch?number=${x}&query=${search}&offset=${page*x}&apiKey=6116c9a704804aeaad7bd2360ff4564c`
    const response = await fetch(baseURL)
    return response.json()
}


async function getRecipe(input, x, page) {
    last.classList.add('show')
    const info = await fetchURL(input, x, page)
    const data = info.results
    let output = ''
    if(data.length == 0 || data === undefined )
    {
        
        last.classList.remove('show')
        setTimeout(function(){ 
    warning.style.display = 'block'
    }, 
    200); 
    loadBtn.style.display = 'none'
    }
    else {
    data.forEach((i) => {
        output += `
         <div class="item" id="${i.id}">
        <div class="wrapper">
            <div class="images">
                <img class="image" src="https://spoonacular.com/recipeImages/${i.id}-636x393.jpg" alt="">
            </div>
            <div class="title">
                <h3 class="text">${i.title}</h3>
            </div>
           <a class="recipe-btn" tabindex="-1" href="">Recipe</a>
            </div>
        </div>`
       }) 
         searchItems.insertAdjacentHTML('beforeend', output)
         warning.style.display = 'none'
         last.classList.remove('show')
    if (screen && screen.width > 767){
    setTimeout(function(){ 
    loadBtn.style.display = 'block'
    }, 
    1500);   
    }
    else if (screen && screen.width < 767) {
        swipe.style.display = 'block'
    }
    if ((screen && screen.width > 200) && (screen && screen.width < 900)) {
        const itemsX = document.querySelectorAll('.text')
        const items = Array.from (itemsX);
        items.forEach(i => {
            if(i.textContent.length>41 && i.textContent.length<59) {
               return i.classList.add('small')
            }
            if(i.textContent.length>60) {
              return i.classList.add('xSmall')
            }
        })
         console.log(items);
    }
    }
    
   
}



