import iziToast from "izitoast";
import SimpleLightbox from "simplelightbox";
import "izitoast/dist/css/iziToast.min.css";
import "simplelightbox/dist/simple-lightbox.min.css";
import axios from "axios";

const API_KEY = "41702545-5a959d1a868233ac463ab5270";
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const imageGallery = document.getElementById("image-gallery");
const spinner = document.getElementById("spinner");
const loadMoreBtn = document.getElementById("load-more");

let lightbox;
let currentPage = 1;

searchForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const searchTerm = searchInput.value.trim();
  if (searchTerm === "") return;

  try {
    toggleSpinner(true);
    const response = await axios.get(`https://pixabay.com/api/?key=${API_KEY}&q=${searchTerm}&image_type=photo&orientation=horizontal&safesearch=true`);
    
    if (response.status !== 200) {
      throw new Error('Network response was not ok');
    }

    const data = response.data;
    displayImages(data.hits);
    currentPage = 1;
  } catch (error) {
    showError();
  } finally {
    toggleSpinner(false);
    toggleLoadMoreBtn();
  }
});

loadMoreBtn.addEventListener('click', async () => {
  currentPage +=1;
  await fetchAndDisplayImages();
});

async function fetchAndDisplayImages() {
  try {
    const searchTerm = searchInput.value.trim();
    if (searchTerm === '') return;

    toggleSpinner(true);

    const response = await axios.get(`https://pixabay.com/api/?key=${API_KEY}&q=${searchTerm}&image_type=photo&orientation=horizontal&safesearch=true&page=${currentPage}`);

    if (response.status !== 200) {
      throw new Error('Network response was not ok');
    }

    const data = response.data;
    appendImages(data.hits);
  } catch (error) {
    showError();
  } finally {
    toggleSpinner(false);
  }
}

function displayImages(images) {
  if (images.length === 0) {
    showError();
    return;
  }

  imageGallery.innerHTML = "";
  const imageElements = images.map(createImageElement);
  imageGallery.append(...imageElements);

  lightbox = new SimpleLightbox('.gallery a', {
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true
  });
  lightbox.refresh();
}

function appendImages(images) {
  if (images.length === 0) {
    showError();
    return;
  }

  const imageElements = images.map(createImageElement);
  imageGallery.append(...imageElements);
  lightbox.refresh();
}

function createImageElement(image) {
  const link = document.createElement("a");
  link.href = image.largeImageURL;
  link.setAttribute("data-lightbox", "image-gallery");
  link.innerHTML = `
    <div class="gallery-item">
      <img src="${image.webformatURL}" alt="${image.tags}">
      <div class="image-info">
        <div class="img-info-item">
          <p>Likes:</p>
          <p> ${image.likes}</p>
        </div>
        <div class="img-info-item">
          <p>Views: </p>
          <p>${image.views}</p>
        </div>
        <div class="img-info-item">
          <p>Comments: </p>
          <p>${image.comments}</p>
        </div>
        <div class="img-info-item">
          <p>Downloads: </p>
          <p>${image.downloads}</p>
        </div>
      </div>
    </div>
  `;
  return link;
}

function showError() {
  imageGallery.innerHTML = "";
  iziToast.error({
    title: 'Error',
    message: 'Sorry, there are no images matching your search query. Please try again!',
  });
}

const hasImages = () => imageGallery.children.length > 0;

const toggleLoadMoreBtn = () => {
  loadMoreBtn.classList.toggle("is-hidden", !hasImages());
};

const toggleSpinner = (show) => {
  spinner.classList.toggle("is-hidden", !show);
};
