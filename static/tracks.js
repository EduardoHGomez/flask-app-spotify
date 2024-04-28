

let tracks = []; // Store the tracks

async function getTracks() {

    // Get the modal
    var modal = document.getElementById("myModal");

    modal.style.display = "block";

  	let response = await fetch('https://api.spotify.com/v1/me/top/tracks', {
	headers: {
		Authorization: 'Bearer ' + localStorage.getItem('access_token'),
		}
	});

  	let data = await response.json();
    data.items.forEach((item) => {
		tracks.push({
			'name': item.name,
			'image': item.album.images[0].url,
			'id': item.id,
			'artist_name': item.artists[0].name
		});
    })

	// console.log(data.next);

	// Iterate 4 times to get the top 100 items
	for(let i = 0; i < 4; i++) {
		if(data.next == null) {
			break;
		}
		
		// Make a call for the next url
		response = await fetch(data.next, {
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			}
		});

		data = await response.json();
		data.items.forEach((item) => {
			tracks.push({
				'name': item.name,
				'image': item.album.images[0].url,
				'id': item.id,
				'artist_name': item.artists[0].name
			});
		})

	}


	// After this, send the tracks to the server
	const url = window.location.href + 'analize';

	fetch(url, {
    method: 'POST', // Specify the method
    headers: {
        'Content-Type': 'application/json',
		'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    },
    	body: JSON.stringify({ array: tracks}) // Send the array as part of an object
	})
	.then(response => response.json())
	.then(result => {
		console.log(result);
		localStorage.setItem('results', JSON.stringify(result));
		window.location.href = window.location.href + 'results';
	})

	console.log("here");
}

function printTracks() {
	tracks.forEach((item) => {
		console.log(item.name);
	})
}