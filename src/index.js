import { messageEmptyLine, messageNothingFound } from "./js/messageNotify.js";
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
refs.loadMore.addEventListener('click', onLoadMore)

function onSubmit(e) {
  e.preventDefault();
  newsApiService.query = e.currentTarget.elements.searchQuery.value.trim();
  if (newsApiService.query === '') return messageEmptyLine();
  console.log(newsApiService.query)
  newsApiService.resetPage()
  clearArticles()
  newsApiService.axiosActions().then(appendArticlesMarkup)
 }

function onLoadMore() {
newsApiService.fetchActions().then(appendArticlesMarkup)
  }

function appendArticlesMarkup(hits) {
  addRemoveButton(hits)
  refs.gallery.insertAdjacentHTML('beforeend', createMarkup(hits));
  lightbox.refresh()
}

 function clearArticles() {
  refs.gallery.innerHTML = '';
}

function addRemoveButton(hits) {
  hits.length >= 40 ? refs.loadMore.classList.remove('is-hidden') : refs.loadMore.classList.add('is-hidden')
  if (hits.length < 1) messageNothingFound();
  }