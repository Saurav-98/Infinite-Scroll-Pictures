const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

//  Unsplash API

const count = 30;
const apiKey = 'EJY1VGbdFoQWYXimM7wSMH4stzgK9Mi1JpKAK42t2UA';

const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}
`;

// Check if all images were loaded

function imageLoaded() {
  console.log('Image loaded');
  imagesLoaded += 1;

  if (imagesLoaded === totalImages) {
    ready = true;
    console.log(' ready = ', ready);
  }
}

//  Helper Function to Set Attributes on DOM Element

function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Create Elements for links and Photos, Add to DOM

const displayPhotos = () => {
  totalImages = photosArray.length;
  console.log('total images ', totalImages);
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

    // Event Listener, Check wether each img is finished loading

    img.addEventListener('load', imageLoaded);
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

// Check to see if scrolling near bottom of the Page, Load More Photos

window.addEventListener('scroll', () => {
  if (
    window.innerHeight + window.screenY >=
    document.body.offsetHeight - 1000
  ) {
    getPhotos();
    console.log('load more');
  }
});

//  On Load

getPhotos();
