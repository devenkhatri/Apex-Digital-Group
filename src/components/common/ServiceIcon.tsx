import type { LucideIcon } from 'lucide-react';
import { Aperture } from 'lucide-react'; // Default icon

interface ServiceIconProps {
  IconComponent?: LucideIcon;
  className?: string;
}

const ServiceIcon = ({ IconComponent = Aperture, className = "h-12 w-12 text-accent" }: ServiceIconProps) => {
  return <IconComponent className={className} />;
};

export default ServiceIcon;
