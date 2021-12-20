//Dependencies
const Path = require("path")
const Fs = require("fs")

//Main
async function files(directory = String){
    return new Promise((resolve)=>{
        function directory_files(dir, done) {
            var results = []
        
            Fs.readdir(dir, function (err, list) {
                if (err) return done(err)
        
                var list_length = list.length
        
                if (!list_length) return done(null, results)
        
                list.forEach(function (file) {
                    file = Path.resolve(dir, file)
        
                    Fs.stat(file, function (err, stat) {
                        if (stat && stat.isDirectory()) {
                            directory_files(file, function (err, res) {
                                results = results.concat(res)
        
                                if (!--list_length) done(null, results)
                            })
                        } else {
                            results.push(file)
                            
                            if (!--list_length) done(null, results)
                        }
                    })
                })
            })
        }

        directory_files(directory, function(err, files){
            if(err){
                resolve(err)
                return
            }

            resolve(files)
        })
    })
}

//Exporter
module.exports = {
    files: files
}