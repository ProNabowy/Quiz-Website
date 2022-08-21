// ======================================= Acsess For HTML And Css ======================================= 

// ======================================= set Footer Year  ======================================= 

setYear()

function setYear() {
    let year = new Date().getFullYear();
    let footer = document.querySelector(".year");
    footer.innerHTML = year;

};


// =======================================  customiztion button click  ======================================= 

btn();
function btn() {

    let btn_click = document.querySelector(".scroll");

    window.onscroll = _ => this.window.scrollY >= 800 ? btn_click.classList.add("active") : btn_click.classList.remove("active");

    btn_click.addEventListener("click" , _ => {

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });

    });

};
