import { monkeys } from './monkeys.js';

(async() => {

    Handlebars.registerPartial(
        'monkey', 
        await fetch('./single-monkey-template.hbs')
            .then((r) => r.text())
    );

    const templateSrc = await fetch('./monkeys-wrapper-template.hbs')
        .then((r) => r.text());

    const template = Handlebars.compile(templateSrc);

    const resultHTML = template({ monkeys });

    document.querySelector('section').innerHTML += resultHTML;

    document.querySelectorAll('button').forEach((btn) => {
        btn.addEventListener('click', () => {
            const parent = btn.parentNode;
            const infoP = parent.querySelector('p');
            const { display } = infoP.style;

            if (display === 'none') {
                infoP.style.display = 'block';
            } else {
                infoP.style.display = 'none';
            }
        })
    });

})();