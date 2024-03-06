document.getElementById('btn-generate-lich')?.addEventListener('click', generateSignSequence);
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
  'Oull', 
]
const lichSignNames: string[] = allSignNames.slice(0, -1);

populateSelectableSigns();

const buttons = document.querySelectorAll<HTMLButtonElement>('.btn-sign-visibility');

buttons.forEach(button => {
  button.addEventListener('click', function() {
    const targetId = this.dataset.target;

    if (targetId) {
      const container = document.getElementById(targetId);
      if (container) {
        if (container.style.display === 'flex') {
          container.style.display = 'none';
          this.innerText = 'Show';
        } else {
          container.style.display = 'flex';
          this.innerText = 'Hide';
        }
      }
    }
  });
});

function shuffleArray<T>(array: T[]): T[] {
  const shuffledArray = array.slice();
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

function generateSignSequence() {
  const signNames: string[] = lichSignNames;

  const matchingSequence: string[] = shuffleArray(signNames).slice(0, 3);
  const shuffledSequence: string[] = shuffleArray(matchingSequence);

  resetSignContainer();
  resetUserInputFields();

  const signs = document.querySelectorAll('.image');
  signs.forEach((image, index) => {
    const imageElement = image as HTMLElement;
    const signNameElement = document.getElementById(`signName${index + 1}`) as HTMLElement;

    imageElement.style.backgroundImage = `url('img/requiem-icons/${shuffledSequence[index] + 'RequiemIcon.webp'}')`;
    signNameElement.textContent = shuffledSequence[index];
  });

  sessionStorage.setItem('matchingSequence', JSON.stringify(matchingSequence));
}

function checkCombination() {
  const userSignNames = getUserSignNames();
  const generatedSignNames = getMatchingSequence();

  if(arraysEqual(userSignNames, generatedSignNames)){
    alert("Congratulations! Your combination matches!");
  } else {
    alert("Oops! Your combination does not match. Try again!");
  }
}

function getUserSignNames(): string[] {
  const signContainer1  = (document.getElementById('sign1') as HTMLDivElement);
  const signContainer2 = (document.getElementById('sign2') as HTMLDivElement);
  const signContainer3 = (document.getElementById('sign3') as HTMLDivElement);

  const signName1 = signContainer1.innerText.trim();
  const signName2 = signContainer2.innerText.trim();
  const signName3 = signContainer3.innerText.trim();

  return [signName1, signName2, signName3];
}

function getMatchingSequence(): string[] {
  const matchingSequenceJSON = sessionStorage.getItem('matchingSequence');

  if (matchingSequenceJSON) {
    return JSON.parse(matchingSequenceJSON);
  }

  return [];
}

function arraysEqual(arr1: string[], arr2: string[]): boolean {
  return arr1.length === arr2.length && 
  arr1.every((value, index) => value === arr2[index] || value === 'Oull');
}

// selecting signs for Parazon

let selectedBox: HTMLDivElement | null = null;

function selectBox(box: HTMLDivElement) {
  if (selectedBox !== null) {
      selectedBox.classList.remove('selected');
  }
  selectedBox = box;
  selectedBox.classList.add('selected');

  const emptyBoxes = document.querySelectorAll('.empty-box');
  emptyBoxes.forEach(emptyBox => emptyBox.classList.add('highlight-animation'));
}

const signContainers = document.querySelectorAll('.user-sign-container');
signContainers.forEach(container => container.addEventListener('click', () => selectBox(container as HTMLDivElement)));

function selectDestination(emptyBox: HTMLDivElement) {
  if (selectedBox !== null) {
      emptyBox.classList.remove('selected');

      const selectedBoxContent = selectedBox.innerHTML;

      emptyBox.innerHTML = selectedBoxContent;

      const emptyBoxes = document.querySelectorAll('.empty-box');
      emptyBoxes.forEach(emptyBox => emptyBox.classList.remove('highlight-animation'));

      selectedBox.classList.remove('selected');
      selectedBox = null;
  }
}

const emptyContainers = document.querySelectorAll('.empty-box');
emptyContainers.forEach(container => container.addEventListener('click', () => selectDestination(container as HTMLDivElement)));

document.body.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
    if (target.classList.contains('container')) {
        if (selectedBox !== null) {
            selectedBox.classList.remove('selected');
            const emptyBoxes = document.querySelectorAll('.empty-box');
            emptyBoxes.forEach(emptyBox => emptyBox.classList.remove('highlight-animation'));
            selectedBox = null;
        }
    }
});

// reset functions

function resetUserInputFields() {
  const userInputForm = document.getElementById('user-combination-form') as HTMLFormElement;
  userInputForm.reset();
}

function resetSignContainer() {
  buttons.forEach(button => {
    const targetId = button.dataset.target;

    if (targetId) {
      const container = document.getElementById(targetId);
      if (container) {
        container.style.display = 'none';
        button.innerText = 'Show';
      }
    }
  });
}

// base functions

function populateSelectableSigns() {
  const container = document.getElementById('selectableSignsContainer');

  allSignNames.forEach((signName, index) => {
    const signContainer = document.createElement('div');
    signContainer.classList.add('user-sign-container');
    signContainer.id = `selectable-sign${index + 1}`;

    const imageElement = document.createElement('div');
    imageElement.classList.add('selectable-image');
    imageElement.style.backgroundImage = `url('img/requiem-icons/${signName}RequiemIcon.webp')`;
    imageElement.id = `image${index + 1}`;

    const signNameElement = document.createElement('p');
    signNameElement.classList.add('selectable-sign-name');
    signNameElement.id = `selectableSignName${index + 1}`;
    signNameElement.textContent = signName;

    signContainer.appendChild(imageElement);
    signContainer.appendChild(signNameElement);

    container?.appendChild(signContainer);
  });
}
