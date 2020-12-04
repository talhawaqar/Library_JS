const container = document.getElementsByClassName('container')[0];
const submitBtn = document.getElementsByClassName('submit')[0];
const title = document.getElementById('title');
const author = document.getElementById('author');
const pages = document.getElementById('page');
const read = document.getElementById('read');
const displayFromBtn = document.getElementById('new-bookbtn');
const form = document.getElementById('create-form');

const myLibrary = [];

function Book(title, author, pages, isread) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isread = isread;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

const book1 = new Book('Sapiens: A Brief History of Humankind', 'Yuval Noah Harari', 464, true);
const book2 = new Book('How to Stop Worrying and Start Living', 'Dale Carnegie', 306, true);
const book3 = new Book('A Study in Scarlet', ' Arthur Conan Doyle', 176, true);
const book4 = new Book('A Promised Land', 'Barack Obama', 768, false);

addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book3);
addBookToLibrary(book4);

function createIsReadBtn(book) {
  const readBtn = document.createElement('button');
  // Check for read or not
  if (book.isread) {
    readBtn.textContent = 'Read';
    readBtn.classList.toggle('readbtn');
  } else {
    readBtn.textContent = 'NotRead';
    readBtn.classList.toggle('notreadbtn');
  }
  // toggle btn for isRead
  readBtn.addEventListener('click', () => {
    book.isread = !book.isread;
    readBtn.textContent = book.isread ? 'Read' : 'NotRead';
    readBtn.classList.toggle('readbtn');
    readBtn.classList.toggle('notreadbtn');
  });
  return readBtn;
}

function displayLibrary(array) {
  container.innerHTML = '';

  for (let i = 0; i < array.length; i += 1) {
    const book = array[i];

    // Create the element
    const div = document.createElement('div');
    div.classList.add('bookdiv'); // Add the style for div

    const title = document.createElement('h3');
    const author = document.createElement('p');
    const pages = document.createElement('p');

    // Data insertion
    title.textContent = book.title;
    author.textContent = `Author: ${book.author}`;
    pages.textContent = `No.of pages: ${book.pages}`;

    // delete a book Btn
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('deletebtn');

    deleteBtn.textContent = 'Delete';

    deleteBtn.addEventListener('click', () => {
      alert('Are you sure? You want to delete this book?');
      myLibrary.splice(i, 1);
      displayLibrary(myLibrary);
    });

    // Organogram
    container.appendChild(div);
    div.appendChild(title);
    div.appendChild(author);
    div.appendChild(pages);
    div.appendChild(createIsReadBtn(book));
    div.appendChild(deleteBtn);
  }
}

displayLibrary(myLibrary);

// Display the form
displayFromBtn.addEventListener('click', () => {
  form.classList.toggle('display');
});

// Add a new book
submitBtn.addEventListener('click', (e) => {
  e.preventDefault(); // This will prevent the default behaviour of the event.

  if (title.value === '' || author.value === '' || pages.value === '') {
    alert('Cannot create book because some properties are missing');
    return;
  }

  const newBook = new Book(title.value, author.value, pages.value, read.checked);
  addBookToLibrary(newBook);
  displayLibrary(myLibrary);
  title.value = '';
  author.value = '';
  pages.value = '';
  read.checked = false;
});
