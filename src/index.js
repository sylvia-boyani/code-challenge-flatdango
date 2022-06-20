// Your code here
document.addEventListener("DOMContentLoaded", () => {
    fetchData();
  });

//fetch data function
function fetchData(){
    fetch('http://localhost:3000/films')
    .then(response => response.json())
    .then((movies)=>renderMovies(movies))
}
//render moviees function
//deg dom contents
const movieList= document.querySelector('#films');
const movieTitle=document.getElementById('title');
const movieRuntime=document.getElementById('runtime');
const movieDescription=document.getElementById('film-info');
const movieShowTime=document.getElementById('showtime');
const movieTickets=document.getElementById('ticket-num');
const moviePoster=document.getElementById('poster');

function renderMovies(movies){
    movies.forEach(movies=>{
        let list =document.createElement('li');
        list.innerText= movies.title;
        movieList.appendChild(list);
        
        //render spefic movie details
        list.addEventListener('click',()=>{
            movieTitle.textContent=movies.title;
            movieRuntime.textContent=movies.runtime;
            movieDescription.textContent=movies.description;
            movieShowTime.textContent=movies.showtime;
            moviePoster.src=movies.poster;
            //tickets remaining
            let capacity=movies.capacity;
            let soldTickets=movies.tickets_sold;
            movieTickets.textContent=(capacity-soldTickets);


        })

    })

}

