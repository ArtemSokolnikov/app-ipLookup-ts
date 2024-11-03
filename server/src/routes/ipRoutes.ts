import express, { Request, Response } from 'express';
import axios from 'axios';
import { networkInterfaces } from 'os';

const router = express.Router();

let resolvedIPs: { domain: string; ip: string }[] = [];

function getLocalIP() {
  const nets = networkInterfaces();
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]!) {
      if (net.family === 'IPv4' && !net.internal) {
        return net.address;
      }
    }
  }
  return '127.0.0.1';
}

router.get('/host-ip', async (_req: Request, res: Response) => {
  const localIP = getLocalIP();
  try {
    const publicIP = (await axios.get('https://api.ipify.org?format=json')).data.ip;
    res.json({ localIP, publicIP });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch public IP' });
  }
});


router.post('/resolve-domain', async (req: Request, res: Response) => {
  const { domain } = req.body;
  try {
    const response = await axios.get(`https://dns.google/resolve?name=${domain}`);
    const ip = response.data.Answer[0].data;

    resolvedIPs.push({ domain, ip });

    res.json({ domain, ip });
  } catch (error) {
    res.status(500).json({ message: 'Failed to resolve domain' });
  }
});

router.get('/ips', (req: Request, res: Response) => {
  res.json(resolvedIPs);
});

export default router;
