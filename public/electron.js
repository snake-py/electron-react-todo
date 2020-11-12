const electron = require('electron');
const { app, BrowserWindow, Menu, ipcMain } = electron;
const { getCursorScreenPoint, getDisplayNearestPoint } = electron.screen;
const path = require('path');
const isDev = require('electron-is-dev');

const fs = require('fs'); // reads json file

try {
  require('electron-reloader')(module);
} catch (_) {}

let mainWindow;
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 680,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
  mainWindow.on('closed', () => (mainWindow = null));
  console.log("MAIN WINDOW LOAD");
}
app.on('ready', createWindow);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on('get:todos', () => {
  mainWindow.webContents.send('get:todos', getTodos());
});


const getTodos = () => {
  return JSON.parse(fs.readFileSync('public/todos.json'));
};

ipcMain.on('add:todo', (e, todo) => {
  todos = JSON.parse(fs.readFileSync('public/todos.json'));
  newTodo = {
    "id": todos.todos.length + 1,
    "todo": todo,
    "done": false
  }
  console.log(newTodo);
  todos.todos.unshift(newTodo)

  data = JSON.stringify(todos, null, 2);

  fs.writeFile('public/todos.json', data, (err) => {
    if (err) throw err;
  });
  mainWindow.webContents.send('add:newTodos', getTodos());
})


ipcMain.on('update:todo', (e, todo) => {
  todos = JSON.parse(fs.readFileSync('public/todos.json'));
  todos.todos.forEach((todoFromJSON) => {
    if (todoFromJSON.id == todo.id) {
      console.log(todoFromJSON);
      todoFromJSON.done = todo.done;
      todoFromJSON.todo = todo.todo;
    }
  });

  data = JSON.stringify(todos, null, 2);

  fs.writeFile('public/todos.json', data, (err) => {
    if (err) throw err;
  });
});
