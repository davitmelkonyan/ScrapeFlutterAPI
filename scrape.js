const { constants } = require('fs-extra');
const puppeteer = require('puppeteer')

async function scrape(url){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url); 

    const [els] = await page.$x('/html/body/main/div[1]/section[2]/dl/dt[2]');////*[@id="imgBlkFront"]');//'/html/body/main/div[1]/section[2]/dl'); //pupeeter selector
    const src = await els.getProperty('textContent');
    const srcText =  await src.jsonValue();
    console.log({srcText});
    
    //const els = await page.$$('div.parent');
//*[@id="Action"]
    //*[@id="ActionDispatcher"]/html/body/main/div[1]/section[2]/dl

    
    for (let i = 2; i < 15; i+=2) {
        //const [els] = await page.$x('/html/body/main/div[1]/section[2]/dl/dt[2]');////*[@id="imgBlkFront"]');//'/html/body/main/div[1]/section[2]/dl'); //pupeeter selector
        const pathDT = `/html/body/main/div[1]/section[2]/dl/dt[${i}]`
        console.log(pathDT);
        //const pathDD = `/html/body/main/div[1]/section[2]/dl/dd[${i+1}]`
        const [elsDT] = await page.$x(pathDT)
        //const [elsDD] = await page.$x(pathDD)
        const srcDT = await elsDT.getProperty('textContent');
        const srcTextDT =  await srcDT.jsonValue();
        //const srcDD = await elsDD.innerText//.getProperty('textContent');
        //const srcTextDD =  await srcDD.jsonValue();
        console.log(srcTextDT);
        //console.log(srcDD);
        //const elements = document.querySelectorAll("#main > .child")

        //let secondElement = elements[1];
        //console.log("secondChild -->", secondElement.innerText)
        //const id = await els[i].$eval('dt', i => i.getAttribute('id'));
        //console.log(id);

        //const link = await els[i].$eval('dd', a => a.getProperty('textContent'));
        //console.log(link);
    }
   
    //let list = await page.evaluate(() => Array.from(document.querySelectorAll('.div.main-content section h2'), element => element.textContent))
    //console.log({list});
    //console.log({el.get});
    //const src = await el.getProperty('textContent');
    //const srcText =  await src.jsonValue();

    //console.log({srcText});
    browser.close();
}

scrape("https://api.flutter.dev/flutter/cupertino/cupertino-library.html");//")//https://www.amazon.com/Atomic-Habits-Proven-Build-Break/dp/0735211299/?_encoding=UTF8&pd_rd_w=r2aVH&content-id=amzn1.sym.86732b99-5a48-4cd1-bf79-62d0f05b2b16&pf_rd_p=86732b99-5a48-4cd1-bf79-62d0f05b2b16&pf_rd_r=P9PV2H3QY45RMJEYWHPQ&pd_rd_wg=qzsr7&pd_rd_r=6be4f412-7fbe-44f7-a2f5-55612a663a09&ref_=pd_gw_wsixn_v2");