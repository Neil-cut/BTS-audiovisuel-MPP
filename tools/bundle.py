"""Assemble index.html + css + js en UN seul fichier (pour publier comme artifact).
Usage : python3 tools/bundle.py  ->  dist/bts-single.html"""
import re,os
root=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
rd=lambda p:open(os.path.join(root,p),encoding="utf-8").read()
h=rd("index.html")
h=re.sub(r'<link rel="stylesheet" href="([^"]+)">\n?',lambda m:"<style>\n"+rd(m.group(1))+"</style>\n",h)
h=re.sub(r'<script src="([^"]+)"></script>\n?',lambda m:"<script>\n"+rd(m.group(1))+"</script>\n",h)
os.makedirs(os.path.join(root,"dist"),exist_ok=True)
open(os.path.join(root,"dist/bts-single.html"),"w",encoding="utf-8").write(h)
print("OK dist/bts-single.html",len(h),"octets")
