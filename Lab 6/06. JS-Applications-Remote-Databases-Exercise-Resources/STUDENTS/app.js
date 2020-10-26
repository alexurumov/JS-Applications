import { extractFormData, clearFormFields } from "./form-helpers.js";
import { getAllStudents, updateStudent } from "./firebase-requests.js";

(() => {

    const elements = {
        form: document.querySelector('form'),
        tBody: document.querySelector('tbody'),
    };

    const formInputFields = ['firstName', 'lastName', 'facultyNumber', 'grade'];

    // getAllStudents()
    //     .then(students => {
    //         console.log(students);
    //         // Object.entries(students).map(([id, studentData]) => {
    //         //     console.log(studentData);
    //         //     // addTableRow(elements.tBody, studentData);
    //         // })

    //     });

    // Create New Student
    elements.form.addEventListener('submit', (e) => {
        e.preventDefault();
        let formData = extractFormData(e.target, formInputFields);

        getAllStudents()
        .then(students => {
            let nextId = !students ? 0 : Object.keys(students).length;
            updateStudent(nextId, formData)
            .then(() => getAllStudents())
            .then(resp => {
                Object.entries(resp).map(([id, student]) => {
                    addTableRow(elements.tBody, student, id); 
                });
            })
        })
                
        clearFormFields(e.target, formInputFields);
    });

})();


function addTableRow(tBody, student, id) {
    if (!student) {
        return;
    }
    let tRow = document.createElement('tr');
    tRow.innerHTML = `
    <td>${id}</td>
    <td>${student.firstName}</td>
    <td>${student.lastName}</td>
    <td>${student.facultyNumber}</td>
    <td>${student.grade}</td>
    `;

    tBody.appendChild(tRow);
};

