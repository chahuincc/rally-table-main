export default function JSDate() {
    let dayNow = new Date();
    
    let year  = dayNow.getFullYear()
    let mount = dayNow.getMonth()
    let day = dayNow.getDate()
    let dateNow = '' + day + '/' + (mount+1) + '/'+ year+''
    return dateNow;
  }