// Your code here
//only runs after all dom contents has been loaded
document.addEventListener("DOMContentLoaded", () => {
    fetchData();
    renderFisrtItem();
  });

//fetch data function
function fetchData(){
    fetch('http://localhost:3000/films')
    .then(response => response.json())
    .then((films)=>
    {
        renderMovies(films)
        buyTicket(films)
    })
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
const buyTickets=document.getElementById('buy-ticket');


function renderFisrtItem(){
    fetch('http://localhost:3000/films/1')
    .then(res => res.json())
    .then (movies =>
      {
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
}
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
            //list.focus(background: "grey")
            //list.style.hover="#fff";


        })

    })

}
function buyTicket(films){
    //console.log(films)
    
    buyTickets.addEventListener('click', ()=>{
        for(let data of films){
            if (movieTitle.innerText === data.title){
                const index = films.indexOf(data);
                let currentValue = (data.capacity - data.tickets_sold); 
                //console.log(currentValue);
                //if tickets arent sold out do.. 
                if(currentValue>=0){
                    var newValue=data.tickets_sold++;
                }else{
                    //change text of button to sold out after tickets are sold out
                    buyTickets.innerText="Sold Out";
                    //dissables button after tickets are sold out
                    buyTickets.disabled=true;
                   
                    
                }

                //new updated object
                const newvalues = { 
                    id: data.id,
                    title: data.title,
                    runtime: data.runtime,
                    capacity: data.capacity,
                    showtime:data.showtime,
                    tickets_sold: newValue,
                    description:data.description,
                    poster:data.poster,  
                };
                //fetch request to update data
                fetch(`http://localhost:3000/films/${index + 1}`,{ 
                    method:'PATCH',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify(newvalues)
                })
                .then(res => res.json())
                .then(films => {
                    console.log(films);
                    //write remaining number of tickets after updating db
                    movieTickets.textContent=currentValue;
                         
                })
                //through error if fetch takes longer that 3seconds to respond
                .catch(e => setTimeout(alert(e.message), 3000));

            }
            else {
                
            } 
                  
              
        } 
         
                     
    })
    /*
    psuedo code:
    1. loop through the films array
    2. if the title of the movie is equal to the title of the movie in the array
    3. get the index of the movie in the array
    4. get the current value of the tickets_sold
    5. increment the tickets_sold by 1
    6. create a new object with the new values
    7. fetch the new object to the server
    8. get the new value of the tickets_sold
    9. update the text content of the movieTickets
    */
   
}




