// Local preview server: serves public/ at the site root and the preview page at "/".
const http=require('http'),fs=require('fs'),path=require('path');
const ROOT=path.join(__dirname,'..','public'), PAGE=path.join(__dirname,'home.html');
const T={'.jpg':'image/jpeg','.svg':'image/svg+xml','.woff2':'font/woff2','.mp4':'video/mp4','.html':'text/html; charset=utf-8'};
http.createServer((q,r)=>{
  const u=decodeURIComponent(q.url.split('?')[0]);
  const f=u==='/'?PAGE:path.join(ROOT,path.normalize(u));
  if(!f.startsWith(ROOT)&&f!==PAGE||!fs.existsSync(f)){r.writeHead(404);return r.end();}
  const size=fs.statSync(f).size, type=T[path.extname(f)]||'application/octet-stream', range=q.headers.range;
  if(range){const [s,e]=range.replace('bytes=','').split('-');const a=+s,b=e?+e:size-1;
    r.writeHead(206,{'Content-Type':type,'Content-Range':`bytes ${a}-${b}/${size}`,'Accept-Ranges':'bytes','Content-Length':b-a+1});return fs.createReadStream(f,{start:a,end:b}).pipe(r);}
  r.writeHead(200,{'Content-Type':type,'Content-Length':size,'Accept-Ranges':'bytes'});fs.createReadStream(f).pipe(r);
}).listen(5180,()=>console.log('http://localhost:5180'));
