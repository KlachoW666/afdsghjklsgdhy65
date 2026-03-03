import { Grid, Wallet, ArrowRightLeft, Users, BarChart3, Settings } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import { useTranslation } from '../../hooks/useTranslation';

export default function BottomNav() {
    const { t } = useTranslation();

    const tabs = [
        { path: '/', label: t('nav.home'), icon: Grid },
        { path: '/wallet', label: t('nav.wallet'), icon: Wallet },
        { path: '/exchange', label: t('nav.exchange'), icon: ArrowRightLeft },
        { path: '/referrals', label: t('nav.referrals'), icon: Users },
        { path: '/stats', label: t('nav.stats'), icon: BarChart3 },
        { path: '/settings', label: t('nav.settings'), icon: Settings }
    ];

    return (
        <nav className="flex justify-around items-center h-16 bg-[#111827]/90 backdrop-blur-xl border-t border-white/[0.06] pb-[env(safe-area-inset-bottom)] shrink-0 px-2 relative z-50">
            {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                    <NavLink
                        key={tab.path}
                        to={tab.path}
                        className={({ isActive }) => clsx(
                            'flex flex-col items-center justify-center w-full h-full space-y-1.5 transition-all duration-200 relative',
                            isActive ? 'text-[#00E676]' : 'text-[#64748B] hover:text-[#94A3B8]'
                        )}
                    >
                        {({ isActive }) => (
                            <>
                                {/* Pill indicator */}
                                <div className={clsx(
                                    'absolute top-1 w-5 h-1 rounded-full transition-all duration-300',
                                    isActive ? 'bg-[#00E676] shadow-[0_0_8px_rgba(0,230,118,0.5)]' : 'bg-transparent'
                                )} />

                                <Icon
                                    size={22}
                                    strokeWidth={1.5}
                                    className={clsx(
                                        'transition-all duration-200',
                                        isActive && 'drop-shadow-[0_0_6px_rgba(0,230,118,0.5)]'
                                    )}
                                />
                                <span className={clsx(
                                    'text-[9px] uppercase font-semibold tracking-wider transition-all duration-200',
                                    isActive && 'text-shadow-green'
                                )}>
                                    {tab.label}
                                </span>
                            </>
                        )}
                    </NavLink>
                );
            })}
        </nav>
    );
}
