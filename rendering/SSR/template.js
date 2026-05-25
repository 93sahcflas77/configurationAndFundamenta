// react
module.exports = function template(reactHTNL) {
    return `
    <!DOCTYPE html>

    <html>

      <head>

        <title>
          React SSR
        </title>

      </head>

      <body>

        <div id="root">${reactHTNL}</div>

        <script
          src="/bundle.js"
        ></script>

      </body>

    </html>
    `
}