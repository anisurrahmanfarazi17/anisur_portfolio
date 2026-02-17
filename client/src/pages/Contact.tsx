import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Mail, Phone, MapPin } from "lucide-react";
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitMutation = trpc.contact.submit.useMutation({
    onSuccess: () => {
      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", subject: "", message: "" });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to send message");
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await submitMutation.mutateAsync(formData);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-background text-foreground pt-24 pb-12">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-playfair font-bold mb-6">Get in Touch</h1>
          <p className="text-lg text-muted-foreground mb-12">
            Have a question or want to collaborate? I'd love to hear from you. Send me a message and I'll respond as soon as possible.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="bg-card border-border p-6">
              <div className="flex items-center gap-4 mb-4">
                <Mail className="w-6 h-6 text-accent" />
                <h3 className="font-semibold">Email</h3>
              </div>
              <a href="mailto:anisurrahmanfarazi@gmail.com" className="text-accent hover:underline">
                anisurrahmanfarazi@gmail.com
              </a>
            </Card>

            <Card className="bg-card border-border p-6">
              <div className="flex items-center gap-4 mb-4">
                <MapPin className="w-6 h-6 text-accent" />
                <h3 className="font-semibold">Location</h3>
              </div>
              <p className="text-muted-foreground">Bangladesh</p>
            </Card>

            <Card className="bg-card border-border p-6">
              <div className="flex items-center gap-4 mb-4">
                <Phone className="w-6 h-6 text-accent" />
                <h3 className="font-semibold">Connect</h3>
              </div>
              <div className="space-y-2">
                <a href="https://github.com/anisurrahmanfarazi17/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline block">
                  GitHub
                </a>
                <a href="https://www.linkedin.com/in/anisurrahmanfarazi17/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline block">
                  LinkedIn
                </a>
              </div>
            </Card>
          </div>

          <Card className="bg-card border-border p-8">
            <h2 className="text-2xl font-playfair font-bold mb-6">Send me a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">Name</label>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Email</label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Subject</label>
                <Input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What is this about?"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Message</label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message here..."
                  rows={6}
                  required
                  disabled={isSubmitting}
                />
              </div>

              <Button
                type="submit"
                className="bg-accent text-accent-foreground hover:bg-accent/90 w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
