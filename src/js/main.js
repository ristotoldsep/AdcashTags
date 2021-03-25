showTags(); //Displaying the tag list in browser memory on initialization

let addTagInput = document.getElementById("addtaginput"); //Selecting input field
let editTagInput = document.getElementById("edittaginput"); //Selecting edit input field

/** Keyboard events for adding tags*/
 addTagInput.addEventListener("keyup", (e) => {
    
    //Tested with this string!
    //123, wwr2;  222, 4422, www; 23., -444; -33, -44w,   222w;  www    -333 -3;
    
    let addTagInputVal = addTagInput.value.replace(/ /g, ""); //Remove all the spaces from the string

     let stringToArray = addTagInputVal.split(/[,;]+/); //Split the string into array, delimiters = "," and ";"

     let filteredArray = stringToArray.filter(item => item.match(/^-?\d+$/)); //Filter out everything but numbers (including negative)

     // If user pressed enter, try to add tag 
     if (e.key == "Enter") {
         //Check if something is entered, but not the correct values
        if (filteredArray.length == 0 && stringToArray.length > 0) {
            
            stringToArray[0] == "" ? 
            showModal("Tags can only contain numbers & can't be empty") :
            showModal("Tags can only contain numbers");
            
            return;
        }

        //Check if filtered array(input) with correct values is empty, if not, add tags
         if (filteredArray.length > 0) {
             //Gets the array of JSON objects in Local storage 
             let webtag = localStorage.getItem("localtag");

             webtag == null ? tagObj = [] : tagObj = JSON.parse(webtag); //Empty tagObj array OR Convert JSON into JS object 

             filteredArray.forEach((tag) => { //Add each number into tagObj array object with property "tag_name"
                 tagObj.push({ "tag_name": tag });
             });

             localStorage.setItem("localtag", JSON.stringify(tagObj)); //Update JSON in local storage
             addTagInput.value = "";
         } else {
             showModal("Input can't be empty!");
         }
     }
    showTags(); //Update tags
});   

let addTagBtn = document.getElementById("addtagbtn"); //Selecting add button 
/** Add tag button event */
addTagBtn.addEventListener("click", () => {

    //Tested with this string!
    //123, wwr2;  222, 4422, www; 23., -444; -33, -44w,   222w;  www    -333 -3;

    let addTagInputVal = addTagInput.value.replace(/ /g, ""); //Remove all the spaces from the string

    let stringToArray = addTagInputVal.split(/[,;]+/); //Split the string into array, delimiters = "," and ";"

    let filteredArray = stringToArray.filter(item => item.match(/^-?\d+$/)); //Filter out everything but numbers (including negative)

    //Check if something is entered, but not the correct values
    if (filteredArray.length == 0 && stringToArray.length > 0) {

        stringToArray[0] == "" ?
            showModal("Tags can only contain numbers & can't be empty") :
            showModal("Tags can only contain numbers");

        return;
    }
    
    //Check if array(input) is empty
    if (filteredArray.length > 0) {
        let webtag = localStorage.getItem("localtag");
       
        webtag == null ? tagObj = [] : tagObj = JSON.parse(webtag); //Empty tagObj array OR Convert JSON into JS object 

        filteredArray.forEach((tag) => { //Add each number into tagObj array object with property "tag_name"
            tagObj.push({ "tag_name": tag });
        });

        localStorage.setItem("localtag", JSON.stringify(tagObj));
        addTagInput.value = "";
    } else {
        showModal("Input can't be empty!");
    }
    showTags();
}); 

// showTags function
function showTags() {
    let webtag = localStorage.getItem("localtag");
    let className;

    webtag == null ? tagObj = [] : tagObj = JSON.parse(webtag); //Empty tagObj array OR Convert JSON into JS object 
    
    let html = "";
    let addedTagList = document.getElementById("addedtaglist");
    tagObj.forEach((item, index) => {

        item.tag_name >= 0 ? className = "red_tag" : className = "blue_tag"; //Used ternary operator

        html += `<li class="tag ${className}">
                    ${item.tag_name}
                    <button type="button" onclick="editTag(${index})" class="text-primary"><i class="fa fa-edit"></i></button>
                    <button type="button" onclick="deleteTag(${index})" class="text-danger"><i class="fa fa-trash"></i></button>
                </li>`;
    });
    addedTagList.innerHTML = html; //Add the tag into the div list
}

