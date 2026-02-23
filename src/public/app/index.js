// import Admin   from '../public/view/admin'
import { router } from '../routes/index.routes'

const init = () => {
    const hash = window.location.hash || '#/';
    router(hash);
};

init();
window.addEventListener('hashchange', init);
