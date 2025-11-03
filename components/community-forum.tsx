"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MessageCircle, ThumbsUp, Eye, Search } from "lucide-react"

interface Post {
  id: string
  title: string
  author: string
  category: string
  replies: number
  views: number
  likes: number
  lastActive: string
  preview: string
}

const posts: Post[] = [
  {
    id: "1",
    title: "Best Strategies for Accelerating Loan Payoff",
    author: "Dr. James Chen",
    category: "Financing",
    replies: 23,
    views: 1247,
    likes: 87,
    lastActive: "2 hours ago",
    preview:
      "I've been exploring different strategies to accelerate my loan payoff while maintaining cash flow. Here's what I've learned so far...",
  },
  {
    id: "2",
    title: "Investing 101: Understanding Risk & Returns",
    author: "Michael Torres",
    category: "Investing",
    replies: 45,
    views: 3421,
    likes: 156,
    lastActive: "5 hours ago",
    preview:
      "A comprehensive guide for new investors looking to understand the fundamentals of risk assessment and portfolio diversification...",
  },
  {
    id: "3",
    title: "Tax Optimization for Physicians",
    author: "Dr. Sarah Anderson",
    category: "Wealth Planning",
    replies: 18,
    views: 892,
    likes: 64,
    lastActive: "1 day ago",
    preview:
      "Let's discuss effective tax strategies and deductions specifically designed for healthcare professionals...",
  },
  {
    id: "4",
    title: "Career Transition: Solo Practice vs. Group",
    author: "Dr. Robert Kim",
    category: "Career",
    replies: 34,
    views: 2156,
    likes: 102,
    lastActive: "3 days ago",
    preview: "Weighing the pros and cons of starting a solo practice versus joining an established group practice...",
  },
]

const categories = [
  { name: "All", color: "bg-primary" },
  { name: "Financing", color: "bg-blue-500" },
  { name: "Investing", color: "bg-green-500" },
  { name: "Career", color: "bg-purple-500" },
  { name: "Wealth Planning", color: "bg-orange-500" },
]

export default function CommunityForum() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredPosts = posts.filter(
    (post) =>
      (selectedCategory === "All" || post.category === selectedCategory) &&
      (post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.author.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-2">Community Forum</h2>
          <p className="text-muted-foreground">Join {posts.length * 100} active discussions with your peers</p>
        </div>
        <Button className="gap-2">
          <MessageCircle className="h-4 w-4" />
          Start Discussion
        </Button>
      </div>

      {/* Search & Filter */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg bg-secondary/30">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search discussions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-transparent outline-none text-sm"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setSelectedCategory(cat.name)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition whitespace-nowrap ${
                selectedCategory === cat.name
                  ? `${cat.color} text-white`
                  : "border border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Posts */}
      <div className="space-y-3">
        {filteredPosts.map((post) => (
          <Card key={post.id} className="p-6 hover:border-primary transition cursor-pointer">
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold hover:text-primary transition">{post.title}</h3>
                  <Badge variant="outline" className="ml-2">
                    {post.category}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{post.preview}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">by {post.author}</span>
                  <span>{post.lastActive}</span>
                </div>
              </div>

              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="text-center">
                  <div className="text-lg font-bold text-foreground">{post.replies}</div>
                  <div className="text-xs">Replies</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center gap-1 text-lg font-bold text-foreground">
                    <Eye className="h-4 w-4" />
                    {post.views}
                  </div>
                  <div className="text-xs">Views</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center gap-1 text-lg font-bold text-foreground">
                    <ThumbsUp className="h-4 w-4" />
                    {post.likes}
                  </div>
                  <div className="text-xs">Likes</div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
