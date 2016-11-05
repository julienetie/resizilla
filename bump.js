/** 
 * Bumps the distribution and package.json
 */

const mz = require('mz/fs');
const colors = require('colors');
const fs = require('fs');
const formatJSON = require('format-json');
const version = process.argv[2];


fs.writeFile('./src/version.js', `export default '${version}';`, (error) => {
	if (error) return console.log(error);
	console.log(`\n\n./src/version.js bumped to '${version}'`.green);
});


mz.readFile('./package.json').then(contents => {
	let newPk = JSON.parse(contents);

	newPk.version = version;
	newPk = new Buffer(JSON.stringify(newPk, null, "\t"));

	fs.writeFile('./package.json', newPk, (error) => {
		if (error) return console.log(error);
	});

	console.log(`\n\n./package.json bumped to '${version}'\n\n`.green);
})
.catch(err => console.error(err));
