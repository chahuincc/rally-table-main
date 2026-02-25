import { Home, Admin } from '../controlers'
import Pusher from 'pusher-js';

const PUSHER_KEY = 'tu_key';
const PUSHER_CLUSTER = 'tu_cluster';

const pusher = new Pusher(PUSHER_KEY, {
    cluster: PUSHER_CLUSTER
});

const viewAdminHtml = document.getElementById('admin')

const router = (linkRoute) => {

    viewAdminHtml.innerHTML = ``

    switch (linkRoute) {
        case '#/admin':
            return viewAdminHtml.appendChild(Admin(pusher));
            break;

        case '#/':
            return viewAdminHtml.appendChild(Home(pusher));
            break;
        default:
            console.log('not found 404 error')
            break;
    }
}

export { router }