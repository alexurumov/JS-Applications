import { apiKey, createNewBook, getAllBooks, getBookById, updateBook, deleteBook } from "./firebase-requests.js";

(function solve(){

    let elements = {
        form: document.querySelector('form'),
        tBody: document.querySelector('tbody'), 
        loadBooksBtn: document.querySelector("#loadBooks"),
    };

    let formInputs = ['title', 'author', 'isbn'];

    //Add New Book
    elements.form.addEventListener('submit', (e) => {
        e.preventDefault();
        let parsedForm = extractFormData(elements.form, formInputs);
        createNewBook(parsedForm);
        clearFormFields(elements.form, formInputs);
    });

    //Show All Books
    elements.loadBooksBtn.addEventListener('click', () => {
        getAllBooks().then(resp => {
            elements.tBody.innerHTML = '';
            Object.entries(resp).map(([id, book]) => {
                addTableRow(elements.tBody, book, id);
            });
        });
        clearFormFields(elements.form, formInputs);
    });

    //Edit/Delete Book
    elements.tBody.addEventListener('click', (e) => {
        let targetBookId = e.target.closest('tr').dataset.bookId;

        if (e.target instanceof HTMLButtonElement) {
            let {method} = e.target.dataset;
            if (method === 'edit') {
                getBookById(targetBookId).then(resp => {
                    fillFormWithData(elements.form, resp);
                });
                let bookBody = extractFormData(elements.form, formInputs);
                updateBook(targetBookId, bookBody);
            } else {
                deleteBook(targetBookId);
            }

            return;
        }


    });

})();


function extractFormData(form, inputs) {
    return inputs.reduce((acc, curr) => {
        acc[curr] = form.elements[curr].value;
        return acc;
    }, {});
};

function fillFormWithData(form, data) {
    Object.entries(data).map(([key, value]) => {
        form.elements.namedItem(key).value = value;
    })
};

function clearFormFields(form, inputs) {
    inputs.forEach(field => {
        form.elements.namedItem(field).value = '';
    });
};

function addTableRow(tBody, book, bookId) {
    let tRow = document.createElement('tr');
    tRow.setAttribute('data-book-id', bookId);

    tRow.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td>
        <button data-method="edit">Edit</button>
        <button data-method="delete">Delete</button>
    </td>
    `;

    tBody.appendChild(tRow);
}