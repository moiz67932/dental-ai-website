"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Phone,
  FilePlus,
  Settings,
  Rocket,
  ArrowRight,
  CheckCircle,
  Clock,
  Calendar,
  MessageSquare,
  Shield,
  Zap,
  Mail,
  BarChart3,
} from "lucide-react";
import { useState, useEffect } from "react";

const benefits = [
  {
    icon: FilePlus,
    title: "Fill the 3-Minute Wizard",
    description:
      "Aria pulls your hours, insurance list and reminder wording. No PBX, no Twilio account required.",
  },
  {
    icon: Phone,
    title: "We Answer Every Call",
    description:
      "Ultra-low-latency voice bot runs on our GPUs; HIPAA logging included.",
  },
  {
    icon: BarChart3,
    title: "See Results, Not Logs",
    description:
      "A single dashboard shows today's calls, tomorrow's bookings and follow-up SMS status.",
  },
];

const timelineSteps = [
  {
    step: 1,
    icon: FilePlus,
    title: "Clinic Info",
    description: "Address, hours, insurance in one form.",
  },
  {
    step: 2,
    icon: Settings,
    title: "Calendar Connect",
    description: "Secure Google OAuth; we never see your password.",
  },
  {
    step: 3,
    icon: Phone,
    title: "Number Assigned",
    description:
      "We auto-provision a VoIP number or forward your existing line.",
  },
  {
    step: 4,
    icon: Rocket,
    title: "Live in 5 min",
    description: "Aria starts answering; you sip coffee ☕.",
  },
];