// editTag - passing the index to be edited
let editTag = (index) => {
    
    let saveIndex = document.getElementById("saveindex");
    let addTagBtn = document.getElementById("addtagbtn");
    let saveTagBtn = document.getElementById("savetagbtn");

    saveIndex.value = index;

    let webtag = localStorage.getItem("localtag");
    let tagObj = JSON.parse(webtag);

    //Show edit input, hide adding input
    addTagInput.style.display = "none";
    editTagInput.style.display = "block";

    editTagInput.value = tagObj[index]["tag_name"]; //Replace old value with new

    //Hide Add button, show edit button
    addTagBtn.style.display = "none";
    saveTagBtn.style.display = "block";
}

// Save tag
let saveEditedTag = () => {
    let webtag = localStorage.getItem("localtag");
    let tagObj = JSON.parse(webtag);

    let saveIndex = document.getElementById("saveindex").value;

    for (keys in tagObj[saveIndex]) {
        if (keys == "tag_name" && !isNaN(Number(editTagInput.value)) && editTagInput.value != "") {
            tagObj[saveIndex].tag_name = editTagInput.value;
        } else {
            showModal("Tag can't be empty & must be a correct number!");
            return;
        }
    }

    //Hide edit field + edit button, show add field + add button
    editTagInput.style.display = "none";
    addTagInput.style.display = "block";
    saveTagBtn.style.display = "none";
    addTagBtn.style.display = "block";

    //Update the tagObj array in localstorage
    localStorage.setItem("localtag", JSON.stringify(tagObj));

    //Empty both fields
    editTagInput.value = "";
    addTagInput.value = "";
}

/** Keyboard event for saving edited tag */
editTagInput.addEventListener("keyup", (e) => {

    // If user pressed enter, try to add tag 
    if (e.key == "Enter") {
    
        saveEditedTag();
        
    }

    showTags();
});

let saveTagBtn = document.getElementById("savetagbtn");
/**  Click event for saving edited tag */
saveTagBtn.addEventListener("click", () => {

    saveEditedTag();

    showTags();
});

// deleteTag - passing the index to be removed
let deleteTag = (index) => {
    let webtag = localStorage.getItem("localtag");
    let tagObj = JSON.parse(webtag);

    tagObj.splice(index, 1); //removes 1 element from given index in the array
    localStorage.setItem("localtag", JSON.stringify(tagObj)); //updating the local storage 
    showTags(); //Show updated table
}

// Delete all tags / empty array
let deleteAllBtn = document.getElementById("deleteallbtn");
deleteAllBtn.addEventListener("click", () => {
    let saveTagBtn = document.getElementById("savetagbtn");
    let addTagBtn = document.getElementById("addtagbtn");
    let webtag = localStorage.getItem("localtag");

    let tagObj = JSON.parse(webtag);
    if (webtag == null) {
        tagObj = [];
    }
    else {
        tagObj = JSON.parse(webtag);
        tagObj = []; //empty the whole array object
    }
    saveTagBtn.style.display = "none";
    addTagBtn.style.display = "block";
    localStorage.setItem("localtag", JSON.stringify(tagObj));
    showTags();
});

// Get the modal
let modal = document.getElementById("myModal");
let modalText = document.getElementById("modal-text");
// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

/** Show modal for 2 sec */
let showModal = (text) => {
    modal.style.display = "block";
    modalText.innerHTML = "<p>" + text + "</p>";

    setTimeout(() => {
        modal.style.display = "none";
    }, 2000);
}

// When the user clicks on <span> (x), close the modal
span.onclick = () => {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = (event) => {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}













