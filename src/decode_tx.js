let iface = new ethers.utils.Interface(["foo(bytes bar)"]);
let foo = iface.functions.foo;

// Prepare encoded data to be used in a function call
let x = foo.encode([ "0x" ]);
console.log(x);
// "0x30c8d1da00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000000"

// This is ONLY for decoding the RETURN data from an eth_call
// Since "foo(bytes)" does not have a return type, there is no decoder
// So this doesn't do anything useful
//let y = foo.decode(ethers.utils.hexDataSlice(x, 4)));


let tx = {
    data: x
};
let y = iface.parseTransaction(tx);
console.log(y);
// _TransactionDescription {
//  args: [ '0x' ],
//  decode: [Function],
//  name: 'foo(bytes)',
//  signature: 'foo(bytes)',
//  sighash: '0x30c8d1da',
//  value: BigNumber { _hex: '0x00' } }

// The "y.args" is what you are expecting