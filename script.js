const myLibrary = [];

// Constructor
function Book(title, author, pages, read) {
    this.id = crypto.randomUUID(); // Generate unique id 
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

// Every object in the Book class has access to called "toggleRead"
// Book.prototype is a separate object in memory, and we're allowing all
// instances of book to access the same function. This saves memory, since
// we don't need to declare a new toggleRead function for each book.
Book.prototype.toggleRead = function() {
    this.read = !this.read; 
}

// Take params, create a book and store it in the array
function addBookToLibrary(title, author, pages, read) {
    // Creating new objects with constructor links them to a prototype (Book.prototype)
    const newBook = new Book(title, author, pages, read); // Initialize a book object
    myLibrary.push(newBook);                               // Store the new book in array
}

// Helper function to create cards
function createBookCard(book) {
    // Create Card
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");
    bookCard.dataset.id = book.id; // Connect DOM with the object created

    // Title
    const title = document.createElement("h3");
    title.textContent = book.title;

    // Author
    const author = document.createElement("p");
    author.textContent = `Author: ${book.author}`;

    // Pages
    const pages = document.createElement("p");
    pages.textContent = `Pages: ${book.pages}`;

    // Status
    const status = document.createElement("p");
    status.textContent = `Status: ${book.read ? "Read" : "Not Read"}`;

    // Toggle button
    const toggleBtn = document.createElement("button");
    toggleBtn.textContent = "Toggle Read";
    toggleBtn.classList.add("toggle-read");

    // Remove button
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.classList.add("remove-book");

    // Append everything to DOM object created locally
    status.classList.add("book-status");
    bookCard.append(title, author, pages, status, toggleBtn, removeBtn);
    
    return bookCard;
}

// Loops through array and displays each book on the page
function displayBooks() {
    // Grab the container
    const container = document.getElementById("library-container");

    // Clear it to avoid duplicate cards
    container.innerHTML = "";

    // Loop through myLibrary array
    myLibrary.forEach(book => {

        // Create cards
        const card = createBookCard(book);

        // Toggle button logic
        const toggleBtn = card.querySelector(".toggle-read");
        const statusText = card.querySelector(".book-status");
        
        // Attach event listeners for on click
        toggleBtn.addEventListener("click", () => {
            book.toggleRead();
            displayBooks(); // Refresh the UI
        });

        // Remove button logic
        const removeBtn = card.querySelector(".remove-book");

        removeBtn.addEventListener("click", () => {
            const index = myLibrary.findIndex(b => b.id === book.id);
            myLibrary.splice(index, 1); // Starting at index, remove 1 element from array
            displayBooks();
        })

        // Append to the container
        container.appendChild(card);
    })
}



// Add temporary books to see something render
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, true);
addBookToLibrary("1984", "George Orwell", 328, false);
displayBooks();