import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed. Use GET.' });
  }

  const targetUrl = req.query.url;

  if (!targetUrl) {
    return res.status(400).json({ error: 'Missing `url` query parameter.' });
  }

  const payload = {
    url: targetUrl,
    ts: Date.now(),
    _ts: 1746520083801, // bisa diganti dinamis jika perlu
    _tsc: 0,
    _s: '1c08efa650ca778f1c0b740ceba17f318499837ea4529b104804cfb56d1c330b' // signature ini mungkin harus diupdate jika API berubah
  };

  try {
    const response = await fetch('https://sssinstagram.com/api/convert', {
      method: 'POST',
      headers: {
        'accept': 'application/json, text/plain, */*',
        'accept-language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
        'content-type': 'application/json',
        'origin': 'https://sssinstagram.com',
        'priority': 'u=1, i',
        'sec-ch-ua': '"Google Chrome";v="135", "Not-A.Brand";v="8", "Chromium";v="135"',
        'sec-ch-ua-mobile': '?1',
        'sec-ch-ua-platform': '"Android"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'user-agent': 'Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Mobile Safari/537.36',
        'cookie': 'uid=beb27f9d30415bc3; _ga=GA1.1.2022632715.1746864804; adsUnderSearchInput=41; __gads=ID=8437c6e604bf3360:T=1746864804:RT=1746864804:S=ALNI_MalNcxB9PmNa3-P76Bga3zhDV6CKw; __gpi=UID=000010bb66900c6b:T=1746864804:RT=1746864804:S=ALNI_MYvu4hzAhxFfFKgGcHJ5o8BLNvfFQ; __eoi=ID=7ddd15512848beb0:T=1746864804:RT=1746864804:S=AA-Afja-FRGgxCg_bOb1AJh_CoYA; _ga_KDHKH4GDQE=GS2.1.s1746864803$o1$g1$t1746865065$j0$l0$h0'
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    res.status(200).json(data);

  } catch (err) {
    res.status(500).json({ error: 'Failed to scrape data', details: err.message });
  }
}
