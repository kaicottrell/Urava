import SideNavbar from '../Components/SideNavbar.tsx';
import AuthorizedView from '../Components/Authorization/AuthorizeView.tsx';
import ProfileActions from '../Components/ProfileActions.tsx';
import { useToast } from '../Context/ToastContext.tsx';

function Home() {
    return (
        <AuthorizedView>
            <div className="flex h-screen">
                <div className="w-1/4 md:w-1/5 bg-primary">
                    <SideNavbar />
                </div>
                <div className="flex-1 p-4">
                    {/* Main content goes here */}
                    test
                </div>
            </div>
            <ProfileActions />
        </AuthorizedView>
    );
}

export default Home;
