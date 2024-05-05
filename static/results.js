document.addEventListener('DOMContentLoaded', () => {
    
    let data = JSON.parse(localStorage.getItem('results'));
    let slide_track = document.querySelector('.slide-track');
    
    for(let i=0; i<15; i++) {
        let new_image = `
        <div class="slide">
            <img src="${data.user_result.image[i]}">
        </div>`

        slide_track.innerHTML += new_image;
    }

    runMessages(data.result);

});

async function typeWriteThisAsync(txt, selector) {
    var i = 0;
    var speed = 50;

    return new Promise(resolve => {
        function typeWriter() {
            if (i < txt.length) {
                document.querySelector(selector).innerHTML += txt.charAt(i);
                i++;
                setTimeout(typeWriter, speed);
            } else {
                resolve();
            }
        }

        typeWriter();
    });
}

async function runMessages(data) {

    await typeWriteThisAsync("Resultados de tu análisis musical 🧐", ".header_text");

    // Make the contain
    let danceability = data.danceability['0'];
    danceability = Number(danceability * 100).toFixed(2);
    await typeWriteThisAsync("Danceability", ".danceability-header");
    await typeWriteThisAsync(`${danceability}`, ".danceability-body");

    // Energy
    let energy = data.energy['0'];
    energy = Number(energy * 100).toFixed(2);
    await typeWriteThisAsync("Energy", ".energy-header");
    await typeWriteThisAsync(`${energy}`, ".energy-body");

    // Loudness
    let loudness = data.loudness['0'];
    loudness = Number(loudness * 100).toFixed(2);
    await typeWriteThisAsync("Loudness", ".loudness-header");
    await typeWriteThisAsync(`${loudness}`, ".loudness-body");

    // Valence
    let valence = data.valence['0'];
    valence = Number(valence).toFixed(2);
    await typeWriteThisAsync("valence", ".valence-header");
    await typeWriteThisAsync(`${loudness}`, ".valence-body");



}




function loadResults(data) {
    let container = document.querySelector('.middle_text');
    let new_text = document.createElement('div');

    // Danceability
    let danceability = data.danceability['0'];
    danceability = Number(danceability * 100).toFixed(2);         // 1.00
    new_text.innerHTML = `<p><b>El porcentaje de que bailes con tu música 💃 </b> <br> ${danceability}</p>`;
    container.append(new_text);

    // Energy
    new_text = document.createElement('div');
    let energy = data.energy['0'];
    energy = Number(energy * 100).toFixed(2);         // 1.00
    new_text.innerHTML = `<p> <b>El porcentaje de energía 🏋 </b> <br> ${energy} </p>`;
    container.append(new_text);


    // Loudness
    new_text = document.createElement('div');
    let loudness = data.loudness['0'];
    loudness = Number(loudness * 100).toFixed(2);         // 1.00
    new_text.innerHTML = `<p> <b>Porcentaje de pesada que es tu música 📢 </b> <br> ${loudness} </p>`;
    container.append(new_text);

    // Valence
    new_text = document.createElement('div');
    let valence = data.valence['0'];
    valence = Number(valence).toFixed(2);         // 1.00
    new_text.innerHTML = `<p> <b>Porcentaje de felicidad que tienes 😊 </b> <br> ${valence} </p>`;
    container.append(new_text);

}