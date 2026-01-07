import { theme } from "../shared/theme/colors"

function DashboardPage() {
  return (
    <div className="flex flex-col h-full">
      <header className={`${theme.header.bg} ${theme.header.text} p-4 shadow-lg hidden md:block`}>
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </header>
      <div className="flex-1 overflow-y-auto p-4 pt-16 md:pt-4">
        <div className="w-full max-w-2xl mx-auto">
          <h2 className={`text-3xl font-bold ${theme.text.primary} mb-6 md:hidden`}>📈 Dashboard</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Мок карточки */}
            <div className={`${theme.card.bg} ${theme.card.border} border rounded-xl ${theme.card.shadow} p-6`}>
              <h3 className={`text-lg font-bold ${theme.text.primary} mb-2`}>Portfolio Value</h3>
              <p className={`text-4xl font-bold ${theme.status.success}`}>$12,450.50</p>
              <p className={`${theme.text.secondary} text-sm mt-2`}>+5.2% today</p>
            </div>

            <div className={`${theme.card.bg} ${theme.card.border} border rounded-xl ${theme.card.shadow} p-6`}>
              <h3 className={`text-lg font-bold ${theme.text.primary} mb-2`}>Total Assets</h3>
              <p className={`text-4xl font-bold ${theme.text.primary}`}>8 coins</p>
              <p className={`${theme.text.secondary} text-sm mt-2`}>Diversified</p>
            </div>

            <div className={`${theme.card.bg} ${theme.card.border} border rounded-xl ${theme.card.shadow} p-6 md:col-span-2`}>
              <h3 className={`text-lg font-bold ${theme.text.primary} mb-4`}>Recent Activity</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className={theme.text.secondary}>Bought Bitcoin</span>
                  <span className={theme.status.success}>+0.5 BTC</span>
                </div>
                <div className="flex justify-between">
                  <span className={theme.text.secondary}>Sold Ethereum</span>
                  <span className={theme.status.error}>-2 ETH</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
