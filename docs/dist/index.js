document.getElementById("btn-generate-lich")?.addEventListener("click", generateImages);
document.getElementById("btn-check-combination")?.addEventListener("click", checkCombination);
const allSignNames = [
  "Fass",
  "Jahu",
  "Khra",
  "Lohk",
  "Netra",
  "Ris",
  "Vome",
  "Xata"
];
function populateDropdownOptions(selectId, allSignNames2) {
  const selectElement = document.getElementById(selectId);
  allSignNames2.forEach((imageName, index) => {
    const option = document.createElement("option");
    option.value = imageName;
    option.text = `${imageName}`;
    selectElement.add(option);
  });
}
populateDropdownOptions("number1", allSignNames);
populateDropdownOptions("number2", allSignNames);
populateDropdownOptions("number3", allSignNames);
function shuffleArray(array) {
  const shuffledArray = array.slice();
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}
function generateImages() {
  const images = document.querySelectorAll(".image");
  const signNames = [
    "Fass",
    "Jahu",
    "Khra",
    "Lohk",
    "Netra",
    "Ris",
    "Vome",
    "Xata"
  ];
  const shuffledSignNames = shuffleArray(signNames).slice(0, 3);
  images.forEach((image, index) => {
    const imageElement = image;
    const signNameElement = document.getElementById(`signName${index + 1}`);
    imageElement.style.backgroundImage = `url('img/requiem-icons/${shuffledSignNames[index] + "RequiemIcon.webp"}')`;
    signNameElement.textContent = shuffledSignNames[index];
  });
}
function checkCombination() {
  const userSignNames = getUserSignNames();
  const generatedSignNames = getGeneratedSignNames();
  if (arraysEqual(userSignNames, generatedSignNames)) {
    alert("Congratulations! Your combination matches!");
  } else {
    alert("Oops! Your combination does not match. Try again!");
  }
}
function resetUserInputFields() {
  const userInputForm = document.getElementById("user-combination-form");
  userInputForm.reset();
}
function getUserSignNames() {
  const signName1 = document.getElementById("number1").value;
  const signName2 = document.getElementById("number2").value;
  const signName3 = document.getElementById("number3").value;
  return [signName1, signName2, signName3];
}
function getGeneratedSignNames() {
  const images = document.querySelectorAll(".image");
  const generatedSignNames = [];
  images.forEach((image) => {
    const signNameElement = document.getElementById(`signName${generatedSignNames.length + 1}`);
    generatedSignNames.push(signNameElement.textContent || "");
  });
  return generatedSignNames;
}
function arraysEqual(arr1, arr2) {
  return arr1.length === arr2.length && arr1.every((value, index) => value === arr2[index]);
}
