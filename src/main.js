import iziToast from "izitoast";
import SimpleLightbox from "simplelightbox";
import "izitoast/dist/css/iziToast.min.css";
import "simplelightbox/dist/simple-lightbox.min.css";
import axios from "axios";

const API_KEY = "41702545-5a959d1a868233ac463ab5270";
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const galleryElement = document.getElementById("image-gallery");
const spinner = document.getElementById("spinner");
const loadMoreBtn = document.getElementById("load-more");

let lightbox;
let currentPage = 1;
let pageSize = 40;
let currentQuery = "";
let isLastPage = false;

searchForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const query = searchInput.value.trim();
  if (query === "") return;

  currentQuery = query;
  currentPage = 1;

  try {
    toggleSpinner(true);
    const response = await axios.get(`https://pixabay.com/api/?key=${API_KEY}&q=${currentQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${currentPage}&per_page=${pageSize}`);
    
    const data = response.data;
    displayImages(data.hits);
  } catch (error) {
    showError();
  } finally {
    toggleSpinner(false);
  }
});

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

loadMoreBtn.addEventListener('click', async () => {
  if (!isLastPage) {
    currentPage += 1;
    await fetchAndDisplayImages();
  }
});

async function fetchAndDisplayImages() {
  try {
    toggleSpinner(true);
    const response = await axios.get(`https://pixabay.com/api/?key=${API_KEY}&q=${currentQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${currentPage}&per_page=${pageSize}`);
    
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

  isLastPage = (images.length < pageSize);
  toggleLoadMoreBtn(!isLastPage);
  toggleSpinner(false);

  galleryElement.innerHTML = "";
  const imageElements = images.slice(0, pageSize).map(createImageElement);
  galleryElement.append(...imageElements);

  if (isLastPage) {
    theEnd();
  }

  initializeLightbox();
}

function appendImages(images) {
  if (images.length === 0) {
    isLastPage = true;
    toggleLoadMoreBtn(false);
    toggleSpinner(false);
    theEnd();
    return;
  }

  const imageElements = images.map(createImageElement);
  galleryElement.append(...imageElements);
  initializeLightbox();
}

function initializeLightbox() {
  lightbox = new SimpleLightbox('.gallery a', {
    q: currentQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: currentPage,
    per_page: pageSize
  });
  lightbox.refresh();
}

function theEnd() {
  iziToast.info({
    title: 'Info',
    message: 'Sorry, there are no more images for your request. Please try again!',
  });
}

function showError() {
  galleryElement.innerHTML = "";
  iziToast.error({
    title: 'Error',
    message: 'Sorry, there are no images matching your search query. Please try again!',
  });
}

const hasImages = () => galleryElement.children.length > 0;

const toggleLoadMoreBtn = () => {
  loadMoreBtn.classList.toggle("is-hidden", isLastPage || !hasImages());
};

const toggleSpinner = (show) => {
  spinner.classList.toggle("is-hidden", !show);
};