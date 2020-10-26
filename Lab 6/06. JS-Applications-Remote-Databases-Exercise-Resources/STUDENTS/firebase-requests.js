export const apiKey = 'https://remotedblab-a2630.firebaseio.com/';

export const getAllStudents = () => {
    return fetch(apiKey + 'students.json').then(x => x.json())
};

export const getStudentById = (studentId) => {
    return fetch(`${apiKey}students/${studentId}.json`).then(x => x.json())
};

export const createNewStudent = (studentBody) => {
    return fetch(apiKey + 'students.json', {
        method: 'POST', 
        body: JSON.stringify(studentBody)
    });
};

export const updateStudent = (studentId, studentBody) => {
    return fetch(`${apiKey}students/${studentId}.json`, {
        method: 'PUT', 
        body: JSON.stringify(studentBody)
    });
};

export const deleteStudent = (studentId) => {
    return fetch(`${apiKey}students/${studentId}.json`, {
        method: 'DELETE',
    });
};
