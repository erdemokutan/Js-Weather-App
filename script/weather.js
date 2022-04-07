const key='';
const getWeather = async (id) => {
    const baseUrl = 'http://dataservice.accuweather.com/currentconditions/v1/';
    const query = `${id}?apikey=${key}`;
    
    const response = await fetch(baseUrl + query);
    const data = await response.json();
    return data[0];
};


const getCity = async (location) => {
    const baseUrl='http://dataservice.accuweather.com/locations/v1/cities/search';
    const query = `?apikey=${key}&q=${location}`;

    const response=await fetch(baseUrl+query);    
    const data=await response.json();

    return data[0];
    console.log(data);
};

getCity('Ankara')
.then(data=>{
   return getWeather(data.Key);

}).then(data=>{
    console.log(data);
})
.catch(err=>{
    console.log(err);
});



