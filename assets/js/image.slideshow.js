/**
 * A script for displaying related, non-clickable images using a button-automated, rotating gallery.  
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
const prevButton = document.getElementById("prev-button");

// initialize the slideshow with the first image
let currentIndex = 0;
const arrSize = photosArr.length;
if (arrSize > 0) {
  slideshowImage.src = photosArr[0].src;
  slideshowImage.alt = photosArr[0].alt;
  slideshowText.textContent = slideshowImage.alt; 
}

/**
 * Update the image and text to dispaly in the screen of the slideshow. 
 * 
 * @param index 
 */
function update_image_and_text(index) {
  slideshowImage.src = photosArr[index].src;
  slideshowImage.alt = photosArr[index].alt;
  slideshowText.textContent = photosArr[index].alt; 
}

// add functionality to the Next button
nextButton.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % arrSize; 
  update_image_and_text(currentIndex);
});

// add functionality to the Previous button
prevButton.addEventListener("click", () => {
  if (currentIndex > 0) { 
    currentIndex = (currentIndex - 1) % arrSize; 
    update_image_and_text(currentIndex);
  }
});


