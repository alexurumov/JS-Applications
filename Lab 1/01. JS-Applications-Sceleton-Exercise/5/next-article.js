function getArticleGenerator(articles) {

    return function() {
        if (articles.length < 1) {
            return;
        }
        
        let $content = document.getElementById('content');
        let articleText = articles.shift();
        let article = document.createElement('article');
        article.textContent = articleText;
        $content.appendChild(article);
    
    }
}
