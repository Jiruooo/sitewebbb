document.addEventListener("DOMContentLoaded", function () {
    const produits = document.querySelectorAll(".produit");
    const listeProduits = document.getElementById("liste-produits");
    const totalPrix = document.getElementById("total-prix");
    let prixTotal = 0;
    const panier = {};

    produits.forEach(function (produit) {
        const boutonAjouter = produit.querySelector(".ajouter");
        const boutonRetirer = produit.querySelector(".retirer");
        const nomProduit = boutonAjouter.dataset.nom;
        const prixProduit = parseFloat(boutonAjouter.dataset.prix);

        boutonAjouter.addEventListener("click", function () {
            if (panier.hasOwnProperty(nomProduit)) {
                panier[nomProduit].quantite++;
            } else {
                panier[nomProduit] = {
                    prix: prixProduit,
                    quantite: 1
                };
            }

            prixTotal += prixProduit;
            afficherPanier();
        });

        boutonRetirer.addEventListener("click", function () {
            if (panier.hasOwnProperty(nomProduit) && panier[nomProduit].quantite > 0) {
                panier[nomProduit].quantite--;
                prixTotal -= prixProduit;
                
                if (panier[nomProduit].quantite === 0) {
                    delete panier[nomProduit];
                }
                
                afficherPanier();
            }
        });
    });

    function afficherPanier() {
        listeProduits.innerHTML = "";
        totalPrix.textContent = prixTotal.toFixed(2) + "€";

        for (const produit in panier) {
            const li = document.createElement("li");
            li.textContent = `${produit} - ${panier[produit].quantite} - ${panier[produit].prix.toFixed(2)}€`;
            listeProduits.appendChild(li);
        }
    }
});
