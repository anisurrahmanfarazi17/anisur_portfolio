import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Edit2, Trash2, Save, X, Search, Download, BarChart3, MessageSquare, TrendingUp, FileText, Briefcase, Code2, CheckCircle2 } from "lucide-react";
import { useState, useMemo } from "react";
import { useLocation } from "wouter";

interface Article {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: string;
  link: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  date: string;
}

interface Skill {
  id: string;
  name: string;
  category: "technical" | "creative" | "professional";
  level: number;
}

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  read: boolean;
}

export default function Admin() {
  const { user, isAuthenticated } = useAuth();
  const [, navigate] = useLocation();
  const [activeTab, setActiveTab] = useState<"dashboard" | "articles" | "projects" | "skills" | "messages" | "analytics">("dashboard");
  
  // Search and filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());

  // Articles state
  const [articles, setArticles] = useState<Article[]>([
    {
      id: "1",
      title: "From Magic to Logic: A First Year Student's Journey with C",
      excerpt: "Exploring my journey learning C programming and the fundamentals of computer science as a first-year student.",
      date: "2024",
      category: "Programming",
      readTime: "10 min read",
      link: "https://medium.com/@anisurrahmanfarazi17/from-magic-to-logic-a-first-year-students-journey-with-c-8f2157d876a1",
    },
  ]);

  // Projects state
  const [projects, setProjects] = useState<Project[]>([
    {
      id: "1",
      title: "Beyond the Code: Article Writing Contest 2026",
      description: "Organized and managed a university-wide article writing competition, creating topics, rules, and promotional materials.",
      tags: ["Event Organization", "Content Creation", "Community Building"],
      date: "February 2026",
    },
  ]);

  // Skills state
  const [skills, setSkills] = useState<Skill[]>([
    { id: "1", name: "C Programming", category: "technical", level: 85 },
    { id: "2", name: "Competitive Programming", category: "technical", level: 80 },
    { id: "3", name: "Graphic Design", category: "creative", level: 90 },
    { id: "4", name: "Microsoft Office", category: "professional", level: 95 },
  ]);

  // Contact messages state
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      subject: "Portfolio Inquiry",
      message: "Great portfolio! I'd like to discuss a project opportunity.",
      date: "2 hours ago",
      read: false,
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      subject: "Collaboration",
      message: "Your design work is impressive. Let's collaborate!",
      date: "1 day ago",
      read: true,
    },
  ]);

  // Edit states
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [newArticle, setNewArticle] = useState<Partial<Article>>({});
  const [newProject, setNewProject] = useState<Partial<Project>>({});
  const [newSkill, setNewSkill] = useState<Partial<Skill>>({});
  const [isAddingArticle, setIsAddingArticle] = useState(false);
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [isAddingSkill, setIsAddingSkill] = useState(false);

  // Redirect if not authenticated
  if (!isAuthenticated) {
    navigate("/");
    return null;
  }

  // Filter items based on search
  const filteredArticles = useMemo(() => {
    return articles.filter(a => 
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [articles, searchQuery]);

  const filteredProjects = useMemo(() => {
    return projects.filter(p => 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [projects, searchQuery]);

  const filteredMessages = useMemo(() => {
    return contactMessages.filter(m => 
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.subject.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [contactMessages, searchQuery]);

  // Dashboard stats
  const stats = {
    articles: articles.length,
    projects: projects.length,
    messages: contactMessages.length,
    unreadMessages: contactMessages.filter(m => !m.read).length,
    pageViews: 1247,
    totalSkills: skills.length,
  };

  // Article handlers
  const handleAddArticle = () => {
    if (newArticle.title && newArticle.excerpt) {
      const article: Article = {
        id: Date.now().toString(),
        title: newArticle.title || "",
        excerpt: newArticle.excerpt || "",
        date: newArticle.date || new Date().toLocaleDateString(),
        category: newArticle.category || "General",
        readTime: newArticle.readTime || "5 min read",
        link: newArticle.link || "#",
      };
      setArticles([...articles, article]);
      setNewArticle({});
      setIsAddingArticle(false);
    }
  };

  const handleUpdateArticle = (article: Article) => {
    setArticles(articles.map((a) => (a.id === article.id ? article : a)));
    setEditingArticle(null);
  };

  const handleDeleteArticle = (id: string) => {
    setArticles(articles.filter((a) => a.id !== id));
  };

  // Project handlers
  const handleAddProject = () => {
    if (newProject.title && newProject.description) {
      const project: Project = {
        id: Date.now().toString(),
        title: newProject.title || "",
        description: newProject.description || "",
        tags: newProject.tags || [],
        date: newProject.date || new Date().toLocaleDateString(),
      };
      setProjects([...projects, project]);
      setNewProject({});
      setIsAddingProject(false);
    }
  };

  const handleUpdateProject = (project: Project) => {
    setProjects(projects.map((p) => (p.id === project.id ? project : p)));
    setEditingProject(null);
  };

  const handleDeleteProject = (id: string) => {
    setProjects(projects.filter((p) => p.id !== id));
  };

  // Skill handlers
  const handleAddSkill = () => {
    if (newSkill.name && newSkill.category) {
      const skill: Skill = {
        id: Date.now().toString(),
        name: newSkill.name || "",
        category: newSkill.category as "technical" | "creative" | "professional",
        level: newSkill.level || 50,
      };
      setSkills([...skills, skill]);
      setNewSkill({});
      setIsAddingSkill(false);
    }
  };

  const handleUpdateSkill = (skill: Skill) => {
    setSkills(skills.map((s) => (s.id === skill.id ? skill : s)));
    setEditingSkill(null);
  };

  const handleDeleteSkill = (id: string) => {
    setSkills(skills.filter((s) => s.id !== id));
  };

  // Message handlers
  const handleMarkAsRead = (id: string) => {
    setContactMessages(contactMessages.map(m => 
      m.id === id ? { ...m, read: true } : m
    ));
  };

  const handleDeleteMessage = (id: string) => {
    setContactMessages(contactMessages.filter(m => m.id !== id));
  };

  // Export handlers
  const exportToJSON = (data: any, filename: string) => {
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
  };

  // Bulk delete
  const handleBulkDelete = (type: "articles" | "projects") => {
    if (type === "articles") {
      setArticles(articles.filter(a => !selectedItems.has(a.id)));
    } else {
      setProjects(projects.filter(p => !selectedItems.has(p.id)));
    }
    setSelectedItems(new Set());
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50">
        <div className="container max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-playfair font-bold text-accent">Admin Dashboard</div>
          <div className="flex gap-4 items-center">
            <span className="text-sm text-muted-foreground">Welcome, {user?.name}</span>
            <Button
              variant="outline"
              onClick={() => navigate("/")}
            >
              Back to Portfolio
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-24 pb-12">
        <div className="container max-w-7xl mx-auto px-4">
          {/* Tabs */}
          <div className="flex gap-2 mb-8 overflow-x-auto pb-4 border-b border-border">
            {[
              { id: "dashboard", label: "Dashboard", icon: BarChart3 },
              { id: "articles", label: "Articles", icon: FileText },
              { id: "projects", label: "Projects", icon: Briefcase },
              { id: "skills", label: "Skills", icon: Code2 },
              { id: "messages", label: "Messages", icon: MessageSquare },
              { id: "analytics", label: "Analytics", icon: TrendingUp },
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-2 font-semibold transition-colors flex items-center gap-2 whitespace-nowrap ${
                    activeTab === tab.id
                      ? "text-accent border-b-2 border-accent"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Dashboard Tab */}
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              <h2 className="text-3xl font-playfair font-bold">Dashboard Overview</h2>
              
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card className="bg-card border-border p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground text-sm">Total Articles</p>
                      <p className="text-3xl font-bold text-accent">{stats.articles}</p>
                    </div>
                    <FileText className="w-8 h-8 text-accent/50" />
                  </div>
                </Card>

                <Card className="bg-card border-border p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground text-sm">Total Projects</p>
                      <p className="text-3xl font-bold text-accent">{stats.projects}</p>
                    </div>
                    <Briefcase className="w-8 h-8 text-accent/50" />
                  </div>
                </Card>

                <Card className="bg-card border-border p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground text-sm">Total Skills</p>
                      <p className="text-3xl font-bold text-accent">{stats.totalSkills}</p>
                    </div>
                    <Code2 className="w-8 h-8 text-accent/50" />
                  </div>
                </Card>

                <Card className="bg-card border-border p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground text-sm">Contact Messages</p>
                      <p className="text-3xl font-bold text-accent">{stats.messages}</p>
                      <p className="text-xs text-muted-foreground mt-1">{stats.unreadMessages} unread</p>
                    </div>
                    <MessageSquare className="w-8 h-8 text-accent/50" />
                  </div>
                </Card>

                <Card className="bg-card border-border p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground text-sm">Page Views</p>
                      <p className="text-3xl font-bold text-accent">{stats.pageViews}</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-accent/50" />
                  </div>
                </Card>

                <Card className="bg-card border-border p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground text-sm">Profile Status</p>
                      <p className="text-3xl font-bold text-accent">100%</p>
                      <p className="text-xs text-muted-foreground mt-1">Complete</p>
                    </div>
                    <CheckCircle2 className="w-8 h-8 text-accent/50" />
                  </div>
                </Card>
              </div>

              {/* Quick Actions */}
              <Card className="bg-card border-border p-6">
                <h3 className="text-xl font-playfair font-bold mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                  <Button 
                    className="bg-accent text-accent-foreground hover:bg-accent/90"
                    onClick={() => { setActiveTab("articles"); setIsAddingArticle(true); }}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Article
                  </Button>
                  <Button 
                    className="bg-accent text-accent-foreground hover:bg-accent/90"
                    onClick={() => { setActiveTab("projects"); setIsAddingProject(true); }}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Project
                  </Button>
                  <Button 
                    className="bg-accent text-accent-foreground hover:bg-accent/90"
                    onClick={() => { setActiveTab("skills"); setIsAddingSkill(true); }}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Skill
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => setActiveTab("messages")}
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    View Messages
                  </Button>
                </div>
              </Card>
            </div>
          )}

          {/* Articles Tab */}
          {activeTab === "articles" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center gap-4">
                <h2 className="text-3xl font-playfair font-bold">Manage Articles</h2>
                <div className="flex gap-2">
                  {selectedItems.size > 0 && (
                    <Button 
                      variant="destructive"
                      onClick={() => handleBulkDelete("articles")}
                    >
                      Delete {selectedItems.size} items
                    </Button>
                  )}
                  <Button 
                    variant="outline"
                    onClick={() => exportToJSON(articles, "articles.json")}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                  <Dialog open={isAddingArticle} onOpenChange={setIsAddingArticle}>
                    <DialogTrigger asChild>
                      <Button className="bg-accent text-accent-foreground hover:bg-accent/90 flex items-center gap-2">
                        <Plus className="w-4 h-4" />
                        Add Article
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Add New Article</DialogTitle>
                        <DialogDescription>Create a new article for your portfolio</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-semibold">Title</label>
                          <Input
                            value={newArticle.title || ""}
                            onChange={(e) => setNewArticle({ ...newArticle, title: e.target.value })}
                            placeholder="Article title"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-semibold">Excerpt</label>
                          <Textarea
                            value={newArticle.excerpt || ""}
                            onChange={(e) => setNewArticle({ ...newArticle, excerpt: e.target.value })}
                            placeholder="Brief description"
                            rows={3}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-semibold">Category</label>
                            <Input
                              value={newArticle.category || ""}
                              onChange={(e) => setNewArticle({ ...newArticle, category: e.target.value })}
                              placeholder="e.g., Programming"
                            />
                          </div>
                          <div>
                            <label className="text-sm font-semibold">Read Time</label>
                            <Input
                              value={newArticle.readTime || ""}
                              onChange={(e) => setNewArticle({ ...newArticle, readTime: e.target.value })}
                              placeholder="e.g., 5 min read"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-semibold">Link</label>
                          <Input
                            value={newArticle.link || ""}
                            onChange={(e) => setNewArticle({ ...newArticle, link: e.target.value })}
                            placeholder="Article URL"
                          />
                        </div>
                        <div className="flex gap-2 justify-end pt-4">
                          <Button variant="outline" onClick={() => setIsAddingArticle(false)}>
                            Cancel
                          </Button>
                          <Button
                            className="bg-accent text-accent-foreground hover:bg-accent/90"
                            onClick={handleAddArticle}
                          >
                            Add Article
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Articles List */}
              <div className="space-y-4">
                {filteredArticles.map((article) => (
                  <Card key={article.id} className="bg-card border-border p-6">
                    {editingArticle?.id === article.id ? (
                      <div className="space-y-4">
                        <Input
                          value={editingArticle.title}
                          onChange={(e) => setEditingArticle({ ...editingArticle, title: e.target.value })}
                          placeholder="Title"
                        />
                        <Textarea
                          value={editingArticle.excerpt}
                          onChange={(e) => setEditingArticle({ ...editingArticle, excerpt: e.target.value })}
                          placeholder="Excerpt"
                          rows={3}
                        />
                        <div className="grid grid-cols-2 gap-4">
                          <Input
                            value={editingArticle.category}
                            onChange={(e) => setEditingArticle({ ...editingArticle, category: e.target.value })}
                            placeholder="Category"
                          />
                          <Input
                            value={editingArticle.readTime}
                            onChange={(e) => setEditingArticle({ ...editingArticle, readTime: e.target.value })}
                            placeholder="Read time"
                          />
                        </div>
                        <Input
                          value={editingArticle.link}
                          onChange={(e) => setEditingArticle({ ...editingArticle, link: e.target.value })}
                          placeholder="Link"
                        />
                        <div className="flex gap-2 justify-end">
                          <Button variant="outline" onClick={() => setEditingArticle(null)}>
                            Cancel
                          </Button>
                          <Button
                            className="bg-accent text-accent-foreground hover:bg-accent/90 flex items-center gap-2"
                            onClick={() => handleUpdateArticle(editingArticle)}
                          >
                            <Save className="w-4 h-4" />
                            Save
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex gap-3 flex-1">
                          <input
                            type="checkbox"
                            checked={selectedItems.has(article.id)}
                            onChange={(e) => {
                              const newSelected = new Set(selectedItems);
                              if (e.target.checked) {
                                newSelected.add(article.id);
                              } else {
                                newSelected.delete(article.id);
                              }
                              setSelectedItems(newSelected);
                            }}
                            className="mt-1"
                          />
                          <div className="flex-1">
                            <h3 className="text-xl font-playfair font-bold mb-2">{article.title}</h3>
                            <p className="text-muted-foreground text-sm mb-3">{article.excerpt}</p>
                            <div className="flex gap-4 text-xs text-muted-foreground">
                              <span>{article.category}</span>
                              <span>{article.date}</span>
                              <span>{article.readTime}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setEditingArticle(article)}
                          >
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteArticle(article.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </Card>
                ))}
                {filteredArticles.length === 0 && (
                  <Card className="bg-card border-border p-6 text-center">
                    <p className="text-muted-foreground">No articles found</p>
                  </Card>
                )}
              </div>
            </div>
          )}

          {/* Projects Tab */}
          {activeTab === "projects" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center gap-4">
                <h2 className="text-3xl font-playfair font-bold">Manage Projects</h2>
                <div className="flex gap-2">
                  {selectedItems.size > 0 && (
                    <Button 
                      variant="destructive"
                      onClick={() => handleBulkDelete("projects")}
                    >
                      Delete {selectedItems.size} items
                    </Button>
                  )}
                  <Button 
                    variant="outline"
                    onClick={() => exportToJSON(projects, "projects.json")}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                  <Dialog open={isAddingProject} onOpenChange={setIsAddingProject}>
                    <DialogTrigger asChild>
                      <Button className="bg-accent text-accent-foreground hover:bg-accent/90 flex items-center gap-2">
                        <Plus className="w-4 h-4" />
                        Add Project
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Add New Project</DialogTitle>
                        <DialogDescription>Create a new project for your portfolio</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-semibold">Title</label>
                          <Input
                            value={newProject.title || ""}
                            onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                            placeholder="Project title"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-semibold">Description</label>
                          <Textarea
                            value={newProject.description || ""}
                            onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                            placeholder="Project description"
                            rows={4}
                          />
                        </div>
                        <div>
                          <label className="text-sm font-semibold">Tags (comma-separated)</label>
                          <Input
                            value={(newProject.tags || []).join(", ")}
                            onChange={(e) => setNewProject({ ...newProject, tags: e.target.value.split(",").map(t => t.trim()) })}
                            placeholder="e.g., React, Design, Web"
                          />
                        </div>
                        <div className="flex gap-2 justify-end pt-4">
                          <Button variant="outline" onClick={() => setIsAddingProject(false)}>
                            Cancel
                          </Button>
                          <Button
                            className="bg-accent text-accent-foreground hover:bg-accent/90"
                            onClick={handleAddProject}
                          >
                            Add Project
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Projects List */}
              <div className="space-y-4">
                {filteredProjects.map((project) => (
                  <Card key={project.id} className="bg-card border-border p-6">
                    {editingProject?.id === project.id ? (
                      <div className="space-y-4">
                        <Input
                          value={editingProject.title}
                          onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                          placeholder="Title"
                        />
                        <Textarea
                          value={editingProject.description}
                          onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                          placeholder="Description"
                          rows={4}
                        />
                        <Input
                          value={editingProject.tags.join(", ")}
                          onChange={(e) => setEditingProject({ ...editingProject, tags: e.target.value.split(",").map(t => t.trim()) })}
                          placeholder="Tags"
                        />
                        <div className="flex gap-2 justify-end">
                          <Button variant="outline" onClick={() => setEditingProject(null)}>
                            Cancel
                          </Button>
                          <Button
                            className="bg-accent text-accent-foreground hover:bg-accent/90 flex items-center gap-2"
                            onClick={() => handleUpdateProject(editingProject)}
                          >
                            <Save className="w-4 h-4" />
                            Save
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex gap-3 flex-1">
                          <input
                            type="checkbox"
                            checked={selectedItems.has(project.id)}
                            onChange={(e) => {
                              const newSelected = new Set(selectedItems);
                              if (e.target.checked) {
                                newSelected.add(project.id);
                              } else {
                                newSelected.delete(project.id);
                              }
                              setSelectedItems(newSelected);
                            }}
                            className="mt-1"
                          />
                          <div className="flex-1">
                            <h3 className="text-xl font-playfair font-bold mb-2">{project.title}</h3>
                            <p className="text-muted-foreground text-sm mb-3">{project.description}</p>
                            <div className="flex gap-2 flex-wrap">
                              {project.tags.map((tag) => (
                                <span key={tag} className="text-xs bg-accent/20 text-accent px-2 py-1 rounded">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setEditingProject(project)}
                          >
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteProject(project.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </Card>
                ))}
                {filteredProjects.length === 0 && (
                  <Card className="bg-card border-border p-6 text-center">
                    <p className="text-muted-foreground">No projects found</p>
                  </Card>
                )}
              </div>
            </div>
          )}

          {/* Skills Tab */}
          {activeTab === "skills" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-playfair font-bold">Manage Skills</h2>
                <Dialog open={isAddingSkill} onOpenChange={setIsAddingSkill}>
                  <DialogTrigger asChild>
                    <Button className="bg-accent text-accent-foreground hover:bg-accent/90 flex items-center gap-2">
                      <Plus className="w-4 h-4" />
                      Add Skill
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Add New Skill</DialogTitle>
                      <DialogDescription>Add a new skill to your portfolio</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-semibold">Skill Name</label>
                        <Input
                          value={newSkill.name || ""}
                          onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                          placeholder="e.g., React"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-semibold">Category</label>
                        <select
                          value={newSkill.category || "technical"}
                          onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value as any })}
                          className="w-full px-3 py-2 border border-border rounded-md bg-background"
                        >
                          <option value="technical">Technical</option>
                          <option value="creative">Creative</option>
                          <option value="professional">Professional</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-sm font-semibold">Proficiency Level ({newSkill.level || 50}%)</label>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={newSkill.level || 50}
                          onChange={(e) => setNewSkill({ ...newSkill, level: parseInt(e.target.value) })}
                          className="w-full"
                        />
                      </div>
                      <div className="flex gap-2 justify-end pt-4">
                        <Button variant="outline" onClick={() => setIsAddingSkill(false)}>
                          Cancel
                        </Button>
                        <Button
                          className="bg-accent text-accent-foreground hover:bg-accent/90"
                          onClick={handleAddSkill}
                        >
                          Add Skill
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              {/* Skills by Category */}
              {["technical", "creative", "professional"].map((category) => (
                <div key={category}>
                  <h3 className="text-xl font-playfair font-bold mb-4 capitalize">{category} Skills</h3>
                  <div className="space-y-3">
                    {skills.filter(s => s.category === category).map((skill) => (
                      <Card key={skill.id} className="bg-card border-border p-4">
                        {editingSkill?.id === skill.id ? (
                          <div className="space-y-3">
                            <Input
                              value={editingSkill.name}
                              onChange={(e) => setEditingSkill({ ...editingSkill, name: e.target.value })}
                              placeholder="Skill name"
                            />
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={editingSkill.level}
                              onChange={(e) => setEditingSkill({ ...editingSkill, level: parseInt(e.target.value) })}
                              className="w-full"
                            />
                            <div className="flex gap-2 justify-end">
                              <Button variant="outline" onClick={() => setEditingSkill(null)}>
                                Cancel
                              </Button>
                              <Button
                                className="bg-accent text-accent-foreground hover:bg-accent/90"
                                onClick={() => handleUpdateSkill(editingSkill)}
                              >
                                Save
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex justify-between items-center">
                            <div className="flex-1">
                              <div className="flex justify-between mb-2">
                                <span className="font-semibold">{skill.name}</span>
                                <span className="text-sm text-muted-foreground">{skill.level}%</span>
                              </div>
                              <div className="w-full bg-muted rounded-full h-2">
                                <div
                                  className="bg-accent h-2 rounded-full transition-all"
                                  style={{ width: `${skill.level}%` }}
                                />
                              </div>
                            </div>
                            <div className="flex gap-2 ml-4">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setEditingSkill(skill)}
                              >
                                <Edit2 className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDeleteSkill(skill.id)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        )}
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Messages Tab */}
          {activeTab === "messages" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-playfair font-bold">Contact Messages</h2>
                <span className="text-sm text-muted-foreground">{stats.unreadMessages} unread</span>
              </div>

              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search messages..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Messages List */}
              <div className="space-y-4">
                {filteredMessages.map((message) => (
                  <Card 
                    key={message.id} 
                    className={`bg-card border-border p-6 cursor-pointer hover:border-accent transition-colors ${!message.read ? 'border-accent/50 bg-accent/5' : ''}`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-lg font-semibold">{message.name}</h3>
                        <p className="text-sm text-muted-foreground">{message.email}</p>
                      </div>
                      <div className="flex gap-2 items-center">
                        <span className="text-xs text-muted-foreground">{message.date}</span>
                        {!message.read && (
                          <span className="w-2 h-2 bg-accent rounded-full" />
                        )}
                      </div>
                    </div>
                    <h4 className="font-semibold mb-2">{message.subject}</h4>
                    <p className="text-muted-foreground mb-4">{message.message}</p>
                    <div className="flex gap-2">
                      {!message.read && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleMarkAsRead(message.id)}
                        >
                          Mark as Read
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteMessage(message.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </Card>
                ))}
                {filteredMessages.length === 0 && (
                  <Card className="bg-card border-border p-6 text-center">
                    <p className="text-muted-foreground">No messages found</p>
                  </Card>
                )}
              </div>
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === "analytics" && (
            <div className="space-y-6">
              <h2 className="text-3xl font-playfair font-bold">Analytics</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-card border-border p-6">
                  <h3 className="text-xl font-playfair font-bold mb-4">Page Views Over Time</h3>
                  <div className="space-y-3">
                    {[
                      { page: "Home", views: 450 },
                      { page: "About", views: 320 },
                      { page: "Projects", views: 280 },
                      { page: "Blog", views: 197 },
                    ].map(item => (
                      <div key={item.page}>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-semibold">{item.page}</span>
                          <span className="text-sm text-muted-foreground">{item.views}</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-accent h-2 rounded-full"
                            style={{ width: `${(item.views / 450) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="bg-card border-border p-6">
                  <h3 className="text-xl font-playfair font-bold mb-4">Visitor Summary</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-muted-foreground text-sm">Total Visitors</p>
                      <p className="text-3xl font-bold text-accent">1,247</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm">Unique Visitors</p>
                      <p className="text-3xl font-bold text-accent">892</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm">Avg. Session Duration</p>
                      <p className="text-3xl font-bold text-accent">3m 24s</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
