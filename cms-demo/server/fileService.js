
const fs = require('fs');
const path = require('path');
const randomString = require('randomstring');

function mkdirsSync(dirname) {
    if (fs.existsSync(dirname)) {
        return true
    } else {
        if (mkdirsSync(path.dirname(dirname))) {
            fs.mkdirSync(dirname)
            return true
        }
    }
}


var fileService = {
    upload: function (file) {
        console.log('----------file:' + file)
        var file = file || null;
        
        return new Promise((resolve, reject) => {
            var saveDir = path.join(__dirname, '/upload');
            mkdirsSync(saveDir);

            if (!file) {
                resolve(false);
                return;
            };

            console.log('----------file.path:', file.path)
            var readFrom = fs.createReadStream(file.path)

            let extname = path.extname(file.name);
            var fileName = randomString.generate(10) + extname;

            let saveTo = fs.createWriteStream(path.join(saveDir, fileName));
            readFrom.pipe(saveTo);
            // debugger
            
            readFrom.on('end',  function(err) {
                if (!err) {
                    fs.unlink(file.path)
                    resolve(true) 
                }
            })

            readFrom.on('error', function (err) {
                reject(false);
            })


        })
    }
}

module.exports = fileService;
