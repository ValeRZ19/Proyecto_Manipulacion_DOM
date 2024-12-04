
const cardsContainer= document.getElementById('cards_container');

document.addEventListener('DOMContentLoaded', async () => {
    // const key = 'countries';
    const storeCountries = localStorage.getItem('countries');

    if (storeCountries) {
        countries = JSON.parse(storeCountries);
        showCountries(countries); 
    } else {
        console.log('No se encontraron datos');
        window.location.href = '/index.html';
    }
});

// function ordenarAlfabeticamente(){
    
// }

function showCountries(countries){
    cardsContainer.innerHTML = ''; 

    if(countries.length > 0){
        countries.sort((a,b) =>{
            return a.name.common.localeCompare(b.name.common);
        });
        countries.forEach(country => {
            const card = document.createElement('div');
            card.classList.add('col-12');
            cardsContainer.appendChild(card);
            card.innerHTML = ` <div class="card">
                      <div class="card-body">
                            <img loading="lazy" class="responsive-img" src=${country.flags.png} alt="${country.flags.alt}">
                                <p>${country.name.common} - ${country.cca2}</p>
                                <button class="btn btn_detalles" data-bs-toggle="modal" data-bs-target="#modal${country.cca2}">More Details</button>
                        </div>
                    </div>`;


            const modal = document.createElement('div');
            modal.id = `modal${country.cca2}`;
            modal.classList.add('modal', 'fade');
            modal.setAttribute('tabindex', '-1');
            modal.setAttribute('aria-labelledby', `modalLabel${country.cca2}`);

            let currencies = '';
            if (country.currencies) {
                currencies = Object.values(country.currencies)
                    .map(currency => `${currency.name} (${currency.symbol})`)
                    .join(' - ');
            }

            modal.innerHTML = `
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="modalLabel${country.cca2}">${country.name.common}</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <img src="${country.flags.svg}" alt="${country.flags.alt}" class="img-fluid mb-3">
                        <p><strong>Region:</strong> ${country.region}</p>
                        <p><strong>Subregion:</strong> ${country.subregion ? country.subregion : 'Subregion not found'}</p>
                        <p><strong>Capital:</strong> ${country.capital}</p>
                        <p><strong>Population:</strong> ${country.population.toLocaleString('es-ES')}</p>
                        <p><strong>Currencie:</strong> ${currencies}</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
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


// const btnSearch = document.getElementById('btnSearch');
// const input = document.getElementById('input__text')

// btnSearch.addEventListener('click', () => {
//     const input__text = input.value.trim().toLowerCase();

//     const filterCountry = countries.filter(country =>
//         country.name.common.toLowerCase().includes(input__text) || country.cca2.toLowerCase().includes(input__text)
//     );

//     showCountries(filterCountry); 
// });

let regionSelect = document.getElementById('select_region');
regionSelect = document.addEventListener('change', (event)=>{
    const region = event.target.value;
    const countries = JSON.parse(localStorage.getItem('countries'));
    let filter;

    if (region.selectedIndex === 0) {
        filter = countries;
    } else {
        filter = countries.filter(country => country.region === region); 
    }

    showCountries(filter); 
})