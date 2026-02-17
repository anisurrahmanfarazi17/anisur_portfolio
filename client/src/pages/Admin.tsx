import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Edit2, Trash2, Save, X } from "lucide-react";
import { useState } from "react";
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

export default function Admin() {
  const { user, isAuthenticated } = useAuth();
  const [, navigate] = useLocation();
  const [activeTab, setActiveTab] = useState<"articles" | "projects" | "skills">("articles");
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

  const [projects, setProjects] = useState<Project[]>([
    {
      id: "1",
      title: "Beyond the Code: Article Writing Contest 2026",
      description: "Organized and managed a university-wide article writing competition, creating topics, rules, and promotional materials.",
      tags: ["Event Organization", "Content Creation", "Community Building"],
      date: "February 2026",
    },
  ]);

  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [newArticle, setNewArticle] = useState<Partial<Article>>({});
  const [newProject, setNewProject] = useState<Partial<Project>>({});
  const [isAddingArticle, setIsAddingArticle] = useState(false);
  const [isAddingProject, setIsAddingProject] = useState(false);

  // Redirect if not authenticated
  if (!isAuthenticated) {
    navigate("/");
    return null;
  }

  // Handle article operations
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

  // Handle project operations
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

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50">
        <div className="container max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-playfair font-bold text-accent">Anisur Rahman Farazi - Admin</div>
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
        <div className="container max-w-6xl mx-auto px-4">
          {/* Tabs */}
          <div className="flex gap-4 mb-8 border-b border-border pb-4">
            <button
              onClick={() => setActiveTab("articles")}
              className={`px-4 py-2 font-semibold transition-colors ${
                activeTab === "articles"
                  ? "text-accent border-b-2 border-accent"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Articles
            </button>
            <button
              onClick={() => setActiveTab("projects")}
              className={`px-4 py-2 font-semibold transition-colors ${
                activeTab === "projects"
                  ? "text-accent border-b-2 border-accent"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Projects
            </button>
            <button
              onClick={() => setActiveTab("skills")}
              className={`px-4 py-2 font-semibold transition-colors ${
                activeTab === "skills"
                  ? "text-accent border-b-2 border-accent"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Skills
            </button>
          </div>

          {/* Articles Tab */}
          {activeTab === "articles" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-playfair font-bold">Manage Articles</h2>
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

              <div className="space-y-4">
                {articles.map((article) => (
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
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-xl font-playfair font-bold mb-2">{article.title}</h3>
                          <p className="text-muted-foreground text-sm mb-3">{article.excerpt}</p>
                          <div className="flex gap-4 text-xs text-muted-foreground">
                            <span>{article.category}</span>
                            <span>{article.date}</span>
                            <span>{article.readTime}</span>
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
              </div>
            </div>
          )}

          {/* Projects Tab */}
          {activeTab === "projects" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-playfair font-bold">Manage Projects</h2>
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
                          rows={3}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-semibold">Tags (comma-separated)</label>
                        <Input
                          value={(newProject.tags || []).join(", ")}
                          onChange={(e) => setNewProject({ ...newProject, tags: e.target.value.split(",").map((t) => t.trim()) })}
                          placeholder="e.g., React, TypeScript, Design"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-semibold">Date</label>
                        <Input
                          value={newProject.date || ""}
                          onChange={(e) => setNewProject({ ...newProject, date: e.target.value })}
                          placeholder="e.g., February 2026"
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

              <div className="space-y-4">
                {projects.map((project) => (
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
                          rows={3}
                        />
                        <Input
                          value={(editingProject.tags || []).join(", ")}
                          onChange={(e) => setEditingProject({ ...editingProject, tags: e.target.value.split(",").map((t) => t.trim()) })}
                          placeholder="Tags"
                        />
                        <Input
                          value={editingProject.date}
                          onChange={(e) => setEditingProject({ ...editingProject, date: e.target.value })}
                          placeholder="Date"
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
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-xl font-playfair font-bold mb-2">{project.title}</h3>
                          <p className="text-muted-foreground text-sm mb-3">{project.description}</p>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {project.tags.map((tag) => (
                              <span key={tag} className="px-2 py-1 text-xs bg-accent/10 text-accent rounded-full border border-accent/20">
                                {tag}
                              </span>
                            ))}
                          </div>
                          <p className="text-xs text-muted-foreground">{project.date}</p>
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
              </div>
            </div>
          )}

          {/* Skills Tab */}
          {activeTab === "skills" && (
            <div className="space-y-6">
              <h2 className="text-3xl font-playfair font-bold">Manage Skills</h2>
              <Card className="bg-card border-border p-6">
                <p className="text-muted-foreground">Skills management coming soon. You can edit skills directly in the database.</p>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
