export const apiKey = 'https://remotedblab-a2630.firebaseio.com/';

export const getAllBooks = () => {
    return fetch(apiKey + 'books.json').then(x => x.json())
};

export const getBookById = (bookId) => {
    return fetch(`${apiKey}books/${bookId}.json`).then(x => x.json())
};

export const createNewBook = (bookBody) => {
    return fetch(apiKey + 'books.json', {
        method: 'POST', 
        body: JSON.stringify(bookBody)
    });
};

export const updateBook = (bookId, bookBody) => {
    return fetch(`${apiKey}books/${bookId}.json`, {
        method: 'PUT', 
        body: JSON.stringify(bookBody)
    });
};

export const deleteBook = (bookId) => {
    return fetch(`${apiKey}books/${bookId}.json`, {
        method: 'DELETE',
    });
};
