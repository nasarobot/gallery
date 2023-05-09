const keyUp = document.getElementById('key-press');

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
                console.log(index);
                break;
            }
        }
        console.log(this);
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

left.addEventListener('click',function Leftimg() {
    index--; index = (index + n) % n;
    console.log(index);
    displayimg.src = gridItems[index].firstChild.src;
});
right.addEventListener('click',function Rightimg () {
    index++; index = index % n;
    console.log(index);
    displayimg.src = gridItems[index].firstChild.src;
});

keyUp.addEventListener('keyup', (e) => {
    if (!imgDisplayContainer.classList.contains('none')){
        switch(e.key) {
            case "Left" : case "ArrowLeft" : Leftimg();break;
            case "Right" : case "ArrowRight" : Rightimg();break;
            case "Escape" : toggleShowHide();break;
        }
    }
});