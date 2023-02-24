let rowData = document.getElementById("rowData")
let search = document.getElementById("search")
$(".open-close-icon").click(() => {
  if ($(".side-nav-menu").css("left") == '0px') {
    openTap()
  }
  else {
    closeTap()
  }

})

function openTap() {
  // console.log("lllllll")
  let x = $(".nav-tab").outerWidth()
  $(".side-nav-menu").animate({ left: -x }, 500)
  $(".open-close-icon").removeClass("fa-x")
  $(".open-close-icon").addClass("fa-bars")
  for (let i = 0; i < 5; i++) {
    $(".links li").eq(i).animate({ top: 200 }, (i + 5) * 120)
  }
}
function closeTap() {
  // console.log("no")
  $(".side-nav-menu").animate({ left: 0 }, 500)
  $(".open-close-icon").removeClass("fa-bars")
  $(".open-close-icon").addClass("fa-x")
  for (let i = 0; i < 5; i++) {
    $(".links li").eq(i).animate({ top: 0 }, (i + 5) * 120)
  }
}
openTap()


async function home() {
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`)
  response = await response.json()
  displayMeal(response.meals)
}
home()
function displayMeal(arr) {
  let cartona = ``
  for (let i = 0; i < arr.length; i++) {
    cartona += `<div class="col-md-3 pt-4  ">
        <div onclick=ingredientsDescription("${arr[i].idMeal}") class="meal position-relative">
          <img src="${arr[i].strMealThumb}" alt="">
          <div class="layer-meal position-absolute d-flex justify-content-start align-items-center">
              <h3 class=" text-black">${arr[i].strMeal}</h3>
          </div>
        </div>
      </div>`
    rowData.innerHTML = cartona;
    //   console.log(rowData)
  }
}







async function category() {
  let response = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
  response = await response.json()
  displayCategory(response.categories)
  openTap()
  search.innerHTML=""
}


function displayCategory(arr) {
  let cartona = ``
  for (let i = 0; i < arr.length; i++) {
    cartona += ` <div onclick=getCategory("${arr[i].strCategory}") class="col-md-3 pt-4 ">
       <div  class="meal position-relative">
         <img src="${arr[i].strCategoryThumb}" class="rounded-3" alt="">
         <div class="layer-meal position-absolute ">
             <h2 class="text-center p-2 pb-0">${arr[i].strCategory}</h2>
             <p class="text-black p-2 text-center">${arr[i].strCategoryDescription.split(" ").slice(0, 20).join(" ")}</p>
         </div>
       </div>
     </div>`
    rowData.innerHTML = cartona;
   
  }
}





async function area() {
  let response = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list")
  response = await response.json()
  displayArea(response.meals)
  search.innerHTML=""
}

function displayArea(arr) {
  let cartona = ''
  for (i = 0; i < arr.length; i++) {
    cartona += `<div onclick=getArea("${arr[i].strArea}") class="col-md-3  pt-4 d-flex flex-column">
  <i class="fa-solid fa-house-laptop text-white text-center icon-house"></i>
  <h2 class=" text-white text-center">${arr[i].strArea}</h2>
</div> `
  }
  rowData.innerHTML = cartona
  openTap();
}




async function ingredients() {
  let response = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list")
  response = await response.json()
  displayIngredients(response.meals.slice(0, 20))
  search.innerHTML=""
}

function displayIngredients(arr) {
  let cartona = ''
  // console.log(arr.length)
  for (i = 0; i < arr.length; i++) {

    if (arr[i].strDescription != null) {
      cartona += `<div onclick=getIngredients("${arr[i].strIngredient}") class="col-md-3 mt-5 pt-4 d-flex flex-column ">
      <i class="fa-solid fa-drumstick-bite text-white text-center fa-4x mb-2"></i>
      <h2 class=" text-white text-center">${arr[i].strIngredient}</h2>
      <p class=" text-center text-white">${arr[i].strDescription.split(" ").slice(0, 20).join(" ")}</p>

    </div>`
    }

  }
  rowData.innerHTML = cartona
  openTap();
}


async function getCategory(term) {
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${term}`)
  response = await response.json()
  displayGetCategory(response.meals)
}
function displayGetCategory(arr) {
  let cartona = ''
  for (let i = 0; i < arr.length; i++) {
    cartona += `<div class="col-md-3  pt-4 ">
    <div onclick=ingredientsDescription("${arr[i].idMeal}") class=" meal position-relative">
      <img src="${arr[i].strMealThumb}" alt="">
      <div class="layer-meal position-absolute d-flex justify-content-start align-items-center">
          <h3 class=" text-black">${arr[i].strMeal}</h3>
      </div>
    </div>
  </div>`
  }
  rowData.innerHTML = cartona;
}


