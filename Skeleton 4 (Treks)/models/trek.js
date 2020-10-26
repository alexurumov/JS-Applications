const db = firebase.firestore();

export default {
    create(data) {
        return db.collection('treks').add(data)
    }, 
    getAll() {
        return db.collection('treks').get()
    }, 
    getById(id) {
        return db.collection('treks').doc(id).get()
    }, 
    remove(id) {
        return db.collection('treks').doc(id).delete()
    }, 
    edit(id, updatedData) {
        return db.collection('treks').doc(id).update(updatedData)  
    }
}