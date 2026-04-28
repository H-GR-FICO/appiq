#!/usr/bin/env python3
"""Local dev server with HTTP Range request support (needed for audio seek)."""
import http.server, sys, os
from socketserver import ThreadingMixIn

class RangeHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def send_head(self):
        path = self.translate_path(self.path)
        if os.path.isfile(path):
            range_header = self.headers.get('Range')
            if range_header:
                return self._send_range(path, range_header)
        return super().send_head()

    def _send_range(self, path, range_header):
        try:
            start, end = range_header.replace('bytes=', '').split('-')
            file_size = os.path.getsize(path)
            start = int(start)
            end = int(end) if end else file_size - 1
            length = end - start + 1
            f = open(path, 'rb')
            f.seek(start)
            self.send_response(206)
            self.send_header('Content-type', self.guess_type(path))
            self.send_header('Content-Range', f'bytes {start}-{end}/{file_size}')
            self.send_header('Content-Length', str(length))
            self.send_header('Accept-Ranges', 'bytes')
            self.end_headers()
            return f
        except Exception:
            return super().send_head()

    def log_message(self, fmt, *args):
        print(f"  {self.address_string()} {fmt % args}")

port = int(sys.argv[1]) if len(sys.argv) > 1 else 8080
root = sys.argv[2] if len(sys.argv) > 2 else '.'
os.chdir(root)
print(f"\n  Dev server running at http://localhost:{port}")
print(f"  Serving: {os.getcwd()}")
print(f"  Range requests: ENABLED (audio seek will work)")
print(f"\n  Press Ctrl+C to stop\n")
class ThreadingServer(ThreadingMixIn, http.server.HTTPServer): pass
ThreadingServer(('', port), RangeHTTPRequestHandler).serve_forever()
