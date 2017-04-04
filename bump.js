/** 
 * Bumps the distribution and package.json
 */
const mz = require('mz/fs');
const colors = require('colors');
const fs = require('fs');
const version = process.argv[process.argv.length - 1];
const bufferConcat = require('buffer-concat');
const filePathES = './dist/resizilla.js';
const filePathUMD = './dist/resizilla.umd.js';
const files = [filePathES, filePathUMD];
const artworkPath = './artwork.js';
const packageJSON = './package.json';


/** 
 * Update package.json.
 */
mz.readFile(packageJSON).then(contents => {
        const newPk = JSON.parse(contents);

        newPk.version = version;

        const Pk = new Buffer(JSON.stringify(newPk, null, "\t"));

        fs.writeFile(packageJSON, Pk, (error) => {
            if (error) return console.log(error);
        });

        console.log(`\n\n${packageJSON} bumped to '${version}'\n\n`.green);

        /**
         * Add artwork to scripts.
         */
        files.forEach((script) => addArtwork(script, newPk));
    })
    .catch(err => console.error(err));


/** 
 * Add artwork to script.
 */
const addArtwork = (filePath, updatedPackageJSON) => {
    mz.readFile(filePath)
        .then(file => {
            mz.readFile(artworkPath)
                .then(artwork => {
                   const markedVersion = `/*\n Version: ${updatedPackageJSON.version}\n Description: ${updatedPackageJSON.description}\n Author: ${updatedPackageJSON.author}\n Repository: ${updatedPackageJSON.repository.url}\n*/\n\n`;
        			const markedVersionBuffer = Buffer.from(markedVersion, 'utf8');
                    const patchedFile = bufferConcat([artwork, markedVersionBuffer, file]);

                    fs.writeFile(filePath, patchedFile, (error) => {
                        if (error) return console.log(error);
                    });
                })
        });
}
