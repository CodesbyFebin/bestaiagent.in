import * as Icons from "lucide-react";

interface DynamicIconProps {
  name: string;
  className?: string;
  size?: number;
}

export default function DynamicIcon({ name, className = "", size = 20 }: DynamicIconProps) {
  // Map string names safely to Lucide Icon components
  const IconComponent = (Icons as any)[name];
  
  if (!IconComponent) {
    // Return a default icon if not found
    const Fallback = Icons.HelpCircle;
    return <Fallback className={className} size={size} />;
  }

  return <IconComponent className={className} size={size} />;
}
