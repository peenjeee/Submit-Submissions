/* Global Variables */
const books = [];
const RENDER_EVENT = 'render-book';
const SAVED_EVENT = 'saved-book';
const STORAGE_KEY = 'BOOKSHELF_APP_DATA';
let editingBookId = null;

/* Helper Function */
function isStorageExist() {
    if (typeof (Storage) === undefined) {
        alert('Browser kamu tidak mendukung local storage');
        return false;
    }
    return true;
}

function saveData() {
    if (isStorageExist()) {
        const parsed = JSON.stringify(books);
        localStorage.setItem(STORAGE_KEY, parsed);
        document.dispatchEvent(new Event(SAVED_EVENT));
    }
}

function loadDataFromStorage() {
    const serializedData = localStorage.getItem(STORAGE_KEY);
    let data = JSON.parse(serializedData);

    if (data !== null) {
        for (const book of data) {
            books.push(book);
        }
    }

    document.dispatchEvent(new Event(RENDER_EVENT));
}

function generateId() {
    return +new Date();
}

function generateBookObject(id, title, author, year, isComplete) {
    return {
        id,
        title,
        author,
        year,
        isComplete
    }
}

function findBook(bookId) {
    for (const bookItem of books) {
        if (bookItem.id === bookId) {
            return bookItem;
        }
    }
    return null;
}

function findBookIndex(bookId) {
    for (const index in books) {
        if (books[index].id === bookId) {
            return index;
        }
    }
    return -1;
}

function makeBook(bookObject) {
    const bookItem = document.createElement('div');
    bookItem.setAttribute('data-bookid', bookObject.id);
    bookItem.setAttribute('data-testid', 'bookItem');

    const title = document.createElement('h3');
    title.setAttribute('data-testid', 'bookItemTitle');
    title.innerText = bookObject.title;

    const author = document.createElement('p');
    author.setAttribute('data-testid', 'bookItemAuthor');
    author.innerText = `Penulis: ${bookObject.author}`;

    const year = document.createElement('p');
    year.setAttribute('data-testid', 'bookItemYear');
    year.innerText = `Tahun: ${bookObject.year}`;

    const btnContainer = document.createElement('div');

    const toggleCompleteBtn = document.createElement('button');
    toggleCompleteBtn.setAttribute('data-testid', 'bookItemIsCompleteButton');
    toggleCompleteBtn.innerText = bookObject.isComplete ? 'Belum selesai dibaca' : 'Selesai dibaca';
    toggleCompleteBtn.addEventListener('click', function () {
        toggleBookComplete(bookObject.id);
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.setAttribute('data-testid', 'bookItemDeleteButton');
    deleteBtn.innerText = 'Hapus Buku';
    deleteBtn.addEventListener('click', function () {
        deleteBook(bookObject.id);
    });

    const editBtn = document.createElement('button');
    editBtn.setAttribute('data-testid', 'bookItemEditButton');
    editBtn.innerText = 'Edit Buku';
    editBtn.addEventListener('click', function () {
        editBook(bookObject.id);
    });

    btnContainer.append(toggleCompleteBtn, deleteBtn, editBtn);
    bookItem.append(title, author, year, btnContainer);

    return bookItem;
}

function toggleBookComplete(bookId) {
    const bookTarget = findBook(bookId);

    if (bookTarget == null) return;

    bookTarget.isComplete = !bookTarget.isComplete;
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}

function deleteBook(bookId) {
    const bookTargetIndex = findBookIndex(bookId);

    if (bookTargetIndex === -1) return;

    books.splice(bookTargetIndex, 1);
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}

function editBook(bookId) {
    const bookTarget = findBook(bookId);
    if (bookTarget == null) return;

    editingBookId = bookId;
    document.getElementById('bookFormTitle').value = bookTarget.title;
    document.getElementById('bookFormAuthor').value = bookTarget.author;
    document.getElementById('bookFormYear').value = bookTarget.year;
    document.getElementById('bookFormIsComplete').checked = bookTarget.isComplete;

    const submitSpan = document.querySelector('#bookFormSubmit span');
    if (submitSpan) {
        submitSpan.innerText = 'Edit Buku';
    }
    document.getElementById('bookForm').scrollIntoView({ behavior: 'smooth' });
}

function handleAddOrEditBook() {
    const title = document.getElementById('bookFormTitle').value;
    const author = document.getElementById('bookFormAuthor').value;
    const year = Number(document.getElementById('bookFormYear').value);
    const isComplete = document.getElementById('bookFormIsComplete').checked;

    if (editingBookId) {
        const bookTargetIndex = findBookIndex(editingBookId);
        if (bookTargetIndex !== -1) {
            books[bookTargetIndex].title = title;
            books[bookTargetIndex].author = author;
            books[bookTargetIndex].year = year;
            books[bookTargetIndex].isComplete = isComplete;
        }
        editingBookId = null;
    } else {
        const generatedID = generateId();
        const bookObject = generateBookObject(generatedID, title, author, year, isComplete);
        books.push(bookObject);
    }

    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}

/* Load Data */
document.addEventListener('DOMContentLoaded', function () {
    const submitForm = document.getElementById('bookForm');
    submitForm.addEventListener('submit', function (event) {
        event.preventDefault();
        handleAddOrEditBook();
        
        submitForm.reset();
        const submitSpan = document.querySelector('#bookFormSubmit span');
        if (submitSpan) {
            submitSpan.innerText = 'Belum selesai dibaca';
        }
    });

    const searchForm = document.getElementById('searchBook');
    searchForm.addEventListener('submit', function (event) {
        event.preventDefault();
        document.dispatchEvent(new Event(RENDER_EVENT));
    });

    const checkIsComplete = document.getElementById('bookFormIsComplete');
    checkIsComplete.addEventListener('change', function (event) {
        if (!editingBookId) {
            const submitSpan = document.querySelector('#bookFormSubmit span');
            if (submitSpan) {
                submitSpan.innerText = event.target.checked ? 'Selesai dibaca' : 'Belum selesai dibaca';
            }
        }
    });

    if (isStorageExist()) {
        loadDataFromStorage();
    }
});

/* Render Data */
document.addEventListener(RENDER_EVENT, function () {
    const incompleteBookList = document.getElementById('incompleteBookList');
    const completeBookList = document.getElementById('completeBookList');
    
    incompleteBookList.innerHTML = '';
    completeBookList.innerHTML = '';

    const searchQuery = document.getElementById('searchBookTitle') 
        ? document.getElementById('searchBookTitle').value.toLowerCase() 
        : '';

    for (const bookItem of books) {
        if (searchQuery && !bookItem.title.toLowerCase().includes(searchQuery)) {
            continue;
        }

        const bookElement = makeBook(bookItem);
        if (bookItem.isComplete) {
            completeBookList.append(bookElement);
        } else {
            incompleteBookList.append(bookElement);
        }
    }
});

/* Saved Data */
document.addEventListener(SAVED_EVENT, function () {
    console.log('Data berhasil disimpan ke localStorage.');
});