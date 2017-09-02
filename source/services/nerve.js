const routes = {};
const defaultRoute = 'root';

const guid = () => {
    const s4 = () => Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
};

/**
 * Adding listener to the route
 * @param routeData {object}
 * @param routeData.route {string}
 * @param routeData.callback {function}
 * @param customId {string|null} - (optional) custom id for the route
 * @return {string} - id of the event
 */
const on = (routeData, customId = null) => {
    let currentRoute = defaultRoute;
    const id = customId || guid();
    if (routeData.route) {
        currentRoute = routeData.route;
    }
    if (!routes[currentRoute]) {
        routes[currentRoute] = [];
    }
    if (!routeData.callback) {
        throw new Error('Route data should have callback');
    }
    routes[currentRoute].push({
        id,
        callback: routeData.callback,
    });
    return id;
};

/**
 * Removing listeners from the route
 * @param routeData {object}
 * @param routeData.route {string}
 * @param routeData.id {string} - if passed, will remove callback only with this id.
 *                                Otherwise will clean the whole route.
 */
const off = (routeData) => {
    if (routes[routeData.route]) {
        if (routeData.id) {
            for (let i = 0, len = routes[routeData.route].length; i < len; i++) {
                if (routeData.id === routes[routeData.route][i].id) {
                    routes[routeData.route] = [
                        ...routes[routeData.route].slice(0, i),
                        ...routes[routeData.route].slice(i + 1),
                    ];
                    break;
                }
            }
        } else {
            routes[routeData.route] = [];
        }
    } else {
        console.warn('[off] There is no such route', routeData.route);
    }
};

/**
 * Send data to the route
 * @param sendData {object}
 * @param sendData.route {string}
 * @param sendData.id {string} - if exists will be called callback with this id.
 *                               Otherwise will call all callbacks in route.
 * @param sendData.data {*}
 */
const send = (sendData) => {
    if (routes[sendData.route]) {
        for (let i = 0, len = routes[sendData.route].length; i < len; i++) {
            if (sendData.id && sendData.id === routes[sendData.route][i].id) {
                routes[sendData.route][i].callback(sendData.data);
            } else if (!sendData.id) {
                routes[sendData.route][i].callback(sendData.data);
            }
        }
    } else {
        console.warn('[send] There is no such route', sendData.route);
    }
};

export default {
    on,
    off,
    send,
};
