
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ShoppingBag, Users, Truck, HeartHandshake, Mail } from "lucide-react";

const About = () => {
  return (
    <div className="animate-fade-in pt-16">
      {/* Hero section */}
      <div className="relative bg-primary text-primary-foreground py-24">
        <div className="page-container text-center">
          <h1 className="text-4xl md:text-5xl font-medium mb-6">About Essentials</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90">
            Curating premium essentials for modern living with a focus on quality, sustainability, and timeless design.
          </p>
        </div>
      </div>

      {/* Story section */}
      <section className="section">
        <div className="page-container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-medium mb-6">Our Story</h2>
              <p className="text-muted-foreground mb-4">
                Essentials was founded in 2020 with a simple mission: to provide high-quality, timeless products that enhance everyday living. 
                We believe that the objects you surround yourself with should be both beautiful and functional.
              </p>
              <p className="text-muted-foreground mb-4">
                Our team of designers and curators travel the world to source the finest materials and partner with ethical manufacturers 
                who share our values of sustainability and craftsmanship.
              </p>
              <p className="text-muted-foreground">
                We're passionate about creating a shopping experience that feels personal and thoughtful, 
                and we're committed to making premium essentials accessible to everyone.
              </p>
            </div>
            <div className="relative aspect-square rounded-xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1544963222-cc83c1ca1192?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                alt="Our store" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values section */}
      <section className="section bg-muted/30">
        <div className="page-container">
          <h2 className="text-3xl font-medium text-center mb-12">Our Values</h2>
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
              <div key={index} className="text-center p-6 bg-background rounded-lg border border-border">
                <div className="flex justify-center">{value.icon}</div>
                <h3 className="text-xl font-medium mb-2">{value.title}</h3>
                <p className="text-muted-foreground">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team section */}
      <section className="section">
        <div className="page-container">
          <h2 className="text-3xl font-medium text-center mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Alex Morgan",
                role: "Founder & CEO",
                image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
              },
              {
                name: "Jamie Chen",
                role: "Head of Design",
                image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
              },
              {
                name: "Taylor Reed",
                role: "Product Curator",
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
              },
            ].map((member, index) => (
              <div key={index} className="text-center">
                <div className="aspect-square rounded-full overflow-hidden mb-6 max-w-[200px] mx-auto">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-xl font-medium mb-1">{member.name}</h3>
                <p className="text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="section bg-primary text-primary-foreground">
        <div className="page-container text-center">
          <h2 className="text-3xl font-medium mb-6">Ready to explore?</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Discover our curated collection of premium essentials for modern living.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="outline" 
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
              asChild
            >
              <Link to="/products">Shop Collection</Link>
            </Button>
            <Button
              size="lg"
              variant="secondary"
              asChild
            >
              <Link to="/contact">
                <Mail className="mr-2 h-4 w-4" />
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
