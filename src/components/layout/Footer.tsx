
import Link from 'next/link';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import Logo from '@/components/common/Logo';
import Container from '@/components/common/Container';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'About Us', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
    { label: 'AI Pricing', href: '/ai-pricing' },
  ];

  const socialLinks = [
    { Icon: Facebook, href: '#', label: 'Facebook' },
    { Icon: Twitter, href: '#', label: 'Twitter' },
    { Icon: Linkedin, href: '#', label: 'LinkedIn' },
    { Icon: Instagram, href: '#', label: 'Instagram' },
  ];

  return (
    <footer className="bg-secondary text-secondary-foreground py-12">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Logo className="text-primary mb-4" />
            <p className="text-sm text-muted-foreground">
              Apex Digital Group: Driving innovation and results for your business in India.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold font-headline mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold font-headline mb-4">Contact Us (India)</h3>
            <address className="text-sm not-italic space-y-1 text-muted-foreground">
              <p>456 Tech Park Road, Cyberabad, Hyderabad 500081</p>
              <p>Email: <a href="mailto:info@apexdigital.co.in" className="hover:text-primary">info@apexdigital.co.in</a></p>
              <p>Phone: <a href="tel:+919876543210" className="hover:text-primary">+91 98765 43210</a></p>
            </address>
          </div>
          <div>
            <h3 className="text-lg font-semibold font-headline mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              {socialLinks.map(social => (
                <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label} className="text-muted-foreground hover:text-primary transition-colors">
                  <social.Icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} Apex Digital Group India. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
