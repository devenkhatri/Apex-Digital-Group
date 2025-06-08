"use client";

import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from 'lucide-react';
import { services as serviceOptions } from '@/data/mock'; // Use mock services for options
import { useState } from 'react';

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  phone: z.string().optional(),
  service: z.string().min(1, { message: "Please select a service of interest." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }).max(1000),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

const ContactForm = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      service: "",
      message: "",
    },
  });

  // Placeholder for form submission
  const onSubmit: SubmitHandler<ContactFormData> = async (data) => {
    setIsLoading(true);
    console.log("Contact form data:", data);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We'll get back to you shortly.",
      variant: "default",
    });
    form.reset(); // Reset form after successful submission
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input type="email" placeholder="you@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number (Optional)</FormLabel>
              <FormControl>
                <Input type="tel" placeholder="(123) 456-7890" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="service"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Service of Interest</FormLabel>
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
                   <SelectItem value="Other">Other Inquiry</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us about your project or inquiry..."
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-lg py-6" disabled={isLoading}>
           {isLoading ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                "Send Message"
           )}
        </Button>
      </form>
    </Form>
  );
};

export default ContactForm;
