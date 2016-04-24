$.ajax({
  method: 'GET',
  url:'http://api.openweathermap.org/data/2.5/box/city?bbox=-124,32,-116,41,10&cluster=yes&mode=json&units=metric&APPID=5eb9d8dba98c4366e7effd78561bdde6',
  success: function(weather_data){
    console.log(weather_data);
  }

});
