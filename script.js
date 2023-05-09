const galleryDisplayContainer = document.getElementById('gallery-display-container');
const gridItems = document.querySelectorAll('.grid-item');

const imgDisplayContainer = document.getElementById('img-display-container');
const close = document.getElementById('close');
const download = document.getElementById('download');
const displayimg = document.getElementById('img');
const left = document.getElementById('left');
const right = document.getElementById('right');

var n = gridItems.length;
var current;
var index;

gridItems.forEach(item => {
    item.addEventListener('click', function(self) {
        self.preventDefault();
        displayimg.src = this.firstChild.src;
        for(let i=0;i<gridItems.length;i++){
            if(gridItems[i] == this){
                index = i;
                break;
            }
        }
        toggleShowHide();
    })
});

function toggleShowHide() {
    if (galleryDisplayContainer.classList.contains('none')) {
        galleryDisplayContainer.classList.remove('none');
        imgDisplayContainer.classList.add('none');
    }
    else {
        galleryDisplayContainer.classList.add('none');
        imgDisplayContainer.classList.remove('none');
    }
}

download.addEventListener('click', () => {
    const a = document.createElement('a');
    const url = displayimg.src;
    a.href = url;
    a.download = url.split('/').pop();
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
})
close.addEventListener('click', () => {
    toggleShowHide();
});

function Leftimg() {
    index--; index = (index + n) % n;
    displayimg.src = gridItems[index].firstChild.src;
}
function Rightimg() {
    index++; index = index % n;
    displayimg.src = gridItems[index].firstChild.src;
}
left.addEventListener('click', () => Leftimg());
right.addEventListener('click', () => Rightimg());

document.addEventListener('keyup', function (e) {
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
