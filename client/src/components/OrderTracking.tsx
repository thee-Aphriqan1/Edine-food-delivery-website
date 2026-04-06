import { useState, useMemo } from 'react';
import { Search, MapPin, Clock, Package, Truck, CheckCircle, Bell, Filter } from 'lucide-react';

/**
 * OrderTracking Component
 * 
 * Design Philosophy: Modern Minimalist with Vibrant Accent
 * - Full page layout with order timeline and delivery tracking
 * - Real-time status updates with visual indicators
 * - Search and filter functionality for order history
 * - Notifications for order status changes
 */

interface Order {
  id: string;
  orderNumber: string;
  items: string[];
  total: number;
  status: 'placed' | 'confirmed' | 'preparing' | 'out_for_delivery' | 'delivered';
  estimatedDelivery: string;
  deliveryAddress: string;
  createdAt: string;
  notifications: string[];
}

const mockOrders: Order[] = [
  {
    id: '1',
    orderNumber: 'ORD-2026-001',
    items: ['Margherita Pizza', 'Caesar Salad', 'Coca Cola'],
    total: 4599,
    status: 'out_for_delivery',
    estimatedDelivery: '20 mins',
    deliveryAddress: '123 Main St, Apt 4B',
    createdAt: '2026-04-06T10:30:00',
    notifications: ['Order confirmed', 'Preparing your food', 'Out for delivery'],
  },
  {
    id: '2',
    orderNumber: 'ORD-2026-002',
    items: ['Burger Combo', 'Fries', 'Milkshake'],
    total: 3250,
    status: 'delivered',
    estimatedDelivery: 'Delivered',
    deliveryAddress: '456 Oak Ave, Suite 200',
    createdAt: '2026-04-05T18:45:00',
    notifications: ['Order confirmed', 'Preparing your food', 'Out for delivery', 'Delivered'],
  },
  {
    id: '3',
    orderNumber: 'ORD-2026-003',
    items: ['Sushi Platter', 'Edamame', 'Green Tea'],
    total: 5875,
    status: 'preparing',
    estimatedDelivery: '35 mins',
    deliveryAddress: '789 Pine Rd, Apt 10',
    createdAt: '2026-04-06T11:15:00',
    notifications: ['Order confirmed', 'Preparing your food'],
  },
];

const statusConfig = {
  placed: { label: 'Order Placed', icon: Package, color: '#95A5A6' },
  confirmed: { label: 'Confirmed', icon: CheckCircle, color: '#3498DB' },
  preparing: { label: 'Preparing', icon: Clock, color: '#F39C12' },
  out_for_delivery: { label: 'Out for Delivery', icon: Truck, color: '#E74C3C' },
  delivered: { label: 'Delivered', icon: CheckCircle, color: '#27AE60' },
};

