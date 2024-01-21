import iziToast from "izitoast";
import SimpleLightbox from "simplelightbox";
import "izitoast/dist/css/iziToast.min.css";
import "simplelightbox/dist/simple-lightbox.min.css";
import axios from "axios";

const api = axios.create({
  baseURL: "https://pixabay.com/api/",
  params: {
    apiKey: "41702545-5a959d1a868233ac463ab5270",
    language: "en",
    image_type: "photo",
    orientation: "horizontal",
    safesearch: true,
  },
});

const searchForm = document.getElementById("search-form");
const imageGallery = document.getElementById("image-gallery");
const loadMoreBtn = document.getElementById('load-more');
const loadMoreSpinner = document.getElementById('spinner'); let lightbox;
let currentQuery = '';
let currentPage = 1;
const pageSize = 40;


function renderImages(images = []) {
  const markup = images.reduce(
    (html, { largeImageURL, tags, likes, views, comments, downloads }) =>
      html +
      `
    <div class="gallery-item">
      <img src="${largeImageURL}" alt="${tags}">
      <div class="image-info">
        <div class="img-info-item">
          <p>Likes:</p>
          <p> ${likes}</p>
        </div>
        <div class="img-info-item">
          <p>Views: </p>
          <p>${views}</p>
        </div>
        <div class="img-info-item">
          <p>Comments: </p>
          <p>${comments}</p>
        </div>
        <div class="img-info-item">
          <p>Downloads: </p>
          <p>${downloads}</p>
        </div>
      </div>
    </div>`,
    ""
  );

  imageGallery.insertAdjacentHTML("beforeend", markup);
  lightbox.refresh();
}

const getImages = async (params) => {
  try {
    const response = await api.get("", {
      params: {
        q: currentQuery,
        page: currentPage,
        per_page: pageSize,
      },
    });
    return response.data;
  } catch (error) {
    showError();
  }
};

const createGetImagesRequest = (q) => {
  currentPage = 1;
  let isLastPage = false;

  return async () => {
    try {
      if (isLastPage) return [];

      const { images, totalResults } = await getImages({ page, pageSize, q });

      if (currentPage >= Math.ceil(totalResults / pageSize)) {
        isLastPage = true;
      }

      currentPage += 1;

      return images;
    } catch (error) {
      showError();
    }
  };
};

let doFetch = null;

searchForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (doFetch != null) {
    loadMoreBtn.removeEventListener("click", doFetch);
    doFetch = null;
  }

  const data = new FormData(event.currentTarget);
  currentQuery = data.get("query");

  imageGallery.innerHTML = "";

  const fetchImages = createGetImagesRequest(currentQuery);

  doFetch = async () => {
    const images = await makePromiseWithSpinner({
      promise: fetchImages,
      spinner: loadMoreSpinner,
    });

    renderImages(images);
    initializeLightbox();
  };

  await makePromiseWithSpinner({
    promise: doFetch,
    spinner: loadMoreSpinner,
  });

  loadMoreBtn.addEventListener("click", doFetch);
});

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

const makePromiseWithSpinner = async ({
  promise,
  spinner,
  className = "is-hidden",
}) => {
  spinner.classList.remove(className);

  const response = await promise();

  spinner.classList.add(className);

  return response;
};

function showError() {
  imageGallery.innerHTML = "";
  iziToast.error({
    title: "Error",
    message:
      "Sorry, there are no images matching your search query. Please try again!",
  });
}

