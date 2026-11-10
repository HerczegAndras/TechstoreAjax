function kiiras() {
    const http = new XMLHttpRequest();
    
    http.onload = function() {
        if (http.status === 200) {
            try {
                const termek = JSON.parse(http.responseText);
                
                
                document.getElementById("main-image").src = termek.image;
                
                
                document.getElementById("thumbnails1").src = termek.image;
                document.getElementById("thumbnails2").src = termek.image;
                document.getElementById("thumbnails3").src = termek.image;
                document.getElementById("thumbnails4").src = termek.image;

               
                document.getElementById("termek").innerHTML = termek.name;
                document.getElementById("leiras").innerHTML = termek.description;
                document.getElementById("rating-text").innerHTML = termek.rating;
                document.getElementById("ar").innerHTML = termek.price + " " + termek.currency;
                
               
                document.getElementById("raktar-text").innerHTML = "Raktáron (" + termek.stock + " db)";
                
                document.getElementById("gyarto-ertek").innerHTML = termek.manufacturer.name;
                document.getElementById("orszag-ertek").innerHTML = termek.manufacturer.country;
                document.getElementById("garancia-ertek").innerHTML = termek.manufacturer.garancia + " " + termek.manufacturer.garanciaIdo;
                document.getElementById("szallitas-ertek").innerHTML = termek.manufacturer.szallitas;


                if (termek.specs && Array.isArray(termek.specs)) {
                let jellemzokHTML = "";
    
                termek.features.forEach(spec => {
                jellemzokHTML += `
                <div class="flex items-center gap-3 p-2 border-b border-slate-100 text-sm">
                <i data-lucide="check" class="w-4 h-4 text-slate-500"></i>
                <span>${spec}</span>
                </div>
                `;
            });
    
    
                document.getElementById("jellemzok-lista").innerHTML = jellemzokHTML;
    
    
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
                }
            }
            
                document.getElementById("jellemzok-lista").innerHTML=termek.features

            } catch (e) {
                console.error(e);
                document.getElementById("termek").innerHTML = "Hiba: Nem sikerült feldolgozni a termék adatait!";
            }
        } else {
            document.getElementById("termek").innerHTML = "Hiba: A termék adatai jelenleg nem érhetők el!";
        }
    };

    http.onerror = function() {
        document.getElementById("termek").innerHTML = "Hiba: Hálózati hiba történt a betöltés során!";
    };

    http.open("GET", "termek.json", true);
    http.send();
}

kiiras();