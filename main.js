const supportedCodeExts=[
    'css',
    'html',
    'js',
    'json',
    'md',
    'stdn',
    'ston',
    'ts',
    'txt',
    'urls',
]
const supportedImgExts=[
    'apng',
    'avif',
    'gif',
    'jpg',
    'jpeg',
    'jfif',
    'pjpeg',
    'pjp',
    'png',
    'svg',
    'webp',
]
export const a=async (unit,Compiler)=>{
    const element=document.createElement('a')
    let {src,href}=unit.options
    if(src===true){
        src=''
    }else if(typeof src==='number'){
        src=src.toString()
    }
    if(href===true){
        href=''
    }else if(typeof href==='number'){
        href=href.toString()
    }
    if(typeof href==='string'){
        if(!href.startsWith('#')){
            element.target='_blank'
            const url=new URL(href,Compiler.context.dir)
            if(url.origin.endsWith('.vscode-resource.vscode-webview.net')){
                const ext=url.pathname.replace(/^.*\./,'')
                if(supportedCodeExts.includes(ext)){
                    if(window.openCode){
                        element.href=''
                        element.addEventListener('click',e=>{
                            e.preventDefault()
                            openCode(url.href,ext)
                        })
                    }
                }else if(supportedImgExts.includes(ext)){
                    if(window.openImg){
                        element.href=''
                        element.addEventListener('click',e=>{
                            e.preventDefault()
                            openImg(url.href)
                        })
                    }
                }
            }
        }
    }else if(typeof src==='string'){
        element.target='_blank'
        const url=new URL(src,Compiler.context.dir)
        element.href='?src='+encodeURIComponent(url.href)+url.hash
        if(window.openSrc){
            element.addEventListener('click',e=>{
                e.preventDefault()
                openSrc(url.href,decodeURIComponent(url.hash).slice(1))
            })
        }
    }
    element.append(await Compiler.compileInlineSTDN(unit.children))
    return element
}