import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchCustomers } from './api';
import './App.css';

// Helper to generate random SVG blobs
function RandomBlobs() {
  // Make blobs larger and allow them to overflow slightly so edges aren't cut off
  const blobs = Array.from({ length: 6 }).map((_, i) => {
    const size = 220 + Math.random() * 180;
    // Allow top/left to be negative or >100% so blobs can overflow the viewport
    const top = -20 + Math.random() * 120; // -20% to 100%
    const left = -20 + Math.random() * 120; // -20% to 100%
    const color = [
      'rgba(255,255,255,0.18)', // white
      'rgba(215,109,119,0.18)', // pink
      'rgba(58,141,222,0.18)',  // blue
      'rgba(123,47,242,0.18)',  // purple
      'rgba(192,192,192,0.18)'  // silver
    ][Math.floor(Math.random() * 5)];
    return (
      <svg key={i} style={{position:'absolute',top:`${top}%`,left:`${left}%`,zIndex:2,overflow:'visible'}} width={size} height={size}>
        <ellipse
          cx={size/2}
          cy={size/2}
          rx={size/2}
          ry={size/2 * (0.7 + Math.random()*0.6)}
          fill={color}
          style={{filter:'blur(12px)'}}
        />
      </svg>
    );
  });
  return <div id="random-blobs" style={{position:'fixed',top:0,left:0,right:0,bottom:0,pointerEvents:'none',zIndex:1,overflow:'visible'}}>{blobs}</div>;
}

// Animated floating stars overlay
function FloatingStars() {
  // Generate 24 stars with random positions, sizes, and animation delays
  const stars = Array.from({ length: 24 }).map((_, i) => {
    const size = 2 + Math.random() * 4;
    const left = Math.random() * 100;
    const top = Math.random() * 100;
    const duration = 8 + Math.random() * 8;
    const delay = Math.random() * 8;
    const opacity = 0.7 + Math.random() * 0.3;
    return (
      <div
        key={i}
        style={{
          position: 'fixed',
          left: `${left}vw`,
          top: `${top}vh`,
          width: `${size}px`,
          height: `${size}px`,
          borderRadius: '50%',
          background: 'white',
          boxShadow: `0 0 ${size * 2}px #fff, 0 0 ${size * 4}px #fff` ,
          opacity,
          zIndex: 3,
          pointerEvents: 'none',
          animation: `star-float ${duration}s linear ${delay}s infinite alternate`
        }}
      />
    );
  });
  return <>{stars}</>;
}

// Animated aurora overlay
function AuroraOverlay() {
  return (
    <div id="aurora-overlay">
      <div className="aurora-shape" />
      <div className="aurora-shape2" />
    </div>
  );
}

function Home() {
  return (
    <div>
      <h1>Home Page</h1>
      <nav>
        <ul>
          <li><Link to="/customers">Customers Page</Link></li>
          <li><Link to="/orders">Orders Page</Link></li>
          <li><Link to="/addresses">Addresses Page</Link></li>
        </ul>
      </nav>
    </div>
  );
}

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCustomers()
      .then(data => {
        setCustomers(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h1>Customers Page</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{color: 'red'}}>{error}</p>}
      {!loading && !error && (
        <ul>
          {customers.map(c => (
            <li key={c.Id}>{c.Name} ({c.Email})</li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Orders() {
  return <h1>Orders Page</h1>;
}

function Addresses() {
  return <h1>Addresses Page</h1>;
}

function App() {
  return (
    <div>
      <AuroraOverlay />
      <FloatingStars />
      <RandomBlobs />
      <header className="App-header">
        <h1>Customer Order Dashboard</h1>
      </header>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/addresses" element={<Addresses />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
