interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  subtitle: string;
  color: string;
  bgColor: string;
}

export default function StatCard({ icon, title, value, subtitle, color, bgColor }: StatCardProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center mb-4">
        <div className={`${bgColor} ${color} p-2 rounded-lg mr-3`}>{icon}</div>
        <h3 className="font-semibold text-foreground">{title}</h3>
      </div>
      <div className="text-3xl font-bold text-foreground mb-1">{value}</div>
      <p className="text-sm text-muted-foreground">{subtitle}</p>
    </div>
  );
}
