import { useState } from 'react';
import LogoutLink from './Authorization/LogoutLink.tsx';
import DefaultUserIcon from '/assets/images/DefaultUserIcon.png';

function ProfileActions() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen((prev) => !prev);
    };

    const closeDropdown = () => {
        setIsOpen(false);
    };

    return (
        <div className="relative inline-block text-left">
            <button
                onClick={toggleDropdown}
                className="flex items-center focus:outline-none"
                aria-haspopup="true"
                aria-expanded={isOpen}
            >
                <img
                    src={DefaultUserIcon}
                    className="rounded-full w-10 h-10"
                    alt="User Icon"
                />
            </button>

            {isOpen && (
                <div className="absolute right-0 z-10 mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg">
                    <div className="py-1">
                        <a
                            href="#/settings"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                            onClick={closeDropdown}
                        >
                            Settings
                        </a>
                        <hr className="my-1 border-gray-200" />
                        <LogoutLink>
                            <a
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                                onClick={closeDropdown}
                            >
                                Logout
                            </a>
                        </LogoutLink>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProfileActions;
