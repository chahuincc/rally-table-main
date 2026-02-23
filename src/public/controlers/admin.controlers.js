import htmlAdmin from '../view/admin.html';
import axios from 'axios'
import ordenArray from './funAdmin/ordenarArr'
import "./cssAdmin/admin.css"

const Admin = (socket)=>{

    let initialValue = {
        numCarrera: 0,
        nombre: '',
        puntaje: 0
    }
    let dataCpy = {}
    let dataActiveLive = false;
       
    const divElement = document.createElement('div')
    divElement.innerHTML = htmlAdmin;
    
    const forName = divElement.querySelector('#btnClickSend')
    const valueName = divElement.querySelector('#name')
    const valueNumber =  divElement.querySelector('#number')
    const lstData = divElement.querySelector('#viewTable')
    const check = divElement.querySelector('#buttonActiveLive') 
    
    
    const activeLive = async ()=>{
        try {
            const resp = await axios.get(`/stateLive`);
            dataCpy = JSON.parse( JSON.stringify( resp.data ) );
            dataActiveLive = dataCpy[0].stateLive;
        } catch (err) {
            console.error(err);
        }
    }
    activeLive()

    check.addEventListener('click', (e)=>{

        if(dataActiveLive){
            dataActiveLive = false
        }else{
            dataActiveLive = true
        }
        socket.emit('activeLive', dataActiveLive )
        
    })

    //Event button edit 
    lstData.addEventListener('click', async(e)=>{

        if(e.target.innerHTML === 'EDITAR' ){
         try {
            const resp = await axios.get(`/update/${e.target.id}`);
            dataCpy = JSON.parse( JSON.stringify( resp.data ) );
            valueName.value =  dataCpy.nombre
            valueNumber.value = dataCpy.puntaje
        } catch (err) {
            console.error(err);
        }
      }
    })

    valueNumber.addEventListener('input', (e)=>{
        initialValue.puntaje = e.target.value;
    })
    valueName.addEventListener('input', (e)=>{
        initialValue.nombre = e.target.value;
    })


// send Data
forName.addEventListener('click', async(e)=>{
    
        if(dataCpy._id){
            dataCpy.puntaje = parseInt(valueNumber.value)
            axios.put(`/${dataCpy._id}`, {
                numCarrera: dataCpy.numCarrera,
                nombre: dataCpy.nombre,
                puntaje: dataCpy.puntaje
            })
            .then(res =>
                {
                    socket.emit('message')
                    valueNumber.value = 0
                    valueName.value = ''
                })
            .catch(err => console.log(err))
            lstData.innerHTML=''
            sendGetRequest()
            
            dataCpy = {
                nombre:'',
                puntaje: 0,
                _id: ''
            }
        }
       
        // create Data
        else{
            initialValue.puntaje = parseInt(initialValue.puntaje)
            try {
                const resp = await  axios.post('/postData', initialValue);

            } catch (err) {
                
                console.error(err);
            }
            lstData.innerHTML=''
            sendGetRequest()
        }
    });

    const sendGetRequest = async () => {
        let dataNowUp = {}
        try {
            const resp = await axios.get('/getData');
            // console.log('this resp', resp)
            dataNowUp = JSON.parse( JSON.stringify( resp.data ) );
            viewLst(dataNowUp)
        } catch (err) {
            console.error(err);
        }
    };
    
    sendGetRequest()
    function viewLst (res){

        ordenArray(res)

       return  res.map((dt, index)=>{
            
            return lstData.innerHTML += `
            <tr>
                <th scope="row">${index}</th>
                <td>${dt.nombre}</td>
                <td class="stylPts">${dt.puntaje}</td>
                <td><button id="${dt._id}"  style=color:blue; >EDITAR</button></td>
            </tr>
            `
        })
    }

    return divElement;
} 
export default Admin;