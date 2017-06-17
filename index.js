const marked = require('marked');
const editor = document.querySelector('#editor textarea');
const preview = document.querySelector('#preview');
const saveLink = document.querySelector('#saveLink');
const dialog = require('electron').remote.dialog;
const fs = require('fs');

editor.onkeyup = generatePreview;
saveLink.onclick = saveFile;

function generatePreview() {
    var content = editor.value;
    preview.innerHTML = marked(content);
}

function saveFile() {
     var filename = dialog.showSaveDialog({
        title: 'Save file',
        filters: [
            { name: 'Markdown Documents', extensions: ['md', 'markdown'] }
        ]
    });
    
    if(!filename) return;
    fs.writeFile(filename, editor.value, function (err) { 
        if (err) {
            dialog.showErrorBox("File Save Error", err.message);
        }
    });
}
