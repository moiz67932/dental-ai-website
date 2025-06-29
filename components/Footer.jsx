import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {/* Logo and Newsletter */}
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500">
                  <Phone className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">Aria Voice</span>
              </div>
              <p className="text-gray-600 max-w-md">
                The AI receptionist that never sleeps. Sign up in 3 minutes, 
                start taking calls immediately.
              </p>
              <div className="flex space-x-2">
                <Input 
                  placeholder="Enter your email" 
                  className="flex-1"
                />
                <Button>
                  <Mail className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Product</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/pricing" className="text-gray-600 hover:text-gray-900 transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-gray-600 hover:text-gray-900 transition-colors">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">
                    Features
                  </Link>
                </li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-gray-600 hover:text-gray-900 transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-600 hover:text-gray-900 transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="text-gray-600 hover:text-gray-900 transition-colors">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/privacy" className="text-gray-600 hover:text-gray-900 transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-gray-600 hover:text-gray-900 transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/hipaa" className="text-gray-600 hover:text-gray-900 transition-colors">
                    HIPAA Compliance
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-center text-gray-600">
              © 2024 Aria Voice. All rights reserved.
            </p>
          </div>
        </div>
      </div>
      
      {/* Sticky bottom bar */}
      <div className="sticky bottom-0 bg-brand-500 text-white py-3 px-4 shadow-lg">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <span className="text-sm font-medium">Ready to never miss another call?</span>
          <Link
            href="/wizard"
            className="text-sm font-medium hover:underline bg-white text-brand-500 px-4 py-2 rounded-lg transition-colors hover:bg-brand-50"
          >
            Start Free Trial →
          </Link>
        </div>
      </div>
    </footer>
  );
}