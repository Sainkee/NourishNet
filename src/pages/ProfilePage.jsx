import React from 'react';
import { useSelector } from 'react-redux';

const ProfilePage = ( ) => {

    const user = useSelector((state) => state.user);

    return (
        <div className="container mx-auto mt-10">
            <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg overflow-hidden">
                <div className="p-4">
                    <div className="flex items-center justify-center">
                        <img className="w-20 h-20 rounded-full" src={user?.photoURL} alt="Profile" />
                    </div>
                    <div className="text-center mt-4">
                        <h2 className="text-xl font-semibold">{user?.displayName}</h2>
                        <p className="text-gray-600 text-sm">{user?.email}</p>
                    </div>
                    <div className="mt-8">
                        <div className="border-t border-gray-200"></div>
                        <div className="flex justify-center items-center mt-4">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                Edit Profile
                            </button>
                            {/* Add more buttons or links for other actions */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;
