import { Disclosure } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../../../Hooks/useAuth';
import logo from '../../../../images/logo.png';

const NavBar = () => {
    const { user, logout } = useAuth();
    const navigation = [
        { name: 'Home', to: '/home' },
        { name: 'About', to: '/about' },
    ];

    user.email && navigation.splice(1, 0, { name: 'My Trips', to: '/mytrips' });
    user.email && navigation.splice(2, 0, { name: 'Manage Bookings', to: '/ManageBookings' });
    user.email && navigation.splice(3, 0, { name: 'Add Trip', to: '/addtrip' });

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }
    return (
        <div>
            <Disclosure as="nav" className="bg-blue-500 w-full">
                {({ open }) => (
                    <>
                        <div className="w-full flex flex-wrap justify-between">
                            <div className="lg:w-3/5 w-full px-2">
                                <div className="relative flex items-center justify-between h-16">
                                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                        {/* Mobile menu button*/}
                                        <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                            <span className="sr-only">Open main menu</span>
                                            {open ? (
                                                <XIcon className="block h-6 w-6" aria-hidden="true" />
                                            ) : (
                                                <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                                            )}
                                        </Disclosure.Button>
                                    </div>
                                    {/* logo code */}
                                    <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                                        <div className="flex-shrink-0 flex items-center">
                                            <div className="w-14">
                                                <img className="w-full" src={logo} alt="" />
                                            </div>
                                            <p className="text-2xl text-white font-bold">Trip Now</p>
                                        </div>
                                        <div className="hidden sm:block sm:ml-6 my-auto">
                                            <div className="flex space-x-4">
                                                {navigation.map((item) => (
                                                    <Link
                                                        key={item.name}
                                                        to={item.to}
                                                        className={classNames(
                                                            'text-gray-300 hover:bg-blue-700 hover:text-white',
                                                            'px-3 py-2 rounded-md text-sm font-medium'
                                                        )}
                                                    >
                                                        {item.name}
                                                    </Link>
                                                ))

                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex lg:flex-row lg:justify-end flex-col  items-center w-full mx-3 lg:w-2/6">
                                {user.name ? <p className="text-white p-2">{user.name}</p> : <p className="text-white p-2">{user.email}</p>}
                                {!user.email ? <Link className="w-20 bg-white p-2 rounded-md font-semibold uppercase text-center text-blue-500" to="/signin">Join</Link> : <Link className="p-2 font-semibold text-blue-500 bg-white uppercase " onClick={logout} to="/home">Logout</Link>}
                            </div>
                        </div>
                        <Disclosure.Panel className="sm:hidden">
                            <div className="px-2 pt-2 pb-3 space-y-1">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        to={item.to}
                                        className={classNames(
                                            'text-gray-300 hover:bg-blue-700 hover:text-white',
                                            'block px-3 py-2 rounded-md text-base font-medium'
                                        )}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        </Disclosure.Panel>
                    </>
                )}
            </Disclosure>
        </div>
    );
};

export default NavBar;