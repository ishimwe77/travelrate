import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define types for admin roles
export type AdminRole = 'super_admin' | 'moderator' | 'support';

// Define user type
export interface User {
  id: string;
  username: string;
  vipLevel: number;
  profitBalance: number;
  taskBalance?: number;
  totalAssets?: number;
  email?: string;
  registrationDate?: string;
  lastActive?: string;
  referredBy?: string;
  status: 'active' | 'suspended' | 'banned';
}

// Define hotel type
export interface Hotel {
  id: string;
  name: string;
  location: string;
  image: string;
  taskPrice: number;
  taskProfit: number;
  likes: number;
  description?: string;
  status: 'active' | 'inactive';
  dateAdded: string;
}

// Define rating type
export interface Rating {
  id: string;
  hotelId: string;
  userId: string;
  username: string;
  rating: number;
  date: string;
  status: 'approved' | 'pending' | 'flagged';
}

// Define invitation code type
export interface InvitationCode {
  code: string;
  vipLevel: number;
  status: 'used' | 'not_used';
  createdAt: string;
  usedBy?: string;
  usedAt?: string;
}

// Define analytics data type
export interface AnalyticsData {
  dailyActiveUsers: number;
  totalUsers: number;
  newUsersToday: number;
  ratingsToday: number;
  totalRatings: number;
  revenueToday: number;
  totalRevenue: number;
  usersByVipLevel: {
    vip1: number;
    vip2: number;
    vip3: number;
  };
}

// Define admin context type
interface AdminContextType {
  // Authentication
  isAuthenticated: boolean;
  currentAdmin: {
    username: string;
    role: AdminRole;
  } | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  
  // User management
  users: User[];
  fetchUsers: () => Promise<void>;
  updateUser: (userId: string, data: Partial<User>) => Promise<boolean>;
  deleteUser: (userId: string) => Promise<boolean>;
  upgradeUserVip: (userId: string) => Promise<boolean>;
  updateUserBalance: (userId: string, newBalance: number) => Promise<boolean>;
  
  // Hotel management
  hotels: Hotel[];
  fetchHotels: () => Promise<void>;
  addHotel: (hotel: Omit<Hotel, 'id' | 'dateAdded'>) => Promise<boolean>;
  updateHotel: (hotelId: string, data: Partial<Hotel>) => Promise<boolean>;
  deleteHotel: (hotelId: string) => Promise<boolean>;
  
  // Rating management
  ratings: Rating[];
  fetchRatings: () => Promise<void>;
  updateRatingStatus: (ratingId: string, status: Rating['status']) => Promise<boolean>;
  deleteRating: (ratingId: string) => Promise<boolean>;
  
  // Invitation code management
  invitationCodes: InvitationCode[];
  fetchInvitationCodes: () => Promise<void>;
  generateInvitationCodes: (vipLevel: number, count: number) => Promise<string[]>;
  
  // Analytics
  analytics: AnalyticsData | null;
  fetchAnalytics: () => Promise<void>;
  
  // Export functionality
  exportUsers: () => Promise<string>;
  exportHotels: () => Promise<string>;
  exportRatings: () => Promise<string>;
  
  // Loading states
  isLoading: boolean;
  error: string | null;
}

// Create the context
const AdminContext = createContext<AdminContextType | undefined>(undefined);

// Mock data for development
const mockUsers: User[] = [
  { id: '9350640', username: 'Daddy', vipLevel: 2, profitBalance: 2.44, status: 'active' },
  { id: '9760816', username: 'Latexx', vipLevel: 1, profitBalance: 20.04, status: 'active' },
  { id: '4560295', username: 'Latefat', vipLevel: 1, profitBalance: 0.00, status: 'active' },
  { id: '1935704', username: 'Program', vipLevel: 3, profitBalance: 7.64, status: 'active' },
  { id: '6263952', username: 'Radio', vipLevel: 2, profitBalance: 9.80, status: 'active' },
];

