let Even = [ ];
let Other = [ ];
for (let i = 1; i <= 100; i++) {

 if (i % 2 === 0) {
Even.push(i); }


 else {Other.push(i);}

 }
console.log("Group A"+ Even);
console.log("Group B" + Other);

