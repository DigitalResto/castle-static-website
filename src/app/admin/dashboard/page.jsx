'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  LogOut,
  ClipboardList,
  UserCheck,
  UserX,
  User,
  Search,
  MessageSquare,
  Menu,
  X
} from 'lucide-react';
import { fetchDashboardData_FN, UPDATE_OTP_STATUS_FN } from '@/util/Axios/Methods/POST';
import AdminProtected from '@/components/auth/AdminProtected';

export default function Dashboard() {
  const router = useRouter();
  const [stats, setStats] = useState({ waiting: 0, seated: 0, cancelled: 0 });
  const [registrations, setRegistrations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDate, setFilterDate] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isOtpEnabled, setIsOtpEnabled] = useState(false);
  
  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const response = await fetchDashboardData_FN();
        const data = response.data.data;
        
        const calculatedStats = {
          waiting: data.filter(item => item.isWaiting === 'waiting').length,
          seated: data.filter(item => item.isWaiting === 'accepted').length,
          cancelled: data.filter(item => item.isWaiting === 'rejected').length
        };
        
        // Store ISO date strings instead of Date objects
        const formattedRegistrations = data.map(item => ({
          id: item._id,
          name: item.name,
          number: item.number,
          persons: item.persons,
          status: item.isWaiting,
          time:item.time,// Convert dates to ISO strings for consistent handling
          timestamp: item.timestamp || new Date().toISOString()
        }));

        setStats(calculatedStats);
        setRegistrations(formattedRegistrations);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('admin');
    router.replace('/admin/login');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleOtpToggle = async () => {
    try {
      
      const newOtpStatus = !isOtpEnabled;
      const response = await UPDATE_OTP_STATUS_FN(newOtpStatus);
      console.log(response);
      setIsOtpEnabled(newOtpStatus);
      alert(`OTP verification ${newOtpStatus ? 'enabled' : 'disabled'}`);
    } catch (error) {
      console.error('Error updating OTP settings:', error);
      // Show error message
      alert('Failed to update OTP settings');
    }
  };

  // Date comparison functions using ISO strings
  const isToday = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  };

  const isYesterday = (dateString) => {
    const date = new Date(dateString);
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return date.getDate() === yesterday.getDate() &&
           date.getMonth() === yesterday.getMonth() &&
           date.getFullYear() === yesterday.getFullYear();
  };

  // Memoize filtered registrations to avoid unnecessary recalculations
  const filteredRegistrations = registrations.filter(reg => {
    const matchesSearch = reg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reg.number.includes(searchTerm);
    
    let matchesDate = true;
    if (filterDate === 'today') {
      matchesDate = isToday(reg.timestamp);
    } else if (filterDate === 'yesterday') {
      matchesDate = isYesterday(reg.timestamp);
    }
    
    return matchesSearch && matchesDate;
  });

  const getStatusStyle = (status) => {
    switch(status) {
      case 'waiting':
        return 'bg-yellow-100 text-yellow-800';
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatStatus = (status) => {
    switch(status) {
      case 'waiting':
        return 'Waiting';
      case 'accepted':
        return 'Seated';
      case 'rejected':
        return 'Cancelled';
      default:
        return status;
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-green-500"></div>
      </div>
    );
  }

  const Header = () => (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Desktop Header */}
        <div className="hidden md:flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <img src="Resto-mandi-logo.png" alt="Logo" className="h-10 w-10 rounded-full" />
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleOtpToggle}
              className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                isOtpEnabled ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-600 hover:bg-gray-700'
              }`}
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              OTP {isOtpEnabled ? 'Enabled' : 'Disabled'}
            </button>
            <button
              onClick={() => router.push('/admin/view-waitlist')}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
            >
              <ClipboardList className="w-4 h-4 mr-2" />
              Waitlist
            </button>
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </button>
          </div>
        </div>

        {/* Mobile Header */}
        <div className="flex md:hidden justify-between items-center">
          <div className="flex items-center space-x-4">
            <button onClick={toggleSidebar} className="p-2">
              {isSidebarOpen ? (
                <X className="h-6 w-6 text-gray-600" />
              ) : (
                <Menu className="h-6 w-6 text-gray-600" />
              )}
            </button>
            <img src="Resto-mandi-logo.png" alt="Logo" className="h-8 w-8 rounded-full" />
            <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={toggleSidebar}></div>
          <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-xl">
            <div className="flex flex-col h-full">
              <div className="px-4 py-6 space-y-4">
                <button
                  onClick={handleOtpToggle}
                  className={`w-full inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                    isOtpEnabled ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-600 hover:bg-gray-700'
                  }`}
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  OTP {isOtpEnabled ? 'Enabled' : 'Disabled'}
                </button>
                <button
                  onClick={() => {
                    router.push('/admin/view-waitlist');
                    toggleSidebar();
                  }}
                  className="w-full inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
                >
                  <ClipboardList className="w-4 h-4 mr-2" />
                  Waitlist
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );

  return (
    <AdminProtected>
    <div className="min-h-screen bg-gray-50">
      <Header/>
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
                <User className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Waiting</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.waiting}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 text-green-600">
                <UserCheck className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Seated</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.seated}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-red-100 text-red-600">
                <UserX className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Cancelled</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.cancelled}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Registrations Section */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 md:mb-0">Recent Registrations</h2>
              
              <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 w-full md:w-auto">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search by name or phone..."
                    className="w-full md:w-64 pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>

                <select
                  className="w-full md:w-40 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                >
                  <option value="all">All Time</option>
                  <option value="today">Today</option>
                  <option value="yesterday">Yesterday</option>
                </select>
              </div>
            </div>

            {/* Registrations Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Persons</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {[...filteredRegistrations].reverse().map((registration) => (
                    <tr key={registration.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusStyle(registration.status)}`}>
                          {formatStatus(registration.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {registration.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {registration.number}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {registration.persons}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {registration.time}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
    </AdminProtected>
  );
}