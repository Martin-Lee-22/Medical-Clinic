const cookies = ['clinic', 'doctor', 'date']

function createCookie(cname:string, cvalue:string, exdays:Date){
    document.cookie = `${cname}=${cvalue}; expires=${exdays};`
}

function getCookie(cname:string){
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
        c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
        }
    }
    return "";
}

function deleteCookie(cookies: string[]): void {
    for(let i = 0; i < cookies.length; i++) {
        if (cookies[i] != "") {
            document.cookie = `${cookies[i]}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        }
    }
}

export {cookies, createCookie, getCookie, deleteCookie}