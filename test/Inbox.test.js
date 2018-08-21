const assert = require('assert');
const ganache = require('ganache-cli');// Ganache automatically makes accounts for you to use - no need to worry about public/private keys, etc
const Web3 = require('web3');// When we are working with the constructor, we use capital version

const provider = ganache.provider();

const { interface, bytecode } = require('../compile');// The interface is your ABI, the bytecode has the information you need to create a contract
const web3 = new Web3(provider);// When we want to link up to another networks, we will replace 'ganache.provide' with another ethereum network that we want to connect to

let accounts;
let inbox;// This is the Javascript representation of the contract

beforeEach(async () => {
	// Get a list of all accounts
	accounts = await web3.eth.getAccounts();// Lowercase web3 is the instance of web3
	// Almost every function that we create with web3 is asynchronous, meaning it will return a promise
		//console.log(fetchedAccounts);
	inbox = await new web3.eth.Contract(JSON.parse(interface))// We want to feed the constructor a Javascript object, which is why we parse the JSON before feeding it to the Contract constructor
		.deploy({ data: bytecode, arguments: ['Hi there!'] })// Tells web3 that we want to deploy our contract, and this creates a transaction object
		.send({ from: accounts[0], gas: '1000000' });
	// Use one of those accounts
	// to deploy the contract
	inbox.setProvider(provider);
});

describe('Inbox', () => {
	it('deploys a contract', () => {
		assert.ok(inbox.options.address);

	});

	it('has a default message', async() => {
		const message = await inbox.methods.message().call();// We reference an instance of the contract, which has an object called methods, which has reference to all of the public functions for inbox.  Then comes the method, then must write .call().  The first set of parenthesis is for arguments, the 2nd set is to customize the transaction we are sending out to the network.
		assert.equal(message, 'Hi there!');

	});

	it('sets the message', async() => {
		thisMessage = 'Mike';
		await inbox.methods.setMessage(thisMessage).send({ from: accounts[0] })// We reference an instance of the contract, which has an object called methods, which has reference to all of the public functions for inbox.  Then comes the method, then must write .call().  The first set of parenthesis is for arguments, the 2nd set is to customize the transaction we are sending out to the network.
		const message = await inbox.methods.message().call();// We reference an instance of the contract, which has an object called methods, which has reference to all of the public functions for inbox.  Then comes the method, then must write .call().  The first set of parenthesis is for arguments, the 2nd set is to customize the transaction we are sending out to the network.
		assert.equal(message, thisMessage);

	});
});



/*
class Car{
	park(){
		return 'stopped';
	}

	drive(){
		return 'vroom';
	}

}

let car;

//The beforeEach() area is where we will want to deploy a new contract
beforeEach(() => {
	car = new Car();
});


describe('Car', () => {
	it('can park', () => {
		//const car = new Car();
		assert.equal(car.park(), 'stopped');
	});

	it('can drive', () => {
		//const car = new Car();
		assert.equal(car.park(), 'stopped');
	});
});
*/
