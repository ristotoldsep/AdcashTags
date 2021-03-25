# AdcashTags (Updated!)

Test Assignment for Software Engineering Internship - Front End
* Tags input with CRUD Operations & LocalStorage api (saves the tags in the browser = will not disappear when refreshing)

### Created with: 
* HTML
* CSS (SCSS as the CSS preprocessor)
* Vanilla JS (Tried to use ES6+ syntax)
* NPM for package management

Also used Font-awesome & Bootstrap for faster development 

~~~~
Clone/Fork the repo and run "npm install" on the CLI
* Run "live-server"
* For compiling SCSS: "npm run compile:sass"
~~~~

## Project images

### Adding tags 
![picture](assets/img/adcash.png)
* Users can input whatever they want, but once they press "Add tag" button or Enter, the string gets parsed. 
* Tags get added to the list when:
  * Tags are separated with comma "," or semicolon ";" and contain only number values!
  * Pressing the button "Add tag" on pressing Enter
* Tags with positive numbers (and 0) are colored to red, negative numbers are colored to blue

### Test it with this string!
~~~~
123, wwr2;  222, 4422, www; 23., -444; -33, -44w,   222w;  www    -333 -3;
~~~~

### Editing tags
![picture](assets/img/adcash_2.png)
* Users can edit tags by pressing the edit icon
  * Pressing "Save Tag" or pressing Enter after editing updates the selected tag!

### Deleting tags
* Users can delete tags separately or all with one click!

Also added some error handling, fixed some errors, changed folder structure & refactored code.
