window.onload = function() {
    loadBookmarks()
}

//!Add Bookmark
function addBookmark() {
    let name = document.getElementById('bookmark-name').value
    let url = document.getElementById('bookmark-url').value
    if (!name || !url){
        return
    }
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || []
    bookmarks.push({ name, url })
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks))

    document.getElementById('bookmark-name').value = ''
    document.getElementById('bookmark-url').value = ''
    loadBookmarks()
}

//!Delet Bookmark
function deleteBookmark(index) {
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'))
    bookmarks.splice(index, 1)
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    loadBookmarks()
}

// Редагування закладки
function editBookmark(index) {
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    let name = prompt("Edit site name:", bookmarks[index].name);
    let url = prompt("Edit site URL:", bookmarks[index].url);
    if (name && url) {
        bookmarks[index] = { name, url };
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
        loadBookmarks(); // Оновлюємо список після редагування
    }
}

// Завантаження закладок з localStorage і відображення в списку
function loadBookmarks() {
    let bookmarkList = document.getElementById('bookmark-list');
    bookmarkList.innerHTML = ''; // Очищаємо список
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];

    bookmarks.forEach((bookmark, index) => {
        let listItem = document.createElement('li');
        listItem.innerHTML = `
            <a href="${bookmark.url}" target="_blank">${bookmark.name}</a>
            <button class="edit-btn" onclick="editBookmark(${index})">Edit</button>
            <button class="delete-btn" onclick="deleteBookmark(${index})">Delete</button>
        `;
        bookmarkList.appendChild(listItem);
    });
}