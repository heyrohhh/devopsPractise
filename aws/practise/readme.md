🚀 Tech Stack
Frontend: React.js

Backend: Node.js (Express)

Database: MySQL

DevOps: Docker, Docker Compose

📁 Project Structure
Plaintext

practise/
├── frontend/          # React App & Dockerfile
├── backend/           # Node.js API & Dockerfile
├── database/          # SQL Schema scripts
└── docker-compose.yml # Main orchestration file
🛠️ Local Setup (Using Docker)
Agar aapne Docker install kiya hua hai, toh aapko manually kuch bhi install karne ki zaroorat nahi hai. Bas ye commands chalayein:

Repository Clone karein:

Bash

git clone <your-repo-link>
cd practise
Containers Build aur Run karein:

Bash

docker-compose up --build
Access the App:

Frontend: http://localhost:3000

Backend API: http://localhost:5000

☁️ Deployment Strategy (AWS)
Is project ko GitHub par push karne ka maqsad ise AWS par deploy karna hai. Hum niche diye gaye methods ka use kar sakte hain:

EC2 Instance: Docker Compose install karke direct container chalana.

AWS ECS (Elastic Container Service): Scalable containers chalane ke liye.

RDS: Managed MySQL database ke liye.

📝 Features
✅ Add Book: Book ka title aur author save karein.

✅ View Books: Database se list fetch karke display karein.

✅ Remove Book: Kisi bhi book ko delete karein.

✅ Persistence: Docker Volumes ka use karke database ka data save rehta hai.