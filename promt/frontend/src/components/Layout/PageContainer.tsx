export default function PageContainer({ children }: { children: React.ReactNode }) {
    return (
        <main className="flex-1 overflow-y-auto w-full mx-auto relative px-4 pt-5 pb-8 no-scrollbar scroll-smooth aurora-bg" style={{ maxWidth: '480px' }}>
            <div className="relative z-10">
                {children}
            </div>
        </main>
    );
}
