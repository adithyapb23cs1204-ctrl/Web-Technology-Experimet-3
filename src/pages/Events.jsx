import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { EventCard } from '../components/EventCard';
import { Search, Filter, AlertTriangle, RefreshCw } from 'lucide-react';

const INITIAL_EVENTS = [
  {
    id: 'ev-1',
    name: 'HackAI 2026 Hackathon',
    category: 'Coding',
    fee: 300,
    seats: 5,
    date: 'Oct 15, 2026',
    description: '24-hour artificial intelligence & machine learning hackathon solving real-world challenges.',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'ev-2',
    name: 'RoboWars Grand Prix',
    category: 'Robotics',
    fee: 500,
    seats: 2,
    date: 'Oct 16, 2026',
    description: 'Heavyweight combat bot championship in a high-octane steel arena.',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'ev-3',
    name: 'CyberShield CTF',
    category: 'Cybersecurity',
    fee: 250,
    seats: 8,
    date: 'Oct 15, 2026',
    description: 'Jeopardy-style Capture The Flag competition testing ethical hacking skills.',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'ev-4',
    name: 'Web3 & Blockchain Summit',
    category: 'Workshops',
    fee: 0,
    seats: 12,
    date: 'Oct 17, 2026',
    description: 'Hands-on workshop on smart contract deployment and decentralized apps.',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'ev-5',
    name: 'CodeSprint Speed Typing',
    category: 'Coding',
    fee: 100,
    seats: 1,
    date: 'Oct 16, 2026',
    description: 'Competitive rapid algorithmic coding challenge with strict time limits.',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'ev-6',
    name: 'IoT & Drone Arena Showcase',
    category: 'Robotics',
    fee: 200,
    seats: 0, // Intentionally 0 to test SOLD OUT status on initial render
    date: 'Oct 17, 2026',
    description: 'Autonomous drone obstacles navigation and embedded systems exhibition.',
    image: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=600&auto=format&fit=crop&q=80'
  }
];

export const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const fetchEvents = async () => {
    setLoading(true);
    setError(null);
    try {
      // Simulate external public API call with Axios while combining initial rich event details
      await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=1');
      setEvents(INITIAL_EVENTS);
    } catch (err) {
      console.error('API error:', err);
      setError('Failed to fetch live event schedules from remote API server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Filter events based on search term & selected category
  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['All', 'Coding', 'Robotics', 'Cybersecurity', 'Workshops'];

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.25rem', marginBottom: '0.5rem' }}>
          TechFest 2026 <span className="gradient-text">Events & Competitions</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Browse events, filter by track, and register before seats run out!
        </p>
      </div>

      {/* Search and Category Filter Controls */}
      <div className="filter-bar">
        <div style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
          <input
            type="text"
            className="form-input search-input"
            style={{ paddingLeft: '2.5rem' }}
            placeholder="Search events by keyword or name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div style={{ position: 'relative', minWidth: '180px' }}>
          <Filter size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)', zIndex: 1 }} />
          <select
            className="form-select"
            style={{ paddingLeft: '2.5rem' }}
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === 'All' ? 'All Categories' : cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p style={{ color: 'var(--text-secondary)' }}>Loading TechFest events from API...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="alert alert-danger">
          <AlertTriangle size={24} />
          <div style={{ flex: 1 }}>
            <strong>Connection Error!</strong>
            <p style={{ fontSize: '0.9rem' }}>{error}</p>
          </div>
          <button className="btn btn-danger" onClick={fetchEvents} style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}>
            <RefreshCw size={14} /> Retry
          </button>
        </div>
      )}

      {/* Events Grid */}
      {!loading && !error && (
        <>
          {filteredEvents.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
              <h3>No matching events found</h3>
              <p style={{ marginTop: '0.5rem' }}>Try refining your search term or selecting another category.</p>
            </div>
          ) : (
            <div className="grid">
              {filteredEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};
