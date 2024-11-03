import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './styles/App.css';

interface IPInfo {
  localIP: string;
  publicIP: string;
}

const App: React.FC = () => {
  const [hostIP, setHostIP] = useState<IPInfo | null>(null);
  const [domain, setDomain] = useState('');
  const [resolvedIPs, setResolvedIPs] = useState<
    { domain: string; ip: string }[]
  >([]);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('/api/host-ip').then((res) => setHostIP(res.data));

    const fetchResolvedIPs = async () => {
      try {
        const response = await axios.get('/api/ips');
        setResolvedIPs(response.data);
      } catch (error) {
        console.error('Error fetching resolved IPs:', error);
      }
    };

    fetchResolvedIPs();
  }, []);

  const resolveDomain = async () => {
    setError('');
    try {
      const res = await axios.post('/api/resolve-domain', { domain });
      setResolvedIPs((prev) => [...prev, { domain, ip: res.data.ip }]);
    } catch (error: any) {
      const errorMessage = error.response?.data.message || error.message;
      setError(errorMessage);
    }finally {
      setDomain('');
    }
  };

  return (
    <div className='app'>
      <h1>IP Lookup</h1>
      <div className='coupleOfIP'>
        <h2>Host IP</h2>
        {hostIP ? (
          <div>
            <p>Local IP: {hostIP.localIP}</p>
            <p>Public IP: {hostIP.publicIP}</p>
          </div>
        ) : (
          <CircularProgress/>
        )}
      </div>
      <div>
        <h2>Resolve Domain</h2>
        <input
          type='text'
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          placeholder='Enter domain'
        />
        <button onClick={resolveDomain}>Resolve</button>
        {error && <div style={{ color: 'red' }}>{error}</div>}
      </div>
      <div>
        <h2>Resolved Domains</h2>
        {resolvedIPs.map((item, index) => (
          <p key={index}>
            {item.domain}: {item.ip}
          </p>
        ))}
      </div>
    </div>
  );
};

export default App;
