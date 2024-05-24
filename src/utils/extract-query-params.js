/**  
 * * '?search=Nelio' :: substr()
 * * search=Nelio&page=2 :: split()
 * * ['search=Nelio', 'page=2'] :: reduce()
 * * ['search', 'Nelio']
 * * ['page', '2']
*/

export function extractQueryParams(query) {
    return query.substr(1).split('&').reduce((queryParams, param) => {
        const [key, value] = param.split('=')

        queryParams[key] = value

        return queryParams
    }, {}) // reduce() :: segundo parametro: inicializar o objeto
}