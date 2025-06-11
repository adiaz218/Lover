// === Book page typewriter letter ===
let letterTyped = false;

function typeWriterLetter() {
  const leftTarget = document.querySelector('.left-page');
  const rightTarget = document.querySelector('.right-page');

  const leftText = `Litzy,

These past 6 months with you have been a dream. It feels like it's been longer. I know we've had our up's and down's, but I am glad we were able to get through them together. I am very glad to have you in my life again. Getting to know you more the second time has been a blessing. You are my person, and you are stuck with me forever. I can't wait to build a life and start a family with you. Here's to the many years we have ahead of us. I love you so much baby, happy six months mi amor 💟

With love,
Arlette`;

  const rightText = `I know you've wanted your own blog so this is my shot at it. Of coruse this isn't the whole thing. I wanted to create a scrapbook like thing were we can upload our pictures and videos for memories. I really hope you love it. \nI've added my favorite memories from the past months being with you. I look foward to adding more together and taking your input to build your dream blog website. 
I LOVE YOU LITZY‼️‼️`;

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
  [16, 19], // Page 4
  [20,23], // Page 5
  [24, 27], // Page 6
  [28, 30] // Closing 
];

const dynamicPages = {
  2: {
    left: [
      { images:  ['images/memory1.jpg', 'images/memory2.jpg'], caption: 'I loved how affectionate you were when we first started seeing eachother' }
    ],
    right: [
      { images: ['images/memory3.jpg', 'images/memory4.JPG'], caption: 'I love spending time with you and yeli (mainly you tho)'},
    ]
  },
  3: {
    left: [
      { images: ['images/memory5.JPG', 'images/memory6.jpeg'], caption: 'Holidays with you <3'}
    ], 
    right: [
      { images: ['images/memory7.jpeg', 'images/memory8.jpg'], caption: 'When we became official‼️‼️'}
    ]
  },
  4: {
    left: [
      { images: ['images/memory9.jpg', 'images/memory10.jpg'], caption: 'Our Aquarium date was one of my favs'}
    ], 
    right: [
      { images: ['images/memory11.jpg', 'images/memory12.jpg'], caption: 'I love that we are both silly'}
    ]
  },
  5: {
    left: [
      { images: ['images/memory13.jpg', 'images/memory14.jpg'], caption: 'I LOVE WHEN WE MATCH'}
    ], 
    right: [
      { images: ['images/memory15.jpg', 'images/memory16.jpg', 'images/memory17.jpg'], caption: 'Thank you for the best birthday date <3'}
    ]
  }
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
  // const [startFrame, _] = frameSets[currentSetIndex];
  // $('#book-frame').attr('src', `pages/book_${startFrame}.png`);

  // $('.left-page').html('');
  // $('.right-page').html('');
  // $('#page-content').show();

  const [startFrame] = frameSets[currentSetIndex];
  $('#book-frame').attr('src', `pages/book_${startFrame}.png`);

  $('.left-page').html('');
  $('.right-page').html('');
  $('#page-content').show();

  if (currentSetIndex === 1) {
    typeWriterLetter();
    return;
  }

  const page = dynamicPages[currentSetIndex];
  if (page) {
    const renderBlock = ({ images, caption }) => `
      <div class="memory-row">
        <div class="image-row">
          ${images.map(src => `<img src="${src}" class="page-photo" />`).join('')}
        </div>
        <p class="caption">${caption}</p>
      </div>`;

    (page.left || []).forEach(block => {
      $('.left-page').append(renderBlock(block));
    });

    (page.right || []).forEach(block => {
      $('.right-page').append(renderBlock(block));
    });
  }else if (currentSetIndex === frameSets.length - 1) {
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
