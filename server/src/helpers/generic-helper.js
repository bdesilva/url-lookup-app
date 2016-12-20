export default class GenericHelpers {
    static splitPathQuery(originalPathAndQueryString) {
        //Split path and query from original data
        const split = originalPathAndQueryString.split('?');
        const path = split[0].startsWith('/') ? `${split[0]}` : `/${split[0]}`;
        const query = split[1] ? `?${split[1]}` : '';
        const fullPath = originalPathAndQueryString;

        return {path, query, fullPath};
    }
}
