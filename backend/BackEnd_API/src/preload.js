window.addEventListener('DOMContentLoaded', () => {
    const getLink = () => {
        const element = document.querySelectorAll('a.internal-link');
        if (element.length >= 2) {
            const url = element[1].href;
            window.location.href = url;
            console.log("Baixando o arquivo!");
        } else {
            console.log("não foi possível baixar o arquivo");
        }
    }
    getLink()
});