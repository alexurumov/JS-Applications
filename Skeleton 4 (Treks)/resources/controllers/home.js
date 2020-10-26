import extend from '../utils/context.js';
import models from '../models/index.js';
import docModifier from '../utils/doc-modifier.js';
import filterByCat from '../utils/articles-filter.js'

export default {
    get: {
        home(context) {

            extend(context).then(function () {
                if (!context.isLoggedIn) {
                    context.redirect('#/user/login');
                } else {
                    return models.article.getAll().then(resp => {
                        const articles = resp.docs.map(docModifier);
                        
                        let jsArticles = filterByCat(articles, 'JavaScript');
                        let cSharpArticles = filterByCat(articles, 'CSharp');
                        let javaArticles = filterByCat(articles, 'Java');
                        let pythonArticles = filterByCat(articles, 'Python');
                        
                        context.jsArticles = jsArticles;
                        context.cSharpArticles = cSharpArticles;
                        context.javaArticles = javaArticles;
                        context.pythonArticles = pythonArticles;
        
                    }).then(resp => {this.partial("../views/home/home.hbs")})
                    .catch(err => console.log(err));
                }
            })
            
        }
    }
}