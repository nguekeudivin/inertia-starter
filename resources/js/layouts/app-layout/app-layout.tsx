import { cn } from '@/lib/utils';
import { ReactNode, useEffect, useState } from 'react';

import Select from '@/components/ui/select';
import { MenuItemType } from '@/types';
import { router, usePage } from '@inertiajs/react';
import {
    Book,
    BookOpenCheck,
    ChevronDown,
    CircleHelp,
    CircleUser,
    GraduationCap,
    LayoutDashboard,
    LogOut,
    MessagesSquare,
    Play,
    Settings,
} from 'lucide-react';
import { Menu } from './menu';
import MobileMenu from './mobile-menu';

interface AppSidebarProps {
    children: ReactNode;
    breadcrumbds: any;
}

const studentMenu = [
    {
        route: '/student/dashboard',
        label: 'Tableau de board',
        icon: LayoutDashboard,
    },
    {
        route: '/student/subscriptions',
        label: 'Cours',
        icon: Book,
    },
    {
        route: '/community',
        label: 'Communauté',
        icon: MessagesSquare,
    },
    {
        route: '/live',
        label: 'Live',
        icon: Play,
    },
];

const teacherMenu = [
    {
        route: '/overview',
        label: 'Overview',
        icon: LayoutDashboard,
    },
    {
        route: '/courses',
        label: 'Cours',
        icon: Book,
    },
    {
        route: '/quizzes',
        label: 'Quizzes',
        icon: BookOpenCheck,
    },
    {
        route: '/community',
        label: 'Communauté',
        icon: MessagesSquare,
    },
    {
        route: '/live',
        label: 'Live',
        icon: Play,
    },
];

export default function AppLayout({ breadcrumbds, children }: AppSidebarProps) {
    const { auth } = usePage<any>().props;
    const [menu, setMenu] = useState<MenuItemType[]>([]);

    const [isReduce, setIsReduce] = useState<boolean>(false);

    const menuBottom = [
        {
            route: '#',
            label: 'Paramettres',
            icon: Settings,
        },
        {
            route: '#',
            label: 'Support',
            icon: CircleHelp,
        },
        {
            route: '/logout',
            label: 'Logout',
            icon: LogOut,
            method: 'post',
        },
    ];

    useEffect(() => {
        if (auth.user.current_mode == 'teacher') {
            setMenu(teacherMenu);
        } else if (auth.user.current_mode == 'student') {
            setMenu(studentMenu);
        }
    }, []);

    const [currentMode, setCurrentMode] = useState<any>({
        value: auth.user.current_mode,
        label: undefined,
    });

    return (
        <div className="">
            <div
                className={cn('fixed top-0 left-0 hidden h-screen w-full border-r border-gray-200 md:block md:w-[300px]', 'bg-gray-100', {
                    'w-[100px]': isReduce,
                })}
            >
                <div className="flex items-center gap-4 px-8 py-8">
                    {/* <div className="h-[50px] w-[50px] rounded-full bg-gray-300"> </div> */}
                    <div>
                        <h2 className="text-primary-600 text-4xl font-semibold">ELearning</h2>
                        <h3 className="text-gray-700">Elearning Dashboard</h3>
                    </div>
                </div>

                <div className="mt-8 px-6">
                    <Select.Root
                        defaultValue={auth.user.current_mode}
                        onChange={(option: any) => {
                            setCurrentMode(option);
                        }}
                        onItemSelect={(option: any) => {
                            router.post('/user/change-mode', {
                                mode: ['student', 'teacher'].includes(option.value) ? option.value : 'student',
                            });
                        }}
                    >
                        <Select.Trigger>
                            <div className="flex items-center justify-between rounded-full bg-white p-4">
                                <div>{currentMode.label}</div>
                                <button className="">
                                    <ChevronDown className="text-secondary-600" />
                                </button>
                            </div>
                        </Select.Trigger>
                        <Select.Content className="w-full rounded-lg">
                            <Select.Item value="student">
                                <div className="flex items-center gap-2">
                                    <GraduationCap className="text-secondary-600 fill-secondary" />
                                    <span className="text-sm">Apprenant</span>
                                </div>
                            </Select.Item>
                            <Select.Item value="teacher">
                                <div className="flex items-center gap-2">
                                    <CircleUser className="text-secondary-600 fill-secondary" />
                                    <span className="text-sm">Teacher</span>
                                </div>
                            </Select.Item>
                        </Select.Content>
                    </Select.Root>
                </div>

                <div className="mt-4 px-2">
                    <h3 className="px-6 text-gray-600"> Menu </h3>
                    <Menu menu={menu} className="mt-4" />
                </div>

                <div className="absolute bottom-8 w-full">
                    <Menu menu={menuBottom} className="mt-4" />
                </div>
            </div>

            <MobileMenu />

            <main
                className={cn('pl-0 md:pl-[280px]', {
                    'md:pl-[115px]': isReduce,
                })}
            >
                {/* <TopBar className="items-center border-b border-gray-300 bg-white px-4 py-4 md:h-16" /> */}
                <div className={cn('mx-auto mb-12 max-w-7xl px-2 py-8 md:px-0')}>{children}</div>
            </main>
        </div>
    );
}
