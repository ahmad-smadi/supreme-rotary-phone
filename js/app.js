'use strict';

function Articles(id,author,title,subject,content,likes,date){
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

Articles.prototype.render = function(){
  let tbody = document.querySelector('tbody');
 
    let tr = document.createElement('tr');
    //     tr.setAttribute('id',lsData[i].id);
    tbody.appendChild(tr);
    let idtd = document.createElement('td');
    idtd.textContent =this.id;
    tr.appendChild(idtd);

    let titletd = document.createElement('td');
    titletd.textContent = this.title;
    tr.appendChild(titletd);

    let subjecttd = document.createElement('td');
    subjecttd.textContent = this.subject;
    tr.appendChild(subjecttd);

    let imagetd = document.createElement('td');
    let img = document.createElement('img');
    img.src = './img/article.png';
    imagetd.appendChild(img);
    tr.appendChild(imagetd);

    let dateTd = document.createElement('td');
    dateTd.textContent = this.date;
    tr.appendChild(dateTd);


    let likestd = document.createElement('td');
    likestd.textContent = this.likes;
    tr.appendChild(likestd);
 

  let total=document.getElementById('totalNumbers');
  total.textContent= this.allArticles;

};

let form = document.getElementById('form');
form.addEventListener('submit',handleFormSubmit);
new Articles('1','author','title','subject','content','likes','date')
Articles.prototype.setLocalStorage();
const arr = Articles.prototype.loadFromLocalStorage();
console.log(arr)
console.log(Articles.allArticles)

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
 
  console.log(lsData)
  console.log(Articles.allArticles)
}

function createtable(){
  clearTable();
  createTableHeader();

  for (let i of Articles.allArticles ){
    i.render();
  }
 
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



