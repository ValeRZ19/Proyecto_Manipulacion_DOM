document.addEventListener('DOMContentLoaded', function() {
    M.AutoInit();
 });


let paises = [];

async function ObtenerAPI() {
    try {
        const storePaises = localStorage.getItem('paises');
        
        if(storePaises){
            paises = JSON.parse(storePaises);
            console.log(paises)
        }
        else{
            const respuesta = await fetch('https://restcountries.com/v3.1/all')
            const pais = await respuesta.json();
            localStorage.setItem('paises', JSON.stringify(pais)); 
            console.log('', pais);
        }
    } catch (error) {
        console.log('Error al realizar la consulta', error)
    }
}
 