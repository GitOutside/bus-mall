'use strict';
//=============GLOBAL VARIABLES=====================

var productCollection = [];
var totalClicks = 0;
var maxClicks = 0;

function Product(imageSource, caption){
  this.clicked = 0;
  this.shown = 0;
  this.imageSrc = imageSource;
  this.imageCap = caption;

  productCollection.push(this);
}
//==============IMAGES==========================
new Product('img/bag.jpg', 'R2D2 Suitcase');
new Product('img/banana.jpg', 'Banana Slicer');
new Product('img/boots.jpg', 'Open-toed Rainboots');
new Product('img/breakfast.jpg', 'Champion of Breakfasts');
new Product('img/bathroom.jpg', 'Bathroom iPad Caddy');
new Product('img/bubblegum.jpg', 'Meatball Bubblegum');
new Product('img/chair.jpg', 'Domed-seat Chair');
new Product('img/cthulhu.jpg', 'Creature Action Figure');
new Product('img/dog-duck.jpg', 'Dog Duck-Lips');
new Product('img/dragon.jpg', 'Creature Action Figure')
new Product('img/pen.jpg', 'Two-In-One Pen/Utensil');
new Product('img/pet-sweep.jpg', 'Dog Dusters');
new Product('img/scissors', 'Pizza Scissors-Slicer');
new Product('img/shark.jpg', 'Shark Sleeping Bag');
new Product('img/sweep.jpg', 'Baby Duster');
new Product('img/tauntaun.jpg', 'TaunTaun Sleeping Bag');
new Product('img/uniorn.jpg' , 'Unicorn Meat');
new Product('img/usb.jpg', 'Sea-Monster Thumbdrive');
new Product('img/water-can.jpg', 'Self-Watering Can');
new Product('img/wine-glass.jpg', 'Tricky Sip Wineglass');

//==============EVENT LISTENER======================
//this works
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


  
  var targetSrc = event.target.getAttribute('src');
  for(var i = 0; i < productCollection.length; i++){
    if (productCollection[i].imageSrc === targetSrc){
      console.log('it was' , productCollection[i]);
      productCollection[i].clicked++;
      console.log(productCollection[i]);
      debugger;
    } else {
      alert('Click an image please');
    }
  }
//   function rerenderRandoImages(){
//     var firstRandom = pickRandom(0, productCollection.length);
//     console.log('first new', productCollection[firstRandom]);

//     var secondRandom = pickRandom(0, productCollection.length);
//     console.log('second new', productCollection[secondRandom]);
//     while(secondRandom === firstRandom){
//       secondRandom = pickRandom(0, productCollection.length);
//       console.log('second new (reroll)', productCollection[secondRandom]);
//     }
//     var thirdRandom = pickRandom(0, productCollection.length);
//     console.log('third new', productCollection[thirdRandom]);
//     while(thirdRandom === secondRandom){
//       thirdRandom = pickRandom(0, productCollection[thirdRandom]);
//     }
//   }
// }
// var leftImage = document.getElementById('left-image');
// var leftText = document.getElementById('left-text');
// var middleImage = document.getElementById('middle-image');
// var middleText = document.getElementById('middle-text');
// var rightImage = document.getElementById('right-image');
// var rightText = document.getElementById('right-text');

// leftImage.src = productCollection[firstRandom].imageSrc;
// leftText.textContent = productCollection[firstRandom].imageCap;
// productCollection[firstRandom].shown++;

// var secondProduct = productCollection[secondRandom];
// middleImage.src = productCollection[secondRandom].imageSrc;
// productCollection[secondRandom].shown++;

// var thirdProduct = productCollection[thirdProduct];
// leftText.src = productCollection[secondRandom].imageSrc;
// productCollection[thirdRandom].shown++;

// function pickRandom(min, max){
//   return Math.floor(Math.random() * (max - min) + min);
// }
