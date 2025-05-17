import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LikeButton from '../components/LikeButton';

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
      <a href="/settings" className="nav-item active">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <span className="text-xs">Settings</span>
      </a>
    </div>
  );
};

const HotelRating: React.FC = () => {
  const navigate = useNavigate();
  const [rating, setRating] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [likeCount, setLikeCount] = useState<number>(5001);
  
  // Current hotel data (would come from API in real app)
  const hotel = {
    id: 'hotel123',
    name: 'Aman Tokyo',
    location: 'Tokyo, Japan',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    price: 1.65,
    profit: 45.00,
    likes: likeCount
  };

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };

  const handleSubmitRating = async () => {
    if (rating === 0) {
      setError('Please select a rating before submitting');
      return;
    }

    setIsSubmitting(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSuccess(true);
      
      // Reset after showing success message
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (err) {
      setError('Failed to submit rating. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleShare = () => {
    // In a real app, this would open native share dialog
    alert('Sharing functionality would be implemented here');
  };

  const handleLikeChange = (liked: boolean, newCount: number) => {
    setLikeCount(newCount);
    // In a real app, this would make an API call to update the like count
    console.log(`Hotel ${hotel.id} ${liked ? 'liked' : 'unliked'}. New count: ${newCount}`);
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
        <button onClick={() => navigate(-1)}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </header>

      <div className="p-4">
        <h2 className="text-xl font-bold text-center mb-4">Rate This Hotel</h2>
        
        {isSuccess ? (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 fade-in">
            <div className="flex justify-between items-center">
              <p>Successfully rated hotel: {hotel.name} – {hotel.location}</p>
              <button onClick={() => setIsSuccess(false)} className="text-green-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        ) : null}
        
        {error ? (
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
        ) : null}

        <div className="hotel-card">
          <img 
            src={hotel.image} 
            alt={hotel.name} 
            className="hotel-image"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold">{hotel.name} – {hotel.location}</h3>
            <div className="mt-2">
              <p className="text-gray-600">Task Price: <span className="text-blue-500 font-semibold">${hotel.price}</span></p>
              <p className="text-gray-600">Task Profit: <span className="text-green-500 font-semibold">{hotel.profit}%</span></p>
              <div className="flex items-center justify-between mt-2">
                <LikeButton 
                  initialLikes={hotel.likes} 
                  hotelId={hotel.id} 
                  onLikeChange={handleLikeChange}
                />
              </div>
            </div>
            
            <div className="mt-4">
              <p className="text-gray-700 mb-2">Your Rating:</p>
              <div className="star-rating">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => handleRatingChange(star)}
                    className="star"
                  >
                    {star <= rating ? (
                      <span className="star-filled">★</span>
                    ) : (
                      <span className="star-empty">☆</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex space-x-4 mt-6">
              <button 
                onClick={handleSubmitRating}
                disabled={isSubmitting}
                className="flex-1 bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark transition-colors duration-300"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  'Submit Rating'
                )}
              </button>
              
              <button 
                onClick={handleShare}
                className="bg-secondary text-white py-2 px-4 rounded-md hover:bg-secondary-dark transition-colors duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-3">Book This Hotel</h3>
          <div className="bg-white p-4 rounded-lg shadow-card">
            <p className="text-gray-700 mb-4">Experience luxury accommodations at {hotel.name}. Book now for special rates and exclusive amenities.</p>
            <button className="w-full bg-secondary text-white py-2 px-4 rounded-md hover:bg-secondary-dark transition-colors duration-300">
              Check Availability
            </button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <Navigation />
    </div>
  );
};

export default HotelRating;
