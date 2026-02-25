import { Home, Admin } from '../controlers'
import Pusher from 'pusher-js';

const PUSHER_KEY = '20cd25de640089f25e28';
const PUSHER_CLUSTER = 'sa1';

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