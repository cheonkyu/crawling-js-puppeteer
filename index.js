const puppeteer = require('puppeteer');

async function main() {
    //1. 크로미움으로 브라우저를 연다. 
    const browser = await puppeteer.launch(); // -> 여기서 여러가지 옵션을 설정할 수 있다.
            
    //2. 페이지 열기
    const page = await browser.newPage();
    const href = 'https://www.naver.com'
    //3. 링크 이동
    await page.goto(`${href}`);

    //4. HTML 정보 가지고 온다.
    const content = await page.content();
    console.log(content)
    
    //5. 페이지와 브라우저 종료
    await page.close();
    await browser.close();
}

main()
