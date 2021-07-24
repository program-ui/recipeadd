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

// changed
const ball1 = document.querySelector("body > div.loading > div:nth-child(1)")
const ball2 = document.querySelector("body > div.loading > div:nth-child(2)")
const ball3 = document.querySelector("body > div.loading > div:nth-child(3)")
// changed
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

let io = new IntersectionObserver(onIntersection, options)



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


const ballFast = () => {
ball1.classList.add('fast')
ball2.classList.add('fast')
ball3.classList.add('fast')
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
    last.style.display= 'flex'
    getRecipes(0)
    page = 1
    form.reset()
    //changed//
    ballFast()
    
    
    
})


loadBtn.addEventListener('click', (e) => {
    e.preventDefault()
    loadBtn.style.display = 'none'
    getRecipe(prevInputs[prevInputs.length - 1], 20, page)
    page += 1
   
    
})





// let firstRecipe = () => {
//     let input = sessionStorage.getItem('search-input')
//     let page = 0
// if (screen && screen.width > 767){
//     getRecipe(input, 20, page)
    
    
// }
// else {
//    getRecipe(input, 10, page) 
// }
// }


// function getFirstRecipe() {
// if(sessionStorage.getItem("search-input") === null) { 
//   return; }

//  else {
//      firstRecipe()
//       io.observe(last)
//  } 
// }

// getFirstRecipe()



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
    overlay.classList.add('fadeIn')
    overlay.classList.remove('fadeOut')
    const recipeID = button.parentElement.parentElement.id
      generateModal(recipeID)
    document.body.style.overflow = 'hidden'
    //do overflow or fixed
    // const body = document.body;
    // body.style.top = `-${window.scrollY}px`
    // console.log(window.scrollY);
    // console.log(body.style.top);
    // body.style.position = 'fixed';
   
   
    
    }
   
})




let getRecipes = (page) => {
    if (screen && screen.width > 767){
    getRecipe(input.value, 20, page)
    
}
else {
   getRecipe(input.value, 10, page) 
}
}


async function fetchURL(input, x, page) {
    let search = input
    const baseURL = `https://api.spoonacular.com/recipes/complexSearch?number=${x}&query=${search}&offset=${page*x}&apiKey=3392c31fb2ac46fd98daba7ecc420ac9`
    const response = await fetch(baseURL)
    return response.json()
}



async function getRecipe(input, x, page) {
    last.classList.add('show')
    const info = await fetchURL(input, x, page)
    const data = info.results
    let output = ''
    if(data.length === 0 || data === undefined )
    {
    last.classList.remove('show')
    setTimeout(function(){ 
    warning.style.display = 'block'
    }, 
    200); 
    loadBtn.style.display = 'none'
    //  changed //
     last.style.display= 'none'
    }
    else if(data.length > 0){
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
         io.observe(last)
         console.log('observer triggered');
       
    if (screen && screen.width > 767){
    setTimeout(function(){ 
    loadBtn.style.display = 'block'
    }, 
    1500);   
    }
    else if (screen && screen.width < 767) {
        swipe.style.display = 'block'
    }

    }
  
}



