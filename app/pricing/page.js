import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, ArrowRight, Zap } from 'lucide-react';

const plans = [
  {
    name: 'Pay Per Call',
    price: '$0.90',
    period: 'per call',
    description: 'Perfect for trying us out',
    badge: 'No Commitment',
    features: [
      'Only pay for completed calls',
      'Google Calendar integration',
      'WhatsApp confirmations',
      'Basic appointment booking',
      'HIPAA compliant',
      'Email support',
    ],
  },
  {
    name: 'Starter',
    price: '$99',
    period: 'per month',
    description: 'Perfect for small practices',
    badge: 'Most Popular',
    features: [
      'Up to 500 calls/month',
      'Google Calendar integration',
      'WhatsApp confirmations',
      'Insurance verification',
      'SMS notifications',
      'Priority support',
      'HIPAA compliant',
    ],
  },
  {
    name: 'Growth',
    price: '$199',
    period: 'per month',
    description: 'For growing practices',
    features: [
      'Up to 2,000 calls/month',
      'Advanced calendar management',
      'Insurance verification',
      'WhatsApp integration',
      'Priority support',
      'Custom voice training',
      'Analytics dashboard',
      'Multi-location support',
    ],
  },
  {
    name: 'Custom',
    price: 'Contact us',
    period: '',
    description: 'Enterprise solution',
    features: [
      'Unlimited calls',
      'Multi-location support',
      'Custom integrations',
      'Dedicated success manager',
      '24/7 phone support',
      'SLA guarantees',
      'Advanced reporting',
      'White-label options',
    ],
  },
];

export default function PricingPage() {
  return (
    <div className="py-20 bg-gray-50 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            <Zap className="mr-1 h-3 w-3" />
            No Setup Fees • No Contracts • No Hardware
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Start at $99 / month – or just pay $0.90 per call until you're sold
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Choose the plan that works best for your practice
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4 mb-16">
          {plans.map((plan, index) => (
            <Card key={index} className={`relative ${plan.badge === 'Most Popular' ? 'ring-2 ring-brand-500 scale-105' : ''} ${plan.badge === 'No Commitment' ? 'border-green-200 bg-green-50' : ''}`}>
              {plan.badge && (
                <Badge className={`absolute -top-3 left-1/2 transform -translate-x-1/2 ${plan.badge === 'Most Popular' ? 'bg-brand-500' : 'bg-green-500'}`}>
                  {plan.badge}
                </Badge>
              )}
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  {plan.period && (
                    <span className="text-gray-600 ml-1">/{plan.period}</span>
                  )}
                </div>
                <p className="text-gray-600 mt-2">{plan.description}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="pt-4">
                  <Button asChild className="w-full" variant={plan.badge === 'Most Popular' ? 'default' : 'outline'}>
                    <Link href="/wizard">
                      {plan.name === 'Custom' ? 'Contact Sales' : 'Start Free Trial'}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Can I change clinic hours later?
              </h3>
              <p className="text-gray-600">
                Yes, edit in Dashboard ▸ Settings, changes apply in seconds.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Do I need Twilio?
              </h3>
              <p className="text-gray-600">
                No. We host the SIP trunk; Twilio is optional for SMS.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What happens if I exceed my plan limits?
              </h3>
              <p className="text-gray-600">
                We'll notify you and you can upgrade anytime. No calls are ever dropped.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Is there a setup fee?
              </h3>
              <p className="text-gray-600">
                No setup fees, no contracts, no hidden costs. Just transparent pricing.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to get started?
          </h2>
          <p className="text-gray-600 mb-8">
            Join hundreds of dental practices using Aria Voice
          </p>
          <div className="flex items-center justify-center space-x-4">
            <Button asChild size="lg">
              <Link href="/wizard">
                Start Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/contact">Contact Sales</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}