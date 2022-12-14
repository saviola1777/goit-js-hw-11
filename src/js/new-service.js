 export default class NewsApiService {
   constructor() {
     this.searchQuery = '';
     this.page = 1;
    }
   fetchActions() {
     const url = `https://pixabay.com/api/?key=31958740-fc1ca03b202680423fa77b228&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=10&page=${this.page}`
   return fetch(url)
    .then(response => response.json())
     .then(data => {
       console.log(data)
      this.page += 1;
       return data.hits
      // це дуже важливо повертаємо дату а здати hits бо там всі дані 
  })
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