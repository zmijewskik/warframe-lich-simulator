document.getElementById('btn-generate-lich')?.addEventListener('click', generateImages);
document.getElementById('btn-check-combination')?.addEventListener('click', checkCombination);

const allSignNames: string[] = [
  'Fass',
  'Jahu',
  'Khra',
  'Lohk',
  'Netra',
  'Ris',
  'Vome',
  'Xata',
  // 'Oull', 
]

function populateDropdownOptions(selectId: string, allSignNames: string[]): void {
  const selectElement = document.getElementById(selectId) as HTMLSelectElement;

  allSignNames.forEach((imageName, index) => {
    const option = document.createElement('option');
    option.value = imageName;
    option.text = `${imageName}`;
    selectElement.add(option);
  });
}

populateDropdownOptions('number1', allSignNames);
populateDropdownOptions('number2', allSignNames);
populateDropdownOptions('number3', allSignNames);

function shuffleArray(array: string[]): string[] {
  const shuffledArray = array.slice();
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

function generateImages() {
  const images = document.querySelectorAll('.image');

  const signNames: string[] = [
    'Fass',
    'Jahu',
    'Khra',
    'Lohk',
    'Netra',
    'Ris',
    'Vome',
    'Xata',
  ]

  const shuffledSignNames: string[] = shuffleArray(signNames).slice(0, 3);

  images.forEach((image, index) => {
    const imageElement = image as HTMLElement;
    const signNameElement = document.getElementById(`signName${index + 1}`) as HTMLElement;

    imageElement.style.backgroundImage = `url('img/requiem-icons/${shuffledSignNames[index] + 'RequiemIcon.webp'}')`;
    signNameElement.textContent = shuffledSignNames[index];
  });
}

function checkCombination() {
  const userSignNames = getUserSignNames();
  const generatedSignNames = getGeneratedSignNames();

  if(arraysEqual(userSignNames, generatedSignNames)){
    alert("Congratulations! Your combination matches!");
  } else {
    alert("Oops! Your combination does not match. Try again!");
  }
}

function resetUserInputFields() {
  const userInputForm = document.getElementById('user-combination-form') as HTMLFormElement;
  userInputForm.reset();
}

function getUserSignNames(): string[] {
  const signName1 = (document.getElementById('number1') as HTMLInputElement).value;
  const signName2 = (document.getElementById('number2') as HTMLInputElement).value;
  const signName3 = (document.getElementById('number3') as HTMLInputElement).value;

  return [signName1, signName2, signName3];
}

function getGeneratedSignNames(): string[] {
  const images = document.querySelectorAll('.image');
  const generatedSignNames: string[] = [];

  images.forEach((image) => {
    const signNameElement = document.getElementById(`signName${generatedSignNames.length + 1}`) as HTMLElement;
    generatedSignNames.push(signNameElement.textContent || '');
  });

  return generatedSignNames;
}

function arraysEqual(arr1: string[], arr2: string[]): boolean {
  return arr1.length === arr2.length && arr1.every((value, index) => value === arr2[index]);
}