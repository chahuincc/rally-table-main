import htmlHome from '../view/home.html';
import ordenArray from './funAdmin/ordenarArr'
import getDateNow from './funHome/getDateNow'
import axios from 'axios'
import './cssHome/home.css'
import './cssHome/screen576.css'
import './cssHome/screen768.css'
import './cssHome/screen992.css'
const Home = (socket) => {

    const divElement = document.createElement('div')
    divElement.innerHTML = htmlHome

    const tableView = divElement.querySelector('#table')
    const buttonViewTable = divElement.querySelector('#buttonActivTable')
    const dateNow = divElement.querySelector('#dateNow')
    const buttonActivTable = divElement.querySelector('#buttonActivTable')
    const contLiveState = divElement.querySelector('#contLiveState')
    let activeButton = true
    let ButttonActiveLive = false

    const stateLive = async () => {
        try {
            const resp = await axios.get('/stateLive');
            const data = JSON.parse(JSON.stringify(resp.data));
            if (data && data.length > 0) {
                ButttonActiveLive = data[0].stateLive;
                updateLiveUI(ButttonActiveLive);
            }
        } catch (err) {
            console.error("Error fetching initial live state:", err);
        }
    }

    function updateLiveUI(isActive) {
        if (isActive) {
            contLiveState.innerHTML = `<div class="liveWord">
            <span>live<span>
          </div> 
            <div class="styleLive">
              <div></div>
              <div></div>
              <div></div>
            </div>`
        } else {
            contLiveState.innerHTML = '<span>Live No Active</span>'
        }
    }

    stateLive()

    socket.on('activeLive', (dt) => {
        let data = JSON.parse(JSON.stringify(dt));
        updateLiveUI(data);
    })

    buttonViewTable.addEventListener('click', (e) => {

        buttonActivTable.style.transform = "rotate(0deg)"
        if (activeButton) {
            buttonActivTable.style.transform = "rotate(180deg) translate(0px, 50px)"
            sendGetRequest()
            activeButton = false
        } else {
            activeButton = true
            tableView.innerHTML = ''
        }
    })

    const sendGetRequest = async () => {
        let dataNowUp = {}
        try {
            const resp = await axios.get('/getData');
            dataNowUp = JSON.parse(JSON.stringify(resp.data));
            paintViewHtml(dataNowUp)
        } catch (err) {
            console.error(err);
        }
    };

    // DAte handle
    dateNow.innerHTML = `${getDateNow()}`

    // socket handle
    socket.on('message', (dt) => {
        let data = JSON.parse(JSON.stringify(dt));
        tableView.innerHTML = ''
        paintViewHtml(data)
    })

    function paintViewHtml(dt) {
        ordenArray(dt)
        return dt.map((dat, index) => {
            return tableView.innerHTML += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${dat.nombre}</td>
                    <td class="stylPts">${dat.puntaje}</td>
                </tr>
                `
        })
    }
    return divElement;
}

export default Home;