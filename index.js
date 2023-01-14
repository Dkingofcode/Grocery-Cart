const alert = document.querySelector(".alert");
const form = document.querySelector(".grocery-form");
const grocery = document.getElementById("grocery");
const submitBtn = document.querySelector(".submit-btn");
const container = document.querySelector(".grocery-container");
const list = document.querySelector(".grocery-list");
const clearBtn = document.querySelector(".clear-btn");

// edit option
let editElement;
let editFlag = false;
let editID = "";

// *********** EVENT LISTENERS ***********
// submit form
form.addEventListener("submit", addItem)

//  **** clear items *****
clearBtn.addEventListener("click", clearItems);

// ******** Load Items *********
window.addEventListener("DOMContentLoaded", setupItems);

// ************** FUNCTIONS **********
  function addItem(e) {
    e.preventDefault();
    const value = grocery.value;

    const id = new Date().getTime().toString();
    if (value && !editFlag){
       createListItems();   


    }  else if (value && editFlag) {
        editElement.innerHTML = value;
        displayAlert("value changed", "success");

        // console.log("editing"); 
    }  else{
        displayAlert("please enter value", "danger");
    }
    console.log(id);
    console.log(grocery.value);
  }

 // display Alert
 function displayAlert(text, action){
    alert.textContent = text;
    alert.classList.add(`alert-${action}`);
 } 

  // remove alert
  setTimeout( () => {
    alert.textContent = "";
    alert.classList.remove(`alert-${action}`);
  }, 1000);


  // clear items
  function clearItems() {
    const items = document.querySelectorAll(".grocery-item");

    if (items.length > 0) {
        items.forEach( (item) => {
            list.removeChild(item);
        })
    }
      container.classList.remove("show-container");
      displayAlert("empty list", "danger");
      setBackToDefault();
      // localStorage.removeItem("list");
   } 

   // delete function
    function deleteItem(e) {
        const element = e.currentTarget.parentElement.parentElement;
        list.removeChild(element);
        if (list.children.length === 0){
            container.classList.remove("show-container");
        }
        displayAlert("item removed", "danger");
        setBackToDefault();
        // remove from local storage
        // removeFromLocalStorage(id);
    }

   // edit function
   function editItem(e) {
    const element = e.currentTarget.parentElement.parentElement;

    // set edit item
    editElement = e.currentTarget.parentElement.
    editFlag = true;
    editID = element.dataset.id;
    submitBtn.textContent = "edit";
    //console.log("item edited");
   }

// set back default
function setBackToDefault() {
    console.log("set back to default");
    submitBtn.textContent = "Submit";
    editFlag = false;
    editID = "";
    grocery.value = "";
}


// ******* LOCAL STORAGE ********
function addToLocalStorage(id, value){
    //console.log("added to local storage");
    const grocery = {id, value};
    let items = getLocalStorage();
    console.log(items);  

    items.push(grocery);
    localStorage.setItem("list", JSON.stringify(items));
}

  function getLocalStorage(){
    localStorage.getItem("list")? JSON.parse(localStorage.getItem("list")) : [];
  }

function removeFromLocalStorage(id){
   let items = getLocalStorage();

   items = items.filter( (item) => {
      if(item.id !== id){
        return item;
      }
   });
   localStorage.setItem("list", JSON.stringify(items));
}
 
function editLocalStorage(id, value){
   let items = getLocalStorage();

   items = items.map( (item) => {
     if (item.id === id){
        item.value = value;
     }
     return item;
   });
   localStorage.setItem("list", JSON.stringify(items));
}

// localStorage ApI    
// setItem
// getItem
// removeItem
// save as strings

// localStorage.setItem("orange", JSON.stringify(["item", "item2"]));
//  const oranges = JSON.parse(localStorage.getItem('orange'));
//  localStorage.removeItem("orange");

function setupItems(){
    let Items = getLocalStorage();
    if(Items.length > 0){
        Items.forEach(function (item) {
             createListItems(item.id, item.value);
        });
        container.classList.add("show-container");
    }
}

function createListItems(id, value){
    const element = document.createElement("article");

    // add class
    element.classList.add("grocery-item");

    // add id
    const attr = document.createAttribute("data-id");
    attr.value = id;
    element.setAttributeNode(attr); 
    element.innerHTML = `<p class="title">${value}</p>
                    <div class="btn-container">
                     <button type="button" class="edit-btn">
                        <i class="fas fa-edit></i>
                     </button>   
                     <button type="button" class="delete-btn">  
                         <i class="fas fa-trash></i>
                      </button>   
                       </div> `;
            const deleteBtn =  element.querySelector(".delete-btn");
            const editBtn = document.querySelector(".edit-btn");
                   deleteBtn.addEventListener("click", deleteItem);
                   editBtn.addEventListener("click", editItem);
                   // append child
                  list.appendChild(element);
                  // display alert
                  displayAlert("Item added to the list", "success");       
                  
                   // show container
                  container.classList.add("show-container");

                  // add to local storage
                  addToLocalStorage(id, value);
                  // set back to the default. 
                  setBackToDefault();

}






