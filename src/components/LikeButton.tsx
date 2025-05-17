import React, { useState } from 'react';

interface LikeButtonProps {
  initialLikes: number;
  hotelId: string;
  onLikeChange?: (liked: boolean, newCount: number) => void;
}

const LikeButton: React.FC<LikeButtonProps> = ({ initialLikes, hotelId, onLikeChange }) => {
  const [likes, setLikes] = useState<number>(initialLikes);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const handleLike = () => {
    const newLikedState = !isLiked;
    const newLikeCount = newLikedState ? likes + 1 : likes - 1;
    
    // Start animation
    setIsAnimating(true);
    
    // Update state
    setIsLiked(newLikedState);
    setLikes(newLikeCount);
    
    // Save to localStorage to persist between sessions
    try {
      const likedHotels = JSON.parse(localStorage.getItem('travelrate_liked_hotels') || '{}');
      if (newLikedState) {
        likedHotels[hotelId] = true;
      } else {
        delete likedHotels[hotelId];
      }
      localStorage.setItem('travelrate_liked_hotels', JSON.stringify(likedHotels));
    } catch (error) {
      console.error('Error saving like state to localStorage:', error);
    }
    
    // Call the callback if provided
    if (onLikeChange) {
      onLikeChange(newLikedState, newLikeCount);
    }
    
    // End animation after a delay
    setTimeout(() => {
      setIsAnimating(false);
    }, 300);
  };

  // Check if hotel was previously liked (on component mount)
  React.useEffect(() => {
    try {
      const likedHotels = JSON.parse(localStorage.getItem('travelrate_liked_hotels') || '{}');
      if (likedHotels[hotelId]) {
        setIsLiked(true);
      }
    } catch (error) {
      console.error('Error retrieving like state from localStorage:', error);
    }
  }, [hotelId]);

  return (
    <button 
      onClick={handleLike}
      className="flex items-center space-x-1 focus:outline-none"
      aria-label={isLiked ? "Unlike" : "Like"}
    >
      <div className={`transition-transform ${isAnimating ? 'scale-125' : 'scale-100'}`}>
        {isLiked ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500 fill-current" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        )}
      </div>
      <span className={`font-medium ${isLiked ? 'text-blue-500' : 'text-gray-700'}`}>
        {likes}
      </span>
    </button>
  );
};

export default LikeButton;
