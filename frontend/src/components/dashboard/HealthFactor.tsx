interface HealthFactorProps {
  value: number;
}

const HealthFactor = ({ value }: HealthFactorProps) => {
  const getHealthColor = (health: number) => {
    if (health >= 2) return 'bg-gradient-to-r from-accent-green-dark via-accent-green to-accent-green-light';
    if (health >= 1.5) return 'bg-gradient-to-r from-accent-yellow-dark via-accent-yellow to-accent-yellow-light';
    return 'bg-gradient-to-r from-accent-red-dark via-accent-red to-accent-red-light';
  };

  const getTextColor = (health: number) => {
    if (health >= 2) return 'text-accent-green bg-gradient-to-br from-accent-green to-accent-green-light bg-clip-text';
    if (health >= 1.5) return 'text-accent-yellow bg-gradient-to-br from-accent-yellow to-accent-yellow-light bg-clip-text';
    return 'text-accent-red bg-gradient-to-br from-accent-red to-accent-red-light bg-clip-text';
  };

  const getGlowColor = (health: number) => {
    if (health >= 2) return 'shadow-[0_0_20px_rgba(0,255,163,0.25)]';
    if (health >= 1.5) return 'shadow-[0_0_20px_rgba(255,184,0,0.25)]';
    return 'shadow-[0_0_20px_rgba(255,75,75,0.25)]';
  };

  const getBorderGlow = (health: number) => {
    if (health >= 2) return 'border-border-glow-green';
    if (health >= 1.5) return 'border-border-glow-yellow';
    return 'border-border-glow-red';
  };

  const percentage = Math.min((value / 3) * 100, 100);

  return (
    <div className={`bg-gradient-card from-background-gradient-from to-background-gradient-to rounded-2xl shadow-lg border ${getBorderGlow(value)} backdrop-blur-sm p-6 relative ${getGlowColor(value)} group transition-all duration-300 hover:bg-gradient-card-hover`}>
      <div className="absolute inset-px bg-background-card/50 rounded-2xl -z-10" />
      <div className="flex justify-between items-center mb-3">
        <div>
          <h3 className="text-lg font-medium bg-gradient-to-r from-text-primary to-text-secondary bg-clip-text text-transparent">Health Factor</h3>
          <p className="text-sm text-text-secondary">Collateral health status</p>
        </div>
        <span className={`text-2xl font-bold ${getTextColor(value)} drop-shadow-sm text-transparent`}>
          {value.toFixed(2)}
        </span>
      </div>
      <div className="h-2 w-full bg-background/60 rounded-full overflow-hidden backdrop-blur-sm border border-border/50">
        <div
          className={`h-full ${getHealthColor(value)} transition-all duration-300 shadow-lg`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="mt-2 text-sm text-text-secondary flex items-center">
        <div className={`w-2 h-2 rounded-full ${getHealthColor(value)} shadow-lg mr-2`} />
        {value < 1.5 ? (
          <span className="bg-gradient-to-r from-accent-red to-accent-red-light bg-clip-text text-transparent font-medium drop-shadow-sm">At risk of liquidation</span>
        ) : value < 2 ? (
          <span className="bg-gradient-to-r from-accent-yellow to-accent-yellow-light bg-clip-text text-transparent font-medium drop-shadow-sm">Caution advised</span>
        ) : (
          <span className="bg-gradient-to-r from-accent-green to-accent-green-light bg-clip-text text-transparent font-medium drop-shadow-sm">Safe position</span>
        )}
      </div>
    </div>
  );
};

export default HealthFactor; 