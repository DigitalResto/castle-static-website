'use client';
import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer, Cell
} from 'recharts';
import { 
  Users, Clock, TrendingUp, UserCheck, 
  UserX, User, Calendar, Activity,
  TrendingDown, Percent, CreditCard,
  Award, UserPlus, ChefHat, Star,
  Utensils, DollarSign
} from 'lucide-react';
import { fetchDashboardData_FN } from '@/util/Axios/Methods/POST';

const Analytics = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [analyticsData, setAnalyticsData] = useState({
    customerFrequency: [],
    hourlyData: [],
    statusData: [],
    metrics: {
      totalBookings: 0,
      avgPartySize: 0,
      peakHour: 0,
      cancellationRate: 0,
      repeatCustomerRate: 0,
      avgWaitTime: 0,
      totalRevenue: 0,
      customerSatisfaction: 0
    }
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetchDashboardData_FN();
        const rawData = response.data.data;
        setData(rawData);
        processAnalytics(rawData);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const processAnalytics = (rawData) => {
    // Customer frequency with proper filtering
    const customerFreq = rawData.reduce((acc, booking) => {
      if (booking.name && booking.name.trim()) {
        acc[booking.name] = (acc[booking.name] || 0) + 1;
      }
      return acc;
    }, {});

    const frequentCustomers = Object.entries(customerFreq)
      .map(([name, count]) => ({ name, visits: count }))
      .sort((a, b) => b.visits - a.visits)
      .slice(0, 5);

    // Hourly patterns with validation
    const hourlyPatterns = rawData.reduce((acc, booking) => {
      const timestamp = new Date(booking.timestamp);
      if (!isNaN(timestamp)) {
        const hour = timestamp.getHours();
        acc[hour] = (acc[hour] || 0) + 1;
      }
      return acc;
    }, {});

    const hourlyData = Array.from({ length: 24 }, (_, i) => ({
      hour: i,
      bookings: hourlyPatterns[i] || 0
    }));

    // Status distribution with validation
    const statusCounts = rawData.reduce((acc, booking) => {
      const status = booking.isWaiting?.toLowerCase();
      if (status) {
        acc[status] = (acc[status] || 0) + 1;
      }
      return acc;
    }, {});

    const statusData = Object.entries(statusCounts).map(([status, count]) => ({
      status: status === 'waiting' ? 'Waiting' : status === 'accepted' ? 'Seated' : 'Cancelled',
      count
    }));

    // Calculate metrics with proper validation
    const validBookingsWithParty = rawData.filter(booking => 
      booking.persons && typeof booking.persons === 'number' && booking.persons > 0 && booking.persons < 100
    );

    const metrics = {
      totalBookings: rawData.length,
      avgPartySize: validBookingsWithParty.length > 0 
        ? (validBookingsWithParty.reduce((sum, booking) => sum + booking.persons, 0) / validBookingsWithParty.length).toFixed(1)
        : 0,
      peakHour: hourlyData.reduce((a, b) => a.bookings > b.bookings ? a : b).hour,
      cancellationRate: ((statusCounts.rejected || 0) / rawData.length * 100).toFixed(1),
      repeatCustomerRate: ((Object.values(customerFreq).filter(count => count > 1).length / Object.keys(customerFreq).length) * 100).toFixed(1),
      avgWaitTime: (Math.random() * 20 + 10).toFixed(1), // Placeholder for actual wait time calculation
      totalRevenue: (Math.random() * 10000 + 5000).toFixed(0), // Placeholder for actual revenue
      customerSatisfaction: (Math.random() * 20 + 80).toFixed(1) // Placeholder for actual satisfaction score
    };

    setAnalyticsData({
      customerFrequency: frequentCustomers,
      hourlyData,
      statusData,
      metrics
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-green-500"></div>
      </div>
    );
  }

  const MetricCard = ({ icon: Icon, title, value, color }) => (
    <div className="bg-white rounded-lg shadow p-6 transform transition-all hover:scale-105">
      <div className="flex items-center justify-between">
        <div className={`p-3 rounded-full bg-${color}-100 text-${color}-600`}>
          <Icon className="h-6 w-6" />
        </div>
        <div className="ml-4 flex-1 text-right">
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
          <ChefHat className="h-8 w-8 mr-3 text-blue-500" />
          Restaurant Analytics Dashboard
        </h1>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            icon={Users}
            title="Total Bookings"
            value={analyticsData.metrics.totalBookings}
            color="blue"
          />
          <MetricCard
            icon={User}
            title="Avg Party Size"
            value={analyticsData.metrics.avgPartySize}
            color="green"
          />
          <MetricCard
            icon={Clock}
            title="Peak Hour"
            value={`${analyticsData.metrics.peakHour}:00`}
            color="yellow"
          />
          <MetricCard
            icon={Percent}
            title="Cancellation Rate"
            value={`${analyticsData.metrics.cancellationRate}%`}
            color="red"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            icon={UserPlus}
            title="Repeat Customers"
            value={`${analyticsData.metrics.repeatCustomerRate}%`}
            color="purple"
          />
          <MetricCard
            icon={Clock}
            title="Avg Wait Time"
            value={`${analyticsData.metrics.avgWaitTime} min`}
            color="indigo"
          />
          <MetricCard
            icon={DollarSign}
            title="Total Revenue"
            value={`$${analyticsData.metrics.totalRevenue}`}
            color="emerald"
          />
          <MetricCard
            icon={Star}
            title="Satisfaction"
            value={`${analyticsData.metrics.customerSatisfaction}%`}
            color="amber"
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Hourly Bookings */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                <Activity className="h-5 w-5 mr-2 text-blue-500" />
                Hourly Booking Pattern
              </h2>
            </div>
            <div className="h-80 w-full">
              <ResponsiveContainer>
                <LineChart data={analyticsData.hourlyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="hour" 
                    tickFormatter={(hour) => `${hour}:00`}
                  />
                  <YAxis />
                  <Tooltip 
                    formatter={(value, name) => [value, 'Bookings']}
                    labelFormatter={(hour) => `${hour}:00`}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="bookings" 
                    stroke="#3B82F6" 
                    strokeWidth={2}
                    dot={{ fill: '#3B82F6' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Status Distribution */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                <Utensils className="h-5 w-5 mr-2 text-green-500" />
                Booking Status Distribution
              </h2>
            </div>
            <div className="h-80 w-full">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={analyticsData.statusData}
                    dataKey="count"
                    nameKey="status"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                  >
                    {analyticsData.statusData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={
                          entry.status === 'Waiting' ? '#FCD34D' :
                          entry.status === 'Seated' ? '#34D399' :
                          '#EF4444'
                        }
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Frequent Customers */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                <Award className="h-5 w-5 mr-2 text-indigo-500" />
                Top Customers
              </h2>
            </div>
            <div className="h-80 w-full">
              <ResponsiveContainer>
                <BarChart data={analyticsData.customerFrequency}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="visits" fill="#6366F1" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;