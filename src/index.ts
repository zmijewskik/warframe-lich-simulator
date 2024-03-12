document
  .getElementById('btn-generate-lich')
  ?.addEventListener('click', generateSignSequence);
document
  .getElementById('btn-generate-lich')
  ?.addEventListener('click', showLichSpawnedPopup);
document
  .getElementById('btn-check-combination')
  ?.addEventListener('click', checkCombination);

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
];
const lichSignNames: string[] = allSignNames.slice(0, -1);

populateSelectableSigns();

const buttons = document.querySelectorAll<HTMLButtonElement>(
  '.btn-sign-visibility',
);

const userSignsInParazon =
  document.querySelectorAll<HTMLDivElement>('.empty-box');

buttons.forEach((button) => {
  button.addEventListener('click', function () {
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
  resetParazonSelection();

  const signs = document.querySelectorAll('.image');
  signs.forEach((image, index) => {
    const imageElement = image as HTMLElement;
    const signNameElement = document.getElementById(
      `signName${index + 1}`,
    ) as HTMLElement;

    imageElement.style.backgroundImage = `url('img/requiem-icons/${
      shuffledSequence[index] + 'RequiemIcon.webp'
    }')`;
    signNameElement.textContent = shuffledSequence[index];
  });

  sessionStorage.setItem('matchingSequence', JSON.stringify(matchingSequence));
}

function checkCombination() {
  const userSignNames = getUserSignNames();
  const generatedSignNames = getMatchingSequence();

  if (arraysEqual(userSignNames, generatedSignNames)) {
    showCheckCombinationPopup(true);
    resetSignContainer();
    resetParazonSelection();
  } else {
    showCheckCombinationPopup(false);
  }
}

function getUserSignNames(): string[] {
  const signContainer1 = document.getElementById('sign1') as HTMLDivElement;
  const signContainer2 = document.getElementById('sign2') as HTMLDivElement;
  const signContainer3 = document.getElementById('sign3') as HTMLDivElement;

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
  return (
    arr1.length === arr2.length &&
    arr1.every((value, index) => value === arr2[index] || value === 'Oull')
  );
}

// selecting signs for Parazon

let selectedBox: HTMLDivElement | null = null;

function selectBox(box: HTMLDivElement) {
  if (selectedBox !== null) {
    selectedBox.classList.remove('selected');
  }

  selectedBox = box;

  if (!checkForDuplicates(box) || selectedBox.classList.contains('empty-box')) {
    addDestinationListeners();
    selectedBox.classList.add('selected');

    const emptyBoxes = document.querySelectorAll('.empty-box');
    emptyBoxes.forEach((emptyBox) =>
      emptyBox.classList.add('highlight-animation'),
    );
  } else {
    // console.log('Duplicate!');
    selectedBox = null;
  }
}

function clickHandler(this: HTMLDivElement) {
  selectBox(this);
}

function addSelectionToContainers() {
  const signContainers = document.querySelectorAll('.user-sign-container');
  signContainers.forEach((container) =>
    container.addEventListener('click', clickHandler),
  );
  const emptyBoxContainers = document.querySelectorAll(
    '.empty-box:not(.user-sign-container)',
  );
  emptyBoxContainers.forEach((container) =>
    container.removeEventListener('click', clickHandler),
  );
}
addSelectionToContainers();

function removeSelectionFromEmptyBoxes() {
  const emptyBoxContainers = document.querySelectorAll('.empty-box');
  emptyBoxContainers.forEach((container) =>
    container.removeEventListener('click', clickHandler),
  );
}

function removeHiglights() {
  const emptyBoxes = document.querySelectorAll('.empty-box');
  emptyBoxes.forEach((emptyBox) =>
    emptyBox.classList.remove('highlight-animation'),
  );
}

function selectDestination(emptyBox: HTMLDivElement) {
  if (selectedBox !== null) {
    let selectedBoxContent = selectedBox.innerHTML;
    emptyBox.classList.remove('selected');
    let emptyBoxContent = emptyBox.innerHTML;
    emptyBox.innerHTML = selectedBoxContent;

    if (selectedBox.classList.contains('empty-box')) {
      selectedBox.innerHTML = emptyBoxContent;
      if (!emptyBox.classList.contains('user-sign-container')) {
        selectedBox.classList.remove('user-sign-container');
      }
    }

    if (!emptyBox.classList.contains('user-sign-container')) {
      emptyBox.classList.add('user-sign-container');
    }

    removeSelectionFromEmptyBoxes();
    addSelectionToContainers();
    removeHiglights();

    selectedBox.classList.remove('selected');
    selectedBox = null;
    return;
  }
}

function destinationHandler(this: HTMLDivElement) {
  selectDestination(this);
}

function addDestinationListeners() {
  const emptyContainers = document.querySelectorAll('.empty-box');
  emptyContainers.forEach((container) =>
    container.addEventListener('click', destinationHandler),
  );
}

function removeDestinationListeners() {
  const emptyContainers = document.querySelectorAll('.empty-box');
  emptyContainers.forEach((container) =>
    container.removeEventListener('click', destinationHandler),
  );
}

document.body.addEventListener('click', (event) => {
  const target = event.target as HTMLElement;
  if (target.classList.contains('container')) {
    if (selectedBox !== null) {
      selectedBox.classList.remove('selected');
      const emptyBoxes = document.querySelectorAll('.empty-box');
      emptyBoxes.forEach((emptyBox) =>
        emptyBox.classList.remove('highlight-animation'),
      );
      selectedBox = null;
    }
  }
});

function checkForDuplicates(box: HTMLDivElement): boolean {
  if (selectedBox !== null) {
    const userSignNames = getUserSignNames();
    const signName1 = selectedBox.innerText.trim();

    if (userSignNames.includes(signName1)) {
      return true;
    }
  }
  return false;
}

// reset functions

function resetSignContainer() {
  buttons.forEach((button) => {
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

function resetParazonSelection() {
  userSignsInParazon.forEach((signBox) => {
    if (signBox) {
      signBox.style.backgroundImage = '';
      signBox.textContent = '';
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

// popups

let wasLichSpawned: boolean = false;

function showLichSpawnedPopup() {
  let message = document.getElementById('msg-lich-spawned') as HTMLDivElement;
  if (message) {
    message.style.display = 'block';
    message.style.opacity = '1';

    if (wasLichSpawned == true) {
      message.innerText = 'New lich arrived!';
    } else {
      message.innerText = 'Lich spawned!';
    }

    wasLichSpawned = true;

    setTimeout(function () {
      message.style.opacity = '0';
    }, 1000);

    setTimeout(function () {
      message.style.display = 'none';
    }, 1333);
  }
}

function showCheckCombinationPopup(isTrue: boolean) {
  let message = document.getElementById(
    'msg-combination-check',
  ) as HTMLDivElement;
  if (message) {
    message.style.display = 'block';
    message.style.opacity = '1';

    if (isTrue == true) {
      message.innerText = 'Good combination!';
    } else {
      message.innerText = 'Wrong combination. Try again!';
    }

    setTimeout(function () {
      message.style.opacity = '0';
    }, 1000);

    setTimeout(function () {
      message.style.display = 'none';
    }, 1333);
  }
}
