"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MessageCircle, ThumbsUp, Eye, Search, X, CheckCircle2, Send } from "lucide-react"

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

const initialPosts: Post[] = [
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
  const [posts, setPosts] = useState<Post[]>(initialPosts)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showPostModal, setShowPostModal] = useState<Post | null>(null)
  const [newPostTitle, setNewPostTitle] = useState("")
  const [newPostContent, setNewPostContent] = useState("")
  const [newPostCategory, setNewPostCategory] = useState("Financing")
  const [postCreated, setPostCreated] = useState(false)
  const [likedPosts, setLikedPosts] = useState<string[]>([])
  const [replyText, setReplyText] = useState("")

  const filteredPosts = posts.filter(
    (post) =>
      (selectedCategory === "All" || post.category === selectedCategory) &&
      (post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.author.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const handleCreatePost = () => {
    if (newPostTitle.trim() && newPostContent.trim()) {
      const newPost: Post = {
        id: Date.now().toString(),
        title: newPostTitle,
        author: "You",
        category: newPostCategory,
        replies: 0,
        views: 1,
        likes: 0,
        lastActive: "Just now",
        preview: newPostContent.slice(0, 150) + (newPostContent.length > 150 ? "..." : ""),
      }
      setPosts([newPost, ...posts])
      setPostCreated(true)
      setTimeout(() => {
        setShowCreateModal(false)
        setNewPostTitle("")
        setNewPostContent("")
        setNewPostCategory("Financing")
        setPostCreated(false)
      }, 2000)
    }
  }

  const handleLikePost = (postId: string) => {
    if (likedPosts.includes(postId)) {
      setLikedPosts(likedPosts.filter((id) => id !== postId))
      setPosts(posts.map((p) => (p.id === postId ? { ...p, likes: p.likes - 1 } : p)))
    } else {
      setLikedPosts([...likedPosts, postId])
      setPosts(posts.map((p) => (p.id === postId ? { ...p, likes: p.likes + 1 } : p)))
    }
  }

  const handleReply = () => {
    if (replyText.trim() && showPostModal) {
      setPosts(posts.map((p) => (p.id === showPostModal.id ? { ...p, replies: p.replies + 1 } : p)))
      setReplyText("")
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-2">Community Forum</h2>
          <p className="text-muted-foreground">Join {posts.length * 100} active discussions with your peers</p>
        </div>
        <Button className="gap-2" onClick={() => setShowCreateModal(true)}>
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
          <Card
            key={post.id}
            className="p-6 hover:border-primary transition cursor-pointer"
            onClick={() => {
              setPosts(posts.map((p) => (p.id === post.id ? { ...p, views: p.views + 1 } : p)))
              setShowPostModal(post)
            }}
          >
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

      {/* Create Discussion Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Start a Discussion</h3>
              <button
                onClick={() => {
                  setShowCreateModal(false)
                  setNewPostTitle("")
                  setNewPostContent("")
                  setPostCreated(false)
                }}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {postCreated ? (
              <div className="text-center py-8">
                <CheckCircle2 className="h-12 w-12 text-primary mx-auto mb-4" />
                <h4 className="text-lg font-semibold mb-2">Discussion Created!</h4>
                <p className="text-muted-foreground">Your post is now live in the community.</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Title</label>
                  <input
                    type="text"
                    value={newPostTitle}
                    onChange={(e) => setNewPostTitle(e.target.value)}
                    placeholder="What would you like to discuss?"
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <select
                    value={newPostCategory}
                    onChange={(e) => setNewPostCategory(e.target.value)}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                  >
                    {categories.filter((c) => c.name !== "All").map((cat) => (
                      <option key={cat.name} value={cat.name}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Content</label>
                  <textarea
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    placeholder="Share your thoughts, questions, or experiences..."
                    rows={5}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background resize-none"
                  />
                </div>

                <Button
                  className="w-full"
                  onClick={handleCreatePost}
                  disabled={!newPostTitle.trim() || !newPostContent.trim()}
                >
                  Post Discussion
                </Button>
              </div>
            )}
          </Card>
        </div>
      )}

      {/* View Post Modal */}
      {showPostModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl p-6 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <Badge variant="outline">{showPostModal.category}</Badge>
              <button
                onClick={() => setShowPostModal(null)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <h3 className="text-2xl font-bold mb-4">{showPostModal.title}</h3>

            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
              <span className="font-medium text-foreground">by {showPostModal.author}</span>
              <span>{showPostModal.lastActive}</span>
            </div>

            <p className="text-muted-foreground mb-6">{showPostModal.preview}</p>

            <div className="flex items-center gap-4 mb-6">
              <Button
                variant={likedPosts.includes(showPostModal.id) ? "default" : "outline"}
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  handleLikePost(showPostModal.id)
                }}
                className="gap-2"
              >
                <ThumbsUp className="h-4 w-4" />
                {posts.find((p) => p.id === showPostModal.id)?.likes || showPostModal.likes}
              </Button>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Eye className="h-4 w-4" />
                {posts.find((p) => p.id === showPostModal.id)?.views || showPostModal.views} views
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MessageCircle className="h-4 w-4" />
                {posts.find((p) => p.id === showPostModal.id)?.replies || showPostModal.replies} replies
              </div>
            </div>

            <div className="border-t border-border pt-6">
              <h4 className="font-semibold mb-4">Add a Reply</h4>
              <div className="flex gap-2">
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Share your thoughts..."
                  rows={2}
                  className="flex-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background resize-none"
                />
                <Button onClick={handleReply} disabled={!replyText.trim()} className="self-end">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
