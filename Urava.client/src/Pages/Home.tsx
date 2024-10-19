import SideNavbar from '../Components/SideNavbar.tsx';
import AuthorizedView from '../Components/Authorization/AuthorizeView.tsx';
import ProfileActions from '../Components/ProfileActions.tsx';
import { useToast } from '../Context/ToastContext.tsx';

function Home() {
    return (
        <AuthorizedView>
            <div className="flex h-screen">
                <div className="w-1/4 md:w-1/5">
                    <SideNavbar />
                </div>
                <div className="p-4 flex-1">
                    test
                    <ProfileActions />
                </div>
            </div>
        </AuthorizedView>
    );
}

export default Home;