export default function OrderTracking() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(mockOrders[0]);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [showNotifications, setShowNotifications] = useState(false);

  const filteredOrders = useMemo(() => {
    return mockOrders.filter(order => {
      const matchesSearch = 
        order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.items.some(item => item.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesFilter = filterStatus === 'all' || order.status === filterStatus;
      
      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, filterStatus]);

  const getStatusSteps = (currentStatus: string) => {
    const steps = ['placed', 'confirmed', 'preparing', 'out_for_delivery', 'delivered'];
    return steps.map(step => ({
      key: step,
      completed: steps.indexOf(step) <= steps.indexOf(currentStatus),
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b-2 border-[#ECF0F1]">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-[#2C3E50]">
              Order <span className="text-[#E74C3C]">Tracking</span>
            </h1>
            <p className="text-[#95A5A6] text-sm mt-1">Track your food delivery in real-time</p>
          </div>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-3 bg-[#F8F9FA] rounded-lg hover:bg-[#ECF0F1] transition-colors duration-200"
          >
            <Bell size={24} className="text-[#E74C3C]" />
            <span className="absolute top-1 right-1 w-3 h-3 bg-[#E74C3C] rounded-full"></span>
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar - Orders List */}
          <div className="lg:col-span-1">
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#95A5A6]" size={20} />
                <input
                  type="text"
                  placeholder="Search orders..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-[#ECF0F1] rounded-lg focus:outline-none focus:border-[#E74C3C] focus:ring-2 focus:ring-[#E74C3C]/20 transition-all duration-200"
                />
              </div>
            </div>

            {/* Filter */}
            <div className="mb-6">
              <label className="flex items-center gap-2 text-sm font-medium text-[#2C3E50] mb-3">
                <Filter size={16} /> Filter by Status
              </label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-4 py-2 border-2 border-[#ECF0F1] rounded-lg focus:outline-none focus:border-[#E74C3C] focus:ring-2 focus:ring-[#E74C3C]/20 transition-all duration-200"
              >
                <option value="all">All Orders</option>
                <option value="placed">Placed</option>
                <option value="confirmed">Confirmed</option>
                <option value="preparing">Preparing</option>
                <option value="out_for_delivery">Out for Delivery</option>
                <option value="delivered">Delivered</option>
              </select>
            </div>

            {/* Orders List */}
            <div className="space-y-3">
              {filteredOrders.map((order) => (
                <button
                  key={order.id}
                  onClick={() => setSelectedOrder(order)}
                  className={`w-full p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                    selectedOrder?.id === order.id
                      ? 'border-[#E74C3C] bg-[#FFF5F3]'
                      : 'border-[#ECF0F1] bg-white hover:border-[#E74C3C]/50'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-bold text-[#2C3E50]">{order.orderNumber}</span>
                    <span className={`text-xs font-semibold px-2 py-1 rounded ${
                      order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                      order.status === 'out_for_delivery' ? 'bg-orange-100 text-orange-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {statusConfig[order.status as keyof typeof statusConfig]?.label}
                    </span>
                  </div>
                  <p className="text-sm text-[#95A5A6] mb-2">{order.items.slice(0, 2).join(', ')}</p>
                  <p className="text-sm font-semibold text-[#E74C3C]">KES {order.total.toLocaleString()}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Right Content - Order Details */}
          {selectedOrder && (
            <div className="lg:col-span-2">
              {/* Order Header */}
              <div className="bg-white rounded-lg border-2 border-[#ECF0F1] p-6 mb-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-[#2C3E50]">{selectedOrder.orderNumber}</h2>
                    <p className="text-[#95A5A6] text-sm">
                      Placed on {new Date(selectedOrder.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-[#E74C3C]">KES {selectedOrder.total.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              {/* Status Timeline */}
              <div className="bg-white rounded-lg border-2 border-[#ECF0F1] p-6 mb-6">
                <h3 className="text-lg font-bold text-[#2C3E50] mb-6">Order Status</h3>
                <div className="flex items-center justify-between">
                  {getStatusSteps(selectedOrder.status).map((step, index) => {
                    const config = statusConfig[step.key as keyof typeof statusConfig];
                    const Icon = config.icon;
                    return (
                      <div key={step.key} className="flex flex-col items-center flex-1">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all duration-200 ${
                          step.completed 
                            ? 'bg-[#E74C3C] text-white' 
                            : 'bg-[#ECF0F1] text-[#95A5A6]'
                        }`}>
                          <Icon size={24} />
                        </div>
                        <p className={`text-xs font-semibold text-center ${
                          step.completed ? 'text-[#2C3E50]' : 'text-[#95A5A6]'
                        }`}>
                          {config.label}
                        </p>
                        {index < getStatusSteps(selectedOrder.status).length - 1 && (
                          <div className={`absolute w-16 h-1 mt-6 ${
                            step.completed ? 'bg-[#E74C3C]' : 'bg-[#ECF0F1]'
                          }`} style={{marginLeft: '60px'}}></div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Delivery Info */}
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="bg-white rounded-lg border-2 border-[#ECF0F1] p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Clock className="text-[#E74C3C]" size={20} />
                    <h4 className="font-bold text-[#2C3E50]">Estimated Delivery</h4>
                  </div>
                  <p className="text-2xl font-bold text-[#E74C3C]">{selectedOrder.estimatedDelivery}</p>
                </div>

                <div className="bg-white rounded-lg border-2 border-[#ECF0F1] p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <MapPin className="text-[#E74C3C]" size={20} />
                    <h4 className="font-bold text-[#2C3E50]">Delivery Address</h4>
                  </div>
                  <p className="text-sm text-[#2C3E50]">{selectedOrder.deliveryAddress}</p>
                </div>
              </div>

              {/* Order Items */}
              <div className="bg-white rounded-lg border-2 border-[#ECF0F1] p-6 mb-6">
                <h3 className="text-lg font-bold text-[#2C3E50] mb-4">Order Items</h3>
                <div className="space-y-3">
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center pb-3 border-b border-[#ECF0F1] last:border-0">
                      <span className="text-[#2C3E50]">{item}</span>
                      <span className="text-[#95A5A6] text-sm">×1</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notifications */}
              <div className="bg-white rounded-lg border-2 border-[#ECF0F1] p-6">
                <h3 className="text-lg font-bold text-[#2C3E50] mb-4">Order Updates</h3>
                <div className="space-y-3">
                  {selectedOrder.notifications.map((notification, index) => (
                    <div key={index} className="flex items-start gap-3 pb-3 border-b border-[#ECF0F1] last:border-0">
                      <div className="w-2 h-2 bg-[#E74C3C] rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-[#2C3E50] text-sm">{notification}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
