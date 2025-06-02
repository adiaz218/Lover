const frameSets = [
  [0, 3],   // Cover opening
  [4, 7],   // Page 1
  [8, 11],  // Page 2
  [12, 15], // Page 3
  [16, 18]  // Closing animation
];

const dynamicPages = {
  1: `<h3>Chapter 1</h3><p>Welcome to your adventure.</p>`,
  2: `<h3>Chapter 2</h3><p>Things get more mysterious...</p>`,
  3: `<h3>Chapter 3</h3><ul><li>Clue 1</li><li>Clue 2</li></ul>`,
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
  const html = dynamicPages[currentSetIndex];
  if (html) {
    $('#page-content').html(html).show();
  } else {
    $('#page-content').hide();
    $('#book-frame').show();
  }
}

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

    animateFrames(currentStart, prevStart, -1, 80, () => {
      currentSetIndex--;
      updateDynamicPage();
    });
  }
});

$(window).on('keydown', function (e) {
  if (e.keyCode === 37) $('#prevBtn').click(); // Left arrow
  if (e.keyCode === 39) $('#nextBtn').click(); // Right arrow
});
