// import axios from "axios";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
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

refs.form.addEventListener('submit', onSearch)
refs.loadMore.addEventListener('click', onLoadMore)

function onSearch(e) {
  e.preventDefault();
  newsApiService.query = e.currentTarget.elements.searchQuery.value.trim();
  newsApiService.resetPage()
  clearArticles()
  newsApiService.fetchActions().then(appendArticlesMarkup)
 }

function onLoadMore() {
newsApiService.fetchActions().then(appendArticlesMarkup)
  }

function appendArticlesMarkup(hits) {
  addRemoveButton(hits)
  refs.gallery.insertAdjacentHTML('beforeend', createMarkup(hits));
}

 function clearArticles() {
  refs.gallery.innerHTML = '';
}

function addRemoveButton(hits) {
  hits.length >= 40 ? refs.loadMore.classList.remove('is-hidden') : refs.loadMore.classList.add('is-hidden')
  if (hits.length < 1) {
    Notify.info('Sorry, there are no images matching your search query. Please try again.');
  }
  }