interface SummaryCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon?: string;
  subtitle?: string;
}

const SummaryCard = ({ title, value, change, icon, subtitle }: SummaryCardProps) => {
  const getChangeGlow = (changeValue?: number) => {
    if (!changeValue) return '';
    return changeValue >= 0 
      ? 'shadow-[0_0_20px_rgba(0,255,163,0.25)] border-border-glow-green'
      : 'shadow-[0_0_20px_rgba(255,75,75,0.25)] border-border-glow-red';
  };

  const getChangeGradient = (changeValue?: number) => {
    if (!changeValue) return '';
    return changeValue >= 0
      ? 'bg-gradient-to-r from-accent-green to-accent-green-light'
      : 'bg-gradient-to-r from-accent-red to-accent-red-light';
  };

  return (
    <div className={`bg-gradient-card from-background-gradient-from to-background-gradient-to rounded-2xl shadow-lg border border-border/50 backdrop-blur-sm p-6 relative ${getChangeGlow(change)} group transition-all duration-300 hover:bg-gradient-card-hover`}>
      <div className="absolute inset-px bg-background-card/50 rounded-2xl -z-10" />
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3">
            {icon && (
              <div className="text-2xl filter drop-shadow-sm">{icon}</div>
            )}
            <div>
              <h3 className="text-lg font-medium bg-gradient-to-r from-text-primary to-text-secondary bg-clip-text text-transparent">{title}</h3>
              {subtitle && <p className="text-sm text-text-secondary">{subtitle}</p>}
            </div>
          </div>
          <div className="mt-4">
            <p className="text-2xl font-bold bg-gradient-to-r from-text-primary via-primary/30 to-text-secondary bg-clip-text text-transparent">
              {typeof value === 'number' ? value.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }) : value}
            </p>
            {change !== undefined && (
              <div className="flex items-center mt-1">
                <span className={`text-sm font-medium ${getChangeGradient(change)} bg-clip-text text-transparent drop-shadow-sm`}>
                  {change >= 0 ? '↑' : '↓'} {Math.abs(change)}%
                </span>
                <span className="text-sm text-text-secondary ml-2">vs last week</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard; 