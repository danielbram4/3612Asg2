/* url of song api --- https versions hopefully a little later this semester */	
const api = 'http://www.randyconnolly.com/funwebdev/3rd/api/music/songs-nested.php';


/* note: you may get a CORS error if you try fetching this locally (i.e., directly from a
   local file). To work correctly, this needs to be tested on a local web server.  
   Some possibilities: if using Visual Code, use Live Server extension; if Brackets,
   use built-in Live Preview.
*/


const creditButton = document.querySelector("#creditButton");
function creditButtonHandler()
{
   let myDropdown = document.querySelector("#myDropdown");
   myDropdown.classList.remove("dropDown-hidden");
   myDropdown.classList.add("dropdown-content")

      if(myDropdown.style.display === "none")
   {
      myDropdown.style.display = "block";
      myDropdown.style.position = "absolute";
   }
   else{
      myDropdown.style.display = "none";
   }
}

creditButton.addEventListener("click", creditButtonHandler);

const clearButton = document.querySelector("#clearButton");
function clearButtonHandler()
{
   const texts = document.querySelectorAll("input[type=text]");
   //clear textboxes here
}

clearButton.addEventListener("click", clearButtonHandler);

const searchButton = document.querySelector("#searchButton");
function searchButtonHandler()
{
   alert("Searched!")
}

searchButton.addEventListener("click", searchButtonHandler);

const addButton = document.querySelector("#addButton");
function addButtonHandler()
{
   let myDropdown = document.querySelector("#addBtn #myDropdown");
   if(myDropdown.style.display === "none")
   {
      myDropdown.style.display = "block";
      myDropdown.style.position = "absolute";
   }
   else{
      myDropdown.style.display = "none";
   }
   myDropdown.classList.add("dropdown-content")
}

addButton.addEventListener("click", addButtonHandler);
