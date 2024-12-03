/**
 * A script for displaying related, non-clickable images using a button-automated, rotating gallery. 
 * 
 * Note that this script is safe IF, AND ONLY IF, the user uses it on html pages which define a div with class="gallery". 
 */

// get all child nodes of the phantom slideshow
const slideshow = document.querySelector('.phantom-slideshow');
const photos = slideshow.childNodes; 

// remove children from the list if they are not images ... store this in an array 
const photosArr = []; 
photos.forEach((photo) => { 
    if (photo.nodeType == 1) { 
      photosArr.push(photo); 
    } 
}); 

// get references to the slideshow image, text and button
const slideshowImage = document.getElementById("slideshow-img"); 
const slideshowText = document.getElementById("slideshow-description"); 
const nextButton = document.getElementById("next-button");

// initialize the slideshow with the first image
let currentIndex = 0;
const arrSize = photosArr.length;
if (arrSize > 0) {
  slideshowImage.src = photosArr[0].src;
  slideshowImage.alt = photosArr[0].alt;
  slideshowText.textContent = slideshowImage.alt; 
}

// add functionality to the Next button
nextButton.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % arrSize; 
  slideshowImage.src = photosArr[currentIndex].src;
  slideshowImage.alt = photosArr[currentIndex].alt;
  slideshowText.textContent = photosArr[currentIndex].alt;
});
