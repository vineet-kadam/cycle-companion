import { useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { toast } from 'sonner';

const LoginPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [identifier, setIdentifier] = useState(''); // email or username
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const resolveEmail = async (usernameOrEmail) => {
    if (isEmail(usernameOrEmail)) return usernameOrEmail;

    // Look up email by username
    const { data, error } = await supabase
      .from('profiles')
      .select('user_id')
      .eq('username', usernameOrEmail.trim().toLowerCase())
      .maybeSingle();

    if (error || !data) {
      throw new Error('Username not found');
    }

    // Get the user's email from the profile - we need an edge function or 
    // store email in profiles. For now, let's query auth admin.
    // Since we can't query auth.users from client, we'll store email approach.
    // Actually, let's use a simpler approach: store email in profiles via trigger.
    throw new Error('Username login requires email stored in profile. Please use your email for now.');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        if (!isEmail(identifier)) {
          toast.error('Please use a valid email address to sign up');
          setLoading(false);
          return;
        }
        const { error } = await supabase.auth.signUp({
          email: identifier,
          password,
          options: { emailRedirectTo: window.location.origin },
        });
        if (error) throw error;
        toast.success('Account created!', {
          description: 'Check your email for a confirmation link.',
        });
      } else {
        let email = identifier;

        // If not an email, try to resolve username
        if (!isEmail(identifier)) {
          const { data, error } = await supabase
            .from('profiles')
            .select('email')
            .eq('username', identifier.trim().toLowerCase())
            .maybeSingle();

          if (error || !data || !data.email) {
            toast.error('Username not found. Try using your email instead.');
            setLoading(false);
            return;
          }
          email = data.email;
        }

        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        toast.success('Welcome back! 🌸');
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="w-16 h-16 rounded-full bg-primary mx-auto mb-4 flex items-center justify-center shadow-lg">
              <span className="text-primary-foreground text-2xl font-bold">F</span>
            </div>
            <h1 className="text-3xl font-display font-bold text-foreground">FloTrack</h1>
            <p className="text-muted-foreground mt-1">Your personal cycle companion</p>
          </motion.div>
        </div>

        <Card className="shadow-lg border-border/50">
          <CardHeader className="text-center">
            <CardTitle className="text-xl">
              {isSignUp ? 'Create Account' : 'Welcome Back'}
            </CardTitle>
            <CardDescription>
              {isSignUp
                ? 'Sign up to start tracking your cycle'
                : 'Log in with your email or username'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="identifier">
                  {isSignUp ? 'Email' : 'Email or Username'}
                </Label>
                <Input
                  id="identifier"
                  type={isSignUp ? 'email' : 'text'}
                  placeholder={isSignUp ? 'you@example.com' : 'Email or username'}
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading
                  ? 'Please wait...'
                  : isSignUp
                  ? 'Create Account'
                  : 'Log In'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-sm text-primary hover:underline"
              >
                {isSignUp
                  ? 'Already have an account? Log in'
                  : "Don't have an account? Sign up"}
              </button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default LoginPage;
