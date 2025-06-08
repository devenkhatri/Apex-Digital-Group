import Link from 'next/link';
import { Aperture } from 'lucide-react'; // Using a generic icon for the logo

interface LogoProps {
  className?: string;
  iconSize?: number;
  textSize?: string;
}

const Logo = ({ className, iconSize = 28, textSize = "text-2xl" }: LogoProps) => (
  <Link href="/" className={`flex items-center gap-2 font-bold font-headline text-primary hover:text-primary/90 transition-colors ${className}`}>
    <Aperture size={iconSize} />
    <span className={textSize}>Apex Digital Group</span>
  </Link>
);

export default Logo;
