
exports.getDate = function (){

    const today = new Date();
    const option = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    };

    return day = today.toLocaleDateString("en-US", option);
     
}

exports.getDay = function (){

    const today = new Date();
    const option = {
        weekday: "long",
           };

    return day = today.toLocaleDateString("en-US", option);
    
}