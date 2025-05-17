import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

// Components
const Navigation: React.FC = () => {
  return (
    <div className="bottom-nav">
      <Link to="/dashboard" className="nav-item active">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
        <span className="text-xs">Home</span>
      </Link>
      <Link to="/wallet" className="nav-item">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
        <span className="text-xs">Wallet</span>
      </Link>
      <Link to="/profile" className="nav-item">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        <span className="text-xs">Profile</span>
      </Link>
      <Link to="/settings" className="nav-item">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <span className="text-xs">Settings</span>
      </Link>
    </div>
  );
};

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-background pb-16">
      {/* Header */}
      <header className="app-header">
        <div className="flex items-center">
          <h1 className="text-xl font-bold">TravelRate</h1>
          <div className="flex ml-2 space-x-1">
            <span className="h-2 w-2 rounded-full bg-red-500"></span>
            <span className="h-2 w-2 rounded-full bg-yellow-500"></span>
            <span className="h-2 w-2 rounded-full bg-green-500"></span>
            <span className="h-2 w-2 rounded-full bg-blue-500"></span>
            <span className="h-2 w-2 rounded-full bg-purple-500"></span>
          </div>
        </div>
        <button onClick={() => navigate('/settings')}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </header>

      {/* User Welcome Section */}
      <div className="bg-primary text-white p-6 pb-10">
        <div className="flex items-center mb-4">
          <div className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div>
            <div className="flex items-center">
              <span className="bg-yellow-400 text-xs text-gray-800 px-2 py-1 rounded-full font-bold mr-2">
                VIP {user?.vipLevel}
              </span>
            </div>
            <h2 className="text-xl font-bold mt-1">Good Afternoon, {user?.username}!</h2>
            <p className="text-sm opacity-80">Here's your overview for today</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="px-4 -mt-6">
        <div className="grid grid-cols-3 gap-4">
          <div className="stat-card">
            <div className="text-yellow-500 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div className="stat-value">${user?.taskBalance.toFixed(2)}</div>
            <div className="stat-label">Task Balance</div>
          </div>
          <div className="stat-card">
            <div className="text-green-500 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="stat-value">${user?.profitBalance.toFixed(2)}</div>
            <div className="stat-label">Profit Balance</div>
          </div>
          <div className="stat-card">
            <div className="text-blue-500 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="stat-value">${user?.totalAssets.toFixed(2)}</div>
            <div className="stat-label">Total Assets</div>
          </div>
        </div>
      </div>

      {/* Tasks Completed */}
      <div className="mt-8 px-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold">Tasks Completed</h3>
          <span className="text-primary font-medium">{user?.tasksCompleted}/30</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-primary h-2.5 rounded-full" 
            style={{ width: `${(user?.tasksCompleted || 0) / 30 * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Available Hotels to Rate */}
      <div className="mt-8 px-4">
        <h3 className="text-lg font-semibold mb-4">Rate These Hotels</h3>
        
        <div className="hotel-card fade-in">
          <img 
            src="https://images.unsplash.com/photo-1582719508461-905c673771fd?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZHViYWl8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80" 
            alt="Burj Al Arab Jumeirah" 
            className="hotel-image"
          />
          <div className="p-4">
            <h4 className="text-lg font-semibold">Burj Al Arab Jumeirah – Dubai, United Arab Emirates</h4>
            <div className="flex justify-between items-center mt-2">
              <div>
                <p className="text-gray-600">Task Price: <span className="text-blue-500 font-semibold">$1.65</span></p>
                <p className="text-gray-600">Task Profit: <span className="text-green-500 font-semibold">45.00%</span></p>
                <p className="text-gray-600 text-sm mt-1">4711 users liked this hotel.</p>
              </div>
              <Link 
                to="/rate" 
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors duration-300"
              >
                Like
              </Link>
            </div>
          </div>
        </div>

        <div className="hotel-card fade-in">
          <img 
            src="https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2FudG9yaW5pfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80" 
            alt="Katikies Hotel" 
            className="hotel-image"
          />
          <div className="p-4">
            <h4 className="text-lg font-semibold">Katikies Hotel – Santorini, Greece</h4>
            <div className="flex justify-between items-center mt-2">
              <div>
                <p className="text-gray-600">Task Price: <span className="text-blue-500 font-semibold">$1.65</span></p>
                <p className="text-gray-600">Task Profit: <span className="text-green-500 font-semibold">45.00%</span></p>
                <p className="text-gray-600 text-sm mt-1">5004 users liked this hotel.</p>
              </div>
              <Link 
                to="/rate" 
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors duration-300"
              >
                Like
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <Navigation />
    </div>
  );
};

export default Dashboard;
