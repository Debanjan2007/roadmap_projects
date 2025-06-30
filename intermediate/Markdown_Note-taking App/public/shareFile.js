const previewArea = document.querySelector('.preview');
const uploadBtn = document.querySelector('.upload');
const inparea = document.querySelector('#inputArea');

console.log('hello');

port = process.env.PORT;

const dynamicChange = (fileName) => {
    if (!fileName) return;

    const reader = new FileReader();

    reader.onload = function (e) {
        const content = e.target.result;
        inparea.innerText = content;
    };
    URL = `http://localhost:${port}/api/v1/note/markDown`
    fetch(URL,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(content)
        }
    ).then(response => { 
        const data = response.json() ;
        console.log("data : ", data);
    })
        .then(result => {
            console.log('Success:', result);
        })
        .catch(error => {
            console.error('Error:', error);
        })
    reader.readAsText(fileName);
}
document.getElementById('fileInput').addEventListener('change', (event) => {
    const file = event.target.files[0]
    dynamicChange(file);
})