export default function HomePage() {
  const [stats, setStats] = useState({
    calls_handled: 12847,
    appointments_booked: 8932,
  });
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animate counters
  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) => ({
        calls_handled: prev.calls_handled + Math.floor(Math.random() * 3),
        appointments_booked:
          prev.appointments_booked + Math.floor(Math.random() * 2),
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white">
      {/* Transparent Sticky Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-brand-500/95 backdrop-blur-sm shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white">
                  <Phone className="h-5 w-5 text-brand-500" />
                </div>
                <span
                  className={`text-xl font-bold ${
                    scrolled ? "text-white" : "text-gray-900"
                  }`}
                >
                  Aria Voice
                </span>
              </Link>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              <a
                href="#features"
                className={`transition-colors ${
                  scrolled
                    ? "text-white hover:text-brand-100"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Features
              </a>
              <Link
                href="/pricing"
                className={`transition-colors ${
                  scrolled
                    ? "text-white hover:text-brand-100"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Pricing
              </Link>
              <a
                href="#docs"
                className={`transition-colors ${
                  scrolled
                    ? "text-white hover:text-brand-100"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Docs
              </a>
              <Button asChild variant={scrolled ? "secondary" : "default"}>
                <Link href="/start">Start Free Trial</Link>
              </Button>
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                className={scrolled ? "text-white" : "text-gray-900"}
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-radial from-brand-100 via-brand-50 to-white pt-24 pb-20 sm:pt-32 sm:pb-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="secondary" className="mb-6">
                <Zap className="mr-1 h-3 w-3" />
                Zero Infrastructure Required
              </Badge>
              <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
                Your Phone Rings.
                <span className="text-brand-600"> We Answer.</span>
              </h1>
              <p className="mt-6 text-xl leading-8 text-gray-600 max-w-2xl">
                Aria, the AI receptionist that books patients while you sleep.
                Complete a 3-minute wizard → our cloud AI answers every call,
                triages via insurance, books directly into Google Calendar &
                fires a WhatsApp confirmation.
              </p>
              <div className="mt-10 flex items-center gap-x-6">
                <Button
                  asChild
                  size="lg"
                  className="bg-brand-600 hover:bg-brand-700 text-lg px-8 py-4"
                >
                  <Link href="/wizard">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  asChild
                  className="text-lg px-8 py-4"
                >
                  <Link href="#demo">Watch Demo</Link>
                </Button>
              </div>

              {/* Live Stats */}
              <div className="mt-12 grid grid-cols-2 gap-8">
                <div>
                  <div className="text-3xl font-bold text-brand-600">
                    {stats.calls_handled.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">Calls Handled</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-brand-600">
                    {stats.appointments_booked.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">
                    Appointments Booked
                  </div>
                </div>
              </div>
            </div>

            {/* Phone Mockup with Animated Waveforms */}
            <div className="relative">
              <div className="relative mx-auto w-64 h-96 bg-gray-900 rounded-3xl p-2 shadow-2xl">
                <div className="w-full h-full bg-white rounded-2xl flex flex-col items-center justify-center">
                  <div className="text-center mb-8">
                    <Phone className="h-12 w-12 text-brand-500 mx-auto mb-4" />
                    <div className="text-lg font-semibold text-gray-900">
                      Incoming Call
                    </div>
                    <div className="text-sm text-gray-600">(555) 123-4567</div>
                  </div>

                  {/* Animated Waveforms */}
                  <div className="flex items-center space-x-1 mb-8">
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={i}
                        className="w-1 bg-brand-500 rounded-full animate-pulse"
                        style={{
                          height: `${Math.random() * 40 + 10}px`,
                          animationDelay: `${i * 0.1}s`,
                          animationDuration: "1s",
                        }}
                      />
                    ))}
                  </div>

                  <div className="text-center">
                    <div className="text-sm text-green-600 font-medium">
                      ✓ Answered by Aria
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Response time: 87ms
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="features" className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold tracking-tight text-gray-900">
              Sign up, paste your clinic details, click launch
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              We host, scale and patch the voice agent for you
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {benefits.map((benefit, index) => (
              <Card
                key={index}
                className="h-full hover:shadow-xl transition-all duration-300 border-0 shadow-lg"
              >
                <CardHeader className="text-center pb-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-100 mx-auto mb-4">
                    <benefit.icon className="h-8 w-8 text-brand-600" />
                  </div>
                  <CardTitle className="text-2xl font-bold">
                    {benefit.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600 text-lg leading-relaxed">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How Onboarding Works Timeline */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold tracking-tight text-gray-900">
              How onboarding works
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              From signup to live calls in under 5 minutes
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-brand-200 transform -translate-y-1/2"></div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
              {timelineSteps.map((step, index) => (
                <div key={index} className="relative text-center">
                  {/* Step Circle */}
                  <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 bg-brand-500 text-white rounded-full font-bold text-xl shadow-lg relative z-10">
                    {step.step}
                  </div>

                  {/* Icon */}
                  <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-brand-100 rounded-xl">
                    <step.icon className="h-6 w-6 text-brand-600" />
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-lg">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Works 24/7 Section */}
      <section className="py-20 bg-brand-900 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Clock className="h-16 w-16 text-brand-300 mx-auto mb-6" />
            <h2 className="text-4xl font-bold mb-6">
              Even at 3 a.m., Aria picks up in &lt; 100 ms
            </h2>
            <p className="text-xl text-brand-100 max-w-3xl mx-auto mb-8">
              Your patients never hear a busy signal. Our cloud infrastructure
              scales automatically, handling thousands of concurrent calls with
              enterprise-grade reliability.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-brand-300 mb-2">
                  99.9%
                </div>
                <div className="text-brand-100">Uptime SLA</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-brand-300 mb-2">
                  &lt;100ms
                </div>
                <div className="text-brand-100">Response Time</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-brand-300 mb-2">
                  24/7
                </div>
                <div className="text-brand-100">Always Available</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Calendar Integration */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Calendar className="h-12 w-12 text-brand-500 mb-6" />
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Bookings appear in your calendar
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                See them plus aggregated KPIs in a sleek dashboard. Every
                appointment booked by Aria syncs instantly to Google Calendar
                with patient details, insurance info, and reason for visit.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span>Real-time calendar sync</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span>WhatsApp confirmations sent automatically</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span>Insurance verification included</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span>Detailed analytics dashboard</span>
                </li>
              </ul>
            </div>
            <div className="relative">
              <Card className="shadow-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2" />
                    Today&apos;s Schedule
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div>
                      <div className="font-medium">Sarah Johnson</div>
                      <div className="text-sm text-gray-600">
                        Cleaning & Checkup
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">9:00 AM</div>
                      <Badge variant="secondary" className="text-xs">
                        Confirmed
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div>
                      <div className="font-medium">Mike Chen</div>
                      <div className="text-sm text-gray-600">Root Canal</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">11:30 AM</div>
                      <Badge variant="secondary" className="text-xs">
                        Booked by Aria
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                    <div>
                      <div className="font-medium">Emma Davis</div>
                      <div className="text-sm text-gray-600">
                        Emergency Visit
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">2:15 PM</div>
                      <Badge variant="secondary" className="text-xs">
                        Just booked
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Teaser */}
      <section className="py-20 bg-brand-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 mb-6">
              Start at $99 / month – or just pay $0.90 per call until
              you&apos;re sold
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              No setup fees, no contracts, no hardware required
            </p>
            <div className="flex items-center justify-center space-x-4 mb-8">
              <Badge variant="default" className="text-lg px-6 py-3">
                Starter: $99/month
              </Badge>
              <Badge variant="outline" className="text-lg px-6 py-3">
                Pay-per-call: $0.90
              </Badge>
            </div>
            <div className="flex items-center justify-center gap-4">
              <Button asChild size="lg" className="text-lg px-8 py-4">
                <Link href="/wizard">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="text-lg px-8 py-4"
              >
                <Link href="/pricing">View All Pricing</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
