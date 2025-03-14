
import { useState, useEffect, useRef } from 'react';
import { cn } from "@/lib/utils";
import { useTheme } from '@/context/ThemeContext';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { isDarkMode } = useTheme();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Create email content
      const emailContent = `
        Name: ${formData.name}
        Email: ${formData.email}
        Company: ${formData.company || 'Not provided'}
        Message: ${formData.message}
      `;
      
      // Create mailto link with pre-filled content
      const mailtoLink = `mailto:team@thedigitalfront.in?subject=Contact Form Submission from ${formData.name}&body=${encodeURIComponent(emailContent)}`;
      
      // Open email client
      window.open(mailtoLink);
      
      // Show success message
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      toast({
        title: "Message Sent!",
        description: "We'll get back to you as soon as possible.",
        duration: 3000,
      });
      
      // Reset form after showing success message
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          company: '',
          message: ''
        });
        setIsSubmitted(false);
      }, 3000);
    } catch (error) {
      setIsSubmitting(false);
      toast({
        title: "Error",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    const elements = document.querySelectorAll('.reveal-on-scroll');
    elements.forEach((el) => observer.observe(el));
    
    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);
  
  return (
    <section id="contact" className={`section-padding relative ${isDarkMode ? 'bg-background' : 'bg-white'}`} ref={sectionRef}>
      {/* Decorative elements inspired by devgeeks.in */}
      <div className="absolute top-0 left-0 w-24 h-24 bg-purple-500/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-xl"></div>
      <div className="absolute bottom-0 right-0 w-36 h-36 bg-orange-500/10 rounded-full translate-x-1/3 translate-y-1/3 blur-xl"></div>
      <div className="absolute top-1/3 right-0 w-16 h-16 bg-blue-500/10 rounded-full translate-x-1/2 blur-lg"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className={`max-w-5xl mx-auto ${isDarkMode ? 'bg-secondary/20 border border-secondary/30' : 'bg-white'} rounded-2xl shadow-xl overflow-hidden`}>
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="bg-gradient-to-br from-purple-600 to-blue-500 text-white p-12 flex flex-col justify-center reveal-on-scroll">
              <h2 className="headline text-3xl md:text-4xl mb-6">Let's Create Something Amazing Together</h2>
              <p className="mb-8 text-white/90">
                Ready to transform your digital presence and boost your business? 
                Get in touch with us today to discuss your project.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-white mb-1">Email</h3>
                    <a href="mailto:team@thedigitalfront.in" className="text-white/80 hover:text-white transition-colors">team@thedigitalfront.in</a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-white mb-1">Phone</h3>
                    <a 
                      href="https://wa.me/9284613155?text=Hey!%20I'm%20interested%20in%20your%20Web%20Agency%20services" 
                      className="text-white/80 hover:text-white transition-colors"
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      +91 9284613155
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-white mb-1">Office</h3>
                    <p className="text-white/80">Goa, India</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className={`p-12 reveal-on-scroll ${isDarkMode ? 'bg-background' : 'bg-gray-50'}`}>
              <h2 className="headline text-3xl mb-6 text-gray-800 dark:text-gray-100">Get in Touch</h2>
              
              {isSubmitted ? (
                <div className={`border rounded-lg p-6 text-center ${isDarkMode ? 'bg-green-900/20 border-green-800 text-green-100' : 'bg-green-50 border-green-200 text-green-800'}`}>
                  <svg className={`w-12 h-12 mx-auto ${isDarkMode ? 'text-green-400' : 'text-green-500'} mb-4`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  <h3 className="text-xl font-medium mb-2">Message Sent!</h3>
                  <p>We'll get back to you as soon as possible.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Name</label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className={`w-full border ${isDarkMode ? 'bg-secondary/50 border-gray-700 focus:border-primary focus:ring-primary/50' : 'bg-white border-gray-300 focus:border-purple-500 focus:ring-purple-500/50 text-gray-800'} focus:outline-none focus:ring-2 transition-colors`}
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Email</label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className={`w-full border ${isDarkMode ? 'bg-secondary/50 border-gray-700 focus:border-primary focus:ring-primary/50' : 'bg-white border-gray-300 focus:border-purple-500 focus:ring-purple-500/50 text-gray-800'} focus:outline-none focus:ring-2 transition-colors`}
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Company</label>
                    <Input
                      id="company"
                      name="company"
                      type="text"
                      value={formData.company}
                      onChange={handleChange}
                      className={`w-full border ${isDarkMode ? 'bg-secondary/50 border-gray-700 focus:border-primary focus:ring-primary/50' : 'bg-white border-gray-300 focus:border-purple-500 focus:ring-purple-500/50 text-gray-800'} focus:outline-none focus:ring-2 transition-colors`}
                      placeholder="Your company"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Message</label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className={`w-full resize-none border ${isDarkMode ? 'bg-secondary/50 border-gray-700 focus:border-primary focus:ring-primary/50' : 'bg-white border-gray-300 focus:border-purple-500 focus:ring-purple-500/50 text-gray-800'} focus:outline-none focus:ring-2 transition-colors`}
                      placeholder="Tell us about your project..."
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className={cn(
                      "relative overflow-hidden group w-full flex items-center justify-center rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 text-white px-6 py-3 font-medium transition-all duration-300 hover:shadow-lg hover:translate-y-[-2px] active:translate-y-0 active:shadow-sm",
                      isSubmitting && "opacity-70 cursor-not-allowed"
                    )}
                    disabled={isSubmitting}
                  >
                    <span className="absolute top-0 left-0 w-full h-full bg-white/10 transform -skew-x-12 -translate-x-full transition-transform duration-700 ease-in-out group-hover:translate-x-full"></span>
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
