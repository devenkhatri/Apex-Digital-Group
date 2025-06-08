
import Container from '@/components/common/Container';
import ContactForm from '@/components/forms/ContactForm';
import { Mail, Phone, MapPin } from 'lucide-react';

export const metadata = {
  title: 'Contact Us | Apex Digital Group',
  description: 'Get in touch with Apex Digital Group. We are here to answer your questions and discuss your project needs in India.',
};

export default function ContactPage() {
  return (
    <div className="py-16 bg-background">
      <Container>
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold font-headline mb-4">Contact Us</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We're excited to hear from you! Whether you have a question about our services for the Indian market, need a quote, or want to discuss a project, please reach out.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-card p-8 rounded-lg shadow-xl">
            <h2 className="text-2xl font-semibold font-headline mb-6">Send us a Message</h2>
            <ContactForm />
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold font-headline mb-3 flex items-center">
                <MapPin className="h-6 w-6 text-accent mr-3" />
                Our Office (India)
              </h3>
              <address className="not-italic text-muted-foreground">
                456 Tech Park Road<br />
                Cyberabad, Hyderabad 500081<br />
                India
              </address>
            </div>
            <div>
              <h3 className="text-xl font-semibold font-headline mb-3 flex items-center">
                <Mail className="h-6 w-6 text-accent mr-3" />
                Email Us
              </h3>
              <a href="mailto:info@apexdigital.co.in" className="text-muted-foreground hover:text-primary transition-colors">
                info@apexdigital.co.in
              </a>
            </div>
            <div>
              <h3 className="text-xl font-semibold font-headline mb-3 flex items-center">
                <Phone className="h-6 w-6 text-accent mr-3" />
                Call Us (India)
              </h3>
              <a href="tel:+919876543210" className="text-muted-foreground hover:text-primary transition-colors">
                +91 98765 43210
              </a>
            </div>
            <div>
              <h3 className="text-xl font-semibold font-headline mb-3">Business Hours (IST)</h3>
              <p className="text-muted-foreground">Monday - Friday: 9:30 AM - 6:30 PM (IST)</p>
              <p className="text-muted-foreground">Saturday - Sunday: Closed</p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
