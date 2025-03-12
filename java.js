const budgetInput = document.getElementById("budgetCalories");
//untuk mengambil value dari select
const entryDropdown = document.getElementById("entry-dropdown");
const addEntryButton = document.getElementById("add-entry-btn");
let isError=false;
function isValid(str) {
  const regex = /\d+e\d+/i;
  return str.match(regex);
}

function clearInput(str){
  const regex=/[+-\s]/;
  return str.replace(regex, '');
}

function addEntry() {
  const targetId = "#" + entryDropdown.value;

  const targetInputContainer = document.querySelector(
    `${targetId} #input-container`
  );
  const entryNumber =
    targetInputContainer.querySelectorAll('input[type="text"]').length+1;

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
  targetInputContainer.insertAdjacentHTML("beforeend",HTMLString);
//   targetInputContainer.innerHTML="makan";
}

function getCalorieFromInput(list){
  let calorie=0;
  for(const item of list ){
    
    const clearString=clearInput(item.value);
    const validOra=isValid(clearString);
    if(clearString){
      alert(`Invalid input:${clearString[0]}`);
      isError=true;
      return null;
    } 

    calorie+=Number(clearString);

  }
  return calorie;
}

function calculateCalories(e){
  e.preventDefault();
  isError=false;

  


}

addEntryButton.onclick = addEntry;

