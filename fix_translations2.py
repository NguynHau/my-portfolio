import re

with open('i18n/translations.js', 'r', encoding='utf-8') as f:
    text = f.read()

# Replace `"“Student with 5 Good Criteria”": "“Sinh viên 5 Tốt”"\n` with `"“Student with 5 Good Criteria”": "“Sinh viên 5 Tốt”",\n`
text = text.replace('"“Student with 5 Good Criteria”": "“Sinh viên 5 Tốt”"\n', '"“Student with 5 Good Criteria”": "“Sinh viên 5 Tốt”",\n')

with open('i18n/translations.js', 'w', encoding='utf-8') as f:
    f.write(text)

