import { messageEmptyLine, messageNothingFound,messagetotalHits,messageEndColection} from "./js/messageNotify.js";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import NewsApiService from './js/new-service.js'
import { createMarkup } from "./js/card-marking.js"

const refs ={
  form: document.querySelector('#search-form'),
  button: document.querySelector('.search-form__button'),
  gallery: document.querySelector('.gallery'),
  loadMore:document.querySelector('.load-more'),
}

const newsApiService = new NewsApiService();

let lightbox = new SimpleLightbox('.gallery a' , {
  captionsData: 'alt',
  captionDelay: 250,
});

refs.form.addEventListener('submit', onSubmit)
refs.loadMore.addEventListener('click', onClick)

function onSubmit(e) {
  e.preventDefault();
  newsApiService.query = e.currentTarget.elements.searchQuery.value.trim();
  if (newsApiService.query === '') return messageEmptyLine();
  newsApiService.resetPage()
  refs.gallery.innerHTML = '';
  newsApiService.axiosActions().then(data => {
    appendArticlesMarkup(data);
    if (data.hits.length >= 1) messagetotalHits(data.totalHits);
    refs.loadMore.setAttribute("disabled", true)
  }).finally(() => refs.loadMore.removeAttribute("disabled")) 
 }

function onClick() {
  newsApiService.axiosActions().then(data => {
    appendArticlesMarkup(data);
    if (data.hits.length < 40) messageEndColection();

  })
  }

function appendArticlesMarkup(data) {
  addRemoveButton(data)
  refs.gallery.insertAdjacentHTML('beforeend', createMarkup(data.hits));
  lightbox.refresh()
}

function addRemoveButton(data) {
  data.hits.length >= 40 ? refs.loadMore.classList.remove('is-hidden') : refs.loadMore.classList.add('is-hidden')
  if (data.hits.length < 1) messageNothingFound();
}