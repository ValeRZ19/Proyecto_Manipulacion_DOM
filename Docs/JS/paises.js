
const contenedorCartas= document.getElementById('contenedor_cartas');

document.addEventListener('DOMContentLoaded', async () => {
    // const key = 'paises';
    const storePaises = localStorage.getItem('paises');

    if (storePaises) {
        paises = JSON.parse(storePaises);
        mostrarPaises(paises); 
    } else {
        console.log('No se encontraron datos. Por favor, vuelve al inicio para cargar los países.');
        window.location.href = '/index.html';
    }
});


function mostrarPaises(paises){
    contenedorCartas.innerHTML = ''; 

    if(paises.length > 0){
        paises.sort((a,b) =>{
            if(a.name.common < b.name.common){
                return -1;
            }else if(a.name.common > b.name.common){
                return 1;
            }
            return 0;
            // return a.name.common.localeCompare(b.name.common);
        });
        paises.forEach(pais => {
            const carta = document.createElement('div');
            carta.classList.add('col-12');
            contenedorCartas.appendChild(carta);
            carta.innerHTML = ` <div class="card">
                      <div class="card-body">
                            <img loading="lazy" class="responsive-img" src=${pais.flags.png} alt="${pais.flags.alt}">
                                <p>${pais.name.common}</p>
                                <button class="btn btn_detalles" data-bs-toggle="modal" data-bs-target="#modal${pais.cca2}">Ver Detalles</button>
                        </div>
                    </div>`;


            const modal = document.createElement('div');
            modal.id = `modal${pais.cca2}`;
            modal.classList.add('modal', 'fade');
            modal.setAttribute('tabindex', '-1');
            modal.setAttribute('aria-labelledby', `modalLabel${pais.cca2}`);

            let currencies = '';
            if (pais.currencies) {
                currencies = Object.values(pais.currencies)
                    .map(currency => `${currency.name} (${currency.symbol})`)
                    .join(' - ');
            }

            modal.innerHTML = `
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="modalLabel${pais.cca2}">${pais.name.common}</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <img src="${pais.flags.svg}" alt="${pais.flags.alt}" class="img-fluid mb-3">
                        <p><strong>Region:</strong> ${pais.region}</p>
                        <p><strong>Subregion:</strong> ${pais.subregion}</p>
                        <p><strong>Capital:</strong> ${pais.capital}</p>
                        <p><strong>Población:</strong> ${pais.population}</p>
                        <p><strong>Población:</strong> ${currencies}</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                    </div>
                </div>
            </div>
        `;
            document.body.appendChild(modal);
        });
        
    }
    else{

    }
}



// const btnBuscar = document.getElementById('btnBuscar');
// const input = document.getElementById('input__texto')

// btnBuscar.addEventListener('click', () => {
//     const input__texto = input.value.trim().toLowerCase();
//     const filtradoNombre = paises.filter(pais =>
//         pais.name.common.toLowerCase().includes(input__texto) || pais.cca2.toLowerCase().includes(input__texto)
//     );

//     mostrarPaises(filtradoNombre); 
// });

let regionSelect = document.getElementById('select_region');
regionSelect = document.addEventListener('change', (event)=>{
    const region = event.target.value;
    const paises = JSON.parse(localStorage.getItem('paises'));
    let filtrado;

    if (region.selectedIndex === 0) {
      filtrado = paises;
    } else {
        filtrado = paises.filter(pais => pais.region === region); 
    }

    mostrarPaises(filtrado); 
})