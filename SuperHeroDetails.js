const urlParams = new URLSearchParams(window.location.search);
const characterId = urlParams.get('id');
console.log(characterId);

function fetchHerosByID() {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      fetch(`http://gateway.marvel.com/v1/public/characters/${characterId}?ts=1693735382476&apikey=4ec60e32b11e96d4032a112748f4d389&hash=5a05700d4757d0d899b2034c1c24c451`, requestOptions)
        .then(response => response.json())
        .then(result => {
            
            const url = `${result.data.results[0].thumbnail.path}.${result.data.results[0].thumbnail.extension}`
            mainContainer(result.data.results[0],url)
        })
        .catch(error => console.log('error', error));
}

fetchHerosByID()

function mainContainer(data,url) {
    const date = new Date(Date.now(data.modified));
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth() + 1; 
    const day = date.getUTCDate();
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const seconds = date.getUTCSeconds();

const formattedDateTime = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    console.log(data);
    const mainDiv = document.getElementById("Main-div");
    mainDiv.innerHTML = `        
    <div  style="width: 100%;">
    <h2>Title: ${data.name}</h2>
    <p><b>Last Updated:</b> ${formattedDateTime}</p>
    <p>Comics Available: ${data.comics.available}</p>
    <p>Events Live: ${data.events.available}</p>
    <p>Series: ${data.series.available}</p>
<div class="accordion" style="width: 100%;" id="accordionExample">
<div class="accordion-item">
  <h2 class="accordion-header" id="headingOne">
    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
      Comics
    </button>
  </h2>
  <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
    <div class="accordion-body">
    <ul class="list-group">
    ${
      data.comics.items.length >0 ?
      data.comics.items.map((item)=> `<li class="list-group-item">${item.name}</li>`) :
      `<li class="list-group-item">No Comics Available</li>`
    }
    </ul>
    </div>
  </div>
</div>
<div class="accordion-item">
  <h2 class="accordion-header" id="headingTwo">
    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
      Events
    </button>
  </h2>
  <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
    <div class="accordion-body">
    <ul class="list-group">
    ${
      data.events.items.length >0 ?
      data.events.items.map((item)=> `<li class="list-group-item">${item.name}</li>`) :
      `<li class="list-group-item">No Events Available</li>`
    }
    </ul></div>
  </div>
</div>
<div class="accordion-item">
  <h2 class="accordion-header" id="headingFour">
    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
      Stories
    </button>
  </h2>
  <div id="collapseFour" class="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#accordionExample">
    <div class="accordion-body">
    <ul class="list-group">
    ${
        data.stories.items.length >0 ?
        data.stories.items.map((item)=> `<li class="list-group-item">${item.name}</li>`) :
        `<li class="list-group-item">No Stories Available</li>`
    }
    </ul></div>
  </div>
</div>
<div class="accordion-item">
  <h2 class="accordion-header" id="headingThree">
    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
      Series
    </button>
  </h2>
  <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
    <div class="accordion-body">
    <ul class="list-group">
    ${
      data.series.items.length >0 ?
      data.series.items.map((item)=> `<li class="list-group-item">${item.name}</li>`) :
      `<li class="list-group-item">No Series Available</li>`
    }
    </ul> 
    </div>
  </div>
</div>
</div>
</div>
<img src="${url}" class="img-fluid" style="width:45%; height:95vh" alt="...">
`
}
