const prompt = require('prompt');
const Transaction = require('./transactions.js');
const transaction = new Transaction();

prompt.start();

prompt.get(['senderPrivateKey', 'receiverAccountAddress'], function (error, result) 
{
    if (error) { 
        console.log(Error); 
        return -1; 
    }

    console.log('  Receiver Account Address: ' + result.receiverAccountAddress);

    transaction.deploy(result.senderPrivateKey, result.receiverAccountAddress);
});
