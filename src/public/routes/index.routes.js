// import Adimn from '../controlers/admin.controlers'
import { Home, Admin } from '../controlers'

const viewAdminHtml = document.getElementById('admin')
const router = (linkRoute) => {

    const socket = io()

    viewAdminHtml.innerHTML = ``

    switch (linkRoute) {
        case '#/admin':
            return viewAdminHtml.appendChild(Admin(socket));
            break;

        case '#/':
            return viewAdminHtml.appendChild(Home(socket));
            break;
        default:
            console.log('not found 404 error')
            break;
    }
}

export { router }