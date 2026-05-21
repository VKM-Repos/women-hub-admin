import re

with open('/home/juniormarafa/womenhub/women-hub-admin/src/pages/main/AuditLog/Index.tsx', 'r') as f:
    content = f.read()

content = re.sub(r'class="', 'className="', content)
content = re.sub(r'<!-- (.*?) -->', r'{/* \1 */}', content)
content = re.sub(r'<img([^>]*?)>', r'<img\1 />', content)
content = re.sub(r'<input([^>]*?)>', r'<input\1 />', content)

with open('/home/juniormarafa/womenhub/women-hub-admin/src/pages/main/AuditLog/Index.tsx', 'w') as f:
    f.write(content)