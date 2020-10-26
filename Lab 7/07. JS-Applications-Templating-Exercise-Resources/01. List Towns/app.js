const URL = 'https://restcountries.eu/rest/v2/all';

(async() => {

    const templateSrc = await fetch('./countries-template.hbs').then((r) => r.text());

    const template = Handlebars.compile(templateSrc);

    const countriesData = await fetch(URL).then((r) => r.json());

    const resultHTML = template({countries: countriesData});

    const container = document.querySelector('#root');

    container.innerHTML += resultHTML;

})();