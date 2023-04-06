function loadUserData() {
	// membuat sebuah objek untuk melakukan request ke HTTP server
	// secara asynschronous
	let request = new XMLHttpRequest()
	let url = 'https://jsonplaceholder.typicode.com/users'

	request.open('GET', url, true)

	//handler saat request berhasil di-load
	request.onload = function() {
		if (request.status >= 200 && request.status < 400) {
			let data = JSON.parse(request.responseText)
			generateUserTable(data);
		} else {
			alert ("Page Not Found")
		}
	}
	//handler jika koneksi ke server terganggu
	request.onerror = function() {
		alert("Request Failed !! Check your internet connection!!")
	}
	//menjalankan request
	request.send()

}



function loadAlbum() {
	let userIdvalue = this.getAttribute('user-id')

	console.log(userIdvalue)
	const url1 = 'https://jsonplaceholder.typicode.com/albums?userId=' + userIdvalue;

	let album = new XMLHttpRequest()
	album.open("GET", url1, true)

	album.onload = function() {
		if (album.status >= 200 && album.status < 400) {
			let data = JSON.parse(album.responseText)
			generateAlbumTable(data);
		} else {
			alert ("Page Not Found")
		}
	}
	//handler jika koneksi ke server terganggu
	album.onerror = function() {
		alert("Request Failed !! Check your internet connection!!")
	}
	//menjalankan request
	album.send()
}

function loadPhotos() {


	let userIdvalue = this.getAttribute('album-id')
	const url2 = 'https://jsonplaceholder.typicode.com/photos?albumId=' + userIdvalue

	let photos = new XMLHttpRequest()
	photos.open("GET", url2, true)

	photos.onload = function() {
		if (photos.status >= 200 && photos.status < 400) {
			let data = JSON.parse(photos.responseText)
			generatePhotos(data)
		} else {
			alert('Page not Found')
		}
		
		}
		photos.onerror = function() {
			alert('Request Failed !! Check your internet connection')
	}
	photos.send()

	
}

function generateUserTable(data) {
	let idx = 0
	
	let tbody = document.getElementById('tableUser').querySelector('tbody')
	tbody.innerHTML = ''
	for(idx = 0; idx < data.length; idx++) {
		//membuat baris baru
		let singleRow = document.createElement('tr')

		//membuat banyak kolom
		let colName = document.createElement('td')
		colName.appendChild(document.createTextNode(data[idx].name))
		let colEmail = document.createElement('td')
		colEmail.appendChild(document.createTextNode(data[idx].email))
		let colAddress = document.createElement('td')
		let address = data[idx].address
		colAddress.appendChild(document.createTextNode(address.street + address.suite + '' + address.city))
		let colWebsite = document.createElement('td')
		colWebsite.appendChild(document.createTextNode(data[idx].website))
		let colCompany = document.createElement('td')
		colCompany.appendChild(document.createTextNode(data[idx].company.name))

		//menambahkan kolom ke dalam row yang sudah ada
		singleRow.appendChild(colName)
		singleRow.appendChild(colEmail)
		singleRow.appendChild(colAddress)
		singleRow.appendChild(colWebsite)
		singleRow.appendChild(colCompany)

		//create detail button
		let colAlbum = document.createElement('td')
		let btnAlbums = document.createElement('button')
		btnAlbums.appendChild(document.createTextNode('Albums'))
		//create detail button
		let userId = document.createAttribute('user-id')
		// userId.value = data[idx].id
		userId.value = data[idx].id
		let userName = document.createAttribute('user-name')
		userName.value = data[idx].name
		//memberikan attribute pada btn, shg nanti valuenya dapat diambil
		btnAlbums.setAttributeNode(userName)
		btnAlbums.setAttributeNode(userId)
		//bind loadAlbum function to event click
		btnAlbums.addEventListener('click',loadAlbum)
		btnAlbums.addEventListener('click',gantiHeadingAlbum)
		colAlbum.appendChild(btnAlbums)
		singleRow.appendChild(colAlbum)

		tbody.appendChild(singleRow)

	}
}

function generateAlbumTable(data) {
	
	let idx = 0
	let tbody = document.getElementById('tableAlbum').querySelector('tbody')
	tbody.innerHTML = ''
	for(idx = 0; idx < data.length; idx++) {
		let singleRow = document.createElement('tr')
		console.log('112')
		let colTitle = document.createElement('td')
		colTitle.appendChild(document.createTextNode(data[idx].title))
		let colDetails = document.createElement('td')
		let btnDetails = document.createElement('button')
		btnDetails.appendChild(document.createTextNode('Details'))

		let idValue = document.createAttribute('album-id')
		idValue.value = data[idx].id

		let userName1 = document.createAttribute('user-name')
		userName1.value = data[idx].title

		btnDetails.setAttributeNode(idValue)
		btnDetails.setAttributeNode(userName1)

		btnDetails.addEventListener('click', loadPhotos)
		btnDetails.addEventListener('click', gantiHeadingPhotos)
		colDetails.appendChild(btnDetails)

		singleRow.appendChild(colTitle)
		singleRow.appendChild(colDetails)

		tbody.appendChild(singleRow)
	} 
}

function generatePhotos(data) {

	let idx = 0
	let div = document.getElementById('photos').querySelector('div')
	div.innerHTML = ''
	
	for(idx = 0; idx < data.length; idx++) {
		let theImage = document.createElement('img')
		let url = document.createAttribute('src')
		let style = document.createAttribute('style')
		url.value = data[idx].url
		style.value = 'max-width: 100px'

		theImage.setAttributeNode(url)
		theImage.setAttributeNode(style)
	

		div.appendChild(theImage)
	}
}

function gantiHeadingAlbum() {
	let title1 = this.getAttribute('user-name')
	let x = document.getElementById('albumTitle')
	x.innerHTML = 'Album ' + title1
}

function gantiHeadingPhotos() {
	let title2 = this.getAttribute('user-name')
	let y = document.getElementById('photosTitle')
	y.innerHTML = title2
}

function onDocumentFinish() {
	loadUserData()
}
