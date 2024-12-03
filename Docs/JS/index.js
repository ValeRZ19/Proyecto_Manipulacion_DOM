
let paises = [];

async function ObtenerPaises() {
    try {
        const storePaises = localStorage.getItem('paises');
        
        if(storePaises){
            paises = JSON.parse(storePaises);
            console.log('localstorage',paises)
        }
        else{
            const llamadaApi = await fetch('https://restcountries.co/v3.1/all')
            const respuesta = await llamadaApi.json();
            console.log('paises', respuesta)
            localStorage.setItem('paises', JSON.stringify(respuesta)); 
            return respuesta
        }
    } catch (error) {
        console.log('Error al realizar la consulta', error)
    }
}


