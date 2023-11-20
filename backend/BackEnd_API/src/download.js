const { app, BrowserWindow, session } = require('electron')
const path = require('path')

const newDownloadPath = path.join(__dirname, 'downloads');

async function aplicationTimeout(){
    setTimeout(() => { console.log("aaaaaaaaah"); }, 0);
}

function createWindow() {
    aplicationTimeout()
    const win = new BrowserWindow({
        show: false, // não abrir a janela do navegador
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        }
    });

    // win.webContents.openDevTools();

    session.defaultSession.on('will-download', (event, item, webContents) => {
        //item.setSavePath(path.join(newDownloadPath, item.getFilename()));
        console.log("download starting!")
        item.setSavePath(path.join(newDownloadPath, "revendas.xlsx"));
        item.on('done', (event, state) => {
            win.close();
            app.quit();
            console.log("File downloaded successfully!");
        });
    });
    win.loadURL("https://www.gov.br/anp/pt-br/assuntos/precos-e-defesa-da-concorrencia/precos/levantamento-de-precos-de-combustiveis-ultimas-semanas-pesquisadas/");
}

app.whenReady().then(() => { //espera o electron abrir
    createWindow()

    app.on('activate', () => { //método chamado sempre que a tela é "construída"
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => { //se todas abas forem fechadas
    if (process.platform !== 'darwin') { //se não for MacOS
        app.quit()
    }
})