async function getArea(term) {
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${term}`)
  response = await response.json()
  displayGetCategory(response.meals)
}
function displayGetArea(arr) {
  let cartona = ''
  for (let i = 0; i < arr.length; i++) {
    cartona += `<div class="col-md-3  pt-4 ">
    <div onclick=ingredientsDescription("${arr[i].idMeal}") class=" meal position-relative">
      <img src="${arr[i].strMealThumb}" alt="">
      <div class="layer-meal position-absolute d-flex justify-content-start align-items-center">
          <h3 class=" text-black">${arr[i].strMeal}</h3>
      </div>
    </div>
  </div>`
  }
  rowData.innerHTML = cartona;
}








async function getIngredients(term) {

  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${term}`)
  response = await response.json()
  displayGetIngredients(response.meals)

}
function displayGetIngredients(arr) {
  let cartona = ''

  for (let i = 0; i < arr.length; i++) {
    cartona += `<div onclick=ingredientsDescription("${arr[i].idMeal}") class="col-md-3  pt-4 ">
    <div  class="meal position-relative">
      <img  src="${arr[i].strMealThumb}" alt="">
      <h2>1</h2>
      <div class="layer-meal position-absolute d-flex justify-content-start align-items-center">
          <h3 class=" text-black">${arr[i].strMeal}</h3>
      </div>
    </div>
  </div>`
  }
  rowData.innerHTML = cartona;
}



async function ingredientsDescription(term) {
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${term}`)
  response = await response.json()
  // console.log(response)
  // console.log(response.meals)
  // console.log(response.meals[0])
  displayGetIngredientsDetails(response.meals[0])
}

function displayGetIngredientsDetails(arr) {
  let Recipies = ""
  for (let i = 1; i <= 20; i++) {
    // console.log(arr[`strIngredient${i}`])
    if (arr[`strIngredient${i}`]) {
      Recipies += ` <li class=" border-2 rounded-2 d-inline-block p-1 m-2 mb-1 mb-1 fs-6">${arr[`strMeasure${i}`]} ${arr[`strIngredient${i}`]}</li>`
    }
  }
  let tags =arr.strTags?.split(",")
  if(!tags) tags=[]
  let tagsStr = ''
  for (let i = 0; i < tags.length; i++) {
    tagsStr += `<li class="alert alert-danger m-2 p-1 d-inline-block">${tags[i]}</li>`
  }
  console.log(tagsStr)
  let cartona = ""

    cartona +=
      `<div class=" col-md-4 my-4 ">
    <img src="${arr.strMealThumb}" alt="">

    <h3 class="text-white my-2 text-center">${arr.strMeal}</h3>
    </div>
    <div class="col-md-8 text-white my-4 IngredientsMeal">
      <h2>Instructions</h2>
<p>${arr.strInstructions}</p>
<h4>Area : ${arr.strArea}</h4>
<h4>Category : ${arr.strCategory}</h4>
<h3>Recipies : </h3> 
<ul>${Recipies}</ul>
<h3> Tags: </h3>
<ul>${tagsStr}</ul>
<a href="${arr.strSource}" target="_blank" class="btn btn-source  text-white">Source </a>
<a  href= "${arr.strYoutube}" target="_blank" class="btn  bg-danger text-white"> Youtube </a>
  </div>`
  
  rowData.innerHTML =cartona;
}



function displaySearch(){
  let inputSearch =""
  inputSearch+=`<div class=" container w-75">
  <div class="row g-5  my-3">
      <div class="col-md-6">
          <input onkeyup=searchByName(this.value) class="  text-white form-control bg-transparent" placeholder="Search By Name" type="text">
      </div>
      <div class="col-md-6">
          <input onkeyup=searchByFirstLetter(this.value) class=" text-white form-control bg-transparent" placeholder="Search By First Letter" type="text">
      </div>
  </div>
</div>`
  search.innerHTML=inputSearch;
  rowData.innerHTML=''
  openTap()
}

async function searchByName(term){
 let response= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
response =await response.json();
// console.log(response.meals[0])
console.log(term)
response.meals ? displayMealsUsesSearchByName(response.meals):  displayMealsUsesSearchByName([])
}

function displayMealsUsesSearchByName(arr){
  //  let meals=[]
  //  meals.push(arr)
let cartona=""
for(let i=0;i<arr.length;i++){
  cartona+=`<div onclick=ingredientsDescription("${arr[i].idMeal}") class="col-md-3  pt-4 ">
  <div class="meal position-relative">
    <img src="${arr[i].strMealThumb}" alt="">
    <div class="layer-meal position-absolute d-flex justify-content-start align-items-center">
        <h3 class=" text-black">${arr[i].strMeal}</h3>
    </div>
  </div>
</div>`
}
rowData.innerHTML=cartona;
}




async function searchByFirstLetter(term){
 let response= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`)
