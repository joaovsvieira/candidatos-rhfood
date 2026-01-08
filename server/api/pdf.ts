import puppeteerCore from 'puppeteer-core'
import chromium from '@sparticuz/chromium'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  let browser

  if (process.env.NODE_ENV === 'production' || process.env.VERCEL) {
    chromium.setGraphicsMode = false
    browser = await puppeteerCore.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
    })
  } else {
    browser = await puppeteerCore.launch({
      channel: 'chrome',
      headless: true
    })
  }

  const page = await browser.newPage()

  const body = await readBody(event)

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
            /* Zera a margem da IMPRESSORA para nós controlarmos via Tailwind */
            @page { margin: 0; }
            body { margin: 0; -webkit-print-color-adjust: exact; }
        </style>
      </head>
      
      <body>
        ${body.html}
      </body>
    </html>
  `

  await page.setContent(htmlContent, {
    waitUntil: 'networkidle0'
  })

  const pdfBuffer = await page.pdf({
    format: 'A4',
    printBackground: true
  })

  await browser.close()

  setHeaders(event, {
    'Content-Type': 'application/pdf',
    'Content-Disposition': 'inline; filename="documento.pdf"'
  })

  return pdfBuffer
})
