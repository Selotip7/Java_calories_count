const genderInput = document.getElementById("gender");
const bodyWeight = document.getElementById("bodyWeight");
const height = document.getElementById("height");
const age = document.getElementById("age");
//untuk mengambil value dari select
const entryDropdown = document.getElementById("entry-dropdown");
const addEntryButton = document.getElementById("add-entry-btn");
const output = document.getElementById("output");
const submit = document.getElementById("sub");
let bmr = 0;
let isError = false;
function isValid(str) {
  const regex = /\d+e\d+/i;
  return str.match(regex);
}

function clearInput(str) {
  const regex = /[+-\s]/;
  return str.replace(regex, "");
}

function addEntry() {
  const targetId = "#" + entryDropdown.value;

  const targetInputContainer = document.querySelector(
    `${targetId} #input-container`
  );
  const entryNumber =
    targetInputContainer.querySelectorAll('input[type="text"]').length + 1;

  const HTMLString = `
  <label for="${entryDropdown.value}-${entryNumber}-name">Entry ${entryNumber} Name</label>
  <input type="text" id="${entryDropdown.value}-${entryNumber}-name" placeholder="Name" />
  <label for="${entryDropdown.value}-${entryNumber}-calories">Entry ${entryNumber} Calories</label>
  <input
    type="number"
    min="0"
    id="${entryDropdown.value}-${entryNumber}-calories"
    placeholder="Calories"
  />`;
  targetInputContainer.insertAdjacentHTML("beforeend", HTMLString);
  //   targetInputContainer.innerHTML="makan";
}

function getCalorieFromInput(list) {
  let calorie = 0;
  for (const item of list) {
    const clearString = clearInput(item.value);
    const validOra = isValid(clearString);
    if (validOra) {
      alert(`Invalid input:${clearString[0]}`);
      isError = true;
      return null;
    }

    calorie += Number(clearString);
  }
  return calorie;
}

function calculateCalories(e) {
  e.preventDefault();
  isError = false;

  // const breakfastCalories = document.querySelectorAll("#Breakfast input[type='number']");

  const breakfastCaloriesFinal = getCalorieFromInput(
    document.querySelectorAll("#Breakfast input[type='number']")
  );
  const dinnerCalories = getCalorieFromInput(
    document.querySelectorAll("#Dinner input[type='number']")
  );
  const lunchCalories = getCalorieFromInput(
    document.querySelectorAll('#Lunch input[type="number"]')
  );
  const snacksCalories = getCalorieFromInput(
    document.querySelectorAll('#Snacks input[type="number"]')
  );
  const exerciseCalories = getCalorieFromInput(
    document.querySelectorAll('#Exercise input[type="number"]')
  );
  if(bodyWeight.value==="" || height.value==="" || age.value==="")
    {
      output.classList.remove("hide");

const o = document.getElementById("o");

      output.innerHTML = "<p>You must to input your anything</p>";
      bmr=7;
      return;
    } else  if (genderInput.value == "Male") {
      bmr =Math.floor( 88.362 + (13.397 * bodyWeight.value ) + (4.799 * height.value) - (5.677 * age.value));
     output.classList.remove("hide");
    } else {
      window.alert("Female");
    }

  const consumedCalorie =
    breakfastCaloriesFinal + dinnerCalories + lunchCalories + snacksCalories;
   const total=consumedCalorie-exerciseCalories; 

   let suprlusDeficit="";
   if(total<bmr){
      suprlusDeficit = "You must Surplus your calories";
   }else if(total==Math.floor(bmr*1.2)){
         suprlusDeficit = "You reach your daily calories";
   }else{
     suprlusDeficit = "You must deficit your calories";
   }

  const outHTML = ` 
  <p>Your daily calories are ${Math
    .floor(bmr * 1.2)} </p>
  <hr></hr>
  <p> Calories Burned = ${exerciseCalories}</p>
  <p> Calories Consumed = ${consumedCalorie}</p>
  <p>Total calories today = ${total}</p>
  <p>${suprlusDeficit} </p>
  `;
  output.innerHTML = outHTML;
}

addEntryButton.onclick = addEntry;
submit.addEventListener("click", calculateCalories);
