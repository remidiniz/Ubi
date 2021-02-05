const Web3 = require('web3');

module.exports = class Transaction
{
    constructor()
    {
        this.web3 = new Web3('wss://kovan.infura.io/ws/v3/98ac3cfcbc2c4a6988c02cef377a8777');
    }

    async deploy(senderPrivateKey, receiverAddress) 
    {
        const amountToTransfer = '0.01';
        const senderAccount = this.web3.eth.accounts.privateKeyToAccount(senderPrivateKey);                  //GETTING ACCOUNT FROM PK

        this.checkBalance(senderAccount.address, amountToTransfer);                                          //CHECKING ORIGIN ACCOUNT BALANCE

        console.log(`Attempting to make transaction of ${amountToTransfer} ETH from ${senderAccount.address} to ${receiverAddress}`);

        const tx = {                                                                                        //CREATING TX
            from: senderAccount.address,
            to: receiverAddress,
            value: this.web3.utils.toWei(amountToTransfer, 'ether'),
            gas: 21000,
        };

        const createTx = await this.web3.eth.accounts.signTransaction(tx, senderPrivateKey);                //SIGNING TX
        const createReceipt = await this.web3.eth.sendSignedTransaction(createTx.rawTransaction);           //SENDING TX

        console.log(`Transaction Successful with Hash: ${createReceipt.transactionHash}`);
    };

    async checkBalance(accountAddress, againstAmount) 
    {
        const balance = this.web3.utils.fromWei(await this.web3.eth.getBalance(accountAddress), 'ether');   //GETTING ACCOUNT BALANCE

        if (balance < againstAmount) {                                                                      //REJECT IF BALANCE IS NOT ENOUGH 

            console.log('Insufficient Funds');

            return reject();
        }

        console.log(`The balance of ${accountAddress} is: ${balance} ETH`);
    };
};