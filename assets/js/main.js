
showtags(); //Displaying the tag list in browser memory on initialization

let addtaginput = document.getElementById("addtaginput"); //Selecting input field
let addtagbtn = document.getElementById("addtagbtn"); //Selecting add button 

// Get the modal
let modal = document.getElementById("myModal");
let modalText = document.getElementById("modal-text");
// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

/** Keyboard events */
addtaginput.addEventListener("keyup", (e) => {
    let addtaginputval = addtaginput.value.trim();
    let no_comma_val = addtaginputval.replace(/,/g, "");
    let no_semicolon_val = addtaginputval.replace(/;/g, "");

    if (addtaginputval.length > 0) {
        /** Gets the array of JSON objects in Local storage */
        let webtag = localStorage.getItem("localtag");

        if (webtag == null) {
            tagObj = [];
        }
        else {
            tagObj = JSON.parse(webtag); //Convert Json into JS object 
        }
        /** If user pressed enter, add tag  */
        if (e.keyCode == 13) {
            if (!isNaN(Number(addtaginputval))) {
                tagObj.push({ 'tag_name': addtaginputval });
                addtaginput.value = '';
            } else {
                showModal();
            }
        }
        /** If user inputs "," add tag */
        if (addtaginputval.slice(-1) === ",") {
            if (!isNaN(Number(no_comma_val))) {
                tagObj.push({ 'tag_name': no_comma_val });
                addtaginput.value = '';
            } else {
                showModal();
            }
        }
        /** If user inputs ";" add tag */
        if (addtaginputval.slice(-1) === ";") {
            if (!isNaN(Number(no_semicolon_val))) {
                tagObj.push({ 'tag_name': no_semicolon_val });
                addtaginput.value = '';
            } else {
                showModal();
            }
        }

        localStorage.setItem("localtag", JSON.stringify(tagObj)); //Update JSON in local storage
    }
    showtags(); //Update tags
});

/** Add tag button event */
addtagbtn.addEventListener("click", () => {

    let addtaginputval = addtaginput.value.trim();
    // console.log(addtaginputval);

    //If input is not a number, it will return NaN
    if (addtaginputval.length > 0 && !isNaN(Number(addtaginputval))) {
        let webtag = localStorage.getItem("localtag");
        if (webtag == null) {
            tagObj = [];
        }
        else {
            tagObj = JSON.parse(webtag);
        }
        tagObj.push({ 'tag_name': addtaginputval });

        localStorage.setItem("localtag", JSON.stringify(tagObj));
        addtaginput.value = '';
    } else {
        showModal();
    }
    showtags();
});

// showtags function
function showtags() {
    let webtag = localStorage.getItem("localtag");
    let className;
    if (webtag == null) {
        tagObj = [];
    }
    else {
        tagObj = JSON.parse(webtag);
    }
    let html = '';
    let addedtaglist = document.getElementById("addedtaglist");
    tagObj.forEach((item, index) => {

        if (item.tag_name >= 0) {
            className = "red_tag";
        } else {
            className = "blue_tag";
        }

        html += `<li class="tag ${className}">
                    ${item.tag_name}
                    <button type="button" onclick="edittag(${index})" class="text-primary"><i class="fa fa-edit"></i></button>
                    <button type="button" onclick="deletetag(${index})" class="text-danger"><i class="fa fa-trash"></i></button>
                </li>`;
    });
    addedtaglist.innerHTML = html;
}

// edittag - passing the index to be edited
let edittag = (index) => {
    let saveindex = document.getElementById("saveindex");
    let addtagbtn = document.getElementById("addtagbtn");
    let savetagbtn = document.getElementById("savetagbtn");

    saveindex.value = index;

    let webtag = localStorage.getItem("localtag");
    let tagObj = JSON.parse(webtag);

    addtaginput.value = tagObj[index]['tag_name']; //Replace old value with new

    //Hide Add button, show edit button
    addtagbtn.style.display = "none";
    savetagbtn.style.display = "block";
}

// savetag
let savetagbtn = document.getElementById("savetagbtn");

savetagbtn.addEventListener("click", () => {
    let addtagbtn = document.getElementById("addtagbtn");
    let webtag = localStorage.getItem("localtag");
    let tagObj = JSON.parse(webtag);
    let saveindex = document.getElementById("saveindex").value;

    for (keys in tagObj[saveindex]) {
        if (keys == 'tag_name' && !isNaN(Number(addtaginput.value))) {
            tagObj[saveindex].tag_name = addtaginput.value;
            console.log(tagObj[saveindex]);
        } else {
            showModal();
            return;
        }
        
    }
    //tagObj[saveindex] = {'tag_name':addtaginput.value};
    //tagObj[saveindex][tag_name] = addtaginput.value;
    savetagbtn.style.display = "none";
    addtagbtn.style.display = "block";

    localStorage.setItem("localtag", JSON.stringify(tagObj));
    addtaginput.value = '';
    showtags();
})

// deletetag - passing the index to be removed
let deletetag = (index) => {
    let webtag = localStorage.getItem("localtag");
    let tagObj = JSON.parse(webtag);
    tagObj.splice(index, 1); //removes 1 element from given index in the array
    console.log(tagObj);
    localStorage.setItem("localtag", JSON.stringify(tagObj)); //updating the local storage 
    showtags(); //Show updated table
}

// deleteall tags / empty array
let deleteallbtn = document.getElementById("deleteallbtn");
deleteallbtn.addEventListener("click", () => {
    let savetagbtn = document.getElementById("savetagbtn");
    let addtagbtn = document.getElementById("addtagbtn");
    let webtag = localStorage.getItem("localtag");
    let tagObj = JSON.parse(webtag);
    if (webtag == null) {
        tagObj = [];
    }
    else {
        tagObj = JSON.parse(webtag);
        tagObj = [];
    }
    savetagbtn.style.display = "none";
    addtagbtn.style.display = "block";
    localStorage.setItem("localtag", JSON.stringify(tagObj));
    showtags();
});


/** Show modal for 1 sec */
let showModal = () => {
    modal.style.display = "block";
    modalText.innerHTML = "<p>Tags can only contain numbers!</p>";

    setTimeout(() => {
        modal.style.display = "none";
    }, 1000);
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}













