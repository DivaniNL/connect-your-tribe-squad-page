document.addEventListener("DOMContentLoaded", function () {
    let nicknameMode = false;
    let icon_bee = document.querySelector(".icon-bee");
    let icon_ひと = document.querySelector(".icon-ひと");
    let button = document.querySelector(".filter-namemode");
    let label = document.querySelector("#searchType");

    button.addEventListener("click", function () {
        nicknameMode = !nicknameMode;
        console.log("changed nickname mode to", nicknameMode);

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

                //verander de iconen
                icon_bee.style.display = "none";
                icon_ひと.style.display = "inline";

                // Verander de aria-label en label van de knop
                button.ariaLabel = "Wissel tussen bij- en normale-modus. Dit is nu de Bijnaam modus";
                label.textContent = "Normale modus";
            } else { 
                /*Als de Bijnaam modus uit staat, of deze persoon geen bijnaam heeft, toon de echte naam*/
                nameField.textContent = personName;
                profileLink.setAttribute("aria-label", `Bekijk profiel van ${personName}`);
                profileImage.setAttribute("alt", `Profielfoto van ${personName}`);

                //verander de iconen
                icon_bee.style.display = "inline";
                icon_ひと.style.display = "none";

                // Verander de aria-label en label van de knop
                button.ariaLabel = "Wissel tussen bij- en normale-modus. Dit is nu de Normale modus";
                label.textContent = "Bij-modus";
            }
        });
    });
});