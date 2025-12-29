from flask import Flask, render_template, request, redirect, url_for
import sqlite3

app = Flask(__name__)

# Database initialization
def init_sqlite_db():
    conn = sqlite3.connect('database.db')
    conn.execute('CREATE TABLE IF NOT EXISTS students (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, course TEXT)')
    conn.close()

init_sqlite_db()

@app.route('/')
def index():
    conn = sqlite3.connect('database.db')
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM students")
    students = cursor.fetchall()
    return render_template('index.html', students=students)

@app.route('/add', methods=['GET', 'POST'])
def add_student():
    if request.method == 'POST':
        name = request.form['name']
        email = request.form['email']
        course = request.form['course']
        
        with sqlite3.connect("database.db") as conn:
            cursor = conn.cursor()
            cursor.execute("INSERT INTO students (name, email, course) VALUES (?, ?, ?)", (name, email, course))
            conn.commit()
        return redirect(url_for('index'))
    return render_template('add.html')

@app.route('/delete/<int:id>')
def delete_student(id):
    with sqlite3.connect("database.db") as conn:
        cursor = conn.cursor()
        cursor.execute("DELETE FROM students WHERE id=?", (id,))
        conn.commit()
    return redirect(url_for('index'))


if __name__ == '__main__':
    # host='0.0.0.0' is mandatory for Docker/Kubernetes
    app.run(host='0.0.0.0', port=5000, debug=True)