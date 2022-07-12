const { constants } = require('fs-extra');
const puppeteer = require('puppeteer')
const fs = require('fs')
  
// Data which will write in a file.

  
// Write data in 'Output.txt' .


async function scrape(url){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url); 
    let intro = 'name: Flutter\ndescription: api..flutter.dev documentations\nlibraries:\n\t-\n\t\tname: cupertino\n\t\tdescription: Flutter widgets implementing the current iOS design language. This library is designed for apps that run on iOS. For apps that may also run on other operating systems, we encourage use of other widgets, for example the Material Design set.\n\t\tclasses:\n'
    fs.appendFile('Output.txt', intro, (err) => {
        if (err) throw err;
    })
    for (let i = 1; i < 813; i+=1) {
        const pathDT = `/html/body/main/div[1]/section[2]/dl/dt[${i}]`
        const pathDD = `/html/body/main/div[1]/section[2]/dl/dd[${i}]`
        const [elsDT] = await page.$x(pathDT)
        const [elsDD] = await page.$x(pathDD)
        const srcDT = await elsDT.getProperty('textContent');
        const srcTextDT =  await srcDT.jsonValue();
        const srcDD = await elsDD.getProperty('textContent');//.innerText
        var srcTextDD =  await srcDD.jsonValue();
        let replaced = srcTextDD.replaceAll('\n', '');
        //console.log(replaced.charAt(replaced.length - 1))
        const filteredTxt =  replaced.charAt(replaced.length - 2)==']' ? replaced : replaced.substring(0, srcTextDD.length-7)
        //const match = /\r|\n/.exec(srcTextDD);
        //const text = "abc\n123"
        //const match = /\r|\n/.exec(text);
        //console.log(match)
        
        
        //console.log(srcTextDD.length,replaced.length); // foo-bar-baz
        let data = `\t\t\t-\n\t\t\t\tname: ${srcTextDT.trim()}\n\t\t\t\tdescription: ${filteredTxt.trim()} \n\t\t\t\tproperties:\n\t\t\t\t\t-\n\t\t\t\t\t\tname: \n\t\t\t\t\t\ttype: \n\t\t\t\t\t\tdescription:\n\t\t\t\tmethods:\n\t\t\t\t\t-\n\t\t\t\t\t\tname: \n\t\t\t\t\t\tparameters: \n\t\t\t\t\t\ttype: \n\t\t\t\t\t\tdescription:\n`
        //console.log(data);//i.toString()+": "+srcTextDT.trim()+" - "+filteredTxt.trim());

        fs.appendFile('Output.txt', data, (err) => {
            if (err) throw err;
        })
    }
    browser.close();
}

scrape("https://api.flutter.dev/flutter/cupertino/cupertino-library.html");//")//https://www.amazon.com/Atomic-Habits-Proven-Build-Break/dp/0735211299/?_encoding=UTF8&pd_rd_w=r2aVH&content-id=amzn1.sym.86732b99-5a48-4cd1-bf79-62d0f05b2b16&pf_rd_p=86732b99-5a48-4cd1-bf79-62d0f05b2b16&pf_rd_r=P9PV2H3QY45RMJEYWHPQ&pd_rd_wg=qzsr7&pd_rd_r=6be4f412-7fbe-44f7-a2f5-55612a663a09&ref_=pd_gw_wsixn_v2");


/*
    //const els = await page.$$('div.parent'); //*[@id="Action"]
    //const [els] = await page.$x('/html/body/main/div[1]/section[2]/dl/dt[2]');////*[@id="imgBlkFront"]');//'/html/body/main/div[1]/section[2]/dl'); //pupeeter selector
    //const elements = document.querySelectorAll("#main > .child")
    //let secondElement = elements[1];
    //console.log("secondChild -->", secondElement.innerText)
    //const id = await els[i].$eval('dt', i => i.getAttribute('id'));
    //console.log(id);
    //const link = await els[i].$eval('dd', a => a.getProperty('textContent'));
    //console.log(link);
    //let list = await page.evaluate(() => Array.from(document.querySelectorAll('.div.main-content section h2'), element => element.textContent))
*/