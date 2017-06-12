#timestamp / time clock

//TODO: ADD AM / PM SETTINGS
//TODO: ADD TIMECLOCK FUNCTIONALITY 

var timestamp = function(){
    var date = new Date()
    let sec = date.getSeconds()
    let min = date.getMinutes()
    let hour = date.getHours()
    let d = date.getDate()
    let month = date.getMonth()
    let year = date.getFullYear()

    console.log(`${month}/${d}/${year}; ${hour}:${min}:${sec}`)
}
