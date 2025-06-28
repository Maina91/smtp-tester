# SMTP Tester

A simple web application to test SMTP server connections and send test emails. Built with React (TypeScript) frontend and Node.js (TypeScript) backend.

## Features

- Test SMTP server connections
- Send test emails to verify SMTP configuration
- Simple and intuitive user interface
- Secure connection testing with TLS/SSL support
- Detailed error reporting

## Prerequisites

- Node.js (v18 or later)
- npm or yarn
- An SMTP server to test against

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/smtp-tester.git
cd smtp-tester
```

### 2. Install dependencies

```bash
# Install root dependencies
npm install

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
cd ..
```

### 3. Configure the application

#### Backend Configuration

Create a `.env` file in the `backend` directory with the following variables:

```env
# Server configuration
PORT=3000
NODE_ENV=development

# CORS configuration (for production, replace with your domain)
CORS_ORIGIN=http://localhost:5173

# Rate limiting
RATE_LIMIT_WINDOW_MS=900000  # 15 minutes
RATE_LIMIT_MAX_REQUESTS=100  # 100 requests per window
```

### 4. Run the application

#### Development Mode

Start both frontend and backend in development mode:

```bash
# From the project root
npm run dev
```

This will start:
- Frontend on http://localhost:5173
- Backend on http://localhost:3000

#### Production Build

1. Build the frontend:

```bash
cd frontend
npm run build
cd ..
```

2. Start the backend in production mode:

```bash
cd backend
NODE_ENV=production npm start
```

## Usage

1. Open the application in your web browser (http://localhost:5173 in development)
2. Enter your SMTP server details:
   - Host
   - Port (default: 587 for TLS, 465 for SSL, 25 for unencrypted)
   - Security option (TLS/SSL/None)
   - Authentication credentials (username/password)
   - (Optional) From and To email addresses for test email
3. Click "Test Connection" to verify the SMTP server
4. If you've provided email addresses, you can send a test email

## Project Structure

```
smtp-tester/
├── backend/               # Backend server code
│   ├── src/
│   │   ├── app.ts        # Express application setup
│   │   ├── server.ts     # Server entry point
│   │   └── validate.ts   # Request validation
│   ├── .env              # Environment variables
│   └── package.json
│
├── frontend/             # Frontend React application
│   ├── public/           # Static files
│   ├── src/
│   │   ├── App.tsx      # Main application component
│   │   └── main.tsx     # React entry point
│   └── package.json
│
├── .gitignore
└── package.json          # Root package.json for development
```

## Security Considerations

- Never commit sensitive information (passwords, API keys) to version control
- Use environment variables for configuration
- The application only validates SMTP credentials and sends test emails - it doesn't store any credentials
- For production use, ensure proper CORS configuration and rate limiting

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with [React](https://reactjs.org/) and [Express](https://expressjs.com/)
- UI powered by [Tailwind CSS](https://tailwindcss.com/)
- Icons by [Lucide](https://lucide.dev/)
- SMTP handling with [Nodemailer](https://nodemailer.com/)
