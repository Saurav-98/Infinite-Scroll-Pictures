const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];

//  Unsplash API

const count = 12;
const apiKey = 'EJY1VGbdFoQWYXimM7wSMH4stzgK9Mi1JpKAK42t2UA';

const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}
`;

//  Helper Function to Set Attributes on DOM Element

function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Create Elements for links and Photos, Add to DOM

const displayPhotos = () => {
  photosArray.forEach((photo) => {
    //Create <a> to link to Unsplash
    const item = document.createElement('a');
    // item.setAttribute('href', photo.links.html);
    // item.setAttribute('target', '_blank');
    setAttributes(item, {
      href: photo.links.html,
      target: '_blank',
    });

    // Create Image for Photo

    const img = document.createElement('img');
    // img.setAttribute('src', photo.urls.regular);
    // img.setAttribute('alt', photo.alt_description);
    // img.setAttribute('title', photo.alt_description);

    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    // Put Image Inside Anchor element and Anchor inside Image container

    item.appendChild(img);
    imageContainer.appendChild(item);
  });
};

// Get Phots From Unsplash

async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();

    displayPhotos();
  } catch (error) {
    // Catch Error
  }
}

//  On Load

getPhotos();
