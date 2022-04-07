const form=document.querySelector('form');
const detail=document.querySelector('.detail');
const card=document.querySelector('.card');

const timeImage=document.querySelector('img.time');
const icon=document.querySelector('.icon img');


const UIupdate=async(data)=>{
    const {detailCity,weather}=data;


    
    detail.innerHTML=`
                <div class="text-muted text-uppercase text-center detail">
                  <h5 class="my-3">${detailCity.LocalizedName}</h5>
                  <div class="my-3">${weather.WeatherText}</div>
                  <div class="display-4 my-4">
                      <span>${weather.Temperature.Metric.Value}</span>
                      <span>&deg;C</span>
                      <span>${weather.Temperature.Imperial.Value}</span>
                      <span>&deg;F</span>
                  </div>
                </div>
    `;

    const iconSrc=`img/icons/${weather.WeatherIcon}.svg`;

    icon.setAttribute('src',iconSrc);

    let timeSrc=null;
    if(weather.IsDayTime){
        timeSrc='img/day.svg';
    }else{
        timeSrc='img/night.svg';
    }
    timeImage.setAttribute('src',timeSrc);

    

 

    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }
}




form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const city=document.querySelector('input').value.trim();
    
    updateCity(city).then(({detailCity,weather})=>{
       {
           UIupdate({detailCity,weather});
       }
    });

    form.reset();

    localStorage.setItem('city',city);

});

const updateCity=async(city)=>{
    const detailCity=await getCity(city);
    const weather=await getWeather(detailCity.Key);
    return { 
        detailCity:detailCity,
        weather:weather
    };
};

if(localStorage.getItem('city')){
    updateCity(localStorage.getItem('city')).then(({detailCity,weather})=>{
        UIupdate({detailCity,weather});
    });
}