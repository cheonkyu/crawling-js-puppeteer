const crawler = require('./crawler');
const config = require('./config');
const targetUrls = require('./targetUrls');
const { randomDelay } = require('./randomDelay');

async function main(){
    try {
        // tor로 프록시 처리
        const proxy = `socks5://0.0.0.0:9050`;
        const params = config;
        params.args.push(`--proxy-server=${proxy}`);

        // 브라우저로 시도해보기
        // const browser = await crawler.launch(params);
        const launch = JSON.stringify(params)
        const browser = await crawler.connect({ browserWSEndpoint: `ws://localhost:3000?launch=${launch}` });
        
        const urls = targetUrls
        const context = await browser.createBrowserContext();

        async function runTask(url, i) {
            console.log(`page start ${i}`)
            const page = await context.newPage();
            
            await randomDelay(1000, 3000);
            const response = await page.goto(url, { waitUntil: 'networkidle2' });
            await delay(10000);

            const status = response.status();
            switch (status) {
                case 200:
                    console.log(`page content ${i}`)
                    const html = await page.content();
                    await page.screenshot({
                        fullPage: false,
                        path: `image-${i}-${new Date().toISOString().substr(0, 10)}.jpeg`
                    })
                    return html
                case 418:
                case 429:
                default:
            }
            page.close()
        }
        
        console.time('runTask')
        const results = await Promise.allSettled(urls.map(runTask))
        console.timeEnd('runTask')

        await browser.close()
    }
    catch(e) {
        console.error(e);
    }
}
main()