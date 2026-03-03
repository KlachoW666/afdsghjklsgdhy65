import { Zap, Clock, Activity } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import { useTradeStore } from '../store/tradeStore';

export default function HomePage() {
    const { t } = useTranslation();
    const { trades, metrics } = useTradeStore();

    return (
        <div className="space-y-6 pb-4 stagger-children">
            {/* Trades Live Section */}
            <section>
                <div className="flex items-center gap-2.5 mb-3">
                    <h2 className="text-lg font-semibold text-[#F8FAFC]">{t('home.tradesLive')}</h2>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full glass-card text-[#00E676] text-xs font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00E676] animate-pulse-dot" />
                        Live
                    </span>
                </div>
                <div className="glass-card rounded-2xl overflow-hidden">
                    <div className="grid grid-cols-[1fr_1fr_2fr] gap-2 px-4 py-3 border-b border-white/[0.06] text-[10px] font-bold uppercase text-[#64748B] tracking-wider">
                        <span>{t('home.time')}</span>
                        <span>{t('home.pair')}</span>
                        <span>{t('home.pnl')}</span>
                    </div>
                    <div className="max-h-[240px] overflow-y-auto thin-scrollbar">
                        {trades.length === 0 ? (
                            <div className="px-4 py-8 text-center text-[#64748B] text-sm">
                                {t('home.noTrades')}
                            </div>
                        ) : (
                            trades.map((trade, i) => (
                                <div
                                    key={trade.id}
                                    className={`grid grid-cols-[1fr_1fr_2fr] gap-2 px-4 py-2.5 border-b border-white/[0.04] last:border-0 text-sm transition-all duration-200 ${trade.type === 'profit'
                                            ? 'bg-gradient-to-r from-[#00E676]/[0.06] to-transparent'
                                            : 'bg-gradient-to-r from-[#FF5252]/[0.06] to-transparent'
                                        }`}
                                    style={{ animationDelay: `${i * 30}ms` }}
                                >
                                    <span className={`font-mono text-xs ${trade.type === 'profit' ? 'text-[#00E676]/60' : 'text-[#FF5252]/60'}`}>
                                        {trade.time}
                                    </span>
                                    <span className={`font-semibold ${trade.type === 'profit' ? 'text-[#00E676]' : 'text-[#FF5252]'}`}>
                                        {trade.pair}
                                    </span>
                                    <span className={trade.type === 'profit' ? 'text-[#00E676]' : 'text-[#FF5252]'}>
                                        <span className="font-mono font-bold">{trade.pnl} {trade.pair}</span>
                                        <span className={`text-xs ml-1 ${trade.type === 'profit' ? 'text-[#00E676]/50' : 'text-[#FF5252]/50'}`}>
                                            {trade.pnlUsd}
                                        </span>
                                    </span>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </section>

            {/* Speed Section */}
            <section>
                <div className="flex items-center gap-2 mb-3">
                    <div className="w-7 h-7 rounded-lg bg-[#00E676]/10 flex items-center justify-center">
                        <Zap className="w-4 h-4 text-[#00E676]" />
                    </div>
                    <h2 className="text-lg font-semibold text-[#F8FAFC]">{t('home.speed')}</h2>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <div className="glass-card rounded-2xl p-4">
                        <div className="flex items-center gap-2 text-[#64748B] mb-2">
                            <div className="w-6 h-6 rounded-md bg-[#60A5FA]/10 flex items-center justify-center">
                                <Clock size={12} className="text-[#60A5FA]" />
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-wider">{t('home.delay')}</span>
                        </div>
                        <div className="text-[#F8FAFC] font-mono text-lg tabular-nums">~{metrics.latencyNs} {t('home.ns')}</div>
                        <div className="text-[10px] text-[#64748B] mt-1">{t('home.execSub')}</div>
                    </div>
                    <div className="glass-card rounded-2xl p-4">
                        <div className="flex items-center gap-2 text-[#64748B] mb-2">
                            <div className="w-6 h-6 rounded-md bg-[#A78BFA]/10 flex items-center justify-center">
                                <Activity size={12} className="text-[#A78BFA]" />
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-wider">{t('home.executionsTitle')}</span>
                        </div>
                        <div className="text-[#F8FAFC] font-mono text-lg tabular-nums">{metrics.executionsSession}</div>
                        <div className="text-[10px] text-[#64748B] mt-1">{t('home.perSession')}</div>
                    </div>
                </div>
                <div className="mt-3 px-4 py-3 glass-card glow-green rounded-xl text-[#00E676] text-sm font-medium flex items-center justify-between">
                    <span>{t('home.avgSpeed')}</span>
                    <span className="font-mono text-shadow-green tabular-nums">~{metrics.avgExecutionNs} {t('home.ns')}</span>
                </div>
            </section>
        </div>
    );
}
