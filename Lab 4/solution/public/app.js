function getInfo() {
    
    let stopInput = document.querySelector('#stopId');
    let stopName = document.querySelector('#stopName');
    let busesList = document.querySelector('#buses');

    fetch('http://localhost:3000/businfo')
    .then(x => x.json())
    .then(x => {

        stopName.innerHTML = '';
        busesList.innerHTML = '';

        let busStop = x[stopInput.value];

        if (!busStop) {
            stopName = 'Error';
            return;
        }

        stopName.innerHTML = busStop.name;
        Object.entries(busStop.buses)
            .forEach(([busId, time]) => {
                let li = document.createElement('li');
                li.innerHTML = `Bus ${busId} arrives in ${time} minutes.`;
                busesList.appendChild(li);
            })
    });
}