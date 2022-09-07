// @ts-nocheck
const backBtn = document.getElementById('back-btn');

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        backBtn.style.display = "block";
    } else {
        backBtn.style.display = "none";
    }
}

const backToTop = function() {
    window.scrollTo({
        top: 0,
        //left: 100,
        behavior: 'smooth'
    });
};
backBtn.addEventListener('click', backToTop);