// Your code here

document.addEventListener("DOMContentLoaded", () => {
    fetchData()
    fetchList();
    
  });


//render moviees function
//deg dom contents
const movieList= document.querySelector('#films');
const movieTitle=document.getElementById('title');
const movieRuntime=document.getElementById('runtime');
const movieDescription=document.getElementById('film-info');
const movieShowTime=document.getElementById('showtime');
let movieTickets=document.getElementById('ticket-num');
const moviePoster=document.getElementById('poster');
let buyTicket=document.getElementById('buy-ticket');

let globaLi=" "



function fetchData(id=1){
    fetch(`http://localhost:3000/films/${id}`)
    .then(response => response.json())
    .then((movies)=>{
      moviePoster.src=movies.poster;

 document.querySelector('#showing').innerHTML=`<div class="card">
 <div id="title" class="title">${movies.title}</div>
 <div id="runtime" class="meta">${movies.runtime}minutes</div>
 <div class="content">
   <div class="description">
     <div id="film-info">${movies.description}</div>
     <span id="showtime" class="ui label">${movies.showtime}</span>
     <span id="ticket-num">${movies.capacity-movies.tickets_sold}</span> remaining tickets
   </div>
 </div>
 <div class="extra content">
   <button id="buy-ticket" class="ui orange button">
     Buy Ticket
   </button>
 </div>
</div>
</div>`

  
document.getElementById('buy-ticket').addEventListener('click',()=>{
  renderTickets(movies)
  let movieNum=document.getElementById('ticket-num').innerHTML
   let ticket=document.getElementById('buy-ticket')
  if(movieNum==0){
 ticket.innerHTML='sold out'
}
 })
})}


   
function renderTickets(movies){
  
let movieTickets=document.getElementById('ticket-num');



if(movieTickets.innerHTML>0){
--movieTickets.innerHTML
 movies.tickets_sold++


  handleTickets(movies.id,movies.tickets_sold)
 

if(movieTickets.innerHTML==0){
  document.getElementById('buy-ticket').innerHTML="sold out"
   document.getElementById('buy-ticket').innerHTML="sold out"
}else{
  document.getElementById('buy-ticket').innerHTML="Buy Ticket"


}}
 

}




function fetchList() {
    fetch(`http://localhost:3000/films`)
    .then(response => response.json())
    .then((movies)=>movies.forEach((movies)=>renderMovieList(movies)))
}



function renderMovieList(movies) {

        let list =document.createElement('li');
        let button=document.createElement('button')
        button.innerHTML="x"
        button.style.backgroundColor="red"
        button.style.border="none"
        button.style.borderRadius="15px"
        list.classList.add('film')
        list.classList.add('item')
        list.innerText= movies.title;
        if((movies.capacity-movies.tickets_sold)==0 ){
          list.classList.add('sold-out')
          document.getElementById('buy-ticket').innerHTML="sold out",
          document.getElementById('buy-ticket').classList.add('sold-out')
          console.log(document.getElementById('buy-ticket'))

        }else(
          document.getElementById('buy-ticket').innerHTML="Buy Ticket",
          document.getElementById('buy-ticket').classList.remove('sold-out')
        )
        button.addEventListener('click',handleDelete)
        list.appendChild(button)
        movieList.appendChild(list);
       

        list.setAttribute('id',`${movies.id}`);
    
        
        list.addEventListener('click', (e)=>{
          fetchData(e.target.id)
         
        })

       
}




function handleDelete(e){
  e.target.parentNode.remove()
  handleDeleteJson(e.target.parentNode.id)
}





function handleDeleteJson(id) {
  fetch(`http://localhost:3000/films/${id}`,{
   method:'DELETE'
  })
  
}   

function handleTickets(id,movieTickets) {
    fetch(`http://localhost:3000/films/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({
        tickets_sold: movieTickets,
        }),
        headers: {
          'Content-type': 'application/json',
        },
      })}
    
    
  
      