const mockHotels: Hotel[] = [
  {
    id: '1',
    name: 'Burj Al Arab Jumeirah',
    location: 'Dubai, United Arab Emirates',
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd',
    taskPrice: 1.65,
    taskProfit: 45.00,
    likes: 4711,
    status: 'active',
    dateAdded: '2025-01-01'
  },
  {
    id: '2',
    name: 'Katikies Hotel',
    location: 'Santorini, Greece',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945',
    taskPrice: 1.65,
    taskProfit: 45.00,
    likes: 5004,
    status: 'active',
    dateAdded: '2025-01-02'
  },
  {
    id: '3',
    name: 'Aman Tokyo',
    location: 'Tokyo, Japan',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb',
    taskPrice: 1.65,
    taskProfit: 45.00,
    likes: 5001,
    status: 'active',
    dateAdded: '2025-01-03'
  }
];

const mockInvitationCodes: InvitationCode[] = [
  { code: 'roBl07fdMu', vipLevel: 1, status: 'not_used', createdAt: '2025-01-09 16:18:49' },
  { code: '1wtzu4ATWE', vipLevel: 1, status: 'not_used', createdAt: '2025-01-09 16:18:49' },
  { code: 'YKKpudfzg2', vipLevel: 1, status: 'not_used', createdAt: '2025-01-09 16:18:49' },
  { code: 'LlLJlVQRLP', vipLevel: 3, status: 'not_used', createdAt: '2025-01-09 16:18:42' },
  { code: 'KnpL006K5v', vipLevel: 3, status: 'not_used', createdAt: '2025-01-09 16:18:42' },
  { code: 'wu9g12lPlG', vipLevel: 2, status: 'not_used', createdAt: '2025-01-09 16:18:35' },
  { code: 'NOyc5yQkQx', vipLevel: 2, status: 'not_used', createdAt: '2025-01-09 16:18:35' },
];

const mockAnalytics: AnalyticsData = {
  dailyActiveUsers: 245,
  totalUsers: 1250,
  newUsersToday: 37,
  ratingsToday: 128,
  totalRatings: 5430,
  revenueToday: 210.45,
  totalRevenue: 8750.20,
  usersByVipLevel: {
    vip1: 850,
    vip2: 320,
    vip3: 80
  }
};

