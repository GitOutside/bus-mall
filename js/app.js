'use strict';
//=============GLOBAL VARIABLES=====================

var totalClicks = 0;
var maxClicks = 25;

function Product(imageSource, caption){
  this.clicked = 0;
  this.shown = 0;
  this.imageSrc = imageSource;
  this.imageCap = caption;
  Product.productCollection.push(this);
}
Product.productCollection = [];
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

//User story: prevent total votes to disapper on refresh
//1. use getItem to get the products from local storage
var stringyProductsStored = localStorage.getItem('storedProducts');
var productsFromStorage = JSON.parse(stringyProductsStored);
console.log('products from local storage', stringyProductsStored);

if(productsFromStorage){
  productCollection = productsFromStorage;
}

//==============EVENT LISTENER======================
var productImageSection = document.getElementById('product-images');
productImageSection.addEventListener('click', handleClickOnAProduct);
function handleClickOnAProduct(event){
  if(event.target.tagName === 'IMG'){
    totalClicks++;
    var targetSrc = event.target.getAttribute('src');
    for(var i = 0; i < Product.productCollection.length; i++)
      if(Product.productCollection[i].imageSrc === targetSrc){
        Product.productCollection[i].clicked++;
      }

    rerenderRandoImages();
    if(totalClicks === maxClicks){
      productImageSection.removeEventListener('click', handleClickOnAProduct);

      renderChart()

      //Put products into local storage. After max clicks
      var stringyProducts = JSON.stringify(productCollection);
      //console.log('stringy array', stringyProducts);
      localStorage.setItem('storedProducts', stringyProducts);
 master
      var putInList = document.getElementById('data');
      for(i =0; i < Product.productCollection.length; i++){
        var listItem = document.createElement('li');
        listItem.textContent = (
          Product.productCollection[i].imageCap + ':' + ' Clicked : ' + Product.productCollection[i].clicked + ' Shown: ' + Product.productCollection[i].shown
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
  var firstRandom = pickRando(0, Product.productCollection.length);
  var secondRandom = pickRando(0, Product.productCollection.length);
  var thirdRandom = pickRando(0, Product.productCollection.length);

  while(firstRandom === secondRandom || firstRandom === thirdRandom || secondRandom === thirdRandom){
    firstRandom = pickRando(0, Product.productCollection.length);
    secondRandom = pickRando(0, Product.productCollection.length);
    thirdRandom = pickRando(0, Product.productCollection.length);

  }
  while(firstRandom === randoIndex[0] || firstRandom === randoIndex[1] || firstRandom === randoIndex[2]){
    firstRandom = pickRando(0, Product.productCollection.length);
  }
  while(secondRandom === randoIndex[0] || secondRandom === randoIndex[1] || secondRandom === randoIndex[2] || secondRandom === firstRandom){
    secondRandom = pickRando(0, Product.productCollection.length);
  }
  while(thirdRandom === randoIndex[0] || thirdRandom === randoIndex[1] || thirdRandom === randoIndex[2] || thirdRandom === firstRandom || thirdRandom === secondRandom){
    thirdRandom = pickRando(0, Product.productCollection.length);
  }
  randoIndex = [firstRandom, secondRandom, thirdRandom];

  //==============RENDER IN LIST=======================
  var leftImage = document.getElementById('left-image');
  var leftText = document.getElementById('left-text');
  var middleImage = document.getElementById('middle-image');
  var middleText = document.getElementById('middle-text');
  var rightImage = document.getElementById('right-image');
  var rightText = document.getElementById('right-text');

  var firstProduct = Product.productCollection[firstRandom].imageSrc;
  leftImage.src = firstProduct;
  leftText.textContent = Product.productCollection[firstRandom].imageCap;
  Product.productCollection[firstRandom].shown++;

  var secondProduct = Product.productCollection[secondRandom].imageSrc;
  middleImage.src = secondProduct;
  middleText.textContent = Product.productCollection[secondRandom].imageCap;
  Product.productCollection[secondRandom].shown++;

  var thirdProduct = Product.productCollection[thirdRandom].imageSrc;
  rightImage.src = thirdProduct;
  rightText.textContent = Product.productCollection[thirdRandom].imageCap;
  Product.productCollection[thirdRandom].shown++;
}
function pickRando(min, max){
  return Math.floor(Math.random() * (max - min) + min);
}

function renderChart(){
  var productLabels = [];
  console.log('about to render the chart');
  for(var i = 0; i < Product.productCollection.length; i++){
    productLabels.push(Product.productCollection[i].imageCap);
  }

  var productClicks = [];
  for(i = 0; i < Product.productCollection.length; i++){
    productClicks.push(Product.productCollection[i].clicked);
  }

  var productShown = [];
  for(i = 0; i < Product.productCollection.length; i++){
    productShown.push(Product.productCollection[i].shown);
  }
  var ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: productLabels,
      datasets: [{
        label: 'Product Popularity Survey Results',
        data: productClicks,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}
