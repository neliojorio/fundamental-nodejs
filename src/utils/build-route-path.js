// /users/:id
export function buildRoutePath(path) {
    const routeParametersRegex = /:([a-zA-z]+)/g
    // const pathWithParams = path.replaceAll(routeParametersRegex, '([a-z0-9\-_]+)')
    // const pathWithParams = path.replaceAll(routeParametersRegex, '(?<id>[a-z0-9\-_]+)')
    const pathWithParams = path.replaceAll(routeParametersRegex, '(?<$1>[a-z0-9\-_]+)')

    // console.log(Array.from(path.matchAll(routeParametersRegex)))
    // [ [ ':id', 'id', index: 7, input: '/users/:id', groups: undefined ] ]

    // const buildRoutePath = path.replaceAll(routeParametersRegex, '([a-z0-9\-_]+)')

    // console.log(buildRoutePath)
    // /users/([a-z0-9-_]+)

    // const test = /\/users\/([a-z0-9\-_]+)/

    // const pathRegex = new RegExp(`^${pathWithParams}`)
    const pathRegex = new RegExp(`^${pathWithParams}(?<query>\\?(.*))?$`) //another group for query params
    return pathRegex
}