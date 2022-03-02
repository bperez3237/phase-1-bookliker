document.addEventListener("DOMContentLoaded", function() {
    initBooks();
});


function initBooks() {
    const ul = document.getElementById('list')
    const showPanel = document.getElementById('show-panel')

    fetch('http://localhost:3000/books')
    .then(res => res.json())
    .then(books => books.forEach(book => {
        let li = document.createElement('li');
        li.textContent = book.title;
        li.addEventListener('click', () => {
            showPanel.innerHTML = ''

            let info = document.createElement('div')
            info.innerHTML = `
            <image src=${book.img_url}>
            <h2>${book.title}</h2>
            <h2>${book.subtitle}</h2>
            <h2>${book.author}</h2>
            <p>${book.description}</p>
            `
            let likersList = document.createElement('ul')
            book.users.forEach(obj => {
                let listItem = document.createElement('li')
                listItem.textContent = obj.username
                likersList.appendChild(listItem)
            })

            let bttn = document.createElement('button')
            bttn.textContent = 'LIKE'
            bttn.addEventListener('click', () => {
                console.log('here')
                fetch(`http://localhost:3000/books/${book.id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json'
                    },
                    body: JSON.stringify({
                        'users': book.users.concat([
                            {
                                'id': 11,
                                'username': 'bp'
                            }
                        ])
                    })
                })
                .then(res => res.json())
                .then(data => {
                    let newItem = document.createElement('li')
                    newItem.textContent = 'bp'
                    likersList.appendChild(newItem)
                    console.log(likersList)
                })
            })
            info.appendChild(likersList)
            info.appendChild(bttn)
            showPanel.appendChild(info)
        })
        ul.appendChild(li)
    }))
}


