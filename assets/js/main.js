// paste the link to your public google sheet here
const sheet_link = "https://docs.google.com/spreadsheets/d/1IdwTTG68o08BeoPjmV410-04hxljbD1R4wK8cybWmdY/edit?usp=sharing"

// add the name of your main subsheet here
const main_subsheet_name = "mop"

// add the name of your second, "options" subsheet here
const options_subsheet_name = "mop_options"



// --- no need to edit below this line :) ---



// get sheet id from link
const sheet_id = sheet_link
  .split("spreadsheets/d/")[1]
  .split("/")[0]

// init
let map, center, default_zoom, max_zoom, tiles, tiles_attribution
let markers = []
let parser = new PublicGoogleSheetsParser()
let md = window.markdownit()

// parse google sheet for map options
parser.parse(sheet_id, options_subsheet_name).then(data => initMapOptions(data, initMap))



function initMapOptions(data, callback) {
  // add map options coming from the sheet
  center = [data[0].center_latitude, data[0].center_longitude]
  default_zoom = data[0].default_zoom
  max_zoom = data[0].max_zoom
  tiles = data[0].tiles_url
  tiles_attribution = data[0].tiles_attribution

  callback()
}

function initMap() {
  // parse map data from the sheet
  parser.parse(sheet_id, main_subsheet_name).then((data) => {
    // get direct link to audio files from their drive links
    prepareSoundLinks(data)

    // create map
    map = L.map("map").setView(center, default_zoom)

    // add map tiles
    L.tileLayer(tiles, {
      maxZoom: max_zoom,
      attribution: tiles_attribution
    }).addTo(map);

    // add markers
    addMarkers(data)

    document.getElementsByClassName('leaflet-control-attribution')[0].innerHTML += ' | <a href="">mop</a>'
  })
}

function prepareSoundLinks(data) {
  data.forEach(function(elem){
    elem.sound_id = elem.sound_url
      .split("file/d/")[1]
      .split("/")[0]
    elem.sound_direct_link = "https://drive.google.com/uc?export=download&id=" + elem.sound_id
  })
}

function addMarkers(data) {
  data.forEach(function(elem, index){
    let latlng = [elem.latitude, elem.longitude]
    let text = elem.text ? md.render(elem.text) : ""
    
    let html_elem = `<div>${text}</div>
    <audio id="player${index}" src="${elem.sound_direct_link}" controls></audio>`

    let marker = L.marker(latlng)
    marker.addTo(map).bindPopup(html_elem)
    
    markers.push(marker)
  })
}