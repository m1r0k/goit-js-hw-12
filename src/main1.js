import iziToast from "izitoast";
import SimpleLightbox from "simplelightbox";
import "izitoast/dist/css/iziToast.min.css";
import "simplelightbox/dist/simple-lightbox.min.css";
// import axios from "axios";

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

const searchForm = document.querySelector(".search-form"); // Клас, а не тег
const imageGallery = document.querySelector(".image-gallery"); // Клас, а не тег
const loadMoreBtn = document.querySelector('button[data-action="load-more"]');
const loadMoreSpinner = document.querySelector('.spinner'); // Додавання спіннера для loadMore
let lightbox;

function renderImages(images = []) {
  const markup = images.reduce(
    (html, { webformatURL, tags, likes, views, comments, downloads }) =>
      html +
      `
    <li class="gallery-item">
      <img src="${webformatURL}" alt="${tags}">
      <ul class="image-info">
        <li class="img-info-item">
          <p>Likes:</p>
          <p> ${likes}</p>
        </li>
        <li class="img-info-item">
          <p>Views: </p>
          <p>${views}</p>
        </li>
        <li class="img-info-item">
          <p>Comments: </p>
          <p>${comments}</p>
        </li>
        <li class="img-info-item">
          <p>Downloads: </p>
          <p>${downloads}</p>
        </li>
      </ul>
    </li>`,
    ""
  );

  imageGallery.insertAdjacentHTML("beforeend", markup);
}

const getImages = async (params) => {
  try {
    const response = await api.get("everything", { params });
    return response.data;
  } catch (error) {
    showError();
  }
};

const createGetImagesRequest = (q) => {
  let page = 1;
  let isLastPage = false;
  const pageSize = 40;

  return async () => {
    try {
      if (isLastPage) return [];

      const { images, totalResults } = await getImages({ page, pageSize, q });

      if (page >= Math.ceil(totalResults / pageSize)) {
        isLastPage = true;
      }

      page += 1;

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
  const query = data.get("query");

  imageGallery.innerHTML = "";

  const fetchImages = createGetImagesRequest(query);

  doFetch = async () => {
    const images = await makePromiseWithSpinner({
      promise: fetchImages,
      spinner: loadMoreSpinner,
    });

    renderImages(images);
  };

  await makePromiseWithSpinner({
    promise: doFetch,
    spinner: loadMoreSpinner,
  });

  loadMoreBtn.addEventListener("click", doFetch);
});

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

const options = {
  image_type: "photo",
  orientation: "horizontal",
  safesearch: true,
};

