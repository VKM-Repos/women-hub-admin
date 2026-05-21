import re

with open('/home/juniormarafa/womenhub/women-hub-admin/src/pages/main/AuditLog/Index.tsx', 'r') as f:
    content = f.read()

# Replace for data-id checkboxes
content = re.sub(r'(<input type="checkbox" data-id="(\d+)" )placeholder="Search keyword" className="" />', r'\1checked={checkedIds.has(\2)} onChange={() => handleCheckboxChange(\2)} />', content)

with open('/home/juniormarafa/womenhub/women-hub-admin/src/pages/main/AuditLog/Index.tsx', 'w') as f:
    f.write(content)