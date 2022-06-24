const nextPage = document.getElementById("nextPage");
const previousPage = document.getElementById("previousPage");
const pageIndicator = document.getElementById("pageIndicator");

let page = "";
let pageNumber = "Page 1/8"

loadCharacters();

//Go to the next page of characters and increment the page number
nextPage.addEventListener("click", () => {
    if (page === "") {
        page = "?page=2";
        deleteCharacterTiles();
        loadCharacters();
        pageNumber = "Page 2/8";
        pageIndicator.innerHTML = pageNumber;
    } else if (page === "?page=2") {
        page = "?page=3";
        deleteCharacterTiles();
        loadCharacters();
        pageNumber = "Page 3/8";
        pageIndicator.innerHTML = pageNumber;
    } else if (page === "?page=3") {
        page = "?page=4";
        deleteCharacterTiles();
        loadCharacters();
        pageNumber = "Page 4/8";
        pageIndicator.innerHTML = pageNumber;
    } else if (page === "?page=4") {
        page = "?page=5";
        deleteCharacterTiles();
        loadCharacters();
        pageNumber = "Page 5/8";
        pageIndicator.innerHTML = pageNumber;
    } else if (page === "?page=5") {
        page = "?page=6";
        deleteCharacterTiles();
        loadCharacters();
        pageNumber = "Page 6/8";
        pageIndicator.innerHTML = pageNumber;
    } else if (page === "?page=6") {
        page = "?page=7";
        deleteCharacterTiles();
        loadCharacters();
        pageNumber = "Page 7/8";
        pageIndicator.innerHTML = pageNumber;
    } else if (page === "?page=7") {
        page = "?page=8";
        deleteCharacterTiles();
        loadCharacters();
        pageNumber = "Page 8/8";
        pageIndicator.innerHTML = pageNumber;
    } else {
        return;
    }
})

//Go to the previous page of characters and decrement the page number
previousPage.addEventListener("click", () => {
    if (page === "") {
        return;
    } else if (page === "?page=2") {
        page = "";
        deleteCharacterTiles();
        loadCharacters();
        pageNumber = "Page 1/8";
        pageIndicator.innerHTML = pageNumber;
    } else if (page === "?page=3") {
        page = "?page=2";
        deleteCharacterTiles();
        loadCharacters();
        pageNumber = "Page 2/8";
        pageIndicator.innerHTML = pageNumber;
    } else if (page === "?page=4") {
        page = "?page=3";
        deleteCharacterTiles();
        loadCharacters();
        pageNumber = "Page 3/8";
        pageIndicator.innerHTML = pageNumber;
    } else if (page === "?page=5") {
        page = "?page=4";
        deleteCharacterTiles();
        loadCharacters();
        pageNumber = "Page 4/8";
        pageIndicator.innerHTML = pageNumber;
    } else if (page === "?page=6") {
        page = "?page=5";
        deleteCharacterTiles();
        loadCharacters();
        pageNumber = "Page 5/8";
        pageIndicator.innerHTML = pageNumber;
    } else if (page === "?page=7") {
        page = "?page=6";
        deleteCharacterTiles();
        loadCharacters();
        pageNumber = "Page 6/8";
        pageIndicator.innerHTML = pageNumber;
    } else if (page === "?page=8") {
        page = "?page=7";
        deleteCharacterTiles();
        loadCharacters();
        pageNumber = "Page 7/8";
        pageIndicator.innerHTML = pageNumber;
    } else {
        return;
    }
})

//Remove the character tiles on the page
function deleteCharacterTiles() {
    const grids = document.querySelectorAll(".characterGrid");
    grids.forEach(grid => {
        grid.remove()
    });
}

//Fetch operation to retreive character data
function loadCharacters() {
    fetch(`https://swapi.dev/api/people/${page}`)
        .then(response => response.json())
        .then(json => buildTiles(json.results))
}

//Fetch operation for a single character
function loadCharacter(characterURL) {
    fetch(`${characterURL}`)
        .then(response => response.json())
        .then(json => buildTile(json))
}

//Clicking element will read character URL and load it into loadCharacter()
function elementClick(variables) {
    variables.forEach(variable => {
        variable.addEventListener('click', () => {
            newVariable = variable.getAttribute("url")
            loadCharacter(newVariable)
        })
    })
}

//Create the divs for each character and display it on the page
function buildTiles(data) {
    //Create element for each character and display their name
    data.forEach(character => {
        let nameTitle = document.createElement('div');
        nameTitle.classList.add("characterGrid")
        nameTitle.setAttribute('url', character.url)
        nameTitle.innerText = character.name
        document.getElementById("characterTiles").appendChild(nameTitle);
    });

    //Access element for each character and pass node list to elementClick()
    const characterElement = document.querySelectorAll(".characterGrid");
    elementClick(characterElement);
}

//Makes the dom element hidden
function turnOffDisplay(domElement) {
    domElement.style.display = "none"
}

//Create div for selected character
function buildTile(data) {
    pageIndicator.style.display = "none"
    deleteCharacterTiles();
    turnOffDisplay(previousPage);
    turnOffDisplay(nextPage);
    let characterTile = document.createElement('div')
    characterTile.classList.add("characterTile")
    document.getElementById("characterTiles").appendChild(characterTile);
    let characterPictureTile = document.createElement('div')
    let addClass = data.url.slice(29, -1)
    characterPictureTile.classList.add(`bg${addClass}`);
    characterPictureTile.classList.add("pictureTile")
    document.getElementById("characterTiles").appendChild(characterPictureTile);
    let backButton = document.createElement('div')
    backButton.classList.add("backButton")
    backButton.innerHTML = "Back"
    document.getElementById("characterTiles").appendChild(backButton);
    backButton.addEventListener('click', () => {
        characterPictureTile.removeAttribute('class');
        characterPictureTile.remove();
        characterTile.remove();
        backButton.remove();
        previousPage.style.display = ""
        nextPage.style.display = ""
        pageIndicator.style.display = "flex"
        loadCharacters();
    })
    let characterList = document.createElement("ul");
    characterList.classList.add('characterList')
    characterTile.innerHTML = data.name;
    document.querySelector(".characterTile").appendChild(characterList)
    let listItem1 = document.createElement("li");
    let listItem2 = document.createElement("li");
    let listItem3 = document.createElement("li");
    let listItem4 = document.createElement("li");
    let listItem5 = document.createElement("li");
    let listItem6 = document.createElement("li");
    let listItem7 = document.createElement("li");
    listItem1.innerHTML = `Height: <strong>${data.height} cm</strong>`;
    listItem2.innerHTML = `Mass: <strong>${data.mass} kg</strong>`;
    listItem3.innerHTML = `Hair Color: <strong>${data.hair_color}</strong>`;;
    listItem4.innerHTML = `Skin Color: <strong>${data.skin_color}</strong>`;;
    listItem5.innerHTML = `Eye Color: <strong>${data.eye_color}</strong>`;;
    listItem6.innerHTML = `Birth Year: <strong>${data.birth_year}</strong>`;;
    listItem7.innerHTML = `Gender: <strong>${data.gender}</strong>`;;

    let listArray = [listItem1, listItem2, listItem3, listItem4, listItem5, listItem6, listItem7]
    for (i = 0; i < listArray.length; i++) {
        document.querySelector(".characterList").appendChild(listArray[i]);
    }
}