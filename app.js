function kiiras() {
    const http = new XMLHttpRequest();
    
    http.onload = function() {
        if (http.status === 200) {
            try {
                const termek = JSON.parse(http.responseText);
                
                
                if (termek.image) {
                    document.getElementById("main-image").src = termek.image;
                    document.getElementById("thumbnails1").src = termek.image;
                    document.getElementById("thumbnails2").src = termek.image;
                    document.getElementById("thumbnails3").src = termek.image;
                    document.getElementById("thumbnails4").src = termek.image;
                }

                
                
                document.getElementById("termek").innerText = termek.name || "";
                document.getElementById("leiras").innerText = termek.description || "";
                
                
                const formazottAr = termek.price ? termek.price.toLocaleString('hu-HU') : "";
                document.getElementById("ar").innerText = formazottAr + " " + (termek.currency || "");
                
                
                document.getElementById("raktar-text").innerText = "Raktáron (" + termek.stock + " db)";

               
                document.getElementById("rating-stars").innerText = "★★★★★";
                document.getElementById("rating-text").innerText = termek.rating +" "+ "(127 vélemény)";

                
                if (termek.manufacturer) {
                    document.getElementById("gyarto-ertek").innerText = termek.manufacturer.name || "";
                    document.getElementById("orszag-ertek").innerText = termek.manufacturer.country || "";
                    document.getElementById("garancia-ertek").innerText = termek.manufacturer.garancia + " " + termek.manufacturer.garanciaIdo;
                    document.getElementById("szallitas-ertek").innerText = termek.manufacturer.szallitas || "";
                }

                
                if (termek.features && Array.isArray(termek.features)) {
                    let jellemzokHTML = "";
                    const ikonLista = ["cpu", "memory-stick", "hard-drive", "component", "monitor", "layout-grid"];
                    
                    termek.features.forEach((feature, index) => {
                        let iconName = ikonLista[index] || "check";
                        jellemzokHTML += `
                        <div class="flex items-center gap-3 py-1.5 px-2 border-b border-slate-100 last:border-b-0 text-xs">
                        <i data-lucide="${iconName}" class="w-4 h-4 text-slate-600"></i>
                        <span class="font-medium text-slate-800">${feature}</span>
                        </div>
                        `;
                    });
                    
                    document.getElementById("jellemzok-lista").innerHTML = jellemzokHTML;
                }

                
                if (termek.reviews && Array.isArray(termek.reviews)) {
                    let velemenyekHTML = "";
                    
                    termek.reviews.forEach(review => {
                        velemenyekHTML += `
                            <div class="bg-slate-50 p-3 rounded-lg border border-slate-100 text-xs space-y-1">
                                <div class="flex justify-between font-semibold text-slate-800">
                                    <span>${review.user}</span>
                                </div>
                                <div class="text-amber-400">★ ★ ★ ★ ★</div>
                                <p class="text-slate-600">${review.comment}</p>
                            </div>
                        `;
                    });
                    
                    document.getElementById("velemenyek-lista").innerHTML = velemenyekHTML;
                }

               
                if (typeof lucide !== 'undefined') {
                    lucide.createIcons();
                }

            } catch (e) {
                console.error(e);
                document.getElementById("termek").innerText = "Hiba történt az adatok feldolgozásakor!";
            }
        }
    };

    http.onerror = function() {
        console.error("Hálózati hiba.");
    };

    http.open("GET", "termek.json", true);
    http.send();
}

kiiras();