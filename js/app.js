'use strict';

//todo
//
//form **id*****likes***( content,day-month-year)

// id= inside the constructor
// likes = as a random number between 1 and 500
// subject : Select  (Coding, 3D printing, Cyber security, AI)
//author,title  : textInput
//date : dateinput
//content : textarea
//img
//date format

//savetolcalstorage load - render

// view total number of articles

//  Total articles ( array.length )
//  ID    Title    Image    Date   likes
const Articles = function(id,author,title,subject,content,likes,date){
  this.id = id;
  this.author = author;
  this.title = title;
  this.subject = subject;
  this.content = content;
  this.likes = likes;
  this.date = date;
  Articles.allArticles.push(this);
};
Articles.allArticles = [];

Articles.prototype.setLocalStorage = function(){
  localStorage.setItem('Articles',JSON.stringify(Articles.allArticles));
};

Articles.prototype.loadFromLocalStorage = function(){
  return JSON.parse( localStorage.getItem('Articles')) || [];
};

// Articles.prototype.removeArticle = function(id){
//       Articles.allArticles.splice(id,1)
//       Articles.prototype.setLocalStorage();
//     };

Articles.prototype.render = function(){
  let tbody = document.querySelector('tbody');
  let lsData = Articles.prototype.loadFromLocalStorage();
  for (let i in lsData){
    let tr = document.createElement('tr');
    //     tr.setAttribute('id',lsData[i].id);
    tbody.appendChild(tr);
    let idtd = document.createElement('td');
    idtd.textContent = lsData[i].id;
    tr.appendChild(idtd);

    let titletd = document.createElement('td');
    titletd.textContent = lsData[i].title;
    tr.appendChild(titletd);

    let subjecttd = document.createElement('td');
    subjecttd.textContent = lsData[i].subject;
    tr.appendChild(subjecttd);

    let imagetd = document.createElement('td');
    let img = document.createElement('img');
    img.src = './img/article.png';
    imagetd.appendChild(img);
    tr.appendChild(imagetd);

    let dateTd = document.createElement('td');
    dateTd.textContent = lsData[i].date;
    tr.appendChild(dateTd);


    let likestd = document.createElement('td');
    likestd.textContent = lsData[i].likes;
    tr.appendChild(likestd);
  }

  let total=document.getElementById('totalNumbers');
  total.textContent= lsData.length;

};

let form = document.getElementById('form');
form.addEventListener('submit',handleFormSubmit);

function handleFormSubmit (e){
  e.preventDefault();
  let id,author,title,subject,content,likes,date ;
  id = (Articles.allArticles.length + 1);
  author = e.target.inputAuthor.value;
  title = e.target.inputTitle.value;
  subject = e.target.subjectSelect.value;
  content = e.target.contentText.value;
  likes = generateRandomLikes();
  date = e.target.inputDate.value;


  new Articles(id,author,title,subject,content,likes,date );
  Articles.prototype.setLocalStorage();
  form.reset();
  start();
}


start();
function start(){
  let lsData = Articles.prototype.loadFromLocalStorage();
  if(lsData){
    Articles.allArticles = [];
    for (let i in lsData){
      new Articles(lsData[i].id,lsData[i].author,
        lsData[i].title,lsData[i].subject,
        lsData[i].content,lsData[i].likes,
        lsData[i].date);
    }
  }
  createtable();
}

function createtable(){
  clearTable();
  createTableHeader();
  Articles.prototype.render();
}

function clearTable(){
  document.querySelector('thead').innerHTML = '';
  document.querySelector('tbody').innerHTML = '';
}
function createTableHeader(){
  let thead = document.querySelector('thead');
  let arr = [ 'ID' , 'Title' , 'Subject' ,'Image' , 'Date' ,'likes'];
  for (let i = 0 ; i < arr.length ; i++){
    let th = document.createElement('th');
    th.textContent = arr[i];
    thead.appendChild(th);
  }
}

function generateRandomLikes(){
  return Math.floor(Math.random() * (500 - 1) + 1);
}



