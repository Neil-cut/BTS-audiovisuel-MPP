"""Génère MAP.md : carte compacte du projet (à envoyer à Claude avec CONTEXT.md).
Emplacement : tools/mapgen.py     Usage : python3 tools/mapgen.py   ->  MAP.md à la racine.
Lit index.html pour connaître l'ordre réel des fichiers CSS et JS."""
import re, os, collections

root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CLEAN = re.compile(r"^[/*=\-\s]+|[/*=\-\s]+$")


def rd(p):
    return open(os.path.join(root, p), encoding="utf-8", errors="ignore").read()


def nlines(t):
    return t.count("\n") + 1


def head(t):
    """Description tirée du premier commentaire du fichier."""
    m = re.match(r"\s*/\*\s*(.+?)(?:\*/|\n)", t)
    return re.sub(r"^\S+\s+[—-]\s+", "", m.group(1).strip()) if m else ""


def marks_of(t, limit):
    res = []
    for i, ln in enumerate(t.split("\n"), 1):
        if i > 1 and len(ln) < 200 and ln.startswith("/*") and "*/" in ln:
            res.append("L%d %s" % (i, CLEAN.sub("", ln)[:60]))
    return res[:limit]


html = rd("index.html")
css = re.findall(r'<link[^>]+href="([^"]+\.css)"', html)
js = re.findall(r'<script[^>]+src="([^"]+\.js)"', html)
out = ["# MAP (généré par tools/mapgen.py : ne pas modifier à la main)\n"]

# ---------- index.html ----------
out.append("## index.html (%d lignes)" % nlines(html))
out.append("ids : " + ", ".join(re.findall(r'\bid="([^"]+)"', html)))
out.append("CSS (ordre) : " + " > ".join(os.path.basename(c) for c in css))
out.append("JS (ordre) :")
for i, f in enumerate(js, 1):
    out.append("  %d. %s" % (i, f))
cnt = collections.Counter(os.path.basename(f) for f in js)
dup = [b for b, n in cnt.items() if n > 1]
if dup:
    out.append("ATTENTION : même nom dans des dossiers différents : " + ", ".join(dup))
out.append("")

# ---------- CSS ----------
themes = set()
for f in css:
    if not os.path.exists(os.path.join(root, f)):
        continue
    t = rd(f)
    out.append("## %s (%d lignes, %d Ko) : %s" % (f, nlines(t), len(t) // 1024, head(t)))
    th = sorted(set(re.findall(r'data-theme="(\w+)"', t)))
    themes.update(th)
    if th:
        out.append("  thèmes : " + ", ".join(th))
    v = list(dict.fromkeys(re.findall(r"(--[\w-]+)\s*:", t)))
    if v:
        out.append("  variables : " + " ".join(v[:40]))
    m = marks_of(t, 30)
    if m:
        out.append("  sections : " + " | ".join(m))
    out.append("")
out.append("Thèmes CSS présents : " + ", ".join(sorted(themes)) + "\n")

# ---------- JS ----------
state_keys, ls_keys = set(), set()
for f in js:
    if not os.path.exists(os.path.join(root, f)):
        continue
    t = rd(f)
    out.append("## %s (%d lignes, %d Ko) : %s" % (f, nlines(t), len(t) // 1024, head(t)))
    fn, cs = [], []
    for i, ln in enumerate(t.split("\n"), 1):
        m = re.match(r"(?:async\s+)?function\s+(\w+)\s*\(([^)]{0,40})", ln)
        if m:
            fn.append("%s(%s)@%d" % (m.group(1), m.group(2).strip(), i))
            continue
        m = re.match(r"(?:const|let|var)\s+(\w+)\s*=\s*(.{0,40})", ln)
        if m:
            rest = m.group(2)
            if "=>" in rest or rest.startswith(("function", "async")):
                fn.append("%s@%d" % (m.group(1), i))
            else:
                cs.append("%s@%d" % (m.group(1), i))
    if fn:
        out.append("  fonctions : " + ", ".join(fn))
    if cs:
        out.append("  constantes/état : " + ", ".join(cs))
    m = marks_of(t, 25)
    if m:
        out.append("  sections : " + " | ".join(m))
    # contenu des fichiers de données
    subj = re.findall(r'\{id:"(\w+)",n:"([^"]+)"', t)
    if subj:
        out.append("  matières : " + ", ".join("%s (%s)" % s for s in subj))
    banks = [b for _, b in re.findall(r'addB\("(\w+)",Bk\("(\w+)"', t)]
    banks += re.findall(r'\{"id":"(\w+)","i":"[^"]*","n":"[^"]*","d"', t)
    if banks:
        out.append("  banques (id) : " + ", ".join(dict.fromkeys(banks)))
    cp = sorted(set(re.findall(r"COURS\.(\w+)\.push", t)))
    if cp:
        out.append("  COURS enrichis : " + ", ".join(cp))
    ls = set(re.findall(r"LESSONS\.(\w+)\s*=", t))
    ls.update(re.findall(r"LESSONS\s*=\s*\{(\w+):", t))
    if ls:
        out.append("  LESSONS : " + ", ".join(sorted(ls)))
    state_keys.update(re.findall(r"\bst\.(\w+)", t))
    ls_keys.update(re.findall(r"localStorage\.(?:get|set|remove)Item\(\s*['\"`]([^'\"`]+)", t))
    out.append("")

out.append("## État partagé")
out.append("champs de st : " + ", ".join(sorted(state_keys)))
out.append("clés localStorage : " + ", ".join(sorted(ls_keys)))
out.append("")

# ---------- ressources ----------
res = []
for d, _, files in os.walk(root):
    rel = os.path.relpath(d, root)
    if rel == "." or rel.split(os.sep)[0] in ("css", "js", "tools", "dist", "node_modules") or rel.startswith("."):
        continue
    res.append("- %s/ : %d fichier(s)" % (rel, len(files)))
if res:
    out.append("## Autres ressources")
    out.extend(res)

txt = "\n".join(out) + "\n"
open(os.path.join(root, "MAP.md"), "w", encoding="utf-8").write(txt)
print("OK MAP.md : %d caractères (~%d tokens)" % (len(txt), len(txt) // 3))
