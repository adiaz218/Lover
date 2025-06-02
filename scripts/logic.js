// === Book page typewriter letter ===
let letterTyped = false;

function typeWriterLetter() {
  const leftTarget = document.querySelector('.left-page');
  const rightTarget = document.querySelector('.right-page');

  const leftText = `Litzy,\nThese past 6 months with you have been a dream. It feels like it's been longer. I know we've had our up's and down's, but I am glad we were able to get through them together. I am very glad to have you in my life again. Getting to know you more the second time has been a blessing. You are my person, and you are stuck with me forever. I can't wait to build a life and start a family with you. Here's to the many years we have ahead of us. I love you so much baby, happy six months mi amor 💟

With love,
Arlette`;

  const rightText = ``;

  if (letterTyped) {
    // Don't retype — just show the letter
    leftTarget.innerHTML = leftText.replace(/\n/g, '<br>');
    rightTarget.innerHTML = rightText.replace(/\n/g, '<br>');
    return;
    }

  let i = 0;
  let j = 0;

  // Clear previous content
  leftTarget.innerHTML = "";
  rightTarget.innerHTML = "";

  function typeLeft() {
    if (i < leftText.length) {
      // To preserve line breaks, replace \n with <br>
      if (leftText.charAt(i) === '\n') {
        leftTarget.innerHTML += '<br>';
      } else {
        leftTarget.innerHTML += leftText.charAt(i);
      }
      i++;
      setTimeout(typeLeft, 35);
    } else {
      setTimeout(typeRight, 300);
      letterTyped = true;  // Mark that typing finished
    }
  }

  function typeRight() {
    if (j < rightText.length) {
      if (rightText.charAt(j) === '\n') {
        rightTarget.innerHTML += '<br>';
      } else {
        rightTarget.innerHTML += rightText.charAt(j);
      }
      j++;
      setTimeout(typeRight, 35);
    }
  }

  typeLeft();
}

// === Regular typewriter effect for any selector ===
function typeWriterEffect(selector, text, delay = 30) {
  let k = 0;
  $(selector).html(""); // clear existing
  const interval = setInterval(() => {
    $(selector).html($(selector).html() + text.charAt(k));
    k++;
    if (k >= text.length) clearInterval(interval);
  }, delay);
}

// === Page structure ===
const frameSets = [
  [0, 3],   // Cover opening
  [4, 7],   // Page 1
  [8, 11],  // Page 2
  [12, 15], // Page 3
  [16, 18]  // Closing
];

// HTML snippets for regular content (pages 3+)
const dynamicPages = {
  3: `<h3>Chapter 3</h3><ul><li>Clue 1</li><li>Clue 2</li></ul>`
};

let currentSetIndex = 0;
let isAnimating = false;

function animateFrames(start, end, step = 1, delay = 100, onComplete) {
  isAnimating = true;
  let frame = start;

  const interval = setInterval(() => {
    $('#book-frame').attr('src', `pages/book_${frame}.png`);
    frame += step;

    if ((step > 0 && frame > end) || (step < 0 && frame < end)) {
      clearInterval(interval);
      isAnimating = false;
      if (onComplete) onComplete();
    }
  }, delay);
}

function updateDynamicPage() {
  const [startFrame, _] = frameSets[currentSetIndex];
  $('#book-frame').attr('src', `pages/book_${startFrame}.png`);

  $('#page-content').hide();
  $('#dynamic-content').hide();

  if (currentSetIndex === 1) {
    $('#page-content').show();
    typeWriterLetter();
  } else if (dynamicPages[currentSetIndex]) {
    $('#dynamic-content').html(dynamicPages[currentSetIndex]).show();
  } else if (currentSetIndex === frameSets.length - 1) {
    $('#book-frame').attr('src', `pages/book_18.png`);
    $('.left-page').html('');
    $('.right-page').html('');
  }
}

$(document).ready(function () {
  $('#nextBtn').on('click', function () {
    if (isAnimating) return;

    if (currentSetIndex < frameSets.length - 1) {
      const [nextStart, nextEnd] = frameSets[currentSetIndex + 1];
      const currentEnd = frameSets[currentSetIndex][1];
      const step = nextStart > currentEnd ? 1 : -1;

      animateFrames(currentEnd, nextEnd, step, 80, () => {
        currentSetIndex++;
        updateDynamicPage();
      });
    }
  });

  $('#prevBtn').on('click', function () {
    if (isAnimating) return;

    if (currentSetIndex > 0) {
      const [prevStart, prevEnd] = frameSets[currentSetIndex - 1];
      const currentStart = frameSets[currentSetIndex][0];

      const step = prevStart < currentStart ? -1 : 1;
      animateFrames(currentStart, prevStart, step, 80, () => {
      currentSetIndex--;
      updateDynamicPage();
    });
    }
  });

  $(window).on('keydown', function (e) {
    if (e.key === "ArrowLeft") $('#prevBtn').click();
    if (e.key === "ArrowRight") $('#nextBtn').click();
  });
});
