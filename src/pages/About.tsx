
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ShoppingBag, Users, Truck, HeartHandshake, Mail, ArrowRight, Award, Clock, Coffee } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const About = () => {
  return (
    <div className="animate-fade-in">
      {/* Hero section with gradient background */}
      <div className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-primary/60 opacity-90"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        
        <div className="page-container relative z-10 text-center">
          <Badge variant="outline" className="bg-background/20 backdrop-blur-sm border-white/20 text-white px-4 py-1 mb-6 animate-slide-in">Est. 2020</Badge>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold mb-6 text-white text-shadow-md">About Essentials</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto text-white/90 font-light leading-relaxed">
            Curating premium essentials for modern living with a focus on quality, sustainability, and timeless design.
          </p>
        </div>
      </div>

      {/* Mission statement with accent background */}
      <section className="py-16 bg-accent/30">
        <div className="page-container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-medium mb-8 leading-tight">Our mission is to provide <span className="text-primary italic">thoughtfully designed</span> products that enhance your everyday life.</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We believe the objects you surround yourself with should bring joy, functionality, and beauty to your daily routines.
            </p>
          </div>
        </div>
      </section>

      {/* Story section with overlapping elements */}
      <section className="section relative overflow-hidden">
        <div className="absolute right-0 top-40 w-64 h-64 rounded-full bg-primary/5 -z-10"></div>
        <div className="absolute left-20 bottom-20 w-48 h-48 rounded-full bg-primary/5 -z-10"></div>
        
        <div className="page-container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl font-medium mb-2">Our Story</h2>
              <div className="w-20 h-1 bg-primary mb-6"></div>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Essentials was founded in 2020 with a simple mission: to provide high-quality, timeless products that enhance everyday living. 
                We believe that the objects you surround yourself with should be both beautiful and functional.
              </p>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Our team of designers and curators travel the world to source the finest materials and partner with ethical manufacturers 
                who share our values of sustainability and craftsmanship.
              </p>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                We're passionate about creating a shopping experience that feels personal and thoughtful, 
                and we're committed to making premium essentials accessible to everyone.
              </p>
              <div className="flex space-x-6">
                <div className="text-center">
                  <h3 className="text-4xl font-bold text-primary mb-1">3+</h3>
                  <p className="text-sm text-muted-foreground">Years</p>
                </div>
                <div className="text-center">
                  <h3 className="text-4xl font-bold text-primary mb-1">200+</h3>
                  <p className="text-sm text-muted-foreground">Products</p>
                </div>
                <div className="text-center">
                  <h3 className="text-4xl font-bold text-primary mb-1">10k+</h3>
                  <p className="text-sm text-muted-foreground">Customers</p>
                </div>
              </div>
            </div>
            <div className="relative order-1 md:order-2">
              <div className="rounded-2xl overflow-hidden shadow-lg hover-lift">
                <AspectRatio ratio={1/1}>
                  <img 
                    src="../../Download_premium_png_of_PNG_Man_using_holding_laptop_computer_portrait_adult_about_png__face__person__men__and_laptop_13164030-removebg-preview.png" 
                    alt="Our store" 
                    className="w-full h-full object-cover"
                  />
                </AspectRatio>
              </div>
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-primary rounded-xl -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Values section with cards */}
      <section className="py-24 bg-muted/30">
        <div className="page-container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Badge variant="outline" className="mb-4">Our Core Beliefs</Badge>
            <h2 className="text-4xl font-medium mb-6">Our Values</h2>
            <p className="text-lg text-muted-foreground">
              These principles guide every decision we make, from product selection to customer service.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                icon: <ShoppingBag className="h-10 w-10 text-primary mb-4" />, 
                title: "Quality", 
                desc: "We source only the highest quality materials and products that stand the test of time." 
              },
              { 
                icon: <Users className="h-10 w-10 text-primary mb-4" />, 
                title: "Community", 
                desc: "We build meaningful connections with our customers and the artisans behind our products." 
              },
              { 
                icon: <Truck className="h-10 w-10 text-primary mb-4" />, 
                title: "Sustainability", 
                desc: "We prioritize eco-friendly practices and materials throughout our supply chain." 
              },
              { 
                icon: <HeartHandshake className="h-10 w-10 text-primary mb-4" />, 
                title: "Transparency", 
                desc: "We believe in honest pricing and clear communication about our products and practices." 
              },
            ].map((value, index) => (
              <div key={index} className="p-8 bg-background rounded-xl border border-border shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                <div className="rounded-full bg-primary/10 p-4 w-16 h-16 flex items-center justify-center mb-6">
                  {value.icon}
                </div>
                <h3 className="text-xl font-medium mb-3">{value.title}</h3>
                <p className="text-muted-foreground">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process section */}
      <section className="py-24">
        <div className="page-container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Badge variant="outline" className="mb-4">How We Work</Badge>
            <h2 className="text-4xl font-medium mb-6">Our Process</h2>
            <p className="text-lg text-muted-foreground">
              We follow a thoughtful process to ensure every product meets our standards.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Coffee className="h-8 w-8 text-primary" />,
                title: "Discover",
                desc: "We search the globe for unique materials and exceptional craftsmanship."
              },
              {
                icon: <Award className="h-8 w-8 text-primary" />,
                title: "Curate",
                desc: "Every product is carefully selected based on quality, design, and sustainability."
              },
              {
                icon: <Clock className="h-8 w-8 text-primary" />,
                title: "Deliver",
                desc: "We ensure each item reaches you in perfect condition, ready to enhance your life."
              }
            ].map((step, index) => (
              <div key={index} className="relative">
                <div className="flex items-center mb-6">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-medium text-lg mr-4">
                    {index + 1}
                  </div>
                  <h3 className="text-2xl font-medium">{step.title}</h3>
                </div>
                <div className="pl-16">
                  <div className="mb-6">{step.icon}</div>
                  <p className="text-muted-foreground">{step.desc}</p>
                </div>
                
                {index < 2 && (
                  <div className="hidden md:block absolute top-6 left-[calc(50%+3rem)] right-0 h-0.5 bg-border -z-10"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team section with rounded portraits */}
      <section className="section bg-accent/20 py-24">
        <div className="page-container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Badge variant="outline" className="mb-4">The People</Badge>
            <h2 className="text-4xl font-medium mb-6">Meet Our Team</h2>
            <p className="text-lg text-muted-foreground">
              The passionate individuals behind our brand, dedicated to bringing quality to your life.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
              {
                name: "Alex Morgan",
                role: "Founder & CEO",
                bio: "Alex founded Essentials with a vision to make thoughtful design accessible to everyone.",
                image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
              },
              {
                name: "Jamie Chen",
                role: "Head of Design",
                bio: "Jamie brings over a decade of experience in product design and material research.",
                image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
              },
              {
                name: "Taylor Reed",
                role: "Product Curator",
                bio: "Taylor travels the world to discover unique products and build relationships with artisans.",
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
              },
            ].map((member, index) => (
              <div key={index} className="bg-background rounded-xl p-8 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="aspect-square rounded-full overflow-hidden mb-6 max-w-[180px] mx-auto border-4 border-background shadow-lg">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-medium mb-1">{member.name}</h3>
                  <p className="text-primary font-medium mb-4">{member.role}</p>
                  <p className="text-muted-foreground">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote section */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="page-container">
          <div className="max-w-4xl mx-auto text-center">
            <div className="text-5xl font-serif mb-6">"</div>
            <p className="text-2xl md:text-3xl font-light italic mb-8 text-gray/90">
              We believe that thoughtfully designed products can bring joy and simplicity to everyday moments. 
              That's why we're committed to curating items that are as functional as they are beautiful.
            </p>
            <div className="flex justify-center items-center">
              <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                <img 
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80" 
                  alt="Alex Morgan" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-left">
                <p className="font-medium">Alex Morgan</p>
                <p className="text-sm text-white/70">Founder & CEO</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA section */}
      <section className="section bg-gradient-to-br from-accent/30 to-background py-24">
        <div className="page-container text-center">
          <h2 className="text-4xl font-medium mb-6">Ready to explore?</h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Discover our curated collection of premium essentials for modern living.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="px-8 py-6 text-lg"
              asChild
            >
              <Link to="/products">
                Shop Collection
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="px-8 py-6 text-lg"
              asChild
            >
              <Link to="/contact">
                <Mail className="mr-2 h-5 w-5" />
                Contact Us
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
