// paste the link to your public google sheet here
let sheet_link = 'https://docs.google.com/spreadsheets/d/1IdwTTG68o08BeoPjmV410-04hxljbD1R4wK8cybWmdY/edit?usp=sharing'

// add the name of your main subsheet here
let main_subsheet_name = 'soundmap_demo'

// add the name of your second, "options" subsheet here
let options_subsheet_name = 'soundmap_demo_options'

// --- no need to edit below this line :) ---

// get sheet id from link
let sheet_id = sheet_link
  .split('spreadsheets/d/')[1]
  .split('/')[0]

// init
let center, default_zoom, max_zoom, tiles, tiles_attribution
let parser = new PublicGoogleSheetsParser()

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
    console.log(data)

    // create map
    let map = L.map('map').setView(center, default_zoom)

    // add map tiles
    L.tileLayer(tiles, {
      maxZoom: max_zoom,
      attribution: tiles_attribution
    }).addTo(map);
  })
}