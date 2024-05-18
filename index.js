fetch("https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=")
    .then(response => response.json())
    .then(data => {
        displayData(data.player);
    })
    .catch((err) => {
        console.log(err);
    });

const alertBox = document.getElementById("showing-results");
const maxAlertBox = document.getElementById("maximum-alert");
let totalPlayers = 0;

const handleSearch = () => {
    const playerName = document.getElementById("search-input").value;

    if(playerName) {
        displayData([]);
        alertBox.innerHTML = "";
        fetch(`https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${playerName}`)
        .then(response => response.json())
        .then(data => {
            if (data.player) {
                displayData(data.player, playerName);
            }
            else {
                const div = document.createElement("div");                
                div.innerHTML = `
                <div class="alert alert-danger" role="alert">
                    There is no results matched your input: <span class="capitalize fw-bolder">${playerName}<span>
                <div>
                `;
                alertBox.appendChild(div);
                displayData([]);
            }
        })
        .catch((err) => {
            console.log(err);
        });
    }
}

const handleShowDetails = (id) => {
    if (id) {
        fetch(`https://www.thesportsdb.com/api/v1/json/3/lookupplayer.php?id=${id}`)
            .then(response => response.json())
            .then(data => {
                const info = data.players[0];
                const div = document.createElement("div"); 
                console.log(info)               

                div.innerHTML = `
                    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header d-flex justify-content-between">
                                    <h1 class="modal-title fs-5" id="staticBackdropLabel">Details of <strong class="text-paste fw-bolder">${info.strPlayer}</strong></h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <div class="d-flex justify-content-center">
                                        <img src=${info.strCutout} class="card-img mx-auto border mt-0 mb-4" alt="Player Image">
                                    </div>
                                    <p class="card-title mb-2"><strong>Name:</strong> ${info.strPlayer}</p>
                                    <p class="card-text mb-2"><strong>Sport:</strong> ${info.strSport}</p>
                                    <p class="card-text mb-2"><strong>Position:</strong> ${info.strPosition}</p>
                                    <p class="card-text mb-2"><strong>Team:</strong> ${info.strTeam}</p>
                                    <p class="card-text mb-2"><strong>Status:</strong> ${info.strStatus}</p>
                                    <p class="card-text mb-2"><strong>Country:</strong> ${info.strNationality}</p>                        
                                    <p class="card-text mb-2"><strong>Gender:</strong> ${info.strGender}</p>                        
                                    <p class="card-text mb-2"><strong>Salary:</strong> ${info.strWage}</p>                        
                                    <p class="card-text mb-2"><strong>Description:</strong> ${info.strDescriptionEN}</p>                        
                                    <hr />
                                    <div class="d-flex justify-content-between mt-2">
                                        <div class="d-flex justify-content-start align-items-center mb-2">
                                            <a href=${info.strFacebook} class="text-decoration-none">
                                                <i class="text-paste fa-brands fa-facebook px-2 fs-4"></i>
                                            </a>
                                            <a href=${info.strInstagram} class="text-decoration-none">
                                                <i class="text-paste fa-brands fa-instagram px-2 fs-4"></i>
                                            </a>
                                            <a href=${info.strTwitter} class="text-decoration-none px-1">
                                                <i class="text-paste fa-brands fa-twitter px-2 fs-4"></i>
                                            </a>
                                        </div>
                                        <div class="">
                                            <button class="mb-2 btn btn-primary bg-paste border-0 py-2 px-3 add-to-group-btn" type="button" onclick="handleAddToGroup('${info.strPlayer}', '${info.strCutout}', '${info.strGender}', this)">Add to Group</button>
                                            <button type="button" class="mb-2 btn btn-danger border-0 py-2 px-3" data-bs-dismiss="modal">Close</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                
                document.body.appendChild(div);
                const modal = new bootstrap.Modal(div.querySelector('.modal'));
                modal.show();
            })
            .catch((err) => {
                console.log(err);
            });
    }
};

const getFirstTenWords = (text) => {
    const words = text.split(' ');
    return words.slice(0, 10).join(' ');
};

const displayData = (playerData, playerName) => {
    const container = document.getElementById("player-container");
    container.innerHTML = '';

    if (playerName) {
        const div = document.createElement("div");                
        div.innerHTML = `
            <div class="alert alert-secondary bg-paste text-white border-0" role="alert">
                Showing Results of: <span class="capitalize fw-bolder">${playerName}<span>
            <div>
        `;
        alertBox.appendChild(div);
    }
    playerData.forEach(data => {
        const div = document.createElement("div");

        div.innerHTML = `
            <div class="col">
                <div class="card">
                    <img src=${data.strCutout} class="card-img mx-auto" alt="Player Image">
                    <div class="card-body text-center">
                        <h5 class="card-title fw-bold">Name: ${data.strPlayer}</h5>
                        <p class="card-text mb-1"><strong>Sport:</strong> ${data.strSport}</p>
                        <p class="card-text mb-1"><strong>Position:</strong> ${data.strPosition}</p>
                        <p class="card-text mb-1"><strong>Team:</strong> ${data.strTeam}</p>
                        <p class="card-text mb-1"><strong>Country:</strong> ${data.strNationality}</p>                        
                        <p class="card-text mb-1"><strong>Gender:</strong> ${data.strGender}</p>                        
                        <p class="card-text mb-1"><strong>Salary:</strong> ${data.strWage}</p>                        
                        <p class="card-text"><strong>Description:</strong> ${getFirstTenWords(data.strDescriptionEN)}</p>                        
                        <div class="d-flex justify-content-center align-items-center mb-2">
                            <a href=${data.strFacebook} class="text-decoration-none">
                                <i class="text-paste fa-brands fa-facebook px-1 fs-5"></i>
                            </a>
                            <a href=${data.strInstagram} class="text-decoration-none">
                                <i class="text-paste fa-brands fa-instagram px-1 fs-5"></i>
                            </a>
                            <a href=${data.strTwitter} class="text-decoration-none px-1">
                                <i class="text-paste fa-brands fa-twitter px-1 fs-5"></i>
                            </a>
                        </div>
                        <div class="d-flex flex-column">
                            <button class="mb-2 btn btn-primary bg-paste border-0 py-2 add-to-group-btn" type="button" onclick="handleAddToGroup('${data.strPlayer}', '${data.strCutout}', '${data.strGender}', this)">Add to Group</button>
                            <button class="btn btn-primary bg-paste border-0 py-2" type="button" onclick="handleShowDetails('${data.idPlayer}')" data-bs-toggle="modal"  data-bs-target="#staticBackdrop">Details</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        container.appendChild(div);
    })

    
};

const handleAddToGroup = (name, photo, gender, button) => {
    if (totalPlayers < 11) {
        const cart = document.getElementById("cart-data");
        const totalPlayersCount = document.getElementById("total-players").innerText;
        const totalMalesPlayers = document.getElementById("total-males").innerText;
        const totalFemalesPlayers = document.getElementById("total-females").innerText;
        totalPlayers = parseInt(totalPlayersCount);
        let totalMales = parseInt(totalMalesPlayers);
        let totalFemales = parseInt(totalFemalesPlayers);

        totalPlayers += 1;
        if (gender === "Male") {
            totalMales += 1;
        } else if (gender === "Female") {
            totalFemales += 1;
        }

        document.getElementById("total-players").innerText = totalPlayers;
        document.getElementById("total-males").innerText = totalMales;
        document.getElementById("total-females").innerText = totalFemales;

        const div = document.createElement("div");

        div.innerHTML = `
            <div class="col-6">
                <div class="d-flex align-items-center gap-2 px-3">
                    <div class="cart-item">
                        <img src="${photo}" alt="${name}" class="cart-img" />
                    </div>
                    <h6 class="fw-bold my-auto">${name}</h6>
                </div>
            </div>
        `;

        cart.appendChild(div);

        button.disabled = true;

        if (totalPlayers === 11) {
            const allButtons = document.querySelectorAll(".add-to-group-btn");
            const div = document.createElement("div"); 

            allButtons.forEach(btn => {
                btn.disabled = true;
                btn.classList.add("disable")
            });                           
            div.innerHTML = `
                <div class="alert alert-danger mb-0" role="alert">
                    You have already added 11 players, You can not add more!
                <div>
            `;
            window.alert("You have already added 11 players, You can not add more!")
            maxAlertBox.appendChild(div);
        }        
    }
};

document.getElementById("search-input").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        handleSearch();
    }
});