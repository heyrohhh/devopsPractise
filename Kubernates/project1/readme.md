🚀 Employee Management System (Kubernetes Edition)
Ek full-stack CRUD application jo React, Node.js, aur MySQL ka use karti hai, aur poori tarah se Kubernetes (K8s) par scaled aur deployed hai. Is project ko local machine par high-availability aur load balancing ke saath chalane ke liye design kiya gaya hai.

🏗️ Architecture Overview
Frontend: React (Vite) - 3 Replicas.

Backend: Node.js (Express) - 3 Replicas with HPA (Auto-scaling).

Database: MySQL - Persistent storage.

Ingress: Nginx Ingress Controller for path-based routing (/ for UI, /api for Backend).

Scaling: Horizontal Pod Autoscaler (HPA) integrated for backend traffic management.

🛠️ Prerequisites
Shuru karne se pehle, ensure karein ki aapke paas ye tools installed hain:

Docker Desktop (with Kubernetes enabled)

kubectl (Command line tool)

Ingress Nginx Controller installed in your cluster

🚀 Getting Started
1. Host File Entry
Sabse pehle apne local machine ki hosts file (C:\Windows\System32\drivers\etc\hosts) mein ye line add karein:

Plaintext

127.0.0.1  employee.local
2. Configuration & Secrets
Kubernetes Secret aur ConfigMap apply karein:

Bash

kubectl apply -f k8s/configmap.yaml
kubectl apply -f k8s/secret.yaml
3. Database Setup
MySQL deploy karein aur database create karein:

Bash

kubectl apply -f k8s/db-deployment.yaml

# Database aur Table create karne ke liye:
kubectl exec -it <mysql-pod-name> -n employeemanagement -- mysql -u root -p
# Run the SQL commands inside: 
# CREATE DATABASE employee_db; USE employee_db; CREATE TABLE employees (...);
4. Deploy Frontend & Backend
Saari services aur deployments ko start karein:

Bash

kubectl apply -f k8s/backend-deployment.yaml
kubectl apply -f k8s/frontend-deployment.yaml
kubectl apply -f k8s/ingress.yaml
🌐 How to Access
Ab aap browser mein niche diye gaye URL par project dekh sakte hain:

Frontend: http://employee.local

API Check: http://employee.local/api/employees

📊 Monitoring & Scaling
Pod Status: kubectl get pods -n employeemanagement

Autoscaling Status: kubectl get hpa -n employeemanagement

Ingress Details: kubectl describe ing employee-ingress -n employeemanagement

⚙️ Kubernetes Features Used
Deployments: Managing stateless (UI/API) and stateful (DB) apps.

Services: LoadBalancer and ClusterIP for internal/external networking.

Ingress: Advanced path-based routing with rewrite-target.

HPA: Scaling backend pods based on CPU utilization.

Environment Variables: Using envFrom to inject ConfigMaps and Secrets.