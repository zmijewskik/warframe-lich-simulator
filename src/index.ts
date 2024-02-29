document.getElementById('btn-generate-lich')?.addEventListener('click', generateImages);

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