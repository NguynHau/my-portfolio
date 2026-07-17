import re

with open('i18n/translations.js', 'r', encoding='utf-8') as f:
    lines = f.readlines()

new_lines = []
skip = False
for line in lines:
    if '"WEB PROJECTS":' in line:
        break
    new_lines.append(line)

# Let's just find the `};` and insert before it
idx = 0
for i, line in enumerate(new_lines):
    if line.strip() == '};':
        idx = i
        break

insert_str = """
  "WEB PROJECTS": "DỰ ÁN WEB",
  "Interactive Scientific Tools": "Công cụ Khoa học Tương tác",
  "Differential Equation Solver": "Ứng dụng Giải Phương trình Vi phân",
  "Developed a Python application that solves ordinary differential equations (ODEs) symbolically with SymPy and visualizes solutions using Matplotlib. The solver supports both first-order and higher-order ODEs, handles initial conditions, and includes direction field visualization for first-order equations to facilitate mathematical analysis.": "Phát triển một ứng dụng Python giải các phương trình vi phân thường (ODEs) bằng phương pháp ký hiệu với SymPy và trực quan hóa nghiệm bằng Matplotlib. Trình giải toán hỗ trợ cả phương trình vi phân bậc nhất và bậc cao, xử lý các điều kiện ban đầu, và bao gồm trực quan hóa trường hướng cho các phương trình bậc nhất để hỗ trợ phân tích toán học.",
  "Classification Algorithm Visualizer": "Trình trực quan hóa Thuật toán Phân loại",
  "An interactive web application for visualizing and comparing machine learning classification algorithms, including SVM, Logistic Regression, Perceptron, Decision Tree, and KNN. Built with HTML5 Canvas and JavaScript, the application features real-time training visualization, PCA-based dimensionality reduction, dynamic decision boundary rendering, and live performance metrics to provide an intuitive understanding of how classification models learn.": "Một ứng dụng web tương tác để trực quan hóa và so sánh các thuật toán phân loại học máy, bao gồm SVM, Hồi quy Logistic, Perceptron, Cây quyết định và KNN. Được xây dựng bằng HTML5 Canvas và JavaScript, ứng dụng có tính năng trực quan hóa quá trình huấn luyện theo thời gian thực, giảm chiều dữ liệu dựa trên PCA, kết xuất ranh giới quyết định động và các chỉ số hiệu suất trực tiếp để mang lại sự hiểu biết trực quan về cách các mô hình phân loại học tập.",
  "Launch Application": "Khởi chạy Ứng dụng",
  "Data Visualization": "Trực quan hóa Dữ liệu",
  "Interactive Web": "Web Tương tác",
  "Python / SymPy": "Python / SymPy"
"""

new_lines.insert(idx, insert_str)

with open('i18n/translations.js', 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

