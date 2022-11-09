# Demo of how Next app opens itself for uncacheable POST requests if `getServerSideProps` is used

## What to do to test?

1. Run `npm build && npm start`
2. Verify how a 'static' route behaves:
    - `curl -s -I http://localhost:3000` correctly returns `HTTP/1.1 200 OK` along with content
    - `curl -s -I -X POST http://localhost:3000` correctly returns `HTTP/1.1 405 Method Not Allowed`
3. Verify how a 'dynamic' route (route that implements `getServerSideProps`) behaves:
    - `curl -s -I http://localhost:3000/dynamic` correctly returns `HTTP/1.1 200 OK` along with content
    - `curl -s -I -X POST http://localhost:3000/dynamic` **incorrectly returns `HTTP/1.1 200 OK` along with content**

## What does it mean?

If you have any reverse-proxy caching service e.g. Cloudfront/Cloudflare/Fastly/Varnish POST requests are always passed to the origin (unless configured otherwise).
This opens your site for a trivial attack that in the best case only increases your bills, in the worst cases takes overloads the site and takes it down.

`getServerSideProps` is a function designed to be used for data fetching on server-side - it should have nothing to do with allowing `POST` requests reaching the backend.