import { GlassCard } from "@/components/ui/GlassCard";
import { ElementType } from "react";

interface IProps {
  icon: ElementType;
  display: string;
  label: string;
}

export function StatusCard({ icon: Icon, display, label }: IProps) {
  return (
    <GlassCard className="flex flex-col items-center justify-center">
      <Icon className="w-8 h-8 mr-2" />
      <p className="text-2xl font-medium">{display}</p>
      <h2 className="text-xl font-medium">{label}</h2>
    </GlassCard>
  );
}
