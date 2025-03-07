
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/components/ui/use-toast';

export const AuthForms = () => {
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSignIn = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    
    // Mock authentication - in a real app, you'd call an API
    setTimeout(() => {
      setIsLoading(false);
      toast({
        description: "Successfully signed in!",
      });
    }, 1000);
  };
  
  const handleSignUp = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    
    // Mock authentication - in a real app, you'd call an API
    setTimeout(() => {
      setIsLoading(false);
      toast({
        description: "Account created successfully!",
      });
    }, 1000);
  };

  return (
    <Tabs defaultValue="signin" className="w-full max-w-md">
      <TabsList className="grid w-full grid-cols-2 mb-8">
        <TabsTrigger value="signin">Sign In</TabsTrigger>
        <TabsTrigger value="signup">Sign Up</TabsTrigger>
      </TabsList>
      
      <TabsContent value="signin" className="space-y-4">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-medium">Welcome back</h2>
          <p className="text-muted-foreground">Sign in to your account</p>
        </div>
        
        <form onSubmit={handleSignIn} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="signin-email">Email</Label>
            <Input id="signin-email" type="email" required placeholder="you@example.com" />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="signin-password">Password</Label>
              <a href="#" className="text-xs text-primary hover:underline">
                Forgot password?
              </a>
            </div>
            <Input id="signin-password" type="password" required placeholder="••••••••" />
          </div>
          
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </form>
      </TabsContent>
      
      <TabsContent value="signup" className="space-y-4">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-medium">Create an account</h2>
          <p className="text-muted-foreground">Enter your details to get started</p>
        </div>
        
        <form onSubmit={handleSignUp} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="signup-name">Full Name</Label>
            <Input id="signup-name" type="text" required placeholder="John Doe" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="signup-email">Email</Label>
            <Input id="signup-email" type="email" required placeholder="you@example.com" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="signup-password">Password</Label>
            <Input id="signup-password" type="password" required placeholder="••••••••" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="signup-confirm-password">Confirm Password</Label>
            <Input id="signup-confirm-password" type="password" required placeholder="••••••••" />
          </div>
          
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Creating account..." : "Sign Up"}
          </Button>
          
          <p className="text-xs text-center text-muted-foreground">
            By signing up, you agree to our{" "}
            <a href="#" className="text-primary hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-primary hover:underline">
              Privacy Policy
            </a>
            .
          </p>
        </form>
      </TabsContent>
    </Tabs>
  );
};
