
let mnue = document.querySelector(".fa-bars");
let closeMnue = document.querySelector(".fa-xmark");
let list = document.querySelector("ul.list");


// Add event Click when user Click on mnue

// Create Function To call it when window resize and window.width < 768

const hiddenStyle = "visibility: hidden; opacity: 0;";
const showStyle = "visibility: visible; opacity: 1;";

function controlMnue() {

  // active click button to open mnue

  mnue.addEventListener("click", (_) => {

    list.style.cssText +=

      "visibility: visible; opacity: 1; left: 0; top: 0;";

    mnue.style.cssText += hiddenStyle;

    closeMnue.style.cssText += showStyle;

  });
  // active click button to close mnue

  closeMnue.addEventListener("click", (_) => {

    list.style.cssText +=

      "visibility: hidden; opacity: 0; left: 0px; top: -2000px;";

    closeMnue.style.cssText += hiddenStyle;

    mnue.style.cssText += showStyle;

  });
};

// Calling Function To Set icones

if (window.innerWidth <= 768) controlMnue();

// Create Event When Window Resize

window.addEventListener("resize", function () {

  if (window.innerWidth <= 768) {



    closeMnue.style.cssText += showStyle;

    controlMnue();

  } else {

    closeMnue.style.cssText += hiddenStyle;

    mnue.style.cssText += hiddenStyle;

    list.style.cssText +=

    "visibility: visible; opacity: 1; left: 0; top: 0;";

  }
});


// Stup Loader

function loader() {
  const loaderEle = document.querySelector(".load");

  window.addEventListener("load" , function() {
    loaderEle.remove();
  });

};

if(window.location.pathname == "/Quiz-Website/index.html")  loader();


// Start Toggle theme

toggleTheme();

function toggleTheme() {

    const theme = document.querySelector(".theme");
    const bodyStyle = document.querySelector("body");
    const resultBackground = document.querySelectorAll(".result");

  if(theme != null) {
    theme.addEventListener("click" , _ => {

      // Set toggle Class To Change Theme

      bodyStyle.classList.toggle("whiteTheme");
      theme.classList.toggle("themeToggle");

      // Loop For Results Div to Add Themes 

      resultBackground.forEach( div => {
        div.classList.toggle("toggle-background");
      });

            // put Color On LocalStorage

            if(bodyStyle.classList.contains("whiteTheme") && theme.classList.contains("themeToggle")) {
              localStorage.setItem("themesClasses" , "contains");
            }else {
              localStorage.removeItem("themesClasses" , "contains");
            }

    });


    if(localStorage.getItem("themesClasses")) {
      bodyStyle.classList.add("whiteTheme");
      theme.classList.add("themeToggle");
    }else {
      bodyStyle.classList.remove("whiteTheme");
      theme.classList.remove("themeToggle");
    }

  }


};



// Set Random BG
let imges = [
  "./imge/2.webp" ,
  "./imge/3x0.jpg" ,
  "./imge/45bf7c6490b4c81ecb058347b957886f.jpg",
  "./imge/background.jpg",
  "./imge/maxresdefault.jpg",
  "./imge/one.jpg",
  "./imge/the-ultimate-gaming-setups-1024x683.jpg",
  "./imge/Ultra-Clean-Gaming-Setup-ITX-PC-Console-1-13-screenshot.webp",
  "./imge/two.avif",
  "./imge/three.jpg",
  "./imge/five.jpg",
  "./imge/seven.jpg",

];
setRandomBG();
function setRandomBG() {

  if(window.location.pathname == "/Quiz-Website/index.html") {
    let bg = document.querySelector(".home");

    // Random Img
  
    let random = imges[Math.trunc(Math.random() * imges.length)];
  
    // Set Style
    bg.style.backgroundImage = `url(${random})`;
  }

}

// Call this Function Every ten munits

setInterval(setRandomBG , 10000);