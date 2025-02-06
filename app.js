let data = {};

async function getData() {
    try {
        const response = await fetch("data.json");
        data = await response.json();

        UpdateMyCV();
    }
    catch (error) {
        console.log("Failed to fetching data: ", error);
    }
}

function UpdateMyCV() {
    const myName = document.getElementById("my-name");
    myName.textContent = data.name;


    const myAvatar = document.getElementById("my-avatar");
    myAvatar.src = data.avatar;


    const myJob = document.getElementById("my-job");
    myJob.textContent = cutString(data.intro, 6);


    const introduction = document.getElementById("introduction");
    introduction.textContent = data.intro;


    const aboutJob = document.querySelector(".font-size-currently");
    let newContent = aboutJob.innerHTML.replace("I'm a Software Engineer", `${cutString(data.intro, 6)}`);
    aboutJob.innerHTML = newContent;

    const myAccountFacebook = document.querySelector(".self-intro-text");
    myAccountFacebook.href = "https://www.facebook.com";


    const workExperience = document.querySelectorAll(".experienceRow");

    workExperience.forEach(element => {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    });

    let htmlContent = data.experience.map((element, index) => {
        return `<div class="container-experience-box">
                    <img class="experienceIcon" src=${element.image} alt="WorkExperience${index + 1}.png">
                        <div>
                            <h1 class="poppin-font-heading">${element.company}</h1>
                            <h2 class="poppin-font-heading">${element.position}</h2>
                            <h3 class="poppin-font-heading">${element.year}</h3>
                            <p class="poppin-medium-para">${element.description}</p>
                            <button class="poppin-medium-button" onclick="location.href='${element.src}'">Learn More</button>
                        </div>
                </div>`;
    });

    const experienceInsert = document.querySelector(".experienceRow");

    experienceInsert.innerHTML = htmlContent;


    const languageLogo = document.getElementById("container-functional-row");
    while (languageLogo.firstChild) {
        languageLogo.removeChild(languageLogo.firstChild);
    }

    let htmlLogos = data.languages.map((element) => {
        return `<div class="language-logo" data-description="${element.explained}" data-rate="${element.proficiencyLevel}" data-name="${element.name}">
                    <img class="same-size-logo" src=${element.logo} alt="${element.name}.png">
                </div>`;
    }).join("");

    languageLogo.innerHTML = htmlLogos;


    const popup = document.getElementById("popupContent");
    const popupBackdrop = document.getElementById("popupBackdrop");

    let imageLogo = document.querySelectorAll(".same-size-logo");

    for (let i = 0; i < imageLogo.length; i++) {
        imageLogo[i].addEventListener("click", function (event) {
            let clickEvent = event.target.closest(".language-logo");

            const name = clickEvent.dataset.name;
            const description = clickEvent.dataset.description;
            const rate = clickEvent.dataset.rate;

            document.getElementById("popupTitle").textContent = name;
            document.getElementById("popupDescription").innerHTML = `<span class="bold-first-word">Description: </span>${description}`;
            document.getElementById("popupRate").innerHTML = `<span class="bold-first-word">Proficiency Level: </span>${rate}`;

            popup.style.display = "block";
            popupBackdrop.style.display = "block";
        });
    }

    popupBackdrop.addEventListener("click", function () {
        popup.style.display = "none";
        popupBackdrop.style.display = "none";
    });


    const exampleProject = document.getElementById("example-project");

    while (exampleProject.firstChild) {
        exampleProject.removeChild(exampleProject.firstChild);
    }

    let htmlExample = data.projects.map((element, index) => {
        if (index % 2 !== 0) {
            return `<div class="example-project-row example-project-row-left">
                        <div class="container-example-image example-project-image-left">
                            <a href="${element.link}"><img src="${element.imageSrc}" alt="ExampleProject2.png"></a>
                        </div>
                        <div class="container-example-left container-example-right">
                            <div>
                                <h4 class="example-heading">Featured Project</h4>
                                <h2 class="example-title">${element.title}</h2>
                            </div>
                            <div class="container-example-para">
                                <p class="example-para">${element.description}</p>
                            </div>
                            <div class="container-example-icon">
                                <img src="/assets/img/ClickIcon.png" alt="ClickIcon.png">
                                <img src="/assets/img/ClickIcon.png" alt="ClickIcon.png">
                            </div>
                        </div>
                    </div>`;
        }
        else {
            return `<div class="example-project-row">
                    <div class="container-example-left">
                        <div>
                            <h4 class="example-heading">Featured Project</h4>
                            <h2 class="example-title">${element.title}</h2>
                        </div>
                        <div class="container-example-para">
                            <p class="example-para">${element.description}</p>
                        </div>
                        <div class="container-example-icon">
                            <img src="/assets/img/ClickIcon.png" alt="ClickIcon.png">
                            <img src="/assets/img/ClickIcon.png" alt="ClickIcon.png">
                        </div>
                    </div>
                    <div class="container-example-image">
                        <a href="${element.link}"><img src="${element.imageSrc}" alt="ExampleProject1.png"></a>
                    </div>
                </div>`;
        }
    });

    exampleProject.innerHTML = htmlExample;


    const contactInfo = document.getElementById("contact");

    let htmlContact = "<div>";

    for (let key in data.contact) {
        if (data.contact.hasOwnProperty(key)) {
            htmlContact += `<p><span class="bold-first-word">${key.charAt(0).toLocaleUpperCase() + key.slice(1)}: </span>${data.contact[key]}</p>`;
        }
    }

    htmlContact += `</div>`;

    contactInfo.innerHTML = htmlContact;


    const myDesire = document.getElementById("desire");
    myDesire.textContent = data.desire;

    const myEmail = document.getElementById("my-email");
    myEmail.textContent = data.email;
}

function cutString(inputString, numWords) {
    const words = inputString.split(" ");
    return words.slice(0, numWords).join(" ");
}

getData();