'use strict';
/*
PD: show side by side by side images of products
track their clicks
after 25 clicks, display results of how many clicks each item got

Randomize the showing of products
don't repeat products back to back
don't repeat products in a single cycle
don't show the same product in any three

We need:
how many times clicked - set to 0
how many times shown -set to 0
---times clicked / times shown * 100 = % of popularity

render images to page in
*/

//=============GLOBAL VARIABLES=====================

var productCollection = [];
var totalClicks = 0;
var maxClicks = 5;

function Product(imageSource, caption){
  this.clicked = 0;
  this.shown = 0;
  this.imageSrc = imageSource;
  this.imageCap = caption;

  productCollection.push(this);
}

new Product('img/bag.jpg', 'R2D2 Suitcase');
new Product('img/banana.jpg', 'Banana Slicer');
new Product('img/boots.jpg', 'Open-toed Rainboots');
new Product('img/breakfast.jpg', 'Champion of Breakfasts');
new Product('img/bathroom.jpg', 'Bathroom iPad Caddy');

var productImageSection = document.getElementById('product-images');

productImageSection.addEventListener('click', handleClickOnAProduct);

function handleClickOnAProduct(event){
  if(event.target.tagName === 'IMG'){
    totalClicks++;
    console.log(totalClicks);
    if(totalClicks === maxClicks){
      productImageSection.removeEventListener('click', handleClickOnAProduct);
    }
  }
}

// //use src of img to find right product and tally a click
// // https://stackoverflow.com/questions/14221231/find-relative-path-of-a-image-tag-javascript
// var targetSrc = event.target.getAttribute('src');
// for(var i = 0; i < productCollection.length; i++){
//   if (productCollection[i].imageSrc === targetSrc)
// {
//     console.log('it was' , productCollection[i]);
//     productCollection[i].clicked++;
//   }
// }
// rerenderRandoImages(); 
// } else {
//   alert('Click an image please');
// }
// }

// function rerenderRandoImages(){

// }