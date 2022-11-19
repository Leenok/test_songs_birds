import birdsData from './info/birds.js';

let levels_name = document.querySelectorAll('.names-levels__item');
let score = document.querySelector('.score-number');
//main-block
let level = 0;
let levelscore = 0;
let attempt = 5;
let totallscore = 0;

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
//next button
let butt = document.querySelector('.next-level');

//random birds
let randomevelBirds = randomBird();
// console.log(randomevelBirds);
let birdslevel = birdsData[level][randomevelBirds[level]];
//add listener to list-bird
let nameCheckBird = '';
// let checkitems = document.querySelectorAll('.check-block__item');

function levelName() {
    if (level > 0) {
        levels_name[level - 1].classList.remove('check-level');
    }
    levels_name[level].classList.add('check-level');

}
function randomBird() {
    let rand = [];
    for (let i = 0; i < 6; i++) {
        let z = Math.floor(Math.random() * 5);
        rand.push(z);
    }
    return rand;
}
function BirdX() {
    birdslevel = birdsData[level][randomevelBirds[level]];
    main_img.src = "./info/img/x-bird.png";
    main_name.innerHTML = "******";
    main_song.src = birdslevel.audio;
    nameCheckBird = birdslevel.name;
}
function BirdY() {
    main_img.src = birdslevel.image;
    main_name.innerHTML = birdslevel.name;
}
function createChecklist(x) {
    let newlist = '';
    for (let i in birdsData[x]) {
        newlist += "<div class='check-block__item'><img src='/info/img/grey.png'>" + birdsData[x][i].name + "</div>";
    }
    return newlist;
}
function zagluskaInfo() {
    let n = document.querySelector('.info-block');
    let y = document.querySelector('.none');
    y.classList = "info-block";
    n.classList = "none";
    list.removeEventListener('click', zagluskaInfo, false);
}
//подгр данных птицы выбранной
function addDataBird(bird) {
    let z = birdsData[level].filter(item => item.name == bird.path[0].textContent);
    // console.log(z[0]);
    info_name.innerHTML = z[0].name;
    info_species.innerHTML = z[0].species;
    info_img.style.backgroundImage = `url(${z[0].image})`;
    info_song.src = z[0].audio;
    info_description.innerHTML = z[0].description;
    // info_block.append();
    return z;
}
function soundClick(href) {
    var audio = new Audio(); // Создаём новый элемент Audio
    audio.src = href; // Указываем путь к звуку "клика"
    audio.autoplay = true; // Автоматически запускаем
}
function addEventToList() {
    document.querySelectorAll('.check-block__item').forEach((element) => {
        element.addEventListener('click', addColorPoint, element);
        element.addEventListener('click', addDataBird, element);
    })
}
function removeEventToList() {
    document.querySelectorAll('.check-block__item').forEach((element) => {
        element.removeEventListener('click', addColorPoint, element);
    })
}
function updateScore() {
    levelscore = attempt;
    totallscore += levelscore;
    score.innerHTML = "Score: " + totallscore;

}
function addColorPoint(elem) {
    if (elem.path[0].textContent === birdslevel.name) {
        elem.path[0].children[0].src = "../info/img/green.png";
        soundClick("./info/song/win2.mp3");
        removeEventToList();
        BirdY();
        updateScore();

        butt.style.backgroundColor = "rgb(18, 171, 84)";
        butt.addEventListener('click', nextLevel, false);
    } else {
        attempt--;
        if (attempt < 0) {
            attempt = 0;
        }
        elem.path[0].children[0].src = "../info/img/red.png";
        soundClick("./info/song/beep-3.mp3");
    }
}
function defaulttPageLevel() {
    //bird x write 
    BirdX();
    levelName();
    //update list
    list.innerHTML = createChecklist(level);
    list.append();
    list.addEventListener('click', zagluskaInfo, false);
    addEventToList();

}

defaulttPageLevel();
// console.log(birdslevel.image);

function nextLevel() {
    levelscore = 0;
    level += 1;
    attempt = 5;

    zagluskaInfo();
    defaulttPageLevel();

    butt.style.backgroundColor = "rgb(46, 42, 42)";
    butt.removeEventListener('click', nextLevel, false);
    console.log(level);
}


//block itog game
//new game, update let and scrin






