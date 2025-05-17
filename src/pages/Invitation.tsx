import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Components
const Navigation: React.FC = () => {
  return (
    <div className="bottom-nav">
      <a href="/dashboard" className="nav-item">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
        <span className="text-xs">Home</span>
      </a>
      <a href="/wallet" className="nav-item">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
        <span className="text-xs">Wallet</span>
      </a>
      <a href="/profile" className="nav-item">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        <span className="text-xs">Profile</span>
      </a>
      <a href="/invitation" className="nav-item active">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        <span className="text-xs">Invite</span>
      </a>
    </div>
  );
};

const Invitation: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [vipLevel, setVipLevel] = useState<string>('VIP 1');
  const [numberOfCodes, setNumberOfCodes] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Mock invitation codes
  const [invitationCodes, setInvitationCodes] = useState([
    { code: '7ggDwC5Ylo', level: 'VIP 2', status: 'Not Used', createdAt: '2025-01-09 16:17:59' },
    { code: 'yqdpab03d', level: 'VIP 2', status: 'Not Used', createdAt: '2025-01-09 16:17:59' },
    { code: 'Xs37LBwt5h', level: 'VIP 2', status: 'Used', createdAt: '2025-01-09 16:17:59' }
  ]);

  // Mock referral rewards data
  const referralRewards = [
    { level: 'Level 1', reward: '10%', description: 'Direct referrals' },
    { level: 'Level 2', reward: '5%', description: 'Referrals from your referrals' },
    { level: 'Level 3', reward: '2%', description: 'Extended network' }
  ];

  const handleGenerateCodes = async () => {
    if (!numberOfCodes) {
      setError('Please enter the number of codes to generate');
      return;
    }

    const numCodes = parseInt(numberOfCodes);
    if (isNaN(numCodes) || numCodes <= 0) {
      setError('Please enter a valid number greater than 0');
      return;
    }

    setIsGenerating(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate mock codes
      const newCodes = Array.from({ length: numCodes }, (_, i) => {
        const randomCode = Math.random().toString(36).substring(2, 10);
        return {
          code: randomCode,
          level: vipLevel,
          status: 'Not Used',
          createdAt: new Date().toISOString().replace('T', ' ').substring(0, 19)
        };
      });
      
      setInvitationCodes([...newCodes, ...invitationCodes]);
      setSuccess(`Successfully generated ${numCodes} invitation codes!`);
      setNumberOfCodes('');
      
      // Reset success message after a delay
      setTimeout(() => {
        setSuccess(null);
      }, 3000);
    } catch (err) {
      setError('Failed to generate codes. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleShare = (code: string) => {
    // In a real app, this would open native share dialog
    navigator.clipboard.writeText(`Join TravelRate with my invitation code: ${code}`).then(() => {
      alert('Invitation code copied to clipboard! Share it with your friends.');
    });
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

      <div className="p-4">
        <h2 className="text-xl font-bold text-center mb-4">Manage Invitation Codes</h2>
        
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 fade-in">
            <div className="flex justify-between items-center">
              <p>{success}</p>
              <button onClick={() => setSuccess(null)} className="text-green-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        )}
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 fade-in">
            <div className="flex justify-between items-center">
              <p>{error}</p>
              <button onClick={() => setError(null)} className="text-red-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        )}

        <div className="bg-white p-4 rounded-lg shadow-card mb-6">
          <div className="mb-4">
            <label htmlFor="vipLevel" className="form-label">
              VIP Level
            </label>
            <select
              id="vipLevel"
              className="form-input"
              value={vipLevel}
              onChange={(e) => setVipLevel(e.target.value)}
            >
              <option value="VIP 1">VIP 1</option>
              <option value="VIP 2">VIP 2</option>
              <option value="VIP 3">VIP 3</option>
            </select>
          </div>
          
          <div className="mb-4">
            <label htmlFor="numberOfCodes" className="form-label">
              Number of Codes
            </label>
            <input
              type="number"
              id="numberOfCodes"
              className="form-input"
              value={numberOfCodes}
              onChange={(e) => setNumberOfCodes(e.target.value)}
              placeholder="Enter number of codes to generate"
              min="1"
            />
          </div>
          
          <button
            onClick={handleGenerateCodes}
            disabled={isGenerating}
            className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark transition-colors duration-300 mb-3"
          >
            {isGenerating ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating...
              </span>
            ) : (
              'Generate Codes'
            )}
          </button>
          
          <button
            onClick={() => navigate('/invitation')}
            className="w-full bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors duration-300"
          >
            View All Codes
          </button>
        </div>

        <h3 className="text-lg font-semibold mb-2">All Invitation Codes</h3>
        <div className="bg-white rounded-lg shadow-card overflow-hidden mb-6">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">VIP Level</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {invitationCodes.map((code, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{code.code}</td>
                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">{code.level}</td>
                  <td className="px-3 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${code.status === 'Used' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {code.status}
                    </span>
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">{code.createdAt}</td>
                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button 
                      onClick={() => handleShare(code.code)}
                      className="text-secondary hover:text-secondary-dark"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="text-lg font-semibold mb-2">Referral Rewards Tracker</h3>
        <div className="bg-white rounded-lg shadow-card overflow-hidden mb-6">
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Earn rewards when your referrals complete tasks. Track your earnings and referral network here.
            </p>
            
            <div className="mb-4">
              <h4 className="font-medium mb-2">Your Referral Stats</h4>
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-gray-50 p-3 rounded-lg text-center">
                  <div className="text-xl font-bold text-primary">12</div>
                  <div className="text-xs text-gray-500">Total Referrals</div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg text-center">
                  <div className="text-xl font-bold text-green-500">$24.50</div>
                  <div className="text-xs text-gray-500">Earned Rewards</div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg text-center">
                  <div className="text-xl font-bold text-blue-500">3</div>
                  <div className="text-xs text-gray-500">Active Referrals</div>
                </div>
              </div>
            </div>
            
            <h4 className="font-medium mb-2">Reward Structure</h4>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Level</th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reward</th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {referralRewards.map((reward, index) => (
                  <tr key={index}>
                    <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{reward.level}</td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-green-500 font-semibold">{reward.reward}</td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">{reward.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <Navigation />
    </div>
  );
};

export default Invitation;
