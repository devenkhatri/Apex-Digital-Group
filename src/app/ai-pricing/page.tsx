import Container from '@/components/common/Container';
import AIPricingTool from '@/components/tools/AIPricingTool';

export const metadata = {
  title: 'AI Pricing Estimator | Apex Digital Group',
  description: 'Get an AI-powered price estimate for your digital service needs.',
};

export default function AIPricingPage() {
  return (
    <div className="py-16 bg-background">
      <Container>
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold font-headline mb-4">AI-Powered Pricing Estimator</h1>
          <p className="text-lg text-muted-foreground">
            Select a service and describe your requirements to get an instant price estimation powered by our AI.
            Please note that this is an estimate, and final pricing may vary based on detailed project scope.
          </p>
        </div>
        <AIPricingTool />
      </Container>
    </div>
  );
}
