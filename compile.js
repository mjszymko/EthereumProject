const path = require('path');//we need a valid path to the solidity file so we can compile it.  This will guarantee cross platform compatibility, whether you are running on Windows or UNIX.

const fs = require('fs');//file system
const solc = require('solc');
const inboxPath = path.resolve(__dirname,'contracts', 'Inbox.sol');//This will give you a path to the Inbox.sol file

const source = fs.readFileSync(inboxPath, 'utf8');//There used to be only ASCII, but in today's age of global communication, needed a way to represent multiple languages with characters

module.exports = solc.compile(source, 1).contracts[':Inbox'];

//console.log(solc.compile(source, 1).contracts);

//we need other files to have access to our compiled code - module.exports allows this


