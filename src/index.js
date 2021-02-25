const addBtn = document.querySelector("#new-toy-btn");
const toyFormContainer = document.querySelector(".container");

let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const toyCollection = document.querySelector("#toy-collection")
 fetch("http://localhost:3000/toys")
  .then(response => response.json())
  .then(toys => {
    //take the toy array make HTML and add to the DOM 
    let toysHTML = toys.map(function(toy){
     return `
     <div class="card">
      <h2>${toy.name}</h2>
      <img src=${toy.image} class="toy-avatar" />
      <p> ${toy.likes} Likes </p>
      <button data-id="${toy.id}" class="like-btn">Like <3</button>
     </div>
     `
    })
    toyCollection.innerHTML = toysHTML.join('')
    
  })

  toyFormContainer.addEventListener("submit", function(e){
    e.preventDefault()
    console.log(e.target.name)
    // Grab the inputs from the form
     const toyName = e.target.name.value
     const toyImage = e.target.image.value
    
     fetch("http://localhost:3000/toys",{
       method: "POST",
       headers:{
        "Content-Type": "application/json",
        "Accept": "application/json" 
       },
       body: JSON.stringify({
         name: toyName,
         image: toyImage,
         likes: 99
       })
     })
     .then( response => response.json())
     .then( newToy => {
       //update the DOM
       //convert newToy from JSON to HTML in order to add it to the DOM
       let newToyHTML = `
        <div class="card">
         <h2>${newToy.name}</h2>
         <img src=${newToy.image} class="toy-avatar" />
         <p> ${newToy.likes} Likes </p>
         <button data-id="${newtoy.id}" class="like-btn">Like <3</button>
        </div>
       `
       toyCollection.innerHTML += newToyHTML
        
       })
  })

  toyCollection.addEventListener("click", (e) => {
    
    if (e.target.className === "like-btn"){
      
      console.log(e.target)
    }
  })

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});
