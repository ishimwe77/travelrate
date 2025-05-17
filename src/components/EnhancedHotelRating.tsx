import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StarRating, SocialShare, Toast } from '../components/UIComponents';
import ImageWithFallback from '../components/ImageWithFallback';
import LikeButton from '../components/LikeButton';

// Components
const BookingModal: React.FC<{
  hotel: {
    name: string;
    location: string;
    price: number;
    image: string;
  };
  onClose: () => void;
}> = ({ hotel, onClose }) => {
  const [checkIn, setCheckIn] = useState<string>('');
  const [checkOut, setCheckOut] = useState<string>('');
  const [guests, setGuests] = useState<string>('1');
  const [rooms, setRooms] = useState<string>('1');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!checkIn || !checkOut) {
      alert('Please select check-in and check-out dates');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setSuccess(true);
    
    // Close modal after showing success message
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-semibold">Book {hotel.name}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {success ? (
          <div className="p-6 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <h4 className="text-xl font-bold mb-2">Booking Confirmed!</h4>
            <p className="text-gray-600">Your booking request for {hotel.name} has been received. Check your email for details.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="mb-4">
              <ImageWithFallback
                src={hotel.image}
                alt={hotel.name}
                fallbackSrc="/placeholder-hotel.jpg"
                className="w-full h-48 object-cover rounded-lg"
              />
              <div className="mt-2">
                <h4 className="font-bold">{hotel.name}</h4>
                <p className="text-gray-600">{hotel.location}</p>
                <p className="text-primary font-bold">${hotel.price} per night</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="checkIn" className="form-label">Check-in Date</label>
                <input
                  type="date"
                  id="checkIn"
                  className="form-input"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>
              <div>
                <label htmlFor="checkOut" className="form-label">Check-out Date</label>
                <input
                  type="date"
                  id="checkOut"
                  className="form-input"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  min={checkIn || new Date().toISOString().split('T')[0]}
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="guests" className="form-label">Guests</label>
                <select
                  id="guests"
                  className="form-input"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                >
                  {[1, 2, 3, 4, 5, 6].map(num => (
                    <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="rooms" className="form-label">Rooms</label>
                <select
                  id="rooms"
                  className="form-input"
                  value={rooms}
                  onChange={(e) => setRooms(e.target.value)}
                >
                  {[1, 2, 3, 4].map(num => (
                    <option key={num} value={num}>{num} {num === 1 ? 'Room' : 'Rooms'}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between mb-2">
                <span>Room ({rooms})</span>
                <span>${(hotel.price * parseInt(rooms)).toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Taxes & Fees</span>
                <span>${(hotel.price * parseInt(rooms) * 0.15).toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${(hotel.price * parseInt(rooms) * 1.15).toFixed(2)}</span>
              </div>
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary text-white py-3 px-4 rounded-md hover:bg-primary-dark transition-colors duration-300"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                'Book Now'
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

// Enhanced Hotel Rating Component with Booking and Social Sharing
const EnhancedHotelRating: React.FC = () => {
  const navigate = useNavigate();
  const [rating, setRating] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showBookingModal, setShowBookingModal] = useState<boolean>(false);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');
  const [toastType, setToastType] = useState<'success' | 'error' | 'info' | 'warning'>('success');
  const [likeCount, setLikeCount] = useState<number>(4711);
  
  // Mock hotel data
  const hotel = {
    id: '1',
    name: 'Burj Al Arab Jumeirah',
    location: 'Dubai, United Arab Emirates',
    price: 1200,
    taskPrice: 1.65,
    taskProfit: 45.00,
    likes: likeCount,
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1025&q=80',
    description: 'Standing on an artificial island, Burj Al Arab is one of the tallest hotels in the world. The shape of the structure is designed to resemble the sail of a ship.'
  };

  const handleSubmitRating = async () => {
    if (rating === 0) {
      setToastMessage('Please select a rating before submitting');
      setToastType('warning');
      setShowToast(true);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setToastMessage('Rating submitted successfully!');
      setToastType('success');
      setShowToast(true);
      
      // Reset rating after successful submission
      setRating(0);
      
      // Navigate to next hotel after a delay
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (error) {
      setToastMessage('Failed to submit rating. Please try again.');
      setToastType('error');
      setShowToast(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBookNow = () => {
    setShowBookingModal(true);
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
        <button onClick={() => navigate('/dashboard')}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </header>

      <div className="p-4">
        <h2 className="text-xl font-bold text-center mb-4">Rate This Hotel</h2>
        
        <div className="bg-white rounded-lg shadow-card overflow-hidden mb-6">
          <ImageWithFallback
            src={hotel.image}
            alt={hotel.name}
            fallbackSrc="/placeholder-hotel.jpg"
            className="w-full h-64 object-cover"
          />
          
          <div className="p-4">
            <h3 className="text-lg font-bold mb-1">{hotel.name}</h3>
            <p className="text-gray-600 mb-2">{hotel.location}</p>
            
            <p className="text-gray-700 mb-4">{hotel.description}</p>
            
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-sm text-gray-500">Task Price:</p>
                <p className="text-primary font-bold">${hotel.taskPrice}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Task Profit:</p>
                <p className="text-green-500 font-bold">{hotel.taskProfit}%</p>
              </div>
              <div>
                <LikeButton 
                  initialLikes={hotel.likes} 
                  hotelId={hotel.id} 
                  onLikeChange={handleLikeChange}
                />
              </div>
            </div>
            
            <div className="flex justify-between items-center mb-6">
              <button
                onClick={handleBookNow}
                className="bg-secondary text-white py-2 px-4 rounded-md hover:bg-secondary-dark transition-colors duration-300"
              >
                Book Now
              </button>
              
              <SocialShare
                url={`https://travelrate.app/hotel/${hotel.id}`}
                title={`Check out ${hotel.name} on TravelRate!`}
                description={hotel.description}
              />
            </div>
            
            <div className="border-t border-gray-200 pt-4">
              <p className="text-center font-medium mb-3">Your Rating</p>
              <div className="flex justify-center mb-4">
                <StarRating
                  rating={rating}
                  setRating={setRating}
                  size="large"
                />
              </div>
              
              <button
                onClick={handleSubmitRating}
                disabled={isSubmitting}
                className="w-full bg-primary text-white py-3 px-4 rounded-md hover:bg-primary-dark transition-colors duration-300"
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
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <BookingModal
          hotel={hotel}
          onClose={() => setShowBookingModal(false)}
        />
      )}
      
      {/* Toast Notification */}
      {showToast && (
        <Toast
          message={toastMessage}
          type={toastType}
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
};

export default EnhancedHotelRating;
