document.addEventListener("DOMContentLoaded", function () {
    let nicknameMode = false;
    let icon_bee = document.querySelector(".icon-bee");
    let icon_ひと = document.querySelector(".icon-ひと");
    let button = document.querySelector(".filter-namemode");
    let label = document.querySelector("#searchType");

    button.addEventListener("click", function () {
        nicknameMode = !nicknameMode;
        console.log("changed nickname mode to", nicknameMode);
        if (nicknameMode){
            //verander de iconen
            icon_bee.style.display = "none";
            icon_ひと.style.display = "inline";
            console.log("hoi");
            // Verander de aria-label en label van de knop
            button.ariaLabel = "Wissel tussen bij- en normale-modus. Dit is nu de Bijnaam modus";
            label.textContent = "Normale modus";
        }
        else{
            //verander de iconen
            icon_bee.style.display = "inline";
            icon_ひと.style.display = "none";

            // Verander de aria-label en label van de knop
            button.ariaLabel = "Wissel tussen bij- en normale-modus. Dit is nu de Normale modus";
            label.textContent = "Bij-modus";
        }
        document.querySelectorAll(".one-person").forEach((personElement) => {
            const nameField = personElement.querySelector(".name-field");
            const profileLink = personElement.querySelector(".profile-link");
            const profileImage = personElement.querySelector(".profile-image");
            const personName = nameField.dataset.name;
            const personNickname = nameField.dataset.nickname;

            if (nicknameMode && personNickname) { 
                /* Als Bijnaammodus aan staat en deze persoon heeft een bijnaam ingevuld, gebruik die dan */
                nameField.textContent = personNickname;
                profileLink.setAttribute("aria-label", `Bekijk profiel van ${personNickname}`);
                profileImage.setAttribute("alt", `Profielfoto van ${personNickname}`);
            } else { 
                /*Als de Bijnaam modus uit staat, of deze persoon geen bijnaam heeft, toon de echte naam*/
                nameField.textContent = personName;
                profileLink.setAttribute("aria-label", `Bekijk profiel van ${personName}`);
                profileImage.setAttribute("alt", `Profielfoto van ${personName}`);
            }
        });
    });
    let select = document.querySelector("#filter-dish");
    let url = window.location.href;
    let dish = url.split("/gerecht/")[1];

    if (dish) {
        select.value = dish;
    }

    select.addEventListener("change", function (e) {
        let gerecht = e.target.value;
        console.log(gerecht);
        if(gerecht != "" && gerecht != null){
            window.location.href = "/gerecht/" + gerecht;
        }else{
            window.location.href = "/";
        }
    });

});


// document.getElementById("searchForm").addEventListener("submit", function (e) {
//     let searchInput = document.getElementById("search").value.trim();
//     if (searchInput) {
//       // Update the action attribute to include the search term
//       this.action = "/search/" + searchInput;
//     } else {
//       // Prevent form submission if the search term is empty
//       e.preventDefault();
//       alert("Vul een zoekterm in.");
//     }
//   });