document.getElementById('btn-generate-lich')?.addEventListener('click', generateImages);
document.getElementById('btn-check-combination')?.addEventListener('click', checkCombination);

function shuffleArray(array: number[]): number[] {
  const shuffledArray = array.slice();
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

function generateImages() {
  const images = document.querySelectorAll('.image');

  // Generate an array of unique numbers from 1 to 8
  const uniqueNumbers = Array.from({ length: 8 }, (_, index) => index + 1);
  
  // Shuffle the array and pick the first three
  const shuffledNumbers = shuffleArray(uniqueNumbers).slice(0, 3);

  // Update the images with the shuffled numbers
  images.forEach((image, index) => {
    image.textContent = shuffledNumbers[index].toString();
  });
}

function checkCombination() {
  const userNumbers = getUserNumbers();
  const generatedNumbers = getGeneratedNumbers();

  if(arraysEqual(userNumbers, generatedNumbers)){
    alert("Congratulations! Your combination matches the generated one!");
  } else {
    alert("Oops! Your combination does not match the generated one. Try again!");
  }
}

function resetUserInputFields() {
  const userInputForm = document.getElementById('user-combination-form') as HTMLFormElement;
  userInputForm.reset();
}

function getUserNumbers(): number[] {
  const number1 = parseInt((document.getElementById('number1') as HTMLInputElement).value, 10);
  const number2 = parseInt((document.getElementById('number2') as HTMLInputElement).value, 10);
  const number3 = parseInt((document.getElementById('number3') as HTMLInputElement).value, 10);

  return [number1, number2, number3];
}

function getGeneratedNumbers(): number[] {
  const images = document.querySelectorAll('.image');
  const generatedNumbers: number[] = [];

  images.forEach((image) => {
    generatedNumbers.push(parseInt(image.textContent || '0', 10));
  });

  return generatedNumbers;
}

function arraysEqual(arr1: number[], arr2: number[]): boolean {
  return arr1.length === arr2.length && arr1.every((value, index) => value === arr2[index]);
}