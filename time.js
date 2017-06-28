//timestamp / time clock

//TODO: ADD AM / PM SETTINGS
//TODO: ADD TIMECLOCK FUNCTIONALITY

//noted : the version of JS that Atom's script package allows doesn't support :
  //backtics
    //let 

var timestamp = function(){
    var date = new Date()
    var sec = date.getSeconds()
    /*let min = date.getMinutes()
    let hour = date.getHours()
    let d = date.getDate()
    let month = date.getMonth()
    let year = date.getFullYear()
    */
    var min = date.getMinutes()
    var hour = date.getHours()
    var d = date.getDate()
    var month = date.getMonth()
    var year = date.getFullYear()


    //console.log(`${month}/${d}/${year}; ${hour}:${min}:${sec}`)
    console.log("" + month + "/" + d + "/" + year + "; " + hour + ":" + min + ":" + sec)
}

timestamp()
