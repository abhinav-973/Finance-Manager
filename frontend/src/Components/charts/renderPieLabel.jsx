const renderLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  value,
}) => {
  const RADIAN = Math.PI / 180;
  // Position text slightly further out for better readability
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  // Only render label if value is non-zero
  if (value === 0) return null;

  return (
    <text
      x={x}
      y={y}
      fill="#ffffff"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={12}
      fontWeight="700"
      style={{ filter: "drop-shadow(0px 1px 2px rgba(0,0,0,0.5))" }}
    >
      ₹{new Intl.NumberFormat('en-IN', { notation: "compact" }).format(value)}
    </text>
  );
};

export default renderLabel;