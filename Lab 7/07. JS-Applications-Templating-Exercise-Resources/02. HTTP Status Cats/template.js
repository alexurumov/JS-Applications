(async() => {

    Handlebars.registerPartial(
        'cat', 
        await fetch('./single-cat-template.hbs')
            .then((r) => r.text())
    );

    const templateSrc = await fetch('./cats-template.hbs')
        .then((r) => r.text());

    const template = Handlebars.compile(templateSrc);

    const resultHTML = template({ cats });

    document.querySelector('section#allCats').innerHTML += resultHTML;
    
    document.querySelectorAll('button').forEach((btn) => {

        btn.addEventListener('click', () => {
            const parent = btn.parentNode;
            const statusDiv = parent.querySelector('div.status');
            const { display } = statusDiv.style;
    
            if (display === 'none') {
                statusDiv.style.display = 'block';
                btn.textContent = 'Hide status code';
            } else {
                statusDiv.style.display = 'none';
                btn.textContent = 'Show status code';
            }
        })
    });

})();