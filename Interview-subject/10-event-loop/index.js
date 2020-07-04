setTimeout(() => { console.log(0) }, 0);
new Promise((res) => setTimeout(res, 0)).then(() => {
  console.log(1);
  setTimeout(() => { console.log(2) }, 0);
  new Promise(ret => ret()).then(() => { console.log(3) });
})

setTimeout(() => { console.log(4) }, 0);
new Promise(res => res()).then(() => {
  console.log(5)
});