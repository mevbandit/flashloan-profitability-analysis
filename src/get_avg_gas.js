const fs = require('fs');

txlist = JSON.parse(fs.readFileSync('./batch_0.json'));

        var gas = [];
        for (let i = 0; i < 1000; i++) {
        gas.push(txlist[i]['gasUsed']);
        }
        const sum = gas.reduce((a, b) => a + b, 0);
        const avg = (sum / gas.length) || 0;
    console.log(`The average gas used per transaction is: ${avg}.`);
    
    

