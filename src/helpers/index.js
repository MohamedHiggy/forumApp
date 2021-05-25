/* eslint-disable object-curly-spacing */
/* eslint-disable space-before-function-paren */
/* eslint-disable indent */
/* eslint-disable eol-last */
export const findById = (resources, id) => resources.find(event => event.id === id)

export const upsert = (resources, resource) => {
    const index = resources.findIndex(event => event.id === resource.id)
    if (resource.id && index !== -1) {
        resources[index] = resource
    } else {
        resources.push(resource)
    }
}