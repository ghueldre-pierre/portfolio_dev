const workDialogElement = document.body.querySelector("#works dialog");
const workDialogTemplate = document.body.querySelector("#work_template");

const workData = {
    "kasa": {
        "url": "kasa.fr",
        "preview_image": "./images/kasa_preview.jpg",
        "intro": [
            "Kasa est une application web de location immobilière.",
            "Plus techniquement c'est une Single Page Application."
        ],
        "role": "Développeur frontend",
        "tech_list": {
            "React": "./icons/react.svg",
            "React Router": "./icons/react-router.svg",
            "Sass": "./icons/sass.svg"
        },
        "detail_list": [
            "Configuration de la navigation entre les pages de l'application avec React Router",
            "Développement de l'interface grâce à des composants React",
            "Utilisation des animations CSS",
            "Utilisation de Sass pour étendre les fonctionnalités du CSS"
        ],
        "link_list": {
            "Voir le code sur GitHub": "https://github.com/ghueldre-pierre/oc-projet-8" 
        }
    }
};

const workContentDrivers = {
    url: (element, url) => {
        element.textContent = url;
    },
    preview_image: (element, imageUrl) => {
        element.setAttribute("src", imageUrl);
    },
    intro: (element, stringList) => {
        let paragraph;
        for(const string of stringList) {
            paragraph = document.createElement("p");
            paragraph.textContent = string;
            element.append(paragraph);
        }
    },
    role: (element, role) => {
        element.textContent = role;
    },
    tech_list: (element, techData) => {
        const techNames = Object.keys(techData);
        let li, img;
        for(const name of techNames) {
            li = document.createElement("li");
            img = document.createElement("img");
            img.setAttribute("src", techData[name]);
            img.setAttribute("alt", name);
            li.append(img);
            element.append(li);
        }
    },
    detail_list: (element, detailData) => {
        let li;
        for(const detailString of detailData) {
            li = document.createElement("li");
            li.textContent = detailString;
            element.append(li);
        }
    },
    link_list: (element, linkData) => {
        const linkKeys = Object.keys(linkData);
        let li, a;
        for(const key of linkKeys) {
            li = document.createElement("li");
            a = document.createElement("a");
            a.setAttribute("href", linkData[key]);
            a.textContent = key;
            li.append(a);
            element.append(li);
        }
    }
}

function createWorkDialogContent(workId) {
    const content = workDialogTemplate.content.cloneNode(true);
    const data = workData[workId];
    const keyElements = content.querySelectorAll("*[data-key]");
    for(const element of keyElements) {
        const key = element.getAttribute("data-key");
        workContentDrivers[key](element, data[key]);
        element.removeAttribute("data-key");
    }
    return content;
}

window.addEventListener("click", (event) => {
    if(workDialogElement.open) {
        const closeButton = event.target.closest("button.close");
        if(! closeButton) return;
        workDialogElement.close();
    } else {
        const clickedArticle = event.target.closest("article.work");
        if(! clickedArticle) return;
        const dialogContent = createWorkDialogContent(clickedArticle.dataset.workId);
        workDialogElement.querySelector(".content").replaceChildren(dialogContent);
        workDialogElement.showModal();
    }
});