import birdsData from './info/birds.js';

//main-block
let level = 0;
let score = 0;
let main_img = document.querySelector('.main-block__img');
let main_name = document.querySelector('.main-block__name');
let main_song = document.querySelector('.main-block__song');
const level_name = document.querySelector('.names-levels');

//info -block 
let info_block = document.querySelector('.info-block');
let info_img = document.querySelector('.info-block__img');
let info_name = document.querySelector('.info__name');
let info_species = document.querySelector('.info__species');
let info_song = document.querySelector('.info__song');
let info_description = document.querySelector('.info-block__description');

//check-block
const list = document.querySelector('.check-block');
let block_none = document.querySelector('.none');
let block_ban = document.querySelector('.info-block__ban');


// настройка игры
//раноманая птица из уровня
// подсчет очков
// отметка правильнвй или неправл ответ

//check birds;
//random birds
let randomevelBirds = randomBird();
function randomBird() {
    let rand = [];
    for (let i = 0; i < 6; i++) {
        let z = Math.floor(Math.random() * 5);
        rand.push(z);
    }
    return rand;
}

console.log(randomevelBirds);

//main block -bird
main_song.src = birdsData[level][randomevelBirds[level]].audio;


// console.log(birdsData[level][randomevelBirds[level]].audio);

list.innerHTML = createChecklist(level);
list.append();

function createChecklist(x) {
    let newlist = '';
    for (let i in birdsData[x]) {
        newlist += "<div class='check-block__item'><img src='/info/img/grey.png'>" + birdsData[x][i].name + "</div>";
    }
    return newlist;
}

list.addEventListener('click', () => {

})
//add listener to list-bird
let nameCheckBird = '';
let checkitems = document.querySelectorAll('.check-block__item');



for (let i in checkitems) {

    let item = checkitems[i];
    item.addEventListener('click', () => {
        if (block_none) {
            block_none.classList = "info-block";
            block_ban.classList = "none";
        }
        // console.log(item.children[0]);
        addColorPoint(item);
        // console.log(list.children[i].textContent);
        nameCheckBird = item.textContent;
        addDataBird(nameCheckBird);
    });

}

function addColorPoint(elem) {
    let birdslevel = birdsData[level][randomevelBirds[level]];
    // console.log(birdslevel);
    // console.log(elem.textContent);
    // console.log(elem === birdslevel);
    if (elem.textContent === birdslevel.name) {
        elem.children[0].src = "../info/img/green.png";
        main_img.src = birdslevel.image;
        main_name.innerHTML = birdslevel.name;
    } else {
        elem.children[0].src = "../info/img/red.png";
    }

    // return elem.classList.add('check-tr'); //check-item
}


//подгр данных птицы выбранной
function addDataBird(bird) {
    let z = birdsData[level].filter(item => item.name == bird);
    info_name.innerHTML = z[0].name;
    info_species.innerHTML = z[0].species;
    info_img.style.backgroundImage = `url(${z[0].image})`;
    info_song.src = z[0].audio;
    info_description.innerHTML = z[0].description;
    info_block.append();
    return z;
}

// let n = addDataBird('Ворон');
// console.log(n);
