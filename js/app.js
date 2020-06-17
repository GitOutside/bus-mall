'use strict';
//=============GLOBAL VARIABLES=====================

var productCollection = [];
var totalClicks = 0;
var maxClicks = 25;

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
new Product('img/cthulhu.jpg', 'Cthulhu Action Figure');
new Product('img/dog-duck.jpg', 'Dog Duck-Lips');
new Product('img/dragon.jpg', 'Canned Dragon Meat');
new Product('img/pen.jpg', 'Two-In-One Pen/Utensil');
new Product('img/pet-sweep.jpg', 'Dog Dusters');
new Product('img/scissors.jpg', 'Pizza Scissors-Slicer');
new Product('img/shark.jpg', 'Shark Sleeping Bag');
new Product('img/sweep.png', 'Baby Duster');
new Product('img/tauntaun.jpg', 'TaunTaun Sleeping Bag');
new Product('img/unicorn.jpg' , 'Unicorn Meat');
new Product('img/usb.gif', 'Sea-Monster Thumbdrive');
new Product('img/water-can.jpg', 'Self-Watering Can');
new Product('img/wine-glass.jpg', 'Tricky Sip Wineglass');

//==============EVENT LISTENER======================
var productImageSection = document.getElementById('product-images');
productImageSection.addEventListener('click', handleClickOnAProduct);
function handleClickOnAProduct(event){
  if(event.target.tagName === 'IMG'){
    totalClicks++;
    var targetSrc = event.target.getAttribute('src');
    for(var i = 0; i < productCollection.length; i++)
      if(productCollection[i].imageSrc === targetSrc){
        productCollection[i].clicked++;
      }
    if(totalClicks === maxClicks){
      productImageSection.removeEventListener('click', handleClickOnAProduct);
      var putInList = document.getElementById('data');
      for(i =0; i < productCollection.length; i++){
        var listItem = document.createElement('li');
        listItem.textContent = (
          productCollection[i].imageCap + ':' + ' Clicked : ' + productCollection[i].clicked + ' Shown: ' + productCollection[i].shown
        );
        putInList.appendChild(listItem);
      }
    }
    rerenderRandoImages();
  }
  else {
    alert('Click on an image please.');
  }

}
//============RENDER IMAGES==========================
//Tia helped me with this part
var randoIndex = [];

function rerenderRandoImages(){
  var firstRandom = pickRando(0, productCollection.length);
  var secondRandom = pickRando(0, productCollection.length);
  var thirdRandom = pickRando(0, productCollection.length);

  while(secondRandom === firstRandom || secondRandom === thirdRandom || secondRandom === thirdRandom){
    firstRandom = pickRando(0, productCollection.length);
    secondRandom = pickRando(0, productCollection.length);
    thirdRandom = pickRando(0, productCollection.length);
  }
  while(firstRandom === randoIndex[0] || firstRandom === randoIndex[1] || firstRandom === randoIndex[2]){
    firstRandom = pickRando(0, productCollection.length);
  }
  while(secondRandom === randoIndex[0] || secondRandom === randoIndex[1] || secondRandom === randoIndex[2]){
    secondRandom = pickRando(0, productCollection.length);
  }
  while(thirdRandom === randoIndex[0] || thirdRandom === randoIndex[1] || thirdRandom === randoIndex[2]){
    thirdRandom = pickRando(0, productCollection.length);
  }
  randoIndex = [firstRandom, secondRandom, thirdRandom];

  //==============RENDER IN LIST=======================
  var leftImage = document.getElementById('left-image');
  var leftText = document.getElementById('left-text');
  var middleImage = document.getElementById('middle-image');
  var middleText = document.getElementById('middle-text');
  var rightImage = document.getElementById('right-image');
  var rightText = document.getElementById('right-text');

  var firstProduct = productCollection[firstRandom].imageSrc;
  leftImage.src = firstProduct;
  leftText.textContent = productCollection[firstRandom].imageCap;
  productCollection[firstRandom].shown++;

  var secondProduct = productCollection[secondRandom].imageSrc;
  middleImage.src = secondProduct;
  middleText.textContent = productCollection[secondRandom].imageCap;
  productCollection[secondRandom].shown++;

  var thirdProduct = productCollection[thirdRandom].imageSrc;
  rightImage.src = thirdProduct;
  rightText.textContent = productCollection[thirdRandom].imageCap;
  productCollection[thirdRandom].shown++;
}
function pickRando(min, max){
  return Math.floor(Math.random() * (max - min) + min);
}