response =await response.json();
// console.log(response.meals[0])
console.log(term)
response.meals ? displayMealsUsesSearchByfl(response.meals) :displayMealsUsesSearchByfl([])
}

function displayMealsUsesSearchByfl(arr){
let cartona=""
for(let i=0;i<arr.length;i++){
  cartona+=`<div onclick=ingredientsDescription("${arr[i].idMeal}") class="col-md-3 pt-4 ">
  <div class="meal position-relative">
    <img src="${arr[i].strMealThumb}" alt="">
    <div class="layer-meal position-absolute d-flex justify-content-start align-items-center">
        <h3 class=" text-black">${arr[i].strMeal}</h3>
    </div>
  </div>
</div>`
}
rowData.innerHTML=cartona;
}


function displayContactUsBage(){
  rowData.innerHTML=`
  <section class="contactUs ">
  <div class="container w-50 d-flex vh-100 justify-content-center align-items-center">
      <form action="">
          <h2 class=" text-white text-center mb-5">Contact Us....</h2>
              <div class="row  ">
                  <div class="col-md-6 py-3 position-relative ">
                      <input onkeyup=yourName() type="text" placeholder=" Enter Your Name" class="form-control bg-transparent" id="inputName">
                      <h3 class=" d-none fs-6 mt-2 bg-danger bg-opacity-50 position-absolute w-75 m-auto p-2 text-center end-0 start-0" id="nameValidation">name not valid</h3>
                  </div>
                  <div class="col-md-6 py-3  position-relative ">
                      <input onkeyup=yourEmail() type="text" placeholder=" Enter Your Email" class="form-control bg-transparent" id="inputEmail">
                      <h3 class=" d-none fs-6 mt-2 bg-danger bg-opacity-50 position-absolute w-75 m-auto p-2 text-center end-0 start-0" id="email">Email not valid *exemple@yyy.zzz</h3>
                  </div>
                  <div class="col-md-6 py-3 ">
                      <input type="text" placeholder=" Enter Your Phone" class="form-control bg-transparent">
                  </div>
                  <div class="col-md-6 py-3 ">
                      <input type="text" placeholder=" Enter Your Age" class="form-control bg-transparent">
                  </div>
                  <div class="col-md-6 py-3 ">
                      <input type="text" placeholder=" Enter Your Password" class="form-control bg-transparent">
                  </div>
                  <div class="col-md-6 py-3 ">
                      <input type="text" placeholder=" Repassword" class="form-control bg-transparent">
                  </div>
              </div>
           <div class=" text-center my-3">
              <button class=" disabled btn btn-outline-info text-center"> Submit</button>
           </div>
      </form>
  
      
  </div>
  </section>`
  openTap();
}


let inputName=document.getElementById("inputName")
let email=document.getElementById("email")
let nameValidation=document.getElementById("nameValidation")
let inputEmail=document.getElementById("inputEmail")
function yourName(){
let regulerExpForName = /^[a-zA-Z ]+$/
if(regulerExpForName.test(inputName.value)){
 console.log()
  // email.innerHTML="success"
// }
// else{
//   return false
// }
// }
// if(yourName==true){
//   nameValidation.innerHTML="success"
// }
// else{
//   nameValidation.innerHTML="failed"
}
}