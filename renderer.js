const React = require('react');
const ReactDOM = require('react-dom');
const { ipcRenderer } = require('electron');
const { remote } = require('electron');
const App = require('./src/App.js');

const e = React.createElement;
const win = remote.getCurrentWindow();

const domContainer = document.querySelector('#root');

const addNewAccount = account => ipcRenderer.send('newAccount', account);
const updateSelectedAccount = account => ipcRenderer.send('updateSelectedAccount', account);

const render = () => ReactDOM.render(
  e(
    App,
    {
      addNewAccount,
      updateSelectedAccount,
      accounts: win.accounts,
      selectedAccount: win.selectedAccount,
    },
  ),
  domContainer,
);

// Re-render when we get a new account.
ipcRenderer.on('newAccount', render);
ipcRenderer.on('updateSelectedAccount', render);

render();