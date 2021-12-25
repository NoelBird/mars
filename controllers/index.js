const fs = require("fs")

save = (fileName, contents) => {
    fs.writeFile(fileName, contents, "utf-8", () => {
        console.log("write!!")
    })
}

load = (fileName) => {
    return fs.readFile(fileName, "utf-8", (err, data) => {
        if(err) {
            console.log(err)
        }
        return data
    })
}

module.exports = {"save": save, "load": load}