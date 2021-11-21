import { Disclosure, Menu, Transition } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../../../Hooks/useAuth';
import avatar from '../../../../images/avatar.png';
import logo from '../../../../images/logo.png';

const NavBar = (props) => {
    const transparent = props.transparent;
    const { user, isAdmin, logout } = useAuth();
    const navigation = [
        { name: 'Home', to: '/home' },
        { name: 'About', to: '/about' },
    ];

    user.email && !isAdmin && navigation.splice(1, 0, { name: 'My Trips', to: '/mytrips' });
    user.email && isAdmin && navigation.splice(1, 0, { name: 'Manage Bookings', to: '/ManageBookings' });
    user.email && isAdmin && navigation.splice(2, 0, { name: 'Add Trip', to: '/addtrip' });

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    return (
        <div className="w-full">
            <Disclosure as="nav" className={`w-full ${transparent ? "lg:bg-transparent md:bg-transparent bg-blue-500 lg:absolute md:absolute relative" : "bg-blue-500"}`}>
                {({ open }) => (
                    <>
                        <div className="w-full mx-auto px-2">
                            <div className="relative flex items-center justify-between h-16">
                                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                    {/* Mobile menu button*/}
                                    <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
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
                                        <p className="lg:text-2xl md:text-2xl sm:text-xl text-white font-bold">Trip Now</p>
                                    </div>
                                    <div className="hidden sm:block sm:ml-6 my-auto">
                                        <div className="flex space-x-4">
                                            {navigation.map((item) => (
                                                <Link
                                                    key={item.name}
                                                    to={item.to}
                                                    className={classNames(
                                                        'text-white hover:bg-blue-600 hover:text-white',
                                                        'px-3 py-1 rounded-md text-sm font-medium'
                                                    )}
                                                >
                                                    {item.name}
                                                </Link>
                                            ))

                                            }
                                        </div>
                                    </div>
                                </div>
                                {user.email && <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

                                    {/* Profile dropdown */}
                                    <Menu as="div" className="ml-3 relative z-10">
                                        <div>
                                            <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                                <span className="sr-only">Open user menu</span>
                                                <img
                                                    className="h-8 w-8 rounded-full"
                                                    src={user.photo ? user.photo : avatar}
                                                    alt=""
                                                />
                                            </Menu.Button>
                                        </div>
                                        <Transition

                                            enter="transition ease-out duration-100"
                                            enterFrom="transform opacity-0 scale-95"
                                            enterTo="transform opacity-100 scale-100"
                                            leave="transition ease-in duration-75"
                                            leaveFrom="transform opacity-100 scale-100"
                                            leaveTo="transform opacity-0 scale-95"
                                        >
                                            <Menu.Items className="flex flex-col origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-md py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                <img
                                                    className="h-12 w-12 rounded-full mx-auto"
                                                    src={user.photo ? user.photo : avatar}
                                                    alt=""
                                                />
                                                <Menu.Item>
                                                    {() => (
                                                        <p className="text-black text-xl font-bold p-2">{user.name ? user.name : user.displayName}</p>
                                                    )}
                                                </Menu.Item>
                                                {
                                                    user.email === "admin@gmail.com"
                                                    &&
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <Link className="p-2  text-black hover:bg-blue-500 hover:text-white mx-2 rounded-md" to="/dashboard">Dashboard</Link>
                                                        )}
                                                    </Menu.Item>
                                                }
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <Link className="p-2  text-black hover:bg-blue-500 hover:text-white mx-2 rounded-md" onClick={logout} to="/home">Logout</Link>
                                                    )}
                                                </Menu.Item>
                                            </Menu.Items>
                                        </Transition>
                                    </Menu>
                                </div>}
                                {!user.email && <Link className="w-20 bg-blue-500 p-2 rounded-md font-semibold uppercase text-center text-white" to="/signin">Join</Link>}
                            </div>
                        </div>

                        <Disclosure.Panel className="sm:hidden items-center">
                            <div className="px-2 pt-2 pb-3 space-y-1">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        to={item.to}
                                        className={classNames(
                                            'text-white hover:bg-blue-600 hover:text-white',
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