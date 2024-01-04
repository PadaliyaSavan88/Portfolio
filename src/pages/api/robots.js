export default async function handler(req, res) {
    const robots =`
      User-Agent: *
      Disallow: 
      
      Sitemap: 'https://savanpadaliya.com/sitemap.xml',`
  
    res.send(robots)
  }