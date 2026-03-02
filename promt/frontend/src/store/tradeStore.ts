import { create } from 'zustand';

export interface Trade {
    id: string;
    time: string;
    pair: string;
    pnl: string;
    pnlUsd: string;
    type: 'profit' | 'loss';
}

interface SpeedMetrics {
    latencyNs: number;
    executionsSession: number;
    avgExecutionNs: number;
}

interface TradeState {
    trades: Trade[];
    metrics: SpeedMetrics;
    stats: {
        todayPnl: number;
        weekPnl: number;
        monthPnl: number;
        winRate: number;
        profitTrades: number;
        totalTrades: number;
    };
    globalWinrate: number;
    tradeDelayMs: number;
    addTrade: (trade: Trade, shouldUpdateStats?: boolean, pnlDelta?: number) => void;
    updateMetrics: (metrics: Partial<TradeState['metrics']>) => void;
    incrementExecutions: () => void;
    setGlobalWinrate: (rate: number) => void;
    setTradeDelayMs: (ms: number) => void;
}

// Demo trades for home screen (until live WS / API)
const DEMO_TRADES: Trade[] = [
    { id: '1', time: '17:57:41', pair: 'BONK', pnl: '+10.11', pnlUsd: '($0.0001)', type: 'profit' },
    { id: '2', time: '17:57:40', pair: 'FIL', pnl: '+0.5510', pnlUsd: '($0.5535)', type: 'profit' },
    { id: '3', time: '17:57:39', pair: 'ETH', pnl: '-5.96e-5', pnlUsd: '($-0.1170)', type: 'loss' },
    { id: '4', time: '17:57:38', pair: 'KAS', pnl: '-0.4252', pnlUsd: '($-0.0482)', type: 'loss' },
    { id: '5', time: '17:57:37', pair: 'ROSE', pnl: '+1.18', pnlUsd: '($0.0126)', type: 'profit' },
    { id: '6', time: '17:57:36', pair: 'SUI', pnl: '-0.7067', pnlUsd: '($-0.8234)', type: 'loss' },
    { id: '7', time: '17:57:35', pair: 'VET', pnl: '+39.00', pnlUsd: '($1.0920)', type: 'profit' },
];

export const useTradeStore = create<TradeState>((set) => ({
    trades: DEMO_TRADES,
    metrics: {
        latencyNs: 818,
        executionsSession: 3,
        avgExecutionNs: 794,
    },
    stats: {
        todayPnl: 0,
        weekPnl: 0,
        monthPnl: 0,
        winRate: 0,
        profitTrades: 0,
        totalTrades: 0,
    },
    globalWinrate: 60,
    tradeDelayMs: 1500,

    addTrade: (trade, shouldUpdateStats = false, pnlDelta = 0) => set((state) => {
        const newTrades = [trade, ...state.trades].slice(0, 50); // Keep last 50

        if (!shouldUpdateStats) {
            return { trades: newTrades };
        }

        const newTotal = state.stats.totalTrades + 1;
        const newProfit = trade.type === 'profit' ? state.stats.profitTrades + 1 : state.stats.profitTrades;

        return {
            trades: newTrades,
            stats: {
                ...state.stats,
                todayPnl: state.stats.todayPnl + pnlDelta,
                weekPnl: state.stats.weekPnl + pnlDelta,
                monthPnl: state.stats.monthPnl + pnlDelta,
                totalTrades: newTotal,
                profitTrades: newProfit,
                winRate: newTotal > 0 ? (newProfit / newTotal) * 100 : 0
            }
        };
    }),

    updateMetrics: (newMetrics) => set((state) => ({
        metrics: { ...state.metrics, ...newMetrics }
    })),

    incrementExecutions: () => set((state) => ({
        metrics: {
            ...state.metrics,
            executionsSession: state.metrics.executionsSession + 1
        }
    })),

    setGlobalWinrate: (rate) => set({ globalWinrate: rate }),
    setTradeDelayMs: (ms) => set({ tradeDelayMs: ms }),
}));
