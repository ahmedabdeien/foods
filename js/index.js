

let linkSearch = document.getElementById("linkSearch"),
    linkCategories = document.getElementById("linkCategories"),
    linkArea = document.getElementById("linkArea"),
    linkIngredients = document.getElementById("linkIngredients"),
    linkContactUs = document.getElementById("linkContactUs");
let rowBody = document.getElementById("rowBodyData")
// sectoin loading screen => ### The beginning of the loading screen ###
$(window).on('load',function(){
    searchByName("").then(()=>{
          $(".spinner").fadeOut(1000, function(){
        $("body").css("overflow","auto");
        
        
    })  
    })

});
// nav menu => ### The beginning of the nav menu ###
$(".menu-icon").click(function (){
    $(".nav-filll").animate({left:"0px"},500);
    $(".menu-icon").addClass("d-none").animate({opacity:"0"},100);
    $(".close-icon").toggleClass("d-none","d-block").animate({opacity:"1"},100);
    for ( let i = 0; i < 5 ; i++ ){
        $(".nav-ul li").eq(i).animate({top: 0 }, (i + 5) * 100);
    }
});

$(".close-icon").click(function (e){
    $(".nav-filll").animate({left:"-240px"},500).e
    $(".close-icon").toggleClass("d-none").animate({opacity:"0"},100);
    $(".menu-icon").removeClass("d-none").animate({opacity:"1"},100);
    $(".nav-ul li").animate({top: 300}, 500)
});
// ====================| Home |=====================
// sectoin one => ### The beginning of the Home ###
function displayMeals(e){
    let box =``;
    for(let i=0; i<e.length; i++){
    box +=`
      <div class="col-lg-3 col-md-6 col-sm-12">
      <div onclick="getMealDetails('${e[i].idMeal}')" class="card card-Parent overflow-hidden position-relative">
      <img src="${e[i].strMealThumb}" alt="">
      <div class="card-child">
      <h4 class="toad">${e[i].strMeal}</h4>
      </div>
    </div>
    </div>`
    }
    
    document.getElementById("rowBodyData").innerHTML = box
}

// =======================| Categories |========================
// sectoin Categories => ### The beginning of the Categories ###
async function getCategories(){
    rowBody.innerHTML = ""
    $(".spinner-data").fadeIn(300)
    let apiCategories = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    apiCategories = await apiCategories.json();
    displayCategories(apiCategories.categories)
    $(".spinner-data").fadeOut(300)
}
linkCategories.addEventListener("click",()=>{
    getCategories()
    $(".nav-filll").animate({left:"-240px"},400);
      $(".close-icon").toggleClass("d-none").animate({opacity:"0"},100);
      $(".menu-icon").removeClass("d-none").animate({opacity:"1"},100);
  })
function displayCategories(element){
    let box = ``;
    for(let i =0; i<element.length; i++){
    box +=`
        <div class="col-lg-3  col-md-6 col-sm-12">
        <div onclick="getCategoryMeals('${element[i].strCategory}')" class="card card-Parent overflow-hidden position-relative">
        <img src="${element[i].strCategoryThumb}" alt="">
        <div class="card-child flex-column text-center">
              <h4>${element[i].strCategory}</h4>
              <p>Lorem ipsum dolor sit amet sed. Ipsa aspernatur at vitae aperiam possimus.</p>
        </div>
        </div>
        </div>`
    }
    rowBody.innerHTML = box;
}
async function getCategoryMeals(element) {
    rowBody.innerHTML = ""
    $(".spinner-data").fadeIn(300)
    let apiCategoryMeals = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${element}`)
    apiCategoryMeals = await apiCategoryMeals.json();
    displayMeals(apiCategoryMeals.meals.slice(0, 20))
    $(".spinner-data").fadeOut(300)
}
// =======================| Area |========================
// sectoin Area => ### The beginning of the Area ###
async function getArea(){
    rowBody.innerHTML = ""
    $(".spinner-data").fadeIn(300)
    let apiArea = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    apiArea = await apiArea.json();
    displaySectoinArea(apiArea.meals)
    $(".spinner-data").fadeOut(300)
}
linkArea.addEventListener("click",()=>{
  getArea()
    $(".nav-filll").animate({left:"-240px"},400);
    $(".close-icon").toggleClass("d-none").animate({opacity:"0"},100);
    $(".menu-icon").removeClass("d-none").animate({opacity:"1"},100);
})
function displaySectoinArea(element){
   let box =``;
   for(let i=0; i<element.length; i++){
    box +=`
    <div class="col-lg-3 col-md-6">
         <button onclick="getAreaMeals('${element[i].strArea}')" class="button-btn w-100"><i class="bi bi-globe-asia-australia me-2"></i>${element[i].strArea}</button>
    </div>`
   }
   rowBody.innerHTML = box;
}
async function getAreaMeals(element){
    rowBody.innerHTML = ""
    $(".spinner-data").fadeIn(300)
    let apiArea = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${element}`)
    apiArea = await apiArea.json();
    displayMeals(apiArea.meals.slice(0, 20))
    $(".spinner-data").fadeOut(300)

}
// =======================| Ingredients |========================
// sectoin Area => ### The beginning of the Ingredients ###
async function getIngredients(){
    rowBody.innerHTML = ""
    $(".spinner-data").fadeIn(300)
    
    let apiIngredients = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    apiIngredients = await apiIngredients.json();
    displayIngredients(apiIngredients.meals.slice(0, 20))
    $(".spinner-data").fadeOut(300)
}
linkIngredients.addEventListener("click",()=>{
    getIngredients()
    $(".nav-filll").animate({left:"-240px"},400);
    $(".close-icon").toggleClass("d-none").animate({opacity:"0"},100);
    $(".menu-icon").removeClass("d-none").animate({opacity:"1"},100);
});    

