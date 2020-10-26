export function extractFormData(form, inputs) {
    return inputs.reduce((acc, curr) => {
        acc[curr] = form.elements[curr].value;
        return acc;
    }, {});
};

export function fillFormWithData(form, data) {
    Object.entries(data).map(([key, value]) => {
        form.elements.namedItem(key).value = value;
    })
};

export function clearFormFields(form, inputs) {
    inputs.forEach(field => {
        form.elements.namedItem(field).value = '';
    });
};