
"use client";

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { suggestPricing, type SuggestPricingInput, type SuggestPricingOutput } from '@/ai/flows/suggest-pricing';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input'; // Not used directly, but Textarea is
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { services as serviceOptions } from '@/data/mock'; // Use mock services for options
import { Loader2, Wand2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const formSchema = z.object({
  serviceType: z.string().min(1, { message: "Please select a service type." }),
  requirements: z.string().min(20, { message: "Please provide detailed requirements (at least 20 characters)." }).max(2000),
});

type FormData = z.infer<typeof formSchema>;

const AIPricingTool = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pricingResult, setPricingResult] = useState<SuggestPricingOutput | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      serviceType: "",
      requirements: "",
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    setError(null);
    setPricingResult(null);

    try {
      const result = await suggestPricing(data as SuggestPricingInput); // Cast as SuggestPricingInput
      setPricingResult(result);
    } catch (e) {
      console.error("Error fetching pricing:", e);
      setError("Failed to get pricing suggestion. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="max-w-xl mx-auto shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline">
          <Wand2 className="h-6 w-6 text-primary" />
          Get Your Price Estimate
        </CardTitle>
        <CardDescription>
          Fill in the details below, and our AI will suggest a price range for your project.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="serviceType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Service Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {serviceOptions.map(service => (
                        <SelectItem key={service.id} value={service.title}>
                          {service.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="requirements"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Requirements</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your project needs, goals, specific features, timeline, etc."
                      className="min-h-[150px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex flex-col items-stretch gap-4">
            <Button type="submit" disabled={isLoading} className="w-full text-lg py-6 bg-primary hover:bg-primary/90">
              {isLoading ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                "Suggest Price"
              )}
            </Button>
            {error && (
              <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {pricingResult && !error && (
              <Alert variant="default" className="bg-accent/10 border-accent text-accent-foreground">
                 <Wand2 className="h-5 w-5 text-primary mr-2" />
                <AlertTitle className="font-headline text-primary">Estimated Price Range</AlertTitle>
                <AlertDescription className="text-lg font-semibold text-primary">
                  {pricingResult.estimatedPriceRange}
                </AlertDescription>
                 <p className="text-xs mt-2 text-muted-foreground">This is an AI-generated estimate. Actual costs may vary.</p>
              </Alert>
            )}
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default AIPricingTool;
