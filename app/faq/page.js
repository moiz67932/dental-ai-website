'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const faqs = [
  {
    question: 'How quickly can I get Aria up and running?',
    answer: 'Most practices are taking calls within 5 minutes of completing our 3-minute setup wizard. The process includes connecting your calendar, configuring your phone system, and training Aria on your specific practice needs.',
  },
  {
    question: 'Is Aria HIPAA compliant?',
    answer: 'Yes, Aria is fully HIPAA compliant. All patient data is encrypted in transit and at rest, and we maintain a signed Business Associate Agreement (BAA) with all our customers.',
  },
  {
    question: 'Can I change clinic hours later?',
    answer: 'Yes, edit in Dashboard ▸ Settings, changes apply in seconds. You can update hours, holidays, and availability anytime.',
  },
  {
    question: 'Do I need Twilio?',
    answer: 'No. We host the SIP trunk; Twilio is optional for SMS. We provide everything you need out of the box.',
  },
  {
    question: 'What phone systems does Aria work with?',
    answer: 'Aria works with any phone system. We can forward your existing number or provide a new VoIP number. No hardware changes required.',
  },
  {
    question: 'Can Aria book appointments in real-time?',
    answer: 'Yes, Aria connects directly to your Google Calendar to book appointments in real-time while the patient is on the call. No double-booking, no missed opportunities.',
  },
  {
    question: 'What happens if Aria can\'t help a caller?',
    answer: 'Aria is trained to recognize when a call needs human attention and will seamlessly transfer the caller to your staff. You can configure escalation rules and backup numbers for different scenarios.',
  },
  {
    question: 'How does billing work for the pay-per-call option?',
    answer: 'With pay-per-call, you only pay $0.90 for each call that Aria successfully handles (answers and provides value). Wrong numbers, hang-ups, and transfers to your staff don\'t count as billable calls.',
  },
  {
    question: 'Can I customize Aria\'s responses?',
    answer: 'Absolutely. During setup, you can train Aria on your practice\'s specific procedures, policies, and preferred language. You can also update these at any time through the dashboard.',
  },
  {
    question: 'Does Aria work after business hours?',
    answer: 'Yes, Aria works 24/7. You can configure different behaviors for business hours vs. after hours, such as taking messages, scheduling emergency callbacks, or directing to your emergency line.',
  },
  {
    question: 'What analytics and reporting does Aria provide?',
    answer: 'Aria provides detailed analytics including call volume, appointment bookings, common caller questions, and performance metrics. All data is available in real-time through your dashboard.',
  },
  {
    question: 'Is there a contract or can I cancel anytime?',
    answer: 'No long-term contracts required. You can cancel anytime with 30 days notice. The pay-per-call option has no commitment at all - just pay for the calls you use.',
  },
];

export default function FAQPage() {
  return (
    <div className="py-20 bg-gray-50 min-h-screen">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Frequently Asked Questions
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Everything you need to know about Aria Voice
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Common Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Still have questions?
          </h2>
          <p className="text-gray-600 mb-8">
            Our support team is here to help you get started
          </p>
          <div className="flex items-center justify-center space-x-4">
            <Button asChild>
              <Link href="mailto:support@ariavoice.com">
                Contact Support
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/wizard">
                Start Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}