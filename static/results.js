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

    typeWriter('Resultados de tu análisis musical 🧐', '.header_text', 50, function() {
        setTimeout(function() {
            loadResults(data.result);
        }, 1200);
    });



});

function typeWriter(text, selector, speed, callback) {
    let i = 0; // Initialize the counter to 0
    function type() {
        if (i < text.length) {
            document.querySelector(selector).innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else if (callback) {
            callback(); // Call the callback function if provided
        }
    }
    setTimeout(type, speed); // Start the typing effect
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