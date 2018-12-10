export default function decodeHtml(html) {
    let txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}
export function stripTags(html) {
    let div = document.createElement("div");
    div.innerHTML = html;
    return div.innerText; 
}