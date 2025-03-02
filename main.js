// Fatch leaflet map to our web page
const map = L.map('map',{
    center: [22.9074872, 79.07306671],
    zoom: 5})

    // Create a map layer that contain open street map(OSM)
const layer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{
    attribution: '&copy; <a href="">Debashis Patra</a>'
})

layer.addTo(map); //then add map to the web page or div


// Call/Generate markup for GeoJSON file
function generateList(){
    // select ul, to show the json file
    const newUl = document.querySelector('.list');

    // Apply loop in GeoJSON file, for showing store details
    storeList.forEach((shop) => {
        // Create Li, Div, Ancher tag and Paragraph, for show store details dynamically
        const li = document.createElement("li");
        const div = document.createElement("div");
        const a = document.createElement("a");
        const p = document.createElement("p");

        a.addEventListener("click", ()=>{
            flyToStore(shop);
        })

        // Here we define which data show in which place
        div.classList.add("shop-item");
        a.innerText = shop.properties.name;
        a.href = "#";
        p.innerText = shop.properties.address;

        // Now we stactured or arrange the data in main div 1 by 1
        div.appendChild(a);
        div.appendChild(p);
        li.appendChild(div);
        newUl.appendChild(li);
    });
}
// Call our fuction to show the store list
generateList();


function popupContent(shopContent){
    return `
    <div>
        <h4>${shopContent.properties.name}</h4>
        <p>${shopContent.properties.address}</p>

        <div class = "phone-number">
        <a href = "tel:${shopContent.properties.phone}">${shopContent.properties.phone}</a>
        </div>
    </div>
    `
}

// 
function onEachFeature(feature, layer){
    layer.bindPopup(popupContent(feature), {offset: L.point(0,-8)});
};

// Create a varriable for custom icon
var custom_icon = L.icon({
    iconUrl: "icon.png", //Define the icon url and size
    iconSize: [30,40]
});
// Create a varriable that show GeoJSON to Leaflet map view as store location
const shopsLayer = L.geoJSON(storeList,{
    onEachFeature: onEachFeature, //Leaflet in built function for add point feature
    pointToLayer: function(feature, latlng){
        return L.marker(latlng, {icon: custom_icon}); //Add custom icon as a point layer
    }
});

shopsLayer.addTo(map); //Call this layer to the map


function flyToStore(store){
    const lat = store.geometry.coordinates[0];
    const lag = store.geometry.coordinates[1];

    map.flyTo([lag, lat], 14, {
        duration:3
    });

    setTimeout(() =>{
        L.popup({offset: L.point(0,-8)})
        .setLatLng([lag, lat])
        .setContent(popupContent(store))
        .openOn(map);
    }, 3000);
}



