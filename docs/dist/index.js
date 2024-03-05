document.getElementById("btn-generate-lich")?.addEventListener("click", generateSignSequence);
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
populateDropdownOptions("sign1", allSignNames);
populateDropdownOptions("sign2", allSignNames);
populateDropdownOptions("sign3", allSignNames);
const buttons = document.querySelectorAll(".btn-sign-visibility");
buttons.forEach((button) => {
  button.addEventListener("click", function() {
    const targetId = this.dataset.target;
    if (targetId) {
      const container = document.getElementById(targetId);
      if (container) {
        if (container.style.display === "flex") {
          container.style.display = "none";
          this.innerText = "Show";
        } else {
          container.style.display = "flex";
          this.innerText = "Hide";
        }
      }
    }
  });
});
function shuffleArray(array) {
  const shuffledArray = array.slice();
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}
function resetSignContainer() {
  buttons.forEach((button) => {
    const targetId = button.dataset.target;
    if (targetId) {
      const container = document.getElementById(targetId);
      if (container) {
        container.style.display = "none";
        button.innerText = "Show";
      }
    }
  });
}
function generateSignSequence() {
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
  const matchingSequence = shuffleArray(signNames).slice(0, 3);
  const shuffledSequence = shuffleArray(matchingSequence);
  resetSignContainer();
  resetUserInputFields();
  const signs = document.querySelectorAll(".image");
  signs.forEach((image, index) => {
    const imageElement = image;
    const signNameElement = document.getElementById(`signName${index + 1}`);
    imageElement.style.backgroundImage = `url('img/requiem-icons/${shuffledSequence[index] + "RequiemIcon.webp"}')`;
    signNameElement.textContent = shuffledSequence[index];
  });
  sessionStorage.setItem("matchingSequence", JSON.stringify(matchingSequence));
}
function checkCombination() {
  const userSignNames = getUserSignNames();
  const generatedSignNames = getMatchingSequence();
  if (arraysEqual(userSignNames, generatedSignNames)) {
    alert("Congratulations! Your combination matches!");
  } else {
    alert("Oops! Your combination does not match. Try again!");
  }
}
function getUserSignNames() {
  const signName1 = document.getElementById("sign1").value;
  const signName2 = document.getElementById("sign2").value;
  const signName3 = document.getElementById("sign3").value;
  return [signName1, signName2, signName3];
}
function getMatchingSequence() {
  const matchingSequenceJSON = sessionStorage.getItem("matchingSequence");
  if (matchingSequenceJSON) {
    return JSON.parse(matchingSequenceJSON);
  }
  return [];
}
function arraysEqual(arr1, arr2) {
  return arr1.length === arr2.length && arr1.every((value, index) => value === arr2[index]);
}
function resetUserInputFields() {
  const userInputForm = document.getElementById("user-combination-form");
  userInputForm.reset();
}
