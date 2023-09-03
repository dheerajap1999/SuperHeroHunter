const CreateListCard = document.getElementById("Create-Card");
const SearchInput = document.getElementById("SearchHeroInput");
const SearchButton = document.getElementById("SearchHeroBtn");

let favouriteList = [];

function getData() {
    var data = localStorage.getItem('favlist');
    if (data) {
        return JSON.parse(data);
    } else {
        return [];
    }
}

function fetchHeros(data,imgUrl) {
    let parentDiv = document.createElement('div');
    parentDiv.classList.add("col");
    parentDiv.innerHTML = `
        <div class="card HeroCard" style="cursor:pointer;" id="HeroCard">
        <div class="position-relative">
            <img src="${imgUrl}" class="card-img-top card-image" alt="Super Hero Image">
            <i class="fas fa-heart position-absolute" id="Fav-icon" style="top: 10px; right: 10px; font-size: 24px; color: lightgrey; cursor: pointer;"></i>
        </div>
            <div class="card-body">
                <h5 class="card-title">${data.name}</h5>
                <p class="card-text overflow-auto">${data.description}</p>
            </div>
        </div>
    `
    const HeroCard = parentDiv.querySelector("img");
    HeroCard.addEventListener('click',()=>{
        window.location.href = `./SuperHeroDetails.html?id=${data.id}`
    })

    const favouriteicon = parentDiv.querySelector("i")
    favouriteicon.addEventListener('click',()=>{
        const getDataFavList = localStorage.getItem("favlist");
        if(getDataFavList){
            favouriteList = JSON.parse(getDataFavList);
        }
        for(let index in favouriteList){
            if(favouriteList[index].id===data.id){
                favouriteicon.style.color = "lightgrey"
                favouriteList.splice(index,1);
                localStorage.setItem("favlist",JSON.stringify(favouriteList));
                window.location.reload();
                console.log(favouriteList)
                return;
            }
        }
        favouriteicon.style.color = "red";
        const favDataObj = {
            id:data.id,
            name:data.name,
            description:data.description,
            imgUrl:imgUrl
        };
        favouriteList.push(favDataObj);
        localStorage.setItem("favlist",JSON.stringify(favouriteList));
        console.log(favouriteList);
        
    })
    checkForFavList(data,favouriteicon);
    CreateListCard.appendChild(parentDiv);
    
}

function renderFavList() {
    const favList = getData();
    for (let index in favList) {
        const data = favList[index];
        fetchHeros(data,data.imgUrl);
    }
}
renderFavList();

function checkForFavList(data,favouriteicon) {
    const getDataFavList = localStorage.getItem("favlist");
    if(getDataFavList){
        favouriteList = JSON.parse(getDataFavList);
    }
    for(let index in favouriteList){
        if(favouriteList[index].id===data.id){
            favouriteicon.style.color = "red"
            return;
        }
    }
    
}