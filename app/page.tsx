"use client"

import Link from "next/link"
import { ArrowRight, TrendingUp, Users, Lock, X, Mail, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Logo } from "@/components/logo"
import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"

export default function LandingPage() {
  const [activeRole, setActiveRole] = useState<"physician" | "investor">("physician")
  const [showPrivacy, setShowPrivacy] = useState(false)
  const [showTerms, setShowTerms] = useState(false)
  const [showContact, setShowContact] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setIsLoggedIn(!!user)
    }
    checkAuth()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsLoggedIn(!!session?.user)
    })

    return () => subscription.unsubscribe()
  }, [supabase.auth])

  return (
    <main className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2 sm:gap-4">
          <div className="flex-shrink-0">
            <Logo size="sm" className="sm:hidden" />
            <Logo size="md" className="hidden sm:block" />
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition">
              How It Works
            </a>
            <a href="#market" className="text-sm text-muted-foreground hover:text-foreground transition">
              Why Now
            </a>
            <Link href={isLoggedIn ? "/dashboard" : "/auth"}>
              <Button variant="outline" size="sm">
                {isLoggedIn ? "Dashboard" : "Sign In"}
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <div className="mb-6 inline-block px-4 py-2 bg-secondary/50 rounded-full border border-border">
            <p className="text-sm font-medium text-foreground">Filling the physician funding gap</p>
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight mb-6 text-balance">
            Innovative Funding for the <span className="text-primary">Next Generation</span> of Physicians
          </h1>
          <p className="text-xl text-muted-foreground mb-8 text-balance max-w-2xl mx-auto">
            White Coat Capital unlocks the future earnings of physicians to fill critical funding gaps, accelerate
            wealth-building, and generate attractive returns for investors.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/physician">
              <Button size="lg" className="w-full sm:w-auto">
                For Physicians <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/investor">
              <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
                For Investors <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Problem & Solution */}
      <section id="market" className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-4">The Problem</h2>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-xs font-bold text-primary">1</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Archaic Underwriting</h3>
                    <p className="text-muted-foreground text-sm">
                      Current offerings ignore future earnings potential and physician-specific needs
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-xs font-bold text-primary">2</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Wealth Delayed</h3>
                    <p className="text-muted-foreground text-sm">
                      Medical school debt and residency pay of ~$70k punish physicians pursuing medicine
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-xs font-bold text-primary">3</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Projected Shortage</h3>
                    <p className="text-muted-foreground text-sm">
                      U.S. faces physician shortfall of 13,500 to 86,000 by 2036
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-4">Our Solution</h2>
              <div className="space-y-4">
                <Card className="p-4 border-l-4 border-l-primary bg-primary/5">
                  <div className="flex gap-3">
                    <Users className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold mb-1">Doctor-First Financing</h3>
                      <p className="text-sm text-muted-foreground">
                        Tailored structures for every stage of physician career
                      </p>
                    </div>
                  </div>
                </Card>
                <Card className="p-4 border-l-4 border-l-primary bg-primary/5">
                  <div className="flex gap-3">
                    <TrendingUp className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold mb-1">Uncorrelated Returns</h3>
                      <p className="text-sm text-muted-foreground">12%+ IRR, 2.00x+ MOIC, non-cyclical asset class</p>
                    </div>
                  </div>
                </Card>
                <Card className="p-4 border-l-4 border-l-primary bg-primary/5">
                  <div className="flex gap-3">
                    <Lock className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold mb-1">Compliant & Mission-Driven</h3>
                      <p className="text-sm text-muted-foreground">Regulatory compliance built in from the start</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Two paths to transform physician careers and investor portfolios
            </p>
          </div>

          {/* Role Selector */}
          <div className="flex justify-center gap-4 mb-12">
            <button
              onClick={() => setActiveRole("physician")}
              className={`px-6 py-3 rounded-lg font-semibold transition ${
                activeRole === "physician"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-foreground border border-border"
              }`}
            >
              For Physicians
            </button>
            <button
              onClick={() => setActiveRole("investor")}
              className={`px-6 py-3 rounded-lg font-semibold transition ${
                activeRole === "investor"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-foreground border border-border"
              }`}
            >
              For Investors
            </button>
          </div>

          {/* Physician Flow */}
          {activeRole === "physician" && (
            <div className="grid md:grid-cols-4 gap-4">
              {[
                {
                  step: "1",
                  title: "Complete WCC Fit",
                  description: "5-minute questionnaire to understand your needs",
                },
                {
                  step: "2",
                  title: "Receive Proposals",
                  description: "3 tailored funding proposals that pass our Better-Off Test",
                },
                {
                  step: "3",
                  title: "Select & Fund",
                  description: "Choose your ideal structure and unlock up to $300k",
                },
                {
                  step: "4",
                  title: "Access Platform",
                  description: "Lifetime alumni access to community and wealth services",
                },
              ].map((item) => (
                <Card key={item.step} className="p-6 text-center">
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </Card>
              ))}
            </div>
          )}

          {/* Investor Flow */}
          {activeRole === "investor" && (
            <div className="grid md:grid-cols-4 gap-4">
              {[
                {
                  step: "1",
                  title: "Complete Fit Assessment",
                  description: "5-minute questionnaire to match your goals",
                },
                {
                  step: "2",
                  title: "Design Portfolio",
                  description: "Optimize for returns, diversification, and impact",
                },
                {
                  step: "3",
                  title: "Deploy Capital",
                  description: "Fund structured agreements with uncorrelated returns",
                },
                {
                  step: "4",
                  title: "Track & Reinvest",
                  description: "Real-time dashboards with quarterly distributions",
                },
              ].map((item) => (
                <Card key={item.step} className="p-6 text-center">
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Market Size */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary text-primary-foreground">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Massive Market Opportunity</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { label: "Total Addressable Market", value: "$37B+" },
              { label: "Serviceable Market", value: "$9B" },
              { label: "Initial Target", value: "$200M-$300M" },
              { label: "Target Physicians (5yr)", value: "5,000+" },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <div className="text-4xl font-bold mb-2">{item.value}</div>
                <p className="text-primary-foreground/80">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center bg-secondary/50 p-12 rounded-xl border border-border">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-muted-foreground mb-8">Join physicians and investors transforming healthcare financing</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/physician">
              <Button size="lg" className="w-full sm:w-auto">
                I'm a Physician
              </Button>
            </Link>
            <Link href="/investor">
              <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
                I'm an Investor
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-sm text-muted-foreground">
          <div>© 2025 White Coat Capital. All rights reserved.</div>
          <div className="flex gap-6">
            <button onClick={() => setShowPrivacy(true)} className="hover:text-foreground transition">
              Privacy
            </button>
            <button onClick={() => setShowTerms(true)} className="hover:text-foreground transition">
              Terms
            </button>
            <button onClick={() => setShowContact(true)} className="hover:text-foreground transition">
              Contact
            </button>
          </div>
        </div>
      </footer>

      {/* Privacy Modal */}
      {showPrivacy && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl p-6 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Privacy Policy</h3>
              <button onClick={() => setShowPrivacy(false)} className="text-muted-foreground hover:text-foreground">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <p className="text-muted-foreground mb-4">Last updated: January 2025</p>

              <h4 className="font-semibold mt-6 mb-2">Information We Collect</h4>
              <p className="text-muted-foreground mb-4">
                We collect information you provide directly, including name, email, financial information for loan applications,
                and any other information you choose to provide.
              </p>

              <h4 className="font-semibold mt-6 mb-2">How We Use Your Information</h4>
              <p className="text-muted-foreground mb-4">
                We use collected information to provide our services, process applications, communicate with you,
                and improve our platform.
              </p>

              <h4 className="font-semibold mt-6 mb-2">Data Security</h4>
              <p className="text-muted-foreground mb-4">
                We implement industry-standard security measures to protect your personal information,
                including encryption and secure data storage.
              </p>

              <h4 className="font-semibold mt-6 mb-2">Your Rights</h4>
              <p className="text-muted-foreground mb-4">
                You have the right to access, correct, or delete your personal information.
                Contact us at privacy@whitecoatcapital.com for any privacy-related requests.
              </p>
            </div>
            <Button className="w-full mt-6" onClick={() => setShowPrivacy(false)}>Close</Button>
          </Card>
        </div>
      )}

      {/* Terms Modal */}
      {showTerms && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl p-6 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Terms of Service</h3>
              <button onClick={() => setShowTerms(false)} className="text-muted-foreground hover:text-foreground">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <p className="text-muted-foreground mb-4">Last updated: January 2025</p>

              <h4 className="font-semibold mt-6 mb-2">Acceptance of Terms</h4>
              <p className="text-muted-foreground mb-4">
                By accessing or using White Coat Capital's services, you agree to be bound by these Terms of Service
                and all applicable laws and regulations.
              </p>

              <h4 className="font-semibold mt-6 mb-2">Use of Services</h4>
              <p className="text-muted-foreground mb-4">
                Our services are intended for physicians and accredited investors. You must provide accurate information
                and maintain the confidentiality of your account credentials.
              </p>

              <h4 className="font-semibold mt-6 mb-2">Financial Disclosures</h4>
              <p className="text-muted-foreground mb-4">
                All investment opportunities carry risk. Past performance does not guarantee future results.
                Please review all offering documents carefully before investing.
              </p>

              <h4 className="font-semibold mt-6 mb-2">Limitation of Liability</h4>
              <p className="text-muted-foreground mb-4">
                White Coat Capital shall not be liable for any indirect, incidental, special, or consequential damages
                arising from the use of our services.
              </p>
            </div>
            <Button className="w-full mt-6" onClick={() => setShowTerms(false)}>Close</Button>
          </Card>
        </div>
      )}

      {/* Contact Modal */}
      {showContact && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Contact Us</h3>
              <button onClick={() => setShowContact(false)} className="text-muted-foreground hover:text-foreground">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
                <Mail className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-sm text-muted-foreground">info@whitecoatcapital.com</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
                <Phone className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Phone</p>
                  <p className="text-sm text-muted-foreground">1-800-WCC-FUND</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
                <MapPin className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Address</p>
                  <p className="text-sm text-muted-foreground">123 Financial District, NY 10004</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Your Email</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  placeholder="How can we help you?"
                  rows={3}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background resize-none"
                />
              </div>
              <Button className="w-full" onClick={() => setShowContact(false)}>Send Message</Button>
            </div>
          </Card>
        </div>
      )}
    </main>
  )
}