// Create the provider component
export const AdminProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentAdmin, setCurrentAdmin] = useState<{ username: string; role: AdminRole } | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [invitationCodes, setInvitationCodes] = useState<InvitationCode[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Check if admin is already logged in (from localStorage)
  useEffect(() => {
    const storedAdmin = localStorage.getItem('travelrate_admin');
    if (storedAdmin) {
      try {
        const adminData = JSON.parse(storedAdmin);
        setIsAuthenticated(true);
        setCurrentAdmin(adminData);
      } catch (err) {
        localStorage.removeItem('travelrate_admin');
      }
    }
  }, []);

  // Login function
  const login = async (username: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock authentication logic
      if (username === 'admin' && password === 'admin123') {
        const adminData = { username: 'admin', role: 'super_admin' as AdminRole };
        setIsAuthenticated(true);
        setCurrentAdmin(adminData);
        localStorage.setItem('travelrate_admin', JSON.stringify(adminData));
        return true;
      } else if (username === 'moderator' && password === 'mod123') {
        const adminData = { username: 'moderator', role: 'moderator' as AdminRole };
        setIsAuthenticated(true);
        setCurrentAdmin(adminData);
        localStorage.setItem('travelrate_admin', JSON.stringify(adminData));
        return true;
      } else if (username === 'support' && password === 'support123') {
        const adminData = { username: 'support', role: 'support' as AdminRole };
        setIsAuthenticated(true);
        setCurrentAdmin(adminData);
        localStorage.setItem('travelrate_admin', JSON.stringify(adminData));
        return true;
      } else {
        setError('Invalid username or password');
        return false;
      }
    } catch (err) {
      setError('Login failed. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setIsAuthenticated(false);
    setCurrentAdmin(null);
    localStorage.removeItem('travelrate_admin');
  };

  // Fetch users
  const fetchUsers = async (): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 800));
      setUsers(mockUsers);
    } catch (err) {
      setError('Failed to fetch users');
    } finally {
      setIsLoading(false);
    }
  };

  // Update user
  const updateUser = async (userId: string, data: Partial<User>): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setUsers(prevUsers => 
        prevUsers.map(user => 
          user.id === userId ? { ...user, ...data } : user
        )
      );
      
      return true;
    } catch (err) {
      setError('Failed to update user');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Delete user
  const deleteUser = async (userId: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
      
      return true;
    } catch (err) {
      setError('Failed to delete user');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Upgrade user VIP level
  const upgradeUserVip = async (userId: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setUsers(prevUsers => 
        prevUsers.map(user => 
          user.id === userId ? { ...user, vipLevel: Math.min(user.vipLevel + 1, 3) } : user
        )
      );
      
      return true;
    } catch (err) {
      setError('Failed to upgrade user VIP level');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Update user balance
  const updateUserBalance = async (userId: string, newBalance: number): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setUsers(prevUsers => 
        prevUsers.map(user => 
          user.id === userId ? { ...user, profitBalance: newBalance } : user
        )
      );
      
      return true;
    } catch (err) {
      setError('Failed to update user balance');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch hotels
  const fetchHotels = async (): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 800));
      setHotels(mockHotels);
    } catch (err) {
      setError('Failed to fetch hotels');
    } finally {
      setIsLoading(false);
    }
  };

  // Add hotel
  const addHotel = async (hotel: Omit<Hotel, 'id' | 'dateAdded'>): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const newHotel: Hotel = {
        ...hotel,
        id: Math.random().toString(36).substring(2, 10),
        dateAdded: new Date().toISOString().split('T')[0]
      };
      
      setHotels(prevHotels => [...prevHotels, newHotel]);
      
      return true;
    } catch (err) {
      setError('Failed to add hotel');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Update hotel
  const updateHotel = async (hotelId: string, data: Partial<Hotel>): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setHotels(prevHotels => 
        prevHotels.map(hotel => 
          hotel.id === hotelId ? { ...hotel, ...data } : hotel
        )
      );
      
      return true;
    } catch (err) {
      setError('Failed to update hotel');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Delete hotel
  const deleteHotel = async (hotelId: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setHotels(prevHotels => prevHotels.filter(hotel => hotel.id !== hotelId));
      
      return true;
    } catch (err) {
      setError('Failed to delete hotel');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch ratings
  const fetchRatings = async (): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock ratings data
      const mockRatings: Rating[] = [
        { id: '1', hotelId: '1', userId: '9350640', username: 'Daddy', rating: 5, date: '2025-01-09', status: 'approved' },
        { id: '2', hotelId: '2', userId: '9760816', username: 'Latexx', rating: 4, date: '2025-01-09', status: 'approved' },
        { id: '3', hotelId: '3', userId: '4560295', username: 'Latefat', rating: 3, date: '2025-01-09', status: 'flagged' },
        { id: '4', hotelId: '1', userId: '1935704', username: 'Program', rating: 5, date: '2025-01-09', status: 'pending' },
      ];
      
      setRatings(mockRatings);
    } catch (err) {
      setError('Failed to fetch ratings');
    } finally {
      setIsLoading(false);
    }
  };

  // Update rating status
  const updateRatingStatus = async (ratingId: string, status: Rating['status']): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setRatings(prevRatings => 
        prevRatings.map(rating => 
          rating.id === ratingId ? { ...rating, status } : rating
        )
      );
      
      return true;
    } catch (err) {
      setError('Failed to update rating status');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Delete rating
  const deleteRating = async (ratingId: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setRatings(prevRatings => prevRatings.filter(rating => rating.id !== ratingId));
      
      return true;
    } catch (err) {
      setError('Failed to delete rating');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch invitation codes
  const fetchInvitationCodes = async (): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 800));
      setInvitationCodes(mockInvitationCodes);
    } catch (err) {
      setError('Failed to fetch invitation codes');
    } finally {
      setIsLoading(false);
    }
  };

  // Generate invitation codes
  const generateInvitationCodes = async (vipLevel: number, count: number): Promise<string[]> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const generateCode = () => Math.random().toString(36).substring(2, 12).toUpperCase();
      
      const newCodes: InvitationCode[] = Array.from({ length: count }, () => ({
        code: generateCode(),
        vipLevel,
        status: 'not_used',
        createdAt: new Date().toISOString().replace('T', ' ').substring(0, 19)
      }));
      
      setInvitationCodes(prevCodes => [...prevCodes, ...newCodes]);
      
      return newCodes.map(code => code.code);
    } catch (err) {
      setError('Failed to generate invitation codes');
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch analytics
  const fetchAnalytics = async (): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 800));
      setAnalytics(mockAnalytics);
    } catch (err) {
      setError('Failed to fetch analytics');
    } finally {
      setIsLoading(false);
    }
  };

  // Export users
  const exportUsers = async (): Promise<string> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, this would generate a CSV file
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const headers = ['ID', 'Username', 'VIP Level', 'Profit Balance', 'Status'];
      const rows = users.map(user => [
        user.id,
        user.username,
        user.vipLevel.toString(),
        user.profitBalance.toFixed(2),
        user.status
      ]);
      
      const csvContent = [
        headers.join(','),
        ...rows.map(row => row.join(','))
      ].join('\n');
      
      // In a real app, this would return a download URL
      return csvContent;
    } catch (err) {
      setError('Failed to export users');
      return '';
    } finally {
      setIsLoading(false);
    }
  };

  // Export hotels
  const exportHotels = async (): Promise<string> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, this would generate a CSV file
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const headers = ['ID', 'Name', 'Location', 'Task Price', 'Task Profit', 'Likes', 'Status', 'Date Added'];
      const rows = hotels.map(hotel => [
        hotel.id,
        hotel.name,
        hotel.location,
        hotel.taskPrice.toFixed(2),
        hotel.taskProfit.toFixed(2),
        hotel.likes.toString(),
        hotel.status,
        hotel.dateAdded
      ]);
      
      const csvContent = [
        headers.join(','),
        ...rows.map(row => row.join(','))
      ].join('\n');
      
      // In a real app, this would return a download URL
      return csvContent;
    } catch (err) {
      setError('Failed to export hotels');
      return '';
    } finally {
      setIsLoading(false);
    }
  };

  // Export ratings
  const exportRatings = async (): Promise<string> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, this would generate a CSV file
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const headers = ['ID', 'Hotel ID', 'User ID', 'Username', 'Rating', 'Date', 'Status'];
      const rows = ratings.map(rating => [
        rating.id,
        rating.hotelId,
        rating.userId,
        rating.username,
        rating.rating.toString(),
        rating.date,
        rating.status
      ]);
      
      const csvContent = [
        headers.join(','),
        ...rows.map(row => row.join(','))
      ].join('\n');
      
      // In a real app, this would return a download URL
      return csvContent;
    } catch (err) {
      setError('Failed to export ratings');
      return '';
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    isAuthenticated,
    currentAdmin,
    login,
    logout,
    users,
    fetchUsers,
    updateUser,
    deleteUser,
    upgradeUserVip,
    updateUserBalance,
    hotels,
    fetchHotels,
    addHotel,
    updateHotel,
    deleteHotel,
    ratings,
    fetchRatings,
    updateRatingStatus,
    deleteRating,
    invitationCodes,
    fetchInvitationCodes,
    generateInvitationCodes,
    analytics,
    fetchAnalytics,
    exportUsers,
    exportHotels,
    exportRatings,
    isLoading,
    error
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};

// Custom hook to use the admin context
export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
