// user.js

const refresh = document.querySelector(".refresh");
refresh.addEventListener("click", function() {
    location.reload();
});

const title_info = document.querySelector(".title_info");
const title_details_ = document.querySelector(".title_details");
const info_icons = document.querySelector(".info_icons");
const user_img = document.querySelector(".user_img");

let userData = {};

fetch('https://randomuser.me/api/')
    .then(response => response.json())
    .then(function(data) {
        userData = data.results[0];
        updateUserDisplay();
        cycleUserData();
    });

function updateUserDisplay() {
    let imgSrc = `<img src="${userData.picture.large}" title="${userData.name.first} ${userData.name.last}">`;
    let name_ = `${userData.name.first} ${userData.name.last}`;
    let content_ = `
        <div class="icon user_ active" data-title="Hola, mi nombre es" data-value="${userData.name.first} ${userData.name.last}"></div>
        <div class="icon email_" data-title="Mi email es" data-value="${userData.email}"></div>
        <div class="icon birthday_" data-title="Tengo" data-value="${userData.dob.age} años de edad"></div>
        <div class="icon location_" data-title="Mi ubicación es" data-value="${userData.location.country}"></div>
        <div class="icon phone_" data-title="Mi número de teléfono es" data-value="${userData.cell}"></div>
        <div class="icon password_" data-title="Mi contraseña es" data-value="${userData.login.password}"></div>
    `;
    info_icons.innerHTML = content_;
    user_img.innerHTML = imgSrc;
    title_details_.innerHTML = name_;

    const icons = document.querySelectorAll(".icon");

    icons.forEach(function(item) {
        item.addEventListener("mouseover", function() {
            let titleData = item.getAttribute("data-title");
            let dataValue = item.getAttribute("data-value");

            title_info.innerHTML = titleData;
            title_details_.innerHTML = dataValue;

            let activeClass = document.querySelectorAll(".active");
            activeClass.forEach(function(active_) {
                active_.className = active_.className.replace(" active", "");
            });
            item.className += " active";
        });
    });
}

function cycleUserData() {
    const icons = document.querySelectorAll(".icon");
    let index = 0;

    setInterval(() => {
        icons.forEach(icon => icon.classList.remove("active"));
        icons[index].classList.add("active");

        let titleData = icons[index].getAttribute("data-title");
        let dataValue = icons[index].getAttribute("data-value");

        title_info.innerHTML = titleData;
        title_details_.innerHTML = dataValue;

        index = (index + 1) % icons.length;
    }, 3000);

    setInterval(() => {
        title_info.innerHTML = "";
        title_details_.innerHTML = "";
    }, 4000);
}

       
