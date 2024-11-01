function delay(ms){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log('Delay', ms);
          resolve()
        }, ms)
    })
}

function getRandomDelay(min, max) {
    return Math.floor(Math.random() * (min - max + 1)) + max;
}

async function randomDelay(min, max) {
    return delay(getRandomDelay(min, max));
}

module.exports = {
    randomDelay
}