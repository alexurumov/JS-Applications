export function displaySuccess(message) {
    // const element = document.querySelector('#infoBox > span');
    const div = document.querySelector('#infoBox');
    div.textContent = message;
    div.style.display = 'block';

    div.addEventListener('click', () => div.style.display = 'none');

    setTimeout(() => div.style.display = 'none', 3000);
}

export function displayError(message) {
    // const element = document.querySelector('#errorBox > span');
    const div = document.querySelector('#errorBox');
    div.textContent = message;
    div.style.display = 'block';

    div.addEventListener('click', () => div.style.display = 'none');
}