const db = firebase.firestore();

export default {
    create(data) {
        return db.collection('articles').add(data)
    }, 
    getAll() {
        return db.collection('articles').get()
    }, 
    getById(id) {
        return db.collection('articles').doc(id).get()
    }, 
    remove(id) {
        return db.collection('articles').doc(id).delete()
    }, 
    edit(id, updatedData) {
        return db.collection('articles').doc(id).update(updatedData)  
    }
}