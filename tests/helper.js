/**
 * Create an object to represent a server response object for tests.
 * 
 * @returns object;
 */
export function getRes() {
    return {
        status: 200,
        status(status){
            this.status = status
        },
        send(...args){
            return args;
        }
    }
}

/**
 * Create an object to represent a server request object for tests.
 * 
 * @returns object;
 */
export function getReq() {
    return {

    }
}

