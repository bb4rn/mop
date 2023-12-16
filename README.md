# mop

mop is a low-effort kit for creating embeddable, interactive soundmaps without the need to code. It's using [Leaflet](https://leafletjs.com/) as an open source map, Google Sheets as a "database" and [public-google-sheets-parser](https://github.com/fureweb-com/public-google-sheets-parser).

## configuration

1. Copy [this sheet](https://docs.google.com/spreadsheets/d/1IdwTTG68o08BeoPjmV410-04hxljbD1R4wK8cybWmdY/edit#gid=0) to your own drive.
2. Make it publicly accessible and copy its link.
3. Paste its link into the main.js file (/assets/js/main.js) and check if the subsheet names match the ones in your sheet.