const puppeteer = require("puppeteer-extra");

async function main() {
    const browserOptions = [
        '--incognito',
        '--window-size=1300,20000',
        '--disable-gpu',
        '--disable-font-subpixel-positioning',
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--no-zygote',
        '--disable-breakpad',
      ];

    //1. 크로미움으로 브라우저를 연다. 
    const browser = await puppeteer.launch({
        args: browserOptions,
        executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
        headless: false,
        ignoreDefaultArgs: ['--enable-automation'],
    }); // -> 여기서 여러가지 옵션을 설정할 수 있다.

  
    const context = await browser.createBrowserContext()
    // 2. 페이지 열기
    const page = await context.newPage();
    page.setDefaultTimeout(10000);
    await page.setViewport({
        width: 1300,
        height: 20000,
        deviceScaleFactor: 1,
        hasTouch: false,
        isLandscape: true,
        isMobile: false,
    });

    const href = 'https://m.naver.com'
    // 3. 링크 이동
    await page.goto(`${href}`, {
        waitUntil: 'networkidle2',
    });

    // 4. HTML 정보 가지고 온다.
    const content = await page.content();
    console.log(content)
    
    // 5. 페이지와 브라우저 종료
    await page.close();
    await browser.close();
}

main()
