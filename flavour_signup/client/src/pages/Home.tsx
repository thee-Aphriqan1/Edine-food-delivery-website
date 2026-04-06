import SignupForm from '@/components/SignupForm';

/**
 * Home Page - Flavour Signup Form
 * 
 * Design Philosophy: Modern Minimalist with Vibrant Accent
 * - Clean white background with centered form card
 * - Bold red-orange accent color (#E74C3C) for brand identity
 * - Generous whitespace and clear visual hierarchy
 * - Smooth animations and transitions for interactivity
 */

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <SignupForm />
    </main>
  );
}
