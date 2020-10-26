export default function (articles, cat) {
    return Object.keys(articles)
        .filter(x => articles[x].category === cat)
        .reduce((acc, key) => {
            acc[key] = articles[key];
            return acc;
        }, {})
}
