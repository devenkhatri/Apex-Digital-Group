import { clientMetrics } from '@/data/mock';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Container from '@/components/common/Container';

const ClientMetricsSection = () => {
  return (
    <section className="py-16 bg-background">
      <Container>
        <h2 className="text-3xl font-bold text-center mb-12 font-headline">
          Proven Results, Tangible Success
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {clientMetrics.map((metric) => (
            <Card key={metric.id} className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg">
              <CardHeader>
                {metric.icon && <metric.icon className="h-12 w-12 text-accent mx-auto mb-3" />}
                <CardTitle className="text-4xl font-bold text-primary font-headline">{metric.value}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{metric.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default ClientMetricsSection;
