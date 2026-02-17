import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Github, Linkedin, Mail, ExternalLink, Code2, Palette, Users, Trophy } from "lucide-react";
import { useState } from "react";

/**
 * Design Philosophy: Dark Academic with Geometric Precision
 * - Color Palette: Dark navy (#0f1419), cream white (#f8f8f8), gold (#d4af37)
 * - Typography: Playfair Display (headings) + Lato (body) + IBM Plex Mono (code)
 * - Layout: Geometric precision with intentional asymmetric breaks
 * - Interactions: Smooth, deliberate transitions with hover effects
 */

export default function Home() {
  const [activeTab, setActiveTab] = useState("skills");

  const skills = {
    technical: [
      { name: "C Programming", level: 85 },
      { name: "Competitive Programming", level: 80 },
      { name: "Data Structures", level: 85 },
      { name: "Algorithms", level: 80 },
    ],
    creative: [
      { name: "Graphic Design", level: 90 },
      { name: "UI/UX Design", level: 75 },
      { name: "Visual Communication", level: 85 },
    ],
    professional: [
      { name: "Microsoft Office", level: 95 },
      { name: "Team Leadership", level: 80 },
      { name: "Event Management", level: 85 },
      { name: "Quick Learning", level: 90 },
    ],
  };

  const projects = [
    {
      title: "Beyond the Code: Article Writing Contest 2026",
      description: "Organized and managed a university-wide article writing competition, creating topics, rules, and promotional materials.",
      tags: ["Event Organization", "Content Creation", "Community Building"],
      date: "February 2026",
    },
    {
      title: "Code Breeze and Freeze Contest Series",
      description: "Managed a three-part online programming contest series with multiple participants and comprehensive problem sets.",
      tags: ["Competitive Programming", "Contest Management", "Problem Setting"],
      date: "January 2026",
    },
    {
      title: "ICPC Asia Dhaka Regional Preliminary",
      description: "Participated in the prestigious International Collegiate Programming Contest, showcasing competitive programming skills.",
      tags: ["Competitive Programming", "ICPC", "Problem Solving"],
      date: "November 2025",
    },
    {
      title: "Fiverr Graphic Design Services",
      description: "Launched freelance graphic design services, offering professional design solutions to clients worldwide.",
      tags: ["Freelancing", "Graphic Design", "Client Work"],
      date: "January 2026",
    },
  ];

  const experience = [
    {
      role: "Social Media Manager",
      organization: "Competitive Programming Camp City University (CPCCU)",
      responsibilities: [
        "Managing social media presence and announcements for the club",
        "Creating posters and promotional materials for events",
        "Organizing online contests and writing competitions",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50">
        <div className="container max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-playfair font-bold text-accent">ARF</div>
          <div className="flex gap-6 items-center">
            <a href="#about" className="hover:text-accent transition-colors">About</a>
            <a href="#skills" className="hover:text-accent transition-colors">Skills</a>
            <a href="#projects" className="hover:text-accent transition-colors">Projects</a>
            <a href="#contact" className="hover:text-accent transition-colors">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: "url('https://private-us-east-1.manuscdn.com/sessionFile/vWls0kdKyZ1FHSy21Qevgh/sandbox/C9GYDbxoVR67we4HgIJi5w-img-1_1771351458000_na1fn_aGVyby1iYWNrZ3JvdW5k.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvdldsczBrZEt5WjFGSFN5MjFRZXZnaC9zYW5kYm94L0M5R1lEYnhvVlI2N3dlNEhnSUppNXctaW1nLTFfMTc3MTM1MTQ1ODAwMF9uYTFmbl9hR1Z5YnkxaVlXTnJaM0p2ZFc1ay5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=dOi1BjDLl3GGx-9SGeB0V6VesWm0F59ktDqfjFYDEeZALNxT405YHxW9Oj36pv5ZAvfs6dBjN4Gd8e3~2nDlRqocYx7LDjVWGgWflfOj8bCVmv1Sa-XRYxnXdbF3VRfwtaz69sz4buzBIcQyICaO21LnT6SxJ0nUuZqQCFCyZAiMQFfxfIx12t~anp5LAn48ZbptWk6nMu4SVZTOp1d44Kw4JpJy3vgkWnSumd0QjGk~mp5cegFAtK2mxvjT~eat7q9CX~lwtXXchG0O-T9yEor4S1Kowf2yTN6qklaaEkvVoxY8pllH9Jx-u-kfrkzwfftoY68uWnDNQLITdHhuJw__')",
          }}
        />
        <div className="container max-w-6xl mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-block px-4 py-2 bg-accent/10 border border-accent rounded-lg">
                <span className="text-accent text-sm font-mono">Welcome to my portfolio</span>
              </div>
              <h1 className="text-6xl md:text-7xl font-playfair font-bold leading-tight">
                Anisur Rahman <span className="text-accent">Farazi</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
                Computer Science Student at City University. Competitive Programmer. Graphic Designer. Passionate about solving complex problems and creating beautiful digital experiences.
              </p>
              <div className="flex gap-4 pt-4">
                <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
                  Get in Touch
                </Button>
                <Button variant="outline" className="border-accent text-accent hover:bg-accent/10">
                  View My Work
                </Button>
              </div>
            </div>
            <div className="relative h-96 md:h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent rounded-lg border border-accent/30" />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-accent/10 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-card/30 border-y border-border">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-playfair font-bold">About Me</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  I'm a passionate Computer Science student at City University, currently in the 67th batch. My journey in tech is driven by curiosity, determination, and a love for solving complex problems.
                </p>
                <p>
                  Beyond coding, I'm an experienced graphic designer with a keen eye for visual aesthetics. I believe that great software is not just about functionality—it's about creating experiences that resonate with users.
                </p>
                <p>
                  As the Social Media Manager for the Competitive Programming Camp at City University, I've had the privilege of building a vibrant community of programmers and organizing events that inspire innovation and collaboration.
                </p>
              </div>
              <div className="pt-4 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full" />
                  <span>City University, Bangladesh</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full" />
                  <span>Savar Govt. College (HSC)</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full" />
                  <span>Based in Bangladesh</span>
                </div>
              </div>
            </div>
            <div
              className="h-96 rounded-lg border border-accent/30 bg-cover bg-center opacity-80"
              style={{
                backgroundImage: "url('https://private-us-east-1.manuscdn.com/sessionFile/vWls0kdKyZ1FHSy21Qevgh/sandbox/C9GYDbxoVR67we4HgIJi5w-img-2_1771351453000_na1fn_c2tpbGxzLXNlY3Rpb24tYmc.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvdldsczBrZEt5WjFGSFN5MjFRZXZnaC9zYW5kYm94L0M5R1lEYnhvVlI2N3dlNEhnSUppNXctaW1nLTJfMTc3MTM1MTQ1MzAwMF9uYTFmbl9jMnRwYkd4ekxYTmxZM1JwYjI0dFltYy5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=fTYk57RIRn8KKvOUxaC59d7CpqZ68KdKGjoV8chgGn6ahwqOAw9BuLXurDsQMr0d5t4WhOIMXQmF8SBSYurnPHfOWiNW1pF7Rcc7ZVfSxffKEnIrQJZKrHOh600mFlEVGeQeaWGVTC-hLcD7Saxle63olED~8K1nGUSF6WkpegZRLvyjvhARsgTvdWy3gCvSqzFm0E4p-3KfV-9DfA8jE9cgenYbjuD3v-GIuynY8Jv2~8HjdNj2HZ7shTpYjWuXAY2Xj9n7SP6xQ-5x0Xm4YubFsIDqKJEaV2Z4vh5T6zEeBo5YbF5kU2mcD6ezgirEinUpZQ2txEYcf94GPCybFQ__')",
              }}
            />
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20">
        <div className="container max-w-6xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-12">Skills & Expertise</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {Object.entries(skills).map(([category, items]) => (
              <Card key={category} className="bg-card border-border p-6 hover:border-accent/50 transition-all duration-300">
                <div className="flex items-center gap-3 mb-6">
                  {category === "technical" && <Code2 className="w-6 h-6 text-accent" />}
                  {category === "creative" && <Palette className="w-6 h-6 text-accent" />}
                  {category === "professional" && <Users className="w-6 h-6 text-accent" />}
                  <h3 className="text-xl font-playfair font-bold capitalize">{category.replace(/([A-Z])/g, " $1")}</h3>
                </div>
                <div className="space-y-4">
                  {items.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm">{skill.name}</span>
                        <span className="text-xs text-accent font-mono">{skill.level}%</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-accent to-accent/70 transition-all duration-500"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-card/30 border-y border-border">
        <div className="container max-w-6xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-12">Projects & Achievements</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, idx) => (
              <Card
                key={idx}
                className="bg-card border-border p-6 hover:border-accent/50 transition-all duration-300 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-playfair font-bold mb-2">{project.title}</h3>
                    <p className="text-sm text-muted-foreground font-mono">{project.date}</p>
                  </div>
                  <Trophy className="w-5 h-5 text-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-muted-foreground mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs bg-accent/10 text-accent rounded-full border border-accent/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-20">
        <div className="container max-w-6xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-12">Experience</h2>
          <div className="space-y-8">
            {experience.map((exp, idx) => (
              <Card key={idx} className="bg-card border-border p-8">
                <div className="mb-4">
                  <h3 className="text-2xl font-playfair font-bold text-accent">{exp.role}</h3>
                  <p className="text-muted-foreground font-mono">{exp.organization}</p>
                </div>
                <ul className="space-y-3">
                  {exp.responsibilities.map((resp, ridx) => (
                    <li key={ridx} className="flex gap-3">
                      <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                      <span className="text-muted-foreground">{resp}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-card/30 border-t border-border">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-6">Get in Touch</h2>
            <p className="text-lg text-muted-foreground mb-12">
              I'm always interested in hearing about new projects and opportunities. Feel free to reach out!
            </p>
            <div className="flex gap-6 justify-center mb-12">
              <a
                href="https://facebook.com/anisurrahmanfarazi17"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-card border border-border rounded-lg hover:border-accent hover:bg-accent/10 transition-all"
              >
                <Mail className="w-6 h-6 text-accent" />
              </a>
              <a
                href="#"
                className="p-3 bg-card border border-border rounded-lg hover:border-accent hover:bg-accent/10 transition-all"
              >
                <Github className="w-6 h-6 text-accent" />
              </a>
              <a
                href="#"
                className="p-3 bg-card border border-border rounded-lg hover:border-accent hover:bg-accent/10 transition-all"
              >
                <Linkedin className="w-6 h-6 text-accent" />
              </a>
            </div>
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90 px-8 py-6 text-lg">
              Send Me an Email
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 bg-background/50">
        <div className="container max-w-6xl mx-auto px-4 text-center text-muted-foreground">
          <p>© 2026 Anisur Rahman Farazi. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
