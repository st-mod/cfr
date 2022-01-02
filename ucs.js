export const a = async (unit, compiler) => {
    const element = document.createElement('a')
    let {href, src} = unit.options
    if (href === true) {
        href = ''
    } else if (typeof href === 'number') {
        href = href.toString()
    }
    if (src === true) {
        src = ''
    } else if (typeof src === 'number') {
        src = src.toString()
    }
    if (typeof href === 'string') {
        element.textContent = href
        if (!href.startsWith('#')) {
            element.target = '_blank'
            const url = new URL(href, compiler.context.dir)
            if (url.origin.endsWith('.vscode-resource.vscode-webview.net')) {
                element.href = `command:vscode.open?${encodeURIComponent(JSON.stringify([{scheme: 'file', path: url.pathname}, -2]))}`
            }
        }
    } else if (typeof src === 'string') {
        element.target = '_blank'
        element.textContent = src
        const url = new URL(src, compiler.context.dir)
        if (url.origin.endsWith('.vscode-resource.vscode-webview.net')) {
            element.href = `command:st-lang.preview-path?${encodeURIComponent(JSON.stringify([url.pathname, undefined, undefined, decodeURIComponent(url.hash.slice(1))]))}`
        } else {
            element.href = `?src=${encodeURIComponent(url.href)}${url.hash}`
        }
    }
    if (unit.children.length > 0) {
        element.innerHTML = ''
        element.append(await compiler.compileInlineSTDN(unit.children))
    }
    return element
}