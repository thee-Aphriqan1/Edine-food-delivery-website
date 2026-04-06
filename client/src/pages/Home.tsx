import OrderTracking from '@/components/OrderTracking';

/**
 * Home Page - Order Tracking Application
 * 
 * Design Philosophy: Modern Minimalist with Vibrant Accent
 * - Full page order tracking interface
 * - Real-time status updates with visual timeline
 * - Search and filter functionality
 * - Order history and notifications
 */

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <OrderTracking />
    </main>
  );
}
