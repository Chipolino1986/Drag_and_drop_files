// dragenter - когда сущность над элементом
// dragleave - когда сущность вышла за пределы элемента
// dragover - срабатывает постоянно, когда сущность над эл.
// drop - срабатывает, в тот момент когда обьекет был отпущен над эл.

let filesForUpload = [];
const types = ['image/jpeg', 'image/png'];
let dragAndDrop = document.querySelector('.drag_and_drop'),
    filesList = document.querySelector('.file-list'),
    uploadBtn = document.querySelector('.upload-btn');

dragAndDrop.addEventListener('dragenter', (e) => {
    e.preventDefault();
    dragAndDrop.classList.add('active')
})
dragAndDrop.addEventListener('dragleave', (e) => {
    e.preventDefault();
    dragAndDrop.classList.remove('active')
})
dragAndDrop.addEventListener('dragover', (e) => {
    e.preventDefault();
})

dragAndDrop.addEventListener('drop', (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files
    for (let key in files) {
        if (!types.includes(files[key].type)) {
            continue;
        }
        filesForUpload.push(files[key]);
        let filesTmpUrl = URL.createObjectURL(files[key])
        filesList.innerHTML += `<img class="img" src="${filesTmpUrl}">`;
    }
    if (filesForUpload.length > 0) {
        uploadBtn.removeAttribute('disabled');
    }
})
// new FormData - имитация отправки формы
// body - это именно те поля(картинки которые мы хотим отправить)
const uploadFiles = () => {
    let formData = new FormData()
    for (let key in filesForUpload) {
        formData.append(key, filesForUpload[key])
    }
    fetch("http://localhost/other_projects/Drag and Drop(перетаскивание файлов)/core/upload.php", {
        method: "POST",
        body: formData
    }).then((response) => response.json())
      .then(result => {
            if (result.status) {
                filesForUpload = [];
                filesList.innerHTML = ``;
                uploadBtn.setAttribute('disabled', true);
                alert('Файл успешно загружен');
            };
      });
};

// fetch('https://jsonplaceholder.typicode.com/posts', {
//       method: 'POST',
//       body: JSON.stringify({
//           title: 'foo',
//           body: 'bar',
//           userId: 1,
//       }),
//       headers: {
//           'Content-type': 'application/json; charset=UTF-8',
//       },
//       })
//       .then((response) => response.json())
//       .then((json) => console.log(json));