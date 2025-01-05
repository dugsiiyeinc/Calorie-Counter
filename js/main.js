// star digranations
const calorieCounter = document.getElementById("calorie-counter");
const budgetNumberInput = document.getElementById("budget");
const entryDropdown = document.getElementById("entry-dropdown");
const addEntryButton = document.getElementById("add-entry");
const clearButton = document.getElementById("clear");
const output = document.getElementById("output");
const loginButton = document.getElementById("login-button");
const registerButton = document.getElementById("register-button");
const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");
const authForms = document.getElementById("auth-forms");
let isError = false;
// End digranations

function cleanInputString(str) {
  const regex = /[+-\s]/g;
  return str.replace(regex, "");
}

function isInvalidInput(str) {
  const regex = /\d+e\d+/i;
  return str.match(regex);
}
// *: STAR waa function ka soo saaraya halka lagalinaayo xogta cuntada iyo xadiga colriega

function addEntry() {
  const targetInputContainer = document.querySelector(
    `#${entryDropdown.value} .input-container`
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
}
// *: END waa function ka soo saaraya halka lagalinaayo xogta cuntada iyo xadiga colriega

//* START waa function ka xisaabinaaya waxa lagaliyo inpustka oo dhan
function calculateCalories(e) {
  e.preventDefault();
  isError = false;

  const breakfastNumberInputs = document.querySelectorAll(
    "#breakfast input[type=number]"
  );
  const lunchNumberInputs = document.querySelectorAll(
    "#lunch input[type=number]"
  );
  const dinnerNumberInputs = document.querySelectorAll(
    "#dinner input[type=number]"
  );
  const snacksNumberInputs = document.querySelectorAll(
    "#snacks input[type=number]"
  );
  const exerciseNumberInputs = document.querySelectorAll(
    "#exercise input[type=number]"
  );

  const breakfastCalories = getCaloriesFromInputs(breakfastNumberInputs);
  const lunchCalories = getCaloriesFromInputs(lunchNumberInputs);
  const dinnerCalories = getCaloriesFromInputs(dinnerNumberInputs);
  const snacksCalories = getCaloriesFromInputs(snacksNumberInputs);
  const exerciseCalories = getCaloriesFromInputs(exerciseNumberInputs);
  const budgetCalories = getCaloriesFromInputs([budgetNumberInput]);

  if (isError) {
    return;
  }

  const consumedCalories =
    breakfastCalories + lunchCalories + dinnerCalories + snacksCalories;
  const remainingCalories =
    budgetCalories - consumedCalories + exerciseCalories;
  const surplusOrDeficit = remainingCalories < 0 ? "Surplus" : "Deficit";
  output.innerHTML = `
  <span class="${surplusOrDeficit.toLowerCase()}">${Math.abs(
    remainingCalories
  )} Calorie ${surplusOrDeficit}</span>
  <hr>
  <p>${budgetCalories} Calories Budgeted</p>
  <p>${consumedCalories} Calories Consumed</p>
  <p>${exerciseCalories} Calories Burned</p>
  `;

  output.classList.remove("hide");
}
//* End waa function ka xisaabinaaya waxa lagaliyo inpustka oo dhan

// * START waa function ka kasoo qadaya waxa lasoo galiyo inputes ka
function getCaloriesFromInputs(list) {
  let calories = 0;

  for (const item of list) {
    const currVal = cleanInputString(item.value);
    const invalidInputMatch = isInvalidInput(currVal);

    if (invalidInputMatch) {
      alert(`Invalid Input: ${invalidInputMatch[0]}`);
      isError = true;
      return null;
    }
    calories += Number(currVal);
  }
  return calories;
}
// * End waa function ka kasoo qadaya waxa lasoo galiyo inputes ka
//* START waa functon ka masxaaya oo ku ogalnaya in aad makale isticmaasho
function clearForm() {
  const inputContainers = Array.from(
    document.querySelectorAll(".input-container")
  );

  for (const container of inputContainers) {
    container.innerHTML = "";
  }

  budgetNumberInput.value = "";
  output.innerText = "";
  output.classList.add("hide");
}
//* START waa functon ka masxaaya oo ku ogalnaya in aad makale isticmaasho

// * START waa function ka handle gareenaya login iyo register
function handleLogin() {
  // Implement login logic here
  alert("Logged in successfully!");
  authForms.classList.add("hide");
  calorieCounter.classList.remove("hide");
}

function handleRegister() {
  // Implement registration logic here
  alert("Registered successfully!");
  authForms.classList.add("hide");
  calorieCounter.classList.remove("hide");
}
// * END waa function ka handle gareenaya login iyo register

// * call function section
addEntryButton.addEventListener("click", addEntry);
calorieCounter.addEventListener("submit", calculateCalories);
clearButton.addEventListener("click", clearForm);
loginButton.addEventListener("click", handleLogin);
registerButton.addEventListener("click", handleRegister);
