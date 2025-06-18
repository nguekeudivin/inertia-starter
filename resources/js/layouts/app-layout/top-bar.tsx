'use client';

import { useDisplay } from '@/hooks/use-interact';
import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { Menu } from 'lucide-react';

export default function TopBar({ className }: { className: string }) {
    const display = useDisplay();

    return (
        <div id="topbar" className={cn(className)}>
            <div className={cn('mx-auto flex h-full max-w-7xl items-center justify-between')}>
                <div className="flex gap-4">
                    <button
                        className="md:hidden"
                        onClick={() => {
                            display.show('MobileMenu');
                        }}
                    >
                        <Menu className="text-muted-foreground h-5 w-5" />
                    </button>
                </div>
                <div className="flex h-full items-center justify-between space-x-6">
                    <Link href="/logout" method="post" as="button">
                        <span className="hidden rounded-md bg-gray-200 px-4 py-1.5 transition hover:bg-gray-300 md:inline">Se deconnecter</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
