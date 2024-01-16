const EXTERNAL_DATA_URL = 'https://theblockchaininsider.com/blog';
import { getAllPostIdsForSitemap } from '../lib/posts';

function generateSiteMap(posts) {
    return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
   <url>
       <loc>https://www.theblockchaininsider.com/</loc>
     </url>
     <url>
       <loc>https://www.theblockchaininsider.com/allBlogs/</loc>
     </url>
     <url>
       <loc>https://www.theblockchaininsider.com/services/</loc>
     </url>
     <url>
       <loc>https://www.theblockchaininsider.com/aboutUs/</loc>
     </url>
     ${posts.map(({ id }) => {
         return `
       <url>
           <loc>${`${EXTERNAL_DATA_URL}/${id}/`}</loc>
       </url>
     `;
     }).join('')}
   </urlset>
 `;
}

function SiteMap() {
    // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
    // We make an API call to gather the URLs for our site
    // let test = await request.json()
    const paths = getAllPostIdsForSitemap();
    // We generate the XML sitemap with the posts data
    const sitemap = generateSiteMap(paths);
    // console.log(sitemap)

    res.setHeader('Content-Type', 'text/xml');
    // we send the XML to the browser
    res.write(sitemap);
    res.end();

    return {
        props: {},
    };
}

export default SiteMap;