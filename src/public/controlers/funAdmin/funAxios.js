import axios from 'axios'

const handleAxios = (URI, initialValue) => {

    axios.post(URI, initialValue)
    .then(function (response) {
        return  response 
    })
    .catch(function (error) {
        return error
    });
}

export default handleAxios