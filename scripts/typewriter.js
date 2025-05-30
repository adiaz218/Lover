const header = document.getElementById("typeWriterHeader");
const paragraph = document.getElementById("typeWriterPara");

const headerText = "Litzy,";
const bodyText = `These past 6 months with you have been a dream. It feels like it's been longer.
  I know we've had our up's and down's, but I am gald we were able to get through them together.
  I am very glad to have you in my life again. Getting to know you more the second time has been a blessing. 
  You are my person, and you are stuck with me forever. I can't wait to build a life and start a family with you.
  I love you so much baby, Happy six months mi amor 💟

With love,
Arlette`;

let i = 0;
let j = 0;
let headerDone = false;

function typeWriter() {
  if (!headerDone) {
    header.classList.add("typewriter-cursor");

    if (i < headerText.length) {
      header.innerHTML += headerText.charAt(i);
      i++;
      setTimeout(typeWriter, 50);
    } else {
      headerDone = true;

      // Move cursor from header to paragraph
      header.classList.remove("typewriter-cursor");
      paragraph.classList.add("typewriter-cursor");

      setTimeout(typeWriter, 300); // pause before paragraph
    }
  } else {
    if (j < bodyText.length) {
      paragraph.innerHTML += bodyText.charAt(j);
      j++;
      setTimeout(typeWriter, 50);
    } else {
      // Optional: remove cursor once typing is done
      paragraph.classList.remove("typewriter-cursor");
    }
  }
}

window.onload = typeWriter;
