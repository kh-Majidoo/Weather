var curr_btn = 'c';
var area = 'london';
var hour_wea_curr;

var stSh ;
var stSc ;
/*---------------------------------------------------------------------------*/
//console.log(new Date().getHours());
//creating the hours divs
function creatHours() {
  for (let i = 0; i < 24; i++) {
    if (i == 0) {
      /*Make this a switch for god's sake*/
      forecast_inner.innerHTML += `
            <div class="hour">
              <p class="hour_header">${i+ 12} AM</p>
              <p id="hour_${i}_temp" class="hour_wea_curr">--</p>
              <p id="hour_${i}_feel" class="hour_wea_feel">Feels like : --</p>
              </div>
              `
    } else if (i < 12) {
      /*Make this a switch for god's sake*/
      forecast_inner.innerHTML += `
            <div class="hour">
              <p class="hour_header">${i} AM</p>
              <p id="hour_${i}_temp" class="hour_wea_curr">--</p>
              <p id="hour_${i}_feel" class="hour_wea_feel">Feels like : --</p>
              </div>
              `
    } else if(i == 12){
      forecast_inner.innerHTML += `
            <div class="hour">
              <p class="hour_header"> ${i} PM</p>
                <p id="hour_${i}_temp" class="hour_wea_curr">--</p>
                <p id="hour_${i}_feel" class="hour_wea_feel">Feels like : --</p>
              </div>
              `
    }else if (i > 12){
      forecast_inner.innerHTML += `
            <div class="hour">
              <p class="hour_header"> ${i - 12} PM</p>
                <p id="hour_${i}_temp" class="hour_wea_curr">--</p>
                <p id="hour_${i}_feel" class="hour_wea_feel">Feels like : --</p>
              </div>
              `
    }
  }
  hour_wea_curr = document.getElementsByClassName("hour_wea_curr");
  hour_wea_feel = document.getElementsByClassName("hour_wea_feel");
}
//The holy Fetch function
creatHours();

function getData() {
  fetch(`http://api.weatherapi.com/v1/forecast.json?key=41633248958f40f1a78164949202611&q=${area}&days=3`)
    .then(function(result) {
      return result.json();
    })
    .then(function(data) {
      const myData = data;
      //location
      //Status stuff
      one_area.innerHTML = data.location.name;
      one_country.innerHTML = data.location.country;
      one_main_img.src = `http:${data.current.condition.icon}`;
      //one_main_text.innerHTML = data.current.condition.text;

      humidity.innerHTML = data.current.humidity;
      /*humidity_bar.value = data.current.humidity;*/
      w_speed.innerHTML = data.current.wind_kph;
      visibility.innerHTML = data.current.vis_km;
      pressure_mb.innerHTML = data.current.pressure_mb;
      /*---------------------------------------------------------------------------*/
      //Forecast
      let k = 0;
      let forecast_day = data.forecast.forecastday;
        for (let i = 0; i < 24; i++) {
          if (curr_btn == 'c') {
            curr_temp.innerHTML = `${data.current.temp_c}° C`;
            hour_wea_curr[k].innerHTML = `${forecast_day[0].hour[i].temp_c}° <span class="hour_wea_curr_c">C</span>`;
            hour_wea_feel[k].innerHTML = `Feels like : ${forecast_day[0].hour[i].feelslike_c}° C`;
          } else if (curr_btn == 'f') {
            curr_temp.innerHTML = `${data.current.temp_f}° F`;
            hour_wea_curr[k].innerHTML = `${forecast_day[0].hour[i].temp_f}° <span class="hour_wea_curr_c">F</span>`;
            hour_wea_feel[k].innerHTML = `Feels like : ${forecast_day[0].hour[i].feelslike_f}° F`;
          }
          k++;
        }



      /*---------------------------------------------------------------------------*/
    })
    //error handling
    .catch(error => console.log('error is', error));
}

//Themes
    btn_w.onclick = () => {
      if(curr_btn == 'c') {
        curr_btn = 'f' ;
        btn_w.innerHTML = `C °`
      }
      else {
        curr_btn = 'c';
        btn_w.innerHTML = `F °`
      }
      getData();
    };

one_buttons_search.onclick = (() => {
  area = `${one_buttons_search_bar.value}`;
  getData();
})
window.setInterval(function() {
  getData();
}, 500);
/*---------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------*/
new Glider(document.querySelector('.glider'), {
  slidesToShow: 4,
  slidesToScroll: 3,
  draggable: true,
  dots: '.dots',
  arrows: {
    prev: '.glider-prev',
    next: '.glider-next'
  }
});
