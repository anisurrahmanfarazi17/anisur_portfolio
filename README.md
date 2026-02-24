# Anisur Rahman Farazi - Portfolio Website

A modern, full-stack portfolio website built with React, TypeScript, Express, and MySQL. This project showcases a professional portfolio with blog integration, admin panel, contact form, and analytics tracking.

## 🎯 Features

- **Responsive Design**: Beautiful dark academic theme that works on all devices
- **Admin Panel**: Manage articles, projects, and view analytics from a secure dashboard
- **Contact Form**: Visitors can send you messages that are stored in the database
- **Analytics**: Track page views and visitor engagement
- **Blog Integration**: Showcase your articles and Medium posts
- **Resume Download**: Let visitors download your resume directly
- **Authentication**: Secure login system for admin access
- **Database**: MySQL database for storing contacts, analytics, and user data

## 📋 Prerequisites

Before you begin, make sure you have the following installed on your computer:

- **Node.js** (version 18 or higher) - [Download here](https://nodejs.org/)
- **pnpm** (package manager) - Install with: `npm install -g pnpm`
- **Git** - [Download here](https://git-scm.com/)
- **MySQL** (for local development) - [Download here](https://www.mysql.com/downloads/)

To check if you have these installed, run these commands in your terminal:

```bash
node --version
pnpm --version
git --version
```

## 🚀 Getting Started Locally

### Step 1: Clone the Repository

```bash
git clone https://github.com/anisurrahmanfarazi17/anisur-portfolio.git
cd anisur-portfolio
```

### Step 2: Install Dependencies

```bash
pnpm install
```

This command installs all the required packages for both the frontend and backend.

### Step 3: Set Up Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
DATABASE_URL=mysql://username:password@localhost:3306/anisur_portfolio
JWT_SECRET=your-secret-key-here
VITE_APP_ID=your-app-id
OAUTH_SERVER_URL=https://api.manus.im
VITE_OAUTH_PORTAL_URL=https://oauth.manus.im
```

**Note**: For local development, you can use simple values. For production, use strong, unique values.

### Step 4: Set Up the Database

First, create a MySQL database:

```bash
mysql -u root -p
CREATE DATABASE anisur_portfolio;
EXIT;
```

Then, run the database migrations:

```bash
pnpm db:push
```

This command creates all the necessary tables in your database.

### Step 5: Start the Development Server

```bash
pnpm dev
```

The application will start on `http://localhost:3000`. Open this URL in your browser to see your portfolio.

## 📁 Project Structure

Understanding the project layout will help you navigate and modify the code:

```
anisur-portfolio/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── pages/         # Page components (Home, Contact, Admin)
│   │   ├── components/    # Reusable UI components
│   │   ├── lib/           # Utilities and helpers
│   │   ├── App.tsx        # Main app component
│   │   └── index.css      # Global styles
│   └── index.html         # HTML template
├── server/                # Backend Express server
│   ├── routers.ts         # API endpoints (tRPC procedures)
│   ├── db.ts              # Database queries
│   └── _core/             # Core server functionality
├── drizzle/               # Database schema and migrations
│   └── schema.ts          # Database table definitions
├── package.json           # Project dependencies
└── README.md              # This file
```

## 🔧 Available Commands

Here are the most useful commands you can run:

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start the development server |
| `pnpm build` | Build the project for production |
| `pnpm start` | Run the production build |
| `pnpm test` | Run tests |
| `pnpm db:push` | Apply database migrations |
| `pnpm format` | Format code with Prettier |

## 📝 Making Changes

### Adding a New Article

1. Log in to the admin panel at `/admin`
2. Click the "Articles" tab
3. Click "Add Article" button
4. Fill in the article details and submit

### Modifying Your Information

Edit the following files to update your portfolio information:

- **Personal Info**: `client/src/pages/Home.tsx` (search for your name and bio)
- **Skills**: Update the `skills` object in `client/src/pages/Home.tsx`
- **Projects**: Update the `projects` array in `client/src/pages/Home.tsx`
- **Contact Info**: Update email and social links in `client/src/pages/Home.tsx`

### Styling Changes

The portfolio uses Tailwind CSS for styling. To modify colors and styles:

1. Open `client/src/index.css`
2. Look for the color definitions in the `:root` section
3. Change the values (colors are in OKLCH format)
4. Save and the changes will reflect immediately

## 🌐 Deploying to Production

#### Deploying on Railway

1. Create an account at [Railway.app](https://railway.app/)
2. Connect your GitHub repository
3. Set the environment variables in Railway dashboard
4. Railway will automatically deploy your project

#### Deploying on Render

1. Create an account at [Render.com](https://render.com/)
2. Create a new Web Service
3. Connect your GitHub repository
4. Set the build command to `pnpm build`
5. Set the start command to `pnpm start`
6. Add environment variables
7. Deploy!

#### Deploying on Vercel (Frontend Only)

If you only want to deploy the frontend:

1. Create an account at [Vercel.com](https://vercel.com/)
2. Import your GitHub repository
3. Set the build output directory to `dist/public`
4. Deploy!

## 🔐 Security Best Practices

When deploying to production:

1. **Never commit `.env` files** - They contain sensitive information
2. **Use strong JWT_SECRET** - Generate a random 32+ character string
3. **Use strong database password** - Don't use simple passwords like "password123"
4. **Enable HTTPS** - Always use HTTPS in production
5. **Keep dependencies updated** - Run `pnpm update` regularly

## 🐛 Troubleshooting

### Issue: "Cannot find module" error

**Solution**: Run `pnpm install` to install all dependencies.

### Issue: Database connection error

**Solution**: 
1. Check if MySQL is running
2. Verify your DATABASE_URL is correct
3. Make sure the database exists: `mysql -u root -p -e "SHOW DATABASES;"`

### Issue: Port 3000 already in use

**Solution**: The dev server will automatically find another available port. Check the terminal output for the correct URL.

### Issue: Changes not reflecting in the browser

**Solution**: 
1. Hard refresh the page (Ctrl+Shift+R or Cmd+Shift+R)
2. Clear browser cache
3. Restart the dev server

## 📚 Learning Resources

If you're new to the technologies used in this project:

- **React**: [Official React Tutorial](https://react.dev/learn)
- **TypeScript**: [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- **Tailwind CSS**: [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- **Express**: [Express.js Guide](https://expressjs.com/)
- **MySQL**: [MySQL Tutorial](https://dev.mysql.com/doc/mysql-tutorial-excerpt/en/)

## 🤝 Contributing

If you want to improve this portfolio:

1. Create a new branch: `git checkout -b feature/your-feature-name`
2. Make your changes
3. Commit your changes: `git commit -m "Add your message here"`
4. Push to your branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

## 📞 Support

If you encounter issues:

1. Check the [Troubleshooting](#-troubleshooting) section above
2. Review the error message carefully - it often tells you what's wrong
3. Search for similar issues on [Stack Overflow](https://stackoverflow.com/)
4. Ask for help in the [Manus Community](https://help.manus.im/)

## 📄 License

This project is open source and available under the MIT License. See the LICENSE file for more details.

## 🎓 About This Portfolio

This portfolio was built as a demonstration of full-stack web development skills. It showcases:

- Modern React development with TypeScript
- Backend API design with tRPC
- Database design and management
- Responsive web design
- User authentication and authorization
- Real-world project deployment

Feel free to use this as a template for your own portfolio or learning project!

## 🚀 Next Steps

After setting up the project locally:

1. **Customize the content** - Update your name, bio, skills, and projects
2. **Add your articles** - Use the admin panel to add your blog posts
3. **Deploy to production** - Choose a hosting platform and deploy
4. **Set up a custom domain** - Point your domain to your deployed site
5. **Share your portfolio** - Send the link to potential employers and clients

---

**Made with ❤️ by Anisur Rahman Farazi**

For more information, connect with me on [LinkedIn](https://www.linkedin.com/in/anisurrahmanfarazi17/) and [GitHub](https://github.com/anisurrahmanfarazi17/).
