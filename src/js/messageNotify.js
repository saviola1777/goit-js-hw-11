import { Notify } from 'notiflix/build/notiflix-notify-aio';
function messageEmptyLine() {
  Notify.info('You have not written anything, please write what you want to find')
}

function messageNothingFound() {
  Notify.failure('Sorry, there are no images matching your search query. Please try again.');
}
 function messagetotalHits(totalHits) {
  Notify.success(`Hooray! We found ${totalHits} images.`);
}
 function messageEndColection() {
  Notify.info("We're sorry, but you've reached the end of search results.");
}

export { messageEmptyLine, messageNothingFound, messagetotalHits, messageEndColection };