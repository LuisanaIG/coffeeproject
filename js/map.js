//Definir el mapa y mapa base//

let graymap = L.esri.basemapLayer('Gray', {

});

let streetmap = L.esri.basemapLayer('Streets', {

});

let mymap = L.map('mapid', {
  center: [20, 0],
  zoom: 2,
  layers: [streetmap, graymap],
  boxZoom: true,
  doubleClickZoom: true,
  zoomAnimation: true,
  dragging: true,
  condensedAttributionControl: false
});



//Marker personalizado de Flaction//
let makerCup =  L.icon({
        iconUrl: "images/barista.png",
        iconSize: [34 , 34],
        iconAnchor: [15, 30]
      });

  let markerPlant = L.icon({
    iconUrl: "images/plant.png",
    iconSize: [34, 34],
    iconAnchor: [15, 30]
  });

  let markerSack = L.icon({
    iconUrl: "images/sack.png",
    iconSize: [24, 24],
    iconAnchor: [15, 30]
  });
//Definir Geojason//
let coffeeplaces = L.geoJson (coffeepoints, {
  onEachFeature: function (feature, layer) {
    layer.bindPopup("<div class= 'popupcoffee'><h3>" + feature.properties.name + "</h3></div>"
      + "<div class ='infocafe'><p><b>Marca del Café: </b>" + feature.properties.coffee_brand
      + "<br><b>Origen: </b>" + feature.properties.origin
      + "<br><b>Tostado: </b>" + feature.properties.roasted_oring
      + "<br><b>Venden café en grano: </b>" + feature.properties.sell_coffee_bean
      + "<br><b>Teléfono: </b>" + feature.properties.phone
      + "<br><b>Horario: </b>" + feature.properties.schedule
      + "<br><b>Dirección: </b>" + feature.properties.address
      + "</div></p>");
    layer.setIcon(makerCup)
  }
}).addTo(mymap);

let origenplaces = L.geoJson (origenpoints, {
  onEachFeature: function (feature, layer) {
    layer.bindPopup("<div class= 'popuporigen'><h3>" + feature.properties.origen + "</h3></div>"
      + "<div class ='infoorigen'><p><b>Destino en España: </b>" + feature.properties.destino
      + "</div></p>");
    layer.setIcon(markerPlant)
  }
}).addTo(mymap);

let roasterplaces = L.geoJson (roasterpoints, {
  onEachFeature: function (feature, layer) {
    layer.bindPopup("<div class= 'popuproaster'><h3>" + feature.properties.name + "</h3></div>"
      + "<div class ='inforoaster'><p><b>Origen: </b>" + feature.properties.origen_seed
      + "<br><b>Teléfono: </b>" + feature.properties.phone
      + "<br><b>Horario: </b>" + feature.properties.schedule
      + "<br><b>Dirección: </b>" + feature.properties.address
      + "</div></p>");
    layer.setIcon(markerSack)
  }
}).addTo(mymap);


//Controlador de capas//

let baseMaps = {
    'Streets Basemap': streetmap,
    'Gray Basemap': graymap
  };

let overlayMaps = {
    "Café Especialidad" : coffeeplaces,
    "Origen del Café": origenplaces,
    "Tostadores": roasterplaces
  };

L.control.layers(baseMaps, overlayMaps).addTo(mymap);


//Botón de Home//
L.easyButton('<i class="fas fa-home"></i>', function(btn1, map){
    map.setView([20, 0], 2);
}).addTo(mymap);

//Atribución Plugin//
L.control.condensedAttribution({
  emblem: '<div class="emblem-wrap"><i class="fas fa-copyright"></i></div>',
  prefix: "<a href= 'https://leafletjs.com/' title='Leaflet'>Leaflet</a> | Icons made by <a href='https://www.flaticon.com/authors/freepik' title='Freepik'>Freepik</a> &  <a href='https://www.flaticon.com/authors/eucalyp' title='Eucaly'>Eucalyp</a>  from <a href='https://www.flaticon.com/' title='Flaticon'> www.flaticon.com</a>",
}).addTo(mymap);
