interface HealthFactorProps {
  value: number;
}

const HealthFactor = ({ value }: HealthFactorProps) => {
  const getHealthColor = (health: number) => {
    if (health >= 2) return 'bg-emerald-500';
    if (health >= 1.5) return 'bg-amber-500';
    return 'bg-rose-500';
  };

  const getTextColor = (health: number) => {
    if (health >= 2) return 'text-emerald-700';
    if (health >= 1.5) return 'text-amber-700';
    return 'text-rose-700';
  };

  const percentage = Math.min((value / 3) * 100, 100);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex justify-between items-center mb-3">
        <div>
          <h3 className="text-lg font-medium text-gray-800">Health Factor</h3>
          <p className="text-sm text-gray-500">Collateral health status</p>
        </div>
        <span className={`text-2xl font-bold ${getTextColor(value)}`}>
          {value.toFixed(2)}
        </span>
      </div>
      <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full ${getHealthColor(value)} transition-all duration-300`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="mt-2 text-sm text-gray-600 flex items-center">
        <div className={`w-2 h-2 rounded-full ${getHealthColor(value)} mr-2`} />
        {value < 1.5 ? (
          <span className="text-rose-700 font-medium">At risk of liquidation</span>
        ) : value < 2 ? (
          <span className="text-amber-700 font-medium">Caution advised</span>
        ) : (
          <span className="text-emerald-700 font-medium">Safe position</span>
        )}
      </div>
    </div>
  );
};

export default HealthFactor; 