from pathlib import Path
from html.parser import HTMLParser
import re,json,subprocess
root=Path(__file__).parent
class Page(HTMLParser):
    def __init__(self):super().__init__();self.ids=[];self.assets=[];self.anchors=[];self.h1=0;self.photos=0;self.photo_ids=[]
    def handle_starttag(self,t,a):
        d=dict(a)
        if 'id' in d:self.ids.append(d['id'])
        if 'data-photo' in d:self.photo_ids.append(d['data-photo'])
        if t=='h1':self.h1+=1
        if t=='a' and d.get('href','').startswith('#'):self.anchors.append(d['href'][1:])
        if t in ('img','script','link'):
            v=d.get('src') if t!='link' else d.get('href')
            if v and not v.startswith(('http','data:')):self.assets.append(v)
        if t=='img' and d.get('src','').startswith('/images/v2/'):
            assert d.get('alt'), 'Missing image alt'
            assert d.get('width') and d.get('height'), 'Missing image dimensions'
            for pair in d.get('srcset','').split(','):
                if pair.strip():self.assets.append(pair.strip().split(' ')[0])
        if t=='a' and 'data-category' in d:self.photos+=1
results=[]
manifest=json.loads((root/'photos.json').read_text(encoding='utf-8'))
assert len(manifest)==22 and all(p['width']>600 for p in manifest)
allowed_photos={p['id'] for p in manifest}
for file in ['index.html']:
    s=(root/file).read_text(encoding='utf-8');p=Page();p.feed(s)
    assert 'href="mailto:javiergarridonovoa@gmail.com"' in s and 'href="tel:+34625066889"' in s
    assert not re.search(r'premiereinmo|Premiere|agencia|version-switch|href="/v2"',s)
    assert not re.search(r'750[.,]?000|€|1\.332|425\.000|640\.000|ZKW4kUeZWbb|Solicitud Enviada|\{\{',s),f'Forbidden old content: {file}'
    assert p.h1==1,f'H1 count {file}: {p.h1}'
    assert len(p.ids)==len(set(p.ids)),f'Duplicate IDs: {file}'
    assert set(p.anchors)<=set(p.ids),f'Broken anchors: {set(p.anchors)-set(p.ids)}'
    missing=[v for v in p.assets if not (root/v.lstrip('/')).exists()]
    assert not missing,f'Missing assets: {missing}'
    assert p.photos==22,f'Photo count {file}: {p.photos}'
    assert set(p.photo_ids)<=allowed_photos,f'Removed photo still linked: {file}'
    scripts=re.findall(r'<script>(.*?)</script>',s,re.S)
    for i,script in enumerate(scripts):
        dest=root.parent/f'inline-{i}.js';dest.write_text(script,encoding='utf-8')
        subprocess.run(['node','--check',str(dest)],check=True,capture_output=True)
    results.append({'page':file,'photo_count':p.photos,'local_assets_checked':len(set(p.assets)),'anchors_checked':len(p.anchors),'no_prices':True})
print(json.dumps(results,ensure_ascii=False,indent=2))
