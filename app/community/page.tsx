"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronLeft, Users, BookOpen, TrendingUp, MessageCircle, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import CommunityForum from "@/components/community-forum"
import EducationHub from "@/components/education-hub"
import WealthTools from "@/components/wealth-tools"
import { Logo } from "@/components/logo"

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "forum" | "education" | "tools">("overview")

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/physician" className="flex items-center gap-2 hover:opacity-80 transition">
            <ChevronLeft className="h-5 w-5" />
            <span className="text-sm font-medium">Back to Dashboard</span>
          </Link>
          <Logo showText={true} text="Community & Resources" />
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        {activeTab === "overview" && (
          <>
            <div className="mb-12">
              <h1 className="text-4xl font-bold mb-4">Platform Hub & Community</h1>
              <p className="text-xl text-muted-foreground max-w-2xl">
                Access our exclusive community of physicians and investors, plus tools for wealth building and financial
                planning
              </p>
            </div>

            {/* Feature Cards */}
            <div className="grid md:grid-cols-4 gap-4 mb-12">
              {[
                {
                  icon: Users,
                  title: "Active Members",
                  value: "2,847",
                  description: "Physicians & investors",
                },
                {
                  icon: MessageCircle,
                  title: "Forum Posts",
                  value: "12.4k",
                  description: "Discussions & insights",
                },
                {
                  icon: BookOpen,
                  title: "Resources",
                  value: "340+",
                  description: "Guides & courses",
                },
                {
                  icon: Award,
                  title: "Success Stories",
                  value: "98%",
                  description: "Satisfaction rate",
                },
              ].map((item, idx) => (
                <Card key={idx} className="p-6 text-center">
                  <item.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                  <p className="text-2xl font-bold mb-1">{item.value}</p>
                  <p className="text-sm font-medium text-muted-foreground mb-1">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                </Card>
              ))}
            </div>

            {/* Hub Sections */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <Card
                className="p-8 hover:border-primary transition cursor-pointer"
                onClick={() => setActiveTab("forum")}
              >
                <MessageCircle className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Community Forum</h3>
                <p className="text-muted-foreground mb-6 text-sm">
                  Connect with peers, share experiences, and get advice from experienced physicians and investors
                </p>
                <Button variant="outline" className="w-full gap-2 bg-transparent">
                  Explore <ChevronLeft className="h-4 w-4 rotate-180" />
                </Button>
              </Card>

              <Card
                className="p-8 hover:border-primary transition cursor-pointer"
                onClick={() => setActiveTab("education")}
              >
                <BookOpen className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Education Hub</h3>
                <p className="text-muted-foreground mb-6 text-sm">
                  Learn about physician financing, investment strategies, and wealth building through curated content
                </p>
                <Button variant="outline" className="w-full gap-2 bg-transparent">
                  Browse <ChevronLeft className="h-4 w-4 rotate-180" />
                </Button>
              </Card>

              <Card
                className="p-8 hover:border-primary transition cursor-pointer"
                onClick={() => setActiveTab("tools")}
              >
                <TrendingUp className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Wealth Tools</h3>
                <p className="text-muted-foreground mb-6 text-sm">
                  Access calculators, planning tools, and resources to optimize your financial future
                </p>
                <Button variant="outline" className="w-full gap-2 bg-transparent">
                  Access <ChevronLeft className="h-4 w-4 rotate-180" />
                </Button>
              </Card>
            </div>
          </>
        )}

        {/* Tabs */}
        {activeTab !== "overview" && (
          <div className="flex gap-2 mb-8 border-b border-border pb-4">
            {(["overview", "forum", "education", "tools"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 font-medium text-sm border-b-2 transition -mb-4 pb-4 ${
                  activeTab === tab
                    ? "border-primary text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab === "overview" && "Overview"}
                {tab === "forum" && "Community Forum"}
                {tab === "education" && "Education Hub"}
                {tab === "tools" && "Wealth Tools"}
              </button>
            ))}
          </div>
        )}

        {/* Tab Content */}
        {activeTab === "forum" && <CommunityForum />}
        {activeTab === "education" && <EducationHub />}
        {activeTab === "tools" && <WealthTools />}
      </div>
    </main>
  )
}