function displayIngredients(element){
   let box=``;
   for (let i = 0; i < element.length; i++) {
    box+=`
    <div class="col-lg-3 col-md-6">
    <div onclick="getIngredientsMeals('${element[i].strIngredient}')" class=" card bg-stone--700 text-white border border-white border-opacity-10 cursor-pointer">
      <div class="bg-danger p-2 py-0 rounded-2"><i class="bi bi-quote fs-3 text-white-50"></i></div>       
      <h4 class="ps-2">${element[i].strIngredient}</h4>
      <p class="ps-2">${element[i].strDescription.split("").slice(0,20).join("")}</p>
    </div>
   </div>`
   }
   rowBody.innerHTML = box;
};
async function getIngredientsMeals(element){
    rowBody.innerHTML = ""
    $(".spinner-data").fadeIn(300)
    let apiIngredients = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${element}`)
    apiIngredients = await apiIngredients.json();
    displayMeals(apiIngredients.meals.slice(0, 20))
    $(".spinner-data").fadeOut(300)
}
// =======================| Details |========================
// sectoin Details => ### The beginning of the Details ###
async function getMealDetails(element){

    rowBody.innerHTML = ""
    $(".spinner-data").fadeIn(300);
    let apiDetails = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${element}`)
    apiDetails = await apiDetails.json();
    displayMealDetails(apiDetails.meals[0]);
    $(".spinner-data").fadeOut(300);
}

function  displayMealDetails(element){
    let ingredients = ``
    for(let i = 1; i <= 20; i++){
        if(element[`strIngredient${i}`]){
        ingredients += `<li class="badge rounded-pill text-bg-info me-1 mb-1">${element[`strMeasure${i}`]} ${element[`strIngredient${i}`]}</li>`   
        }
    }
    let tags = element.strTags?.split(",")
    if (!tags) tags = []
    let tagsStr = ``
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `<li class="badge rounded-pill text-bg-warning me-1 mb-1">${tags[i]}</li>`
    }
    let box =`
    <div class="col-lg-4 col-md-12 sectoin">
    <img src="${element.strMealThumb}" class="img-fluid shadow-sm border" alt="">
    <h3 class="text-white  py-2 px-1 ">${element.strMeal}</h3>
    </div>
    <div class="col-lg-8 col-md-12 text-white">
    <h3>Instructions</h3>
    <p class="fs-6">${element.strInstructions}</p>
    <h4>Area : <span class="text-primary">${element.strArea}</span></h4>
    <h4>Category : <span class="text-primary">${element.strCategory}</span></h4>
    <h4>Recipes :</h4>
    <ol class="p-0">
      ${ingredients}
    </ol>
    <h4>Tags :</h4>
    <ol class="p-0">
      ${tagsStr}
    </ol>
    <a href="${element.strSource}" target="_blank" class=" details-link me-2">Source</a>
    <a href="${element.strYoutube}" target="_blank" class=" details-link">Youtube</a>
    </div>`
    rowBody.innerHTML = box
}
// =======================| search |========================
// sectoin search => ### The beginning of the search ###
let inputSearchOne = document.getElementById("inputSearchOne"),
    inputSearchTwo = document.getElementById("inputSearchTwo"),
    rowBodySearch = document.getElementById("rowBodySearch");

inputSearchOne.addEventListener("keydown",(e)=>{
   e.value
   searchByName(e.target.value)
})
inputSearchTwo.addEventListener("keydown",(e)=>{
    e.value
    searchByFirstLetter(e.target.value)
  })
