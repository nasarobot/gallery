const galleryDisplayContainer = document.getElementById('gallery-display-container');
var gridItems;

const imgDisplayContainer = document.getElementById('img-display-container');
const close = document.getElementById('close');
const download = document.getElementById('download');
const displayimg = document.getElementById('img');
const left = document.getElementById('left');
const right = document.getElementById('right');

var images;
var current;
var index;
var n;


const getImages = (callback) => {
    const request = new XMLHttpRequest();

    request.addEventListener('readystatechange', () => {
        if (request.readyState === 4 && request.status === 200) {
            callback(undefined, request.responseText);
        } else if (request.readyState === 4) {
            callback('could not fetch data', undefined);
        }
    });
    request.open('GET', 'images.json');
    request.send();
};

getImages((err, data) => {
    console.log('callback');
    if (err) {
        console.log(err);
    } else {
        console.log(data);
        images = JSON.parse(data);
        populate(images);
    }
})

function populate(images) {
    n = images.length;
    console.log(n);
    for (let i = 0; i < n; i++) {
        galleryDisplayContainer.innerHTML += `<div class="grid-item"><img  src="${images[i].source}"></div>`;
    }
    gridItems = document.querySelectorAll('.grid-item');
    addClickToDisplay();
};

function addClickToDisplay() {
    gridItems.forEach(item => {
        item.addEventListener('click', function (self) {
            self.preventDefault();
            displayimg.src = this.firstChild.src;
            for (let i = 0; i < gridItems.length; i++) {
                if (gridItems[i] == this) {
                    index = i;
                    break;
                }
            }
            toggleShowHide();
        });
    });
};
function toggleShowHide() {
    if (galleryDisplayContainer.classList.contains('none')) {
        galleryDisplayContainer.classList.remove('none');
        imgDisplayContainer.classList.add('none');
    }
    else {
        galleryDisplayContainer.classList.add('none');
        imgDisplayContainer.classList.remove('none');
    }
};

download.addEventListener('click', () => {
    const a = document.createElement('a');
    const url = displayimg.src;
    a.href = url;
    a.download = url.split('/').pop();
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
});
close.addEventListener('click', () => toggleShowHide());

function Leftimg() {
    index--; index = (index + n) % n;
    displayimg.src = gridItems[index].firstChild.src;
};
function Rightimg() {
    index++; index = index % n;
    displayimg.src = gridItems[index].firstChild.src;
};
left.addEventListener('click', () => Leftimg());
right.addEventListener('click', () => Rightimg());

document.addEventListener('keyup', function (e) {
    console.log(e.key);
    if (!imgDisplayContainer.classList.contains('none')) {
        if (e.key === "Left" || e.key === "ArrowLeft") {
            Leftimg();
        }
        else if (e.key === "Right" || e.key === "ArrowRight") {
            Rightimg();
        }
        else if (e.key === "Escape") {
            toggleShowHide();
        }
    }
});









const imgcontainer = document.querySelector('#img-div')

let zoom = 1;
imgcontainer.addEventListener('wheel', e => {
    img.style.transformOrigin = `${e.offsetX}px ${e.offsetY}px`
    zoom += e.deltaY * -0.01
    zoom = Math.min(Math.max(1, zoom), 5)
    if (zoom == 1) {
        displayimg.style.left = '0px'
        displayimg.style.top = '0px'
    }
    displayimg.style.transform = `scale(${zoom})`
});

let clicked = false;
let xAxis;
let x;
let yAxis;
let y;

imgcontainer.addEventListener('mouseup', () => imgcontainer.style.cursor = 'auto')

imgcontainer.addEventListener('mousedown', e => {
    clicked = true;
    xAxis = e.offsetX - displayimg.offsetLeft;
    yAxis = e.offsetY - displayimg.offsetTop;

    imgcontainer.style.cursor = 'grabbing';
});

window.addEventListener('mouseup', () => clicked = false)

imgcontainer.addEventListener('mousemove', e => {
    if (!clicked) return;
    e.preventDefault();

    x = e.offsetX;
    y = e.offsetY;

    displayimg.style.left = `${x - xAxis}px`;
    displayimg.style.top = `${y - yAxis}px`;

    checkSize();
});

function checkSize() {
    let containerOut = imgcontainer.getBoundingClientRect();
    let imgIn = displayimg.getBoundingClientRect();

    if (parseInt(displayimg.style.left) > 0) {
        displayimg.style.left = '0px';
    } else if (imgIn.right < containerOut.right) {
        displayimg.style.left = `-${imgIn.width - containerOut.width}px`;
    }
    if (parseInt(img.style.top) > 0) {
        displayimg.style.top = '0px';
    } else if (imgIn.bottom < containerOut.bottom) {
        displayimg.style.top = `-${imgIn.height - containerOut.height}px`;
    }
};