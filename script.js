const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photoArray = [];

// Unsplash API
const count = 30;
const apiKey = "YQi6gGg4VOMc-esCN0XIDAZEZ6J1srfUTAGYMruxLTI";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// check if all image were loaded
function imageLoad() {
	console.log("image loaded");
	imagesLoaded++;
	if (imagesLoaded === totalImages) {
		ready = true;
		console.log("ready= ", ready);
	}
}

//helper function to set attributes on DOM elements

function setAttribute(element, attributes) {
	for (const key in attributes) {
		element.setAttribute(key, attributes[key]);
	}
}

//create elements for links and photo add them to DOM
function displayPhotos() {
	imagesLoaded = 0;
	//run function for each object in photoArray
	photoArray.forEach((photo) => {
		totalImages = photoArray.length;
		console.log("total images= ", totalImages);
		//create elements <a> to link unsplash
		const item = document.createElement("a");
		// item.setAttribute("href", photo.links.html);
		// item.setAttribute("target", "_blank");
		setAttribute(item, {
			href: photo.links.html,
			target: "_blank",
		});
		//create <img> for photo
		const img = document.createElement("img");
		// img.setAttribute("src", photo.urls.regular);
		// img.setAttribute("alt", photo.alt_description);
		// img.setAttribute("title", photo.alt_description);
		setAttribute(img, {
			src: photo.urls.regular,
			alt: photo.alt_description,
			title: photo.alt_description,
		});

		// Event Listener check when each is finished loading
		img.addEventListener("load", imageLoad);

		// put <img> inside <a>, then put both in imageContainer element
		item.appendChild(img);
		imageContainer.appendChild(item);
	});
}

// Get photo from unsplash api

async function getPhotos() {
	try {
		const response = await fetch(apiUrl);
		photoArray = await response.json();
		displayPhotos();
		// console.log(photoArray);
	} catch (error) {}
}

// check to see if scrolling near bottom of page, load more photos
// window is the parent pf the document and grandparent of body

window.addEventListener("scroll", () => {
	if (
		window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
		ready
	) {
		ready = false;
		getPhotos();
	}
});

//on load
getPhotos();
