import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const OnboardingPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    username: '',
    first_name: '',
    last_name: '',
    date_of_birth: null,
    last_period_date: null,
    cycle_length: 28,
    period_length: 5,
    period_start_date: null,
    period_end_date: null,
  });

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.username.trim()) {
      toast.error('Username is required');
      return;
    }
    if (!formData.first_name.trim()) {
      toast.error('First name is required');
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          username: formData.username.trim().toLowerCase(),
          first_name: formData.first_name.trim(),
          last_name: formData.last_name.trim(),
          date_of_birth: formData.date_of_birth ? format(formData.date_of_birth, 'yyyy-MM-dd') : null,
          last_period_date: formData.last_period_date ? format(formData.last_period_date, 'yyyy-MM-dd') : null,
          cycle_length: formData.cycle_length,
          period_length: formData.period_length,
          period_start_date: formData.period_start_date ? format(formData.period_start_date, 'yyyy-MM-dd') : null,
          period_end_date: formData.period_end_date ? format(formData.period_end_date, 'yyyy-MM-dd') : null,
          onboarding_completed: true,
        })
        .eq('user_id', user.id);

      if (error) {
        if (error.message.includes('unique') || error.message.includes('duplicate')) {
          toast.error('Username already taken. Please choose another.');
        } else {
          throw error;
        }
        return;
      }

      toast.success('Profile saved! Welcome to FloTrack 🌸');
      navigate('/', { replace: true });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const DatePickerField = ({ label, value, onChange, maxDate }) => (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              'w-full justify-start text-left font-normal',
              !value && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {value ? format(value, 'PPP') : 'Pick a date'}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={value}
            onSelect={onChange}
            disabled={(date) => date > (maxDate || new Date())}
            initialFocus
            className={cn('p-3 pointer-events-auto')}
          />
        </PopoverContent>
      </Popover>
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-lg"
      >
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-full bg-primary mx-auto mb-3 flex items-center justify-center shadow-lg">
            <span className="text-primary-foreground text-xl font-bold">F</span>
          </div>
          <h1 className="text-2xl font-display font-bold text-foreground">Complete Your Profile</h1>
          <p className="text-muted-foreground mt-1">Step {step} of 2</p>
        </div>

        <Card className="shadow-lg border-border/50">
          <CardHeader>
            <CardTitle className="text-lg">
              {step === 1 ? 'Personal Information' : 'Cycle Information'}
            </CardTitle>
            <CardDescription>
              {step === 1
                ? 'Tell us a bit about yourself'
                : 'Help us personalize your cycle tracking'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {step === 1 ? (
              <>
                <div className="space-y-2">
                  <Label htmlFor="username">Username *</Label>
                  <Input
                    id="username"
                    placeholder="Choose a username"
                    value={formData.username}
                    onChange={(e) => updateField('username', e.target.value)}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="first_name">First Name *</Label>
                    <Input
                      id="first_name"
                      placeholder="First name"
                      value={formData.first_name}
                      onChange={(e) => updateField('first_name', e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last_name">Last Name</Label>
                    <Input
                      id="last_name"
                      placeholder="Last name"
                      value={formData.last_name}
                      onChange={(e) => updateField('last_name', e.target.value)}
                    />
                  </div>
                </div>
                <DatePickerField
                  label="Date of Birth"
                  value={formData.date_of_birth}
                  onChange={(d) => updateField('date_of_birth', d)}
                />
                <Button
                  className="w-full mt-2"
                  onClick={() => {
                    if (!formData.username.trim() || !formData.first_name.trim()) {
                      toast.error('Username and first name are required');
                      return;
                    }
                    setStep(2);
                  }}
                >
                  Next →
                </Button>
              </>
            ) : (
              <>
                <DatePickerField
                  label="Last Period Date"
                  value={formData.last_period_date}
                  onChange={(d) => updateField('last_period_date', d)}
                />
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="cycle_length">Cycle Length (days)</Label>
                    <Input
                      id="cycle_length"
                      type="number"
                      min={18}
                      max={45}
                      value={formData.cycle_length}
                      onChange={(e) => updateField('cycle_length', parseInt(e.target.value) || 28)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="period_length">Period Length (days)</Label>
                    <Input
                      id="period_length"
                      type="number"
                      min={1}
                      max={14}
                      value={formData.period_length}
                      onChange={(e) => updateField('period_length', parseInt(e.target.value) || 5)}
                    />
                  </div>
                </div>
                <DatePickerField
                  label="Period Start Date"
                  value={formData.period_start_date}
                  onChange={(d) => updateField('period_start_date', d)}
                />
                <DatePickerField
                  label="Period End Date"
                  value={formData.period_end_date}
                  onChange={(d) => updateField('period_end_date', d)}
                />
                <div className="flex gap-3 mt-2">
                  <Button variant="outline" className="flex-1" onClick={() => setStep(1)}>
                    ← Back
                  </Button>
                  <Button className="flex-1" onClick={handleSubmit} disabled={loading}>
                    {loading ? 'Saving...' : 'Complete Setup'}
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default OnboardingPage;
