

const reloadIt = function () {
    if (window.location.href.substr(-2) !== "?r") {
        window.location = window.location.href + "?r";
    }
}

setTimeout('reloadIt()', 100000)();

module.exports = { reloadIt };

