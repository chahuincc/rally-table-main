export default function ordenArray(dataNow){
        
    dataNow.sort(function (a, b) {
        let x = a['puntaje'],
            y = b['puntaje'];
            return ((x > y) ? -1 : ((x < y) ? 1 : 0));
    }); 
   
}
