/**
 * A script for displaying related, non-clickable images using a button-automated, rotating gallery. 
 * 
 * Note that this script is safe IF, AND ONLY IF, the user uses it on html pages which define a div with class="gallery" ! 
 */

// get all child nodes of the gallery 
const gallery = document.querySelector('.gallery');
const photos = gallery.childNodes; 

// remove children from the list if they are not images ... store this in an array 
const photosArr = []; 
photos.forEach((photo) => { 
    if (photo.nodeType == 1) { 
        photosArr.push(photo); 
    } 
}); 

console.log(photosArr); 

let currentIndex = 0;

/**
 * To construct a slide show of images from a gallery div, remove the current photo and transition to the 
 * next. We do so by adding the `inactive` class to the current photo and the `active` class to the following. 
 */
function showNextPhoto() {

    console.log(currentIndex); 

    // hide current
    photosArr[currentIndex].classList.remove('active');
    photosArr[currentIndex].classList.add('hide');
    // update array index
    currentIndex = (currentIndex + 1) % photosArr.length;
    // show next
    photosArr[currentIndex].classList.remove('hide');
    photosArr[currentIndex].classList.add('active');
}

// show the first photo
photosArr[currentIndex].classList.add('active');

// automatically rotate to the next! (every three seconds) 
setInterval(showNextPhoto, 10000);