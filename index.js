import fetch from 'node-fetch';
import config from './config.js';

let hitCount = 0;

export default async function handler(req, res) {
  if (req.method === 'GET' && req.query.endpoint === 'hitcounter') {
    return res.status(200).json({ 
      creator: config.creator,
      total_hits: hitCount,
      status: 'success' 
    });
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed. Use GET.' });
  }

  const targetUrl = req.query.url;

  if (!targetUrl) {
    return res.status(400).json({ error: 'Missing `url` query parameter.' });
  }

  hitCount++;

  try {
    const pon = await fetch('https://www.fastdl.live/api/search', {
      method: 'POST',
      headers: {
        'accept': 'application/json, text/plain, */*',
        'accept-language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
        'content-type': 'application/json',
        'origin': 'https://www.fastdl.live',
        'priority': 'u=1, i',
        'referer': 'https://www.fastdl.live/',
        'sec-ch-ua': '"Google Chrome";v="135", "Not-A.Brand";v="8", "Chromium";v="135"',
        'sec-ch-ua-mobile': '?1',
        'sec-ch-ua-platform': '"Android"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'user-agent': 'Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Mobile Safari/537.36',
        'cookie': '_ga=GA1.1.409819991.1746865809; _ga_MDP0KWXQVY=GS2.1.s1746865809$o1$g1$t1746865821$j0$l0$h0'
      },
      body: JSON.stringify({ url: targetUrl })
    });

    if (!pon.ok) {
      throw new Error(`API responded with status ${pon.status}`);
    }

    const data = await response.json();
    res.status(200).json({
      creator: config.creator,
      data: data,
      hits: hitCount,
      status: 'success'
    });

  } catch (err) {
    res.status(500).json({ 
      creator: config.creator,
      error: 'Failed to fetch data from fastdl.live', 
      details: err.message,
      hits: hitCount
    });
  }
}
