```markdown
# NexusCRM

Hey! This is a simple and clean Lead Management CRM I built to help small businesses track, manage, and convert their potential leads without dealing with messy spreadsheets. It handles everything from custom lead statuses to real-time search and basic performance metrics.

## 🔗 Live & Code Links
- **See it live on Vercel:** https://nexus-crm-fullstack.vercel.app
- **GitHub Code Repository:** https://github.com/md-jnid-qureshi/nexus-crm-fullstack

## 🛠️ Built With
- **Frontend:** React (Vite), Tailwind CSS, Lucide Icons
- **Backend:** Node.js, Express
- **Database:** MongoDB Atlas (Mongoose)
- **Host:** Vercel

## ✨ Key Features
- **Full CRUD Setup:** Easily add new leads, edit details, update statuses, or delete them when done.
- **Instant Search:** Quick lookups by Name, Email, or Company right from the search bar.
- **Pipeline Tracking:** Filter and sort leads through standard stages (New, Contacted, Qualified, Converted, Lost).
- **Quick Analytics:** Dashboard boxes that automatically count total leads, conversion rates, and ongoing pipelines.
- **Mobile Responsive:** Built with fluid layout tweaks so the sidebar turns into a clean absolute overlay drawer on mobile screens.

## 📦 How to Run it Locally

Follow these quick steps to get the app running on your own machine.

### 1. Grab the code
```bash
git clone [https://github.com/md-jnid-qureshi/nexus-crm-fullstack.git](https://github.com/md-jnid-qureshi/nexus-crm-fullstack.git)
cd nexus-crm-fullstack

```

### 2. Set up the Backend Server

1. Stay in the root directory (where `server.js` lives).
2. Grab the backend packages:

```bash
   npm install

```

3. Create a simple `.env` file right here and put your MongoDB link inside:

```text
   MONGO_URI=your_mongodb_connection_string
   PORT=5000

```

4. Fire up the server:

```bash
   npm run dev

```

### 3. Set up the Frontend Client

1. Open a new terminal tab and jump into the client folder:

```bash
   cd client

```

2. Install frontend dependencies:

```bash
   npm install

```

3. Boot up the local dev server:

```bash
   npm run dev

```

## 📂 Project Layout

* `client/` -> The frontend React application (Vite setup).
* `models/` -> Database schemas for our leads.
* `routes/` -> Clean Express API routes for all CRUD and search actions.
* `server.js` -> Main entry point for our Node backend server.
* `vercel.json` -> Rules for routing frontend and backend together on Vercel.

```
```
