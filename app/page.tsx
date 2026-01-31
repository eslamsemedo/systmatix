'use client'

import React from "react"

import { useState } from 'react'
import { Menu, X, ChevronDown, Star, Check, Code2, Smartphone, Cpu, Palette } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import Image from 'next/image'

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [selectedSolution, setSelectedSolution] = useState('website')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    budget: '',
    message: '',
  })
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleBudgetChange = (value: string) => {
    setFormData(prev => ({ ...prev, budget: value }))
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormStatus('sending')
    try {
      const fullMessage = [
        formData.message,
        formData.company && `Company: ${formData.company}`,
        formData.budget && `Budget: ${formData.budget}`,
      ]
        .filter(Boolean)
        .join('\n\n')
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: fullMessage,
        }),
      })
      const data = await res.json()
      if (!res.ok || !data.success) throw new Error('Failed to send')
      setFormStatus('success')
      setFormData({ name: '', email: '', company: '', budget: '', message: '' })
    } catch {
      setFormStatus('error')
    }
  }

  const navLinks = [
    { href: '#services', label: 'Services' },
    { href: '#solutions', label: 'Solutions' },
    { href: '#process', label: 'Process' },
    { href: '#work', label: 'Work' },
    { href: '#testimonials', label: 'Testimonials' },
    { href: '#pricing', label: 'Pricing' },
    { href: '#faq', label: 'FAQ' },
    { href: '#contact', label: 'Contact' },
  ]

  const services = [
    {
      icon: Code2,
      title: 'Web Development',
      description: 'Landing pages, dashboards, e-commerce platforms, and custom web applications built with modern tech stacks.',
    },
    {
      icon: Smartphone,
      title: 'Mobile Apps',
      description: 'Native iOS/Android apps and cross-platform solutions using React Native, delivering seamless user experiences.',
    },
    {
      icon: Cpu,
      title: 'Custom Systems',
      description: 'Automation tools, CRM systems, internal portals, and business-critical software tailored to your needs.',
    },
    {
      icon: Palette,
      title: 'UI/UX & Branding',
      description: 'Design systems, interactive prototypes, and beautiful interfaces that drive user engagement.',
    },
  ]

  const solutions = [
    {
      id: 'website',
      title: 'Business Website + Admin Dashboard',
      description: 'Showcase your business online with a modern website paired with a powerful admin dashboard for content management.',
      outcome: 'Reach customers 24/7 and manage operations from anywhere',
    },
    {
      id: 'booking',
      title: 'Booking & Ordering Systems',
      description: 'Enable customers to book services or place orders directly through your platform with real-time updates.',
      outcome: 'Reduce manual work and increase customer satisfaction',
    },
    {
      id: 'tools',
      title: 'Internal Tools & Automation',
      description: 'Streamline workflows with custom internal tools that integrate with your existing systems and eliminate manual tasks.',
      outcome: 'Save time, reduce errors, and boost team productivity',
    },
    {
      id: 'saas',
      title: 'SaaS MVP Development',
      description: 'Quickly launch your SaaS idea with a polished MVP, built with scalable architecture from day one.',
      outcome: 'Get to market fast and validate your business idea',
    },
  ]

  const processSteps = [
    {
      num: 1,
      title: 'Discover',
      deliverables: 'Requirements analysis, goal setting, tech stack selection',
    },
    {
      num: 2,
      title: 'Design',
      deliverables: 'UI/UX mockups, prototypes, design system documentation',
    },
    {
      num: 3,
      title: 'Build',
      deliverables: 'Development, testing, quality assurance, code review',
    },
    {
      num: 4,
      title: 'Launch & Support',
      deliverables: 'Deployment, monitoring, ongoing support, maintenance',
    },
  ]

  const caseStudies = [
    {
      goal: 'Build a SaaS platform for project management',
      solution: 'Developed a cloud-based app with real-time collaboration features using Next.js and PostgreSQL',
      results: '500+ active users, 40% increase in user retention',
    },
    {
      goal: 'Create a mobile-first e-commerce platform',
      solution: 'Built a responsive mobile app and web dashboard with inventory management and payment integration',
      results: '2x increase in mobile sales, 99.9% uptime',
    },
    {
      goal: 'Automate internal business processes',
      solution: 'Developed custom automation tools integrated with existing systems, reducing manual data entry',
      results: '20 hours saved weekly per employee, 95% error reduction',
    },
  ]

  const testimonials = [
    {
      author: 'John Smith',
      company: 'Tech Startup',
      text: 'SYSTMATIIX delivered our MVP in half the time we expected. Their team understood our vision and executed flawlessly.',
      rating: 5,
    },
    {
      author: 'Sarah Johnson',
      company: 'E-commerce Brand',
      text: 'Our sales increased 30% after launching the platform they built. Truly professional and responsive team.',
      rating: 5,
    },
    {
      author: 'Michael Chen',
      company: 'Enterprise Client',
      text: 'Best decision we made was partnering with SYSTMATIIX. Quality, speed, and support are unmatched.',
      rating: 5,
    },
  ]

  const pricingTiers = [
    {
      name: 'Starter',
      description: 'Perfect for small projects',
      startingFrom: '$2,500',
      includes: ['Landing page or small website', 'Responsive design', 'Basic SEO setup', 'Hosting setup', 'Email support'],
    },
    {
      name: 'Growth',
      description: 'For ambitious projects',
      startingFrom: '$8,000',
      includes: ['Full web application', 'Admin dashboard', 'Database integration', 'User authentication', 'Analytics setup', 'Priority support'],
      highlighted: true,
    },
    {
      name: 'Scale',
      description: 'Enterprise solutions',
      startingFrom: '$25,000',
      includes: ['Complex systems & integrations', 'Mobile apps (iOS & Android)', 'Advanced features', 'Dedicated support', 'Unlimited revisions', '12 months maintenance'],
    },
  ]

  const faqs = [
    {
      question: 'How long does a typical project take?',
      answer: 'Timeline varies based on scope. Simple websites: 2-4 weeks. Web apps: 6-12 weeks. Custom systems: 3-6 months. We provide detailed timelines after discovery.',
    },
    {
      question: 'What tech stack do you use?',
      answer: 'We use modern, production-ready technologies: Next.js, React, TypeScript, Node.js, PostgreSQL, and cloud platforms like Vercel and AWS. We select tools based on project needs.',
    },
    {
      question: 'Do you provide ongoing maintenance?',
      answer: 'Yes! We offer maintenance packages for hosting, updates, security patches, and technical support. Details customized per project.',
    },
    {
      question: 'Can you work with our budget?',
      answer: 'Absolutely. We offer flexible options from fixed-price projects to hourly consulting. Let\'s discuss what works for your business.',
    },
    {
      question: 'How do you handle revisions?',
      answer: 'We include revision rounds in our process. For Starter/Growth tiers, we include 2-3 rounds. Scale tier includes unlimited revisions during development.',
    },
    {
      question: 'Where does my app get hosted?',
      answer: 'We recommend Vercel, AWS, or other enterprise solutions depending on your needs. We handle setup, deployment, and ensure security best practices.',
    },
    {
      question: 'What about app store deployment?',
      answer: 'For mobile apps, we handle all App Store and Google Play submission processes, including reviews, compliance, and launch management.',
    },
    {
      question: 'How is security handled?',
      answer: 'Security is built-in from day one. We use encryption, secure authentication, regular audits, and follow OWASP best practices throughout development.',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-border/50 backdrop-blur-sm bg-background/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image
                src="/logoSys.png"
                alt="SYSTMATIIX"
                width={40}
                height={40}
                className="w-20 h-20 rounded-lg object-contain"
              />
              <span className="font-bold text-lg hidden sm:block">SYSTMATIIX</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-foreground/70 hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <Button className="hidden sm:flex gap-2 bg-primary hover:bg-primary/90 text-primary-foreground">
                Book a Free Call
              </Button>

              {/* Mobile Menu */}
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild className="lg:hidden">
                  <Button variant="ghost" size="icon">
                    {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="bg-background border-border">
                  <div className="flex flex-col gap-6 mt-8 p-4">
                    {navLinks.map(link => (
                      <a
                        key={link.href}
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-foreground/70 hover:text-primary transition-colors"
                      >
                        {link.label}
                      </a>
                    ))}
                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                      Book a Free Call
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 md:py-24">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 bg-primary/10 rounded-full blur-3xl -top-48 -left-48 opacity-50" />
          <div className="absolute w-96 h-96 bg-accent/10 rounded-full blur-3xl -bottom-48 -right-48 opacity-50" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground text-balance leading-tight mb-6">
                We build software that powers your business.
              </h1>
              <p className="text-lg text-foreground/70 mb-8 leading-relaxed">
                From websites to mobile apps and custom systems—SYSTMATIIX delivers fast, scalable solutions that drive real results.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
                  Get a Free Quote
                </Button>
                <Button size="lg" variant="outline" className="border-primary/50 hover:bg-primary/10 bg-transparent">
                  View Services
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="font-semibold text-primary mb-1">Fast Delivery</p>
                  <p className="text-foreground/60">Weeks, not months</p>
                </div>
                <div>
                  <p className="font-semibold text-primary mb-1">Scalable</p>
                  <p className="text-foreground/60">Built to grow</p>
                </div>
                <div>
                  <p className="font-semibold text-primary mb-1">Premium UX</p>
                  <p className="text-foreground/60">User-focused design</p>
                </div>
              </div>
            </div>

            {/* Right side: Tech dashboard mock */}
            <div className="hidden md:block">
              <div className="relative">
                <div className="bg-gradient-to-br from-card to-secondary/50 rounded-2xl border border-primary/30 p-6 shadow-2xl">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-semibold text-foreground">Live Dashboard</h3>
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                    </div>
                    <div className="space-y-3">
                      <div className="h-2 bg-primary/20 rounded w-full" />
                      <div className="h-2 bg-primary/30 rounded w-4/5" />
                      <div className="h-2 bg-primary/20 rounded w-3/4" />
                    </div>
                    <div className="grid grid-cols-2 gap-3 pt-4 border-t border-border/50">
                      <div className="bg-primary/10 rounded p-3">
                        <p className="text-xs text-foreground/60 mb-1">Total Users</p>
                        <p className="text-2xl font-bold text-primary">12.5K</p>
                      </div>
                      <div className="bg-accent/10 rounded p-3">
                        <p className="text-xs text-foreground/60 mb-1">Active Sessions</p>
                        <p className="text-2xl font-bold text-accent">8,342</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <section className="py-12 border-t border-b border-border/50 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { label: 'Delivery in weeks', icon: '⚡' },
              { label: 'Modern tech stack', icon: '💻' },
              { label: 'Secure by design', icon: '🔒' },
              { label: 'Ongoing support', icon: '🛟' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl mb-2">{stat.icon}</div>
                <p className="text-foreground font-semibold">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Services</h2>
            <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
              Comprehensive solutions tailored to your business needs, from web development to custom systems.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, i) => {
              const Icon = service.icon
              return (
                <Card key={i} className="bg-card/50 border-border/50 hover:border-primary/50 hover:bg-card/80 transition-all p-6 group">
                  <Icon className="w-8 h-8 text-primary mb-4 group-hover:text-accent transition-colors" />
                  <h3 className="font-semibold text-lg text-foreground mb-2">{service.title}</h3>
                  <p className="text-sm text-foreground/60 mb-4">{service.description}</p>
                  <a href="#contact" className="text-primary hover:text-accent text-sm font-medium transition-colors">
                    Learn more →
                  </a>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section id="solutions" className="py-16 md:py-24 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Solutions for Every Business</h2>
            <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
              Proven use cases that drive real outcomes for businesses like yours.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/3">
              <div className="flex flex-col gap-3 sticky top-24">
                {solutions.map(sol => (
                  <button
                    key={sol.id}
                    onClick={() => setSelectedSolution(sol.id)}
                    className={`text-left p-4 rounded-lg transition-all ${
                      selectedSolution === sol.id
                        ? 'bg-primary/20 border border-primary/50'
                        : 'bg-card/50 border border-border/50 hover:border-primary/30'
                    }`}
                  >
                    <p className="font-semibold text-foreground">{sol.title}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="lg:w-2/3">
              {solutions.map(sol => (
                <div
                  key={sol.id}
                  className={`${selectedSolution === sol.id ? 'block' : 'hidden'} animate-in fade-in duration-300`}
                >
                  <Card className="bg-card/50 border-border/50 p-8">
                    <h3 className="text-2xl font-bold text-foreground mb-4">{sol.title}</h3>
                    <p className="text-foreground/70 mb-6">{sol.description}</p>
                    <div className="bg-primary/10 border border-primary/30 rounded-lg p-4 mb-6">
                      <p className="text-sm text-foreground/60 mb-1">Expected Outcome</p>
                      <p className="font-semibold text-foreground">{sol.outcome}</p>
                    </div>
                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                      Start Your Project
                    </Button>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Process</h2>
            <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
              A proven methodology that ensures quality, speed, and alignment with your goals.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, i) => (
              <div key={i} className="relative">
                <div className="bg-card/50 border border-border/50 rounded-lg p-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center mb-4">
                    <span className="font-bold text-xl text-primary-foreground">{step.num}</span>
                  </div>
                  <h3 className="font-bold text-lg text-foreground mb-3">{step.title}</h3>
                  <p className="text-sm text-foreground/60">{step.deliverables}</p>
                </div>
                {i < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/3 -right-3 w-6 h-0.5 bg-gradient-to-r from-primary to-transparent" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section id="work" className="py-16 md:py-24 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Featured Work</h2>
            <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
              Real projects, real results. Here's what we've built for our clients.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {caseStudies.map((study, i) => (
              <Card key={i} className="bg-card/50 border-border/50 p-6 flex flex-col">
                <div className="mb-4">
                  <p className="text-xs text-primary font-semibold uppercase tracking-wider mb-2">Project {i + 1}</p>
                  <p className="font-bold text-lg text-foreground mb-3">Goal</p>
                  <p className="text-foreground/70 text-sm mb-4">{study.goal}</p>
                </div>

                <div className="mb-4 pb-4 border-t border-border/50">
                  <p className="font-bold text-lg text-foreground mb-2">Solution</p>
                  <p className="text-foreground/70 text-sm">{study.solution}</p>
                </div>

                <div className="mt-auto pt-4 border-t border-border/50">
                  <p className="font-bold text-lg text-primary mb-2">Results</p>
                  <p className="text-foreground/70 text-sm">{study.results}</p>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button variant="outline" className="border-primary/50 hover:bg-primary/10 text-primary bg-transparent">
              View all projects →
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {/* <section id="testimonials" className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">What Our Clients Say</h2>
            <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
              Trusted by businesses of all sizes. Here's what they have to say.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, i) => (
              <Card key={i} className="bg-card/50 border-border/50 p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-foreground/70 mb-6 leading-relaxed italic">"{testimonial.text}"</p>
                <div className="pt-6 border-t border-border/50">
                  <p className="font-semibold text-foreground">{testimonial.author}</p>
                  <p className="text-sm text-foreground/60">{testimonial.company}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section> */}

      {/* Pricing Section */}
      {/* <section id="pricing" className="py-16 md:py-24 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Transparent Pricing</h2>
            <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
              Flexible plans that scale with your business. All prices are starting points—we customize based on your needs.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 items-stretch">
            {pricingTiers.map((tier, i) => (
              <Card
                key={i}
                className={`p-8 flex flex-col transition-all ${
                  tier.highlighted
                    ? 'bg-gradient-to-br from-primary/20 to-accent/10 border-primary/50 md:scale-105'
                    : 'bg-card/50 border-border/50'
                }`}
              >
                <h3 className="text-xl font-bold text-foreground mb-2">{tier.name}</h3>
                <p className="text-sm text-foreground/60 mb-4">{tier.description}</p>

                <div className="mb-6">
                  <p className="text-xs text-foreground/60 uppercase tracking-wider mb-1">Starting from</p>
                  <p className="text-3xl font-bold text-primary">{tier.startingFrom}</p>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {tier.includes.map((feature, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground/70">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full ${
                    tier.highlighted ? 'bg-primary hover:bg-primary/90 text-primary-foreground' : 'bg-card border border-primary/50 text-foreground hover:bg-primary/10'
                  }`}
                >
                  Request Pricing
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section> */}

      {/* FAQ Section */}
      <section id="faq" className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-foreground/60">
              Everything you need to know about working with us.
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border border-border/50 rounded-lg px-6 data-[state=open]:bg-card/50">
                <AccordionTrigger className="hover:no-underline text-foreground py-4">
                  <span className="text-left text-base font-semibold">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-foreground/70 pb-4">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="py-16 md:py-24 bg-card/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Let's Build Something Great</h2>
            <p className="text-lg text-foreground/60">
              Share your project details and we'll get back to you within 24 hours.
            </p>
          </div>

          <Card className="bg-card/50 border-border/50 p-8">
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Name</label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    placeholder="Your name"
                    className="bg-background border-border/50 text-foreground"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    placeholder="you@company.com"
                    className="bg-background border-border/50 text-foreground"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Company</label>
                  <Input
                    name="company"
                    value={formData.company}
                    onChange={handleFormChange}
                    placeholder="Your company"
                    className="bg-background border-border/50 text-foreground"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Budget</label>
                  <Select value={formData.budget} onValueChange={handleBudgetChange}>
                    <SelectTrigger className="bg-background border-border/50 text-foreground">
                      <SelectValue placeholder="Select budget range" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border">
                      <SelectItem value="under-5k">Under $5,000</SelectItem>
                      <SelectItem value="5k-15k">$5,000 - $15,000</SelectItem>
                      <SelectItem value="15k-50k">$15,000 - $50,000</SelectItem>
                      <SelectItem value="50k-plus">$50,000+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Project Details</label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleFormChange}
                  placeholder="Tell us about your project, goals, and timeline..."
                  className="bg-background border-border/50 text-foreground resize-none"
                  rows={5}
                />
              </div>

              {formStatus === 'success' && (
                <p className="text-sm text-green-600 dark:text-green-400 font-medium">
                  Message sent! We&apos;ll get back to you within 24 hours.
                </p>
              )}
              {formStatus === 'error' && (
                <p className="text-sm text-red-600 dark:text-red-400 font-medium">
                  Something went wrong. Please try again or email us directly.
                </p>
              )}
              <Button
                type="submit"
                disabled={formStatus === 'sending'}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground disabled:opacity-70"
              >
                {formStatus === 'sending' ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </Card>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="text-center">
              <p className="text-foreground/60 text-sm mb-1">Email</p>
              <p className="font-semibold text-foreground">eslamsemedo@gmail.com</p>
            </div>
            <div className="text-center">
              <p className="text-foreground/60 text-sm mb-1">WhatsApp</p>
              <p className="font-semibold text-foreground">01015189828</p>
            </div>
            <div className="text-center">
              <p className="text-foreground/60 text-sm mb-1">Location</p>
              <p className="font-semibold text-foreground">Egypt, Hurghdara</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-card/30 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <span className="text-xs font-bold text-primary-foreground">SYS</span>
                </div>
                <span className="font-bold">SYSTMATIIX</span>
              </div>
              <p className="text-sm text-foreground/60">Building software that powers business.</p>
            </div>
            <div>
              <p className="font-semibold text-foreground mb-4 text-sm">Services</p>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-foreground/60 hover:text-primary transition">Web Development</a></li>
                <li><a href="#" className="text-foreground/60 hover:text-primary transition">Mobile Apps</a></li>
                <li><a href="#" className="text-foreground/60 hover:text-primary transition">Custom Systems</a></li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-foreground mb-4 text-sm">Company</p>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-foreground/60 hover:text-primary transition">About</a></li>
                <li><a href="#" className="text-foreground/60 hover:text-primary transition">Portfolio</a></li>
                <li><a href="#" className="text-foreground/60 hover:text-primary transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-foreground mb-4 text-sm">Follow Us</p>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-foreground/60 hover:text-primary transition">Twitter</a></li>
                <li><a href="#" className="text-foreground/60 hover:text-primary transition">LinkedIn</a></li>
                <li><a href="#" className="text-foreground/60 hover:text-primary transition">GitHub</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border/50 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
              <p className="text-foreground/60">© 2024 SYSTMATIIX. All rights reserved.</p>
              <div className="flex gap-6 text-foreground/60">
                <a href="#" className="hover:text-primary transition">Privacy Policy</a>
                <a href="#" className="hover:text-primary transition">Terms of Service</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
