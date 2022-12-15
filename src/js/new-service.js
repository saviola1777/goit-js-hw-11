import axios from "axios";
export default class NewsApiService {
   constructor() {
     this.searchQuery = '';
     this.page = 1;
     this.URL='https://pixabay.com/api/';
     this.API_KEY='31958740-fc1ca03b202680423fa77b228&';
    }

async axiosActions() {
 const resaultPromise = await axios.get(
      `${this.URL}?key=${this.API_KEY}&q=${this.query}&image_type=photo&safesearch=true&orientation=horizontal&page=${this.page}&per_page=40`
      );
      this.page += 1;
  const promiseHits = await resaultPromise.data.hits ;
  // console.log(promiseHits)
    return promiseHits
   
  }

resetPage() {
this.page = 1;
   }
   
   get query() {
     return this.searchQuery;
   }

   set query(newQuery) {
    this.searchQuery=newQuery
   }
}