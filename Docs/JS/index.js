
let countries = [];

async function getCountries() {
    try {
        const storeCountries = localStorage.getItem('countries');
        
        if(storeCountries){
            countries = JSON.parse(storeCountries);
            console.log('localstorage',countries)
            return countries;
        }
        else{
            const llamadaApi = await fetch('https://restcountries.com/v3.1/all')
            const response = await llamadaApi.json();
            console.log('countries', response)
            localStorage.setItem('countries', JSON.stringify(response)); 
            return response;
            
        }
    } catch (error) {
        console.log('Error when performing the query', error)
    }
}


