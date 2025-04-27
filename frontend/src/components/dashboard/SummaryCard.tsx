interface SummaryCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon?: string;
  subtitle?: string;
}

const SummaryCard = ({ title, value, change, icon, subtitle }: SummaryCardProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3">
            {icon && (
              <div className="text-2xl">{icon}</div>
            )}
            <div>
              <h3 className="text-lg font-medium text-gray-800">{title}</h3>
              {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
            </div>
          </div>
          <div className="mt-4">
            <p className="text-2xl font-bold text-gray-900">
              {typeof value === 'number' ? value.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }) : value}
            </p>
            {change !== undefined && (
              <div className="flex items-center mt-1">
                <span className={`text-sm font-medium ${change >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {change >= 0 ? '↑' : '↓'} {Math.abs(change)}%
                </span>
                <span className="text-sm text-gray-500 ml-2">vs last week</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard; 