function getInfo() {
    console.log("TODO...");
    fetch('http://127.0.0.1:5500/styles.css')
    .then(x => x.text())
    .then(x => console.log(x));
}