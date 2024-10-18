import UravaLogo from '/assets/images/LogoV2.png';
import { Link } from 'react-router-dom';

function SideNavbar() {
    return (
        <div className="bg-primary h-full flex flex-col">
            <div className="flex flex-col items-center p-4">
                <img src={UravaLogo} className="w-1/2 mb-4" alt="Urava Logo" />
                <hr className="w-full border-t border-white mb-4" />
                <nav className="flex flex-col items-center w-full">
                    <Link to="/skills" className="text-white hover:bg-gray-700 w-full text-center py-2 transition duration-200">
                        My Skills
                    </Link>
                    <Link to="/calendar" className="text-white hover:bg-gray-700 w-full text-center py-2 transition duration-200">
                        Calendar
                    </Link>
                    <Link to="/jobApplications" className="text-white hover:bg-gray-700 w-full text-center py-2 transition duration-200">
                        My Job Applications
                    </Link>
                </nav>
            </div>
        </div>
    );
}

export default SideNavbar;
