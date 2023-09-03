
const CreateListCard = document.getElementById("Create-Card");
const SearchInput = document.getElementById("SearchHeroInput");
const SearchButton = document.getElementById("SearchHeroBtn");
let favouriteList = [];
// var MD5 = require("crypto-js/md5");
// const ts = Date.now();
// 1693735382476
// console.log(ts)
// 4ec60e32b11e96d4032a112748f4d389
// const publicKey = "Api Public Key";
// const privateKey = "Api Private Key"

// console.log(MD5(ts+privateKey+publicKey).toString());
// 5a05700d4757d0d899b2034c1c24c451

function favouriteIconHandler(data,favouriteicon,imgUrl){
    const getDataFavList = localStorage.getItem("favlist");
    if(getDataFavList){
        favouriteList = JSON.parse(getDataFavList);
    }
    for(let index in favouriteList){
        if(favouriteList[index].id===data.id){
            favouriteicon.style.color = "lightgrey"
            favouriteList.splice(index,1);
            localStorage.setItem("favlist",JSON.stringify(favouriteList));
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
        favouriteIconHandler(data,favouriteicon,imgUrl);
    })
    checkForFavList(data,favouriteicon);
    CreateListCard.appendChild(parentDiv);
    
}

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

function heroApiCall(isQuery,value) {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    let apiUrl = "http://gateway.marvel.com/v1/public/characters?ts=1693735382476&apikey=4ec60e32b11e96d4032a112748f4d389&hash=5a05700d4757d0d899b2034c1c24c451"
    if (isQuery){
        apiUrl = `${apiUrl}&nameStartsWith=${value}`
    }
    fetch(apiUrl, requestOptions)
        .then(response => response.json())
        .then(result => {
            CreateListCard.innerHTML=null;
            for(let heros of result.data.results){
                const url = `${heros.thumbnail.path}.${heros.thumbnail.extension}`
                fetchHeros(heros,url);
            }
        })
        .catch(error => console.log('error', error));
}
heroApiCall();
SearchButton.addEventListener('click',(e)=> {
    e.preventDefault();
    heroApiCall(true,SearchInput.value)
})
    

