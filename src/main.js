const $siteList = $('.siteList');
const $lastLi = $siteList.find('li.last');
const remember = localStorage.getItem('remember');
const rememberObject = JSON.parse(remember);
const hashMap = rememberObject || [
    { logo: 'A', logoType: 'text', url: 'https://www.acfun.cn' },
    { logo: 'B', logoType: 'image', url: 'https://www.bilibili.com' }
];
const simplifyUrl = (url) => {
    return url.replace('https://', '')
        .replace('http://', '')
        .replace('www.', '')
        .replace(/\/.*/, '')//删除以/开头的内容
};

const render = () => {
    $siteList.find('li:not(.last)').remove();
    hashMap.forEach((node, index) => {
        const $li = $(`
                <li>
                    <a href="${node.url}">
                        <div class="site">
                            <div class="logo">${node.logo[0]}</div>
                            <div class="link">${simplifyUrl(node.url)}</div>
                            <div class="close">
                                <svg class="icon">
                                    <use xlink:href="#iconclose"></use>
                                </svg>
                            </div>
                        </div>
                    </a>
                </li>
            `).insertBefore($lastLi);
        $li.on('click', '.close', (e) => {
            hashMap.splice(index, 1);
            render();
            //e.preventDefault();
            return false;
        });
    });
};
render()

$('.addButton').on('click', () => {
    let url = window.prompt('请问你要添加的网址是啥');
    if (url.indexOf('http') !== 0) {
        url = 'https://' + url
    };
    hashMap.push({
        logo: simplifyUrl(url)[0],
        logoType: "text",
        url: url
    });
    render();
});

window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap);
    localStorage.setItem('remember', string);
}

$('.word').on('keypress', (e) => { e.stopPropagation() });

$(document).on('keypress', (e) => {
    const { key } = e
    for (let i = 0; i < hashMap.length; i++) {
        if (hashMap[i].logo.toLowerCase() === key) {
            window.open(hashMap[i].url)
        }
    }
})