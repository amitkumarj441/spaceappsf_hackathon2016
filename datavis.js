window.onload = function(){
      var API_KEY = 'APIKEYHERE';
      var MOSAIC_NAME = 'open_california_hybrid_mosaic';

      $.ajax({
        type: 'GET',
        url: 'https://api.planet.com/v0/mosaics/' + MOSAIC_NAME,
        beforeSend: function(xhr){
          xhr.setRequestHeader('Authorization', 'api-key '+API_KEY);
        },
        success: function(data) {

          var subdomainInfo = /{(\d)-(\d)}/.exec(data.links.tiles);
          var subdomains = ""
          for (var i = parseInt(subdomainInfo[1]); i <= parseInt(subdomainInfo[2]); i++) {
            subdomains += i;
          }
          var tileUrl = data.links.tiles.replace(subdomainInfo[0], '{s}') + '?api_key=' + API_KEY;

          var map = L.map('map').setView([38.56, -121.47], 8);
          L.tileLayer('http://52.8.161.8/tiles/tiles.py/osm/{z}/{x}/{y}.png',{ }).addTo(map);
          L.tileLayer(tileUrl, {
            subdomains: subdomains,
            attribution: 'Imagery &copy; <a href="https://planet.com">Planet Labs</a>',
            maxZoom: 18
          }).addTo(map);
        },
        error: function(data) {
          if (data.status === 401) {
            window.alert('Authorization error to Planet API');
          } else if (data.status === 404) {
            window.alert('Mosaic ' + MOSAIC_NAME + " doesn't exist, or your account does not have access to it");
          } else {
            window.alert('Error getting mosaic');
          }
        }
      });
};