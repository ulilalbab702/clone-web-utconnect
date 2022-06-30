export const formatUang = (data) => {
    if(data != undefined){
        return `${data.toString().replace(/(\B)(?=(\d\d\d)+(?!\d))/g, ".")}`;
    }
};