function showSearchInputs() {
    rowBodySearch = ""
}
async function searchByName(e){
    
    rowBody.innerHTML =``
    $(".spinner-data").fadeIn(300);
    let apiSearc = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${e}`)
    apiSearc = await apiSearc.json();
    apiSearc.meals ? displayMeals(apiSearc.meals) : displayMeals([])
    $(".spinner-data").fadeOut(300);
}
async function searchByFirstLetter (e){
    rowBodySearch = ""
    $(".spinner-data").fadeIn(300);
    e == "" ? e = "a" : "";
    let apiSearc = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${e}`)
    apiSearc = await apiSearc.json();
    apiSearc.meals ? displayMeals(apiSearc.meals) : displayMeals([])
    $(".spinner-data").fadeOut(300);
}
linkSearch.addEventListener("click",()=>{
    $("#sectoinSearch").toggle("d-block");
   
    $(".nav-filll").animate({left:"-240px"},400);
    $(".close-icon").toggleClass("d-none").animate({opacity:"0"},100);
    $(".menu-icon").removeClass("d-none").animate({opacity:"1"},100);

})
document.querySelector(".search-closeIcon").addEventListener("click",()=>{
    $("#sectoinSearch").toggle("d-none")
})

// =======================| Contact Us |========================
// sectoin Contact Us => ### The beginning of the Contact Us ###
const sectionContactUs = document.getElementById("sectionContactUs");
const contactCloseIcon = document.querySelector(".contact-closeIcon");

const inputName = document.getElementById("inputName");
const inputEmail = document.getElementById("inputEmail");
const inputPhone = document.getElementById("inputPhone");
const inputAge = document.getElementById("inputAge");
const inputPassword = document.getElementById("inputPassword");
const inputRePassword = document.getElementById("inputRePassword");

const submitBtn = document.getElementById("button-btnSubmit");

let nameCatch = false;
let emailCatch = false;
let phoneCatch = false;
let ageCatch = false;
let passwordCatch = false;
let RepasswordCatch = false;

function showContactsUs() {
    inputName.addEventListener("focus", () => {
        nameCatch = true;
    });

    inputEmail.addEventListener("focus", () => {
        emailCatch = true;
    });

    inputPhone.addEventListener("focus", () => {
        phoneCatch = true;
    });

    inputAge.addEventListener("focus", () => {
        ageCatch = true;
    });

    inputPassword.addEventListener("focus", () => {
        passwordCatch = true;
    });

    inputRePassword.addEventListener("focus", () => {
        RepasswordCatch = true;
    });
}

function inputsValidation() {
    const isNameValid = nameCatch ? nameValidation() : true;
    const isEmailValid = emailCatch ? emailValidation() : true;
    const isPhoneValid = phoneCatch ? phoneValidation() : true;
    const isAgeValid = ageCatch ? ageValidation() : true;
    const isPasswordValid = passwordCatch ? passwordValidation() : true;
    const isRepasswordValid = RepasswordCatch ? RepasswordValidation() : true;

    document.getElementById("warningName").classList.toggle("d-none", isNameValid);
    document.getElementById("warningEmail").classList.toggle("d-none", isEmailValid);
    document.getElementById("warningPhone").classList.toggle("d-none", isPhoneValid);
    document.getElementById("warningAge").classList.toggle("d-none", isAgeValid);
    document.getElementById("warningPassword").classList.toggle("d-none", isPasswordValid);
    document.getElementById("warningRePassword").classList.toggle("d-none", isRepasswordValid);

    submitBtn.disabled = !(isNameValid && isEmailValid && isPhoneValid && isAgeValid && isPasswordValid && isRepasswordValid);
}

function nameValidation() {
    return /^[a-zA-Z ]+$/.test(inputName.value);
}

function emailValidation() {
    return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(inputEmail.value);
}

function phoneValidation() {
    return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(inputPhone.value);
}

function ageValidation() {
    return /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(inputAge.value);
}

function passwordValidation() {
    return /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(inputPassword.value);
}

function RepasswordValidation() {
    return inputRePassword.value === inputPassword.value;
}

showContactsUs();
inputsValidation();

contactCloseIcon.addEventListener("click", ()=>{
    $("#sectoinContactUs").animate({right:"100%"},500);
    inputName.value="";
    inputEmail.value="";
    inputPassword.value="";
    inputRePassword.value="";
    inputAge.value="";
    inputPhone.value="";
    
    
}) 
linkContactUs.addEventListener("click", ()=>{
    $("#sectoinContactUs").animate({right:"0%"},500);
        $(".nav-filll").animate({left:"-240px"},400);
    $(".close-icon").toggleClass("d-none").animate({opacity:"0"},100);
    $(".menu-icon").removeClass("d-none").animate({opacity:"1"},100);
    

})
