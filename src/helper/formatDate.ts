export const formatDate = (timestamp: number) => {
    const unixdate = new Date(timestamp * 1000)
    const day = "0" + unixdate.getDay();
    const month = "0" + unixdate.getMonth();
    const year = unixdate.getFullYear();
    const hours = unixdate.getHours();
    const minutes = "0" + unixdate.getMinutes();
    const seconds = "0" + unixdate.getSeconds();
    const date = day.slice(-2) + '.' + month.slice(-2) + '.' + year
    const time = hours + ':' + minutes.slice(-2) + ':' + seconds.slice(-2);
    const fulldate = time + ' ' + date;
    return fulldate;
}