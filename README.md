# SMTP Tester

A robust web application for testing SMTP server connections and sending test emails. Built with a React (TypeScript) frontend and a Node.js (TypeScript) backend.

## Features

- Test SMTP server connectivity and authentication
- Send test emails to verify SMTP configuration
- User-friendly, responsive interface
- Secure connection testing with TLS/SSL support
- Detailed error reporting for troubleshooting
- Configurable CORS and rate limiting for security

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- npm or yarn
- Access to an SMTP server for testing

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Maina91/smtp-tester.git
cd smtp-tester
```

### 2. Install Dependencies

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

### 3. Configure the Application

#### Backend Configuration

Create a `.env` file in the `backend` directory with the following variables:

```env
# Server configuration
PORT=3000
NODE_ENV=development

# CORS configuration (comma-separated list of allowed origins)
CORS_ORIGINS=http://localhost:5173

# Rate limiting
RATE_LIMIT_WINDOW_MS=900000  # 15 minutes
RATE_LIMIT_MAX_REQUESTS=100  # 100 requests per window
```

- For **production**, set `CORS_ORIGINS` to your deployed frontend domain(s), e.g.:
  ```
  CORS_ORIGINS=https://yourdomain.com,https://admin.yourdomain.com
  ```

### 4. Run the Application

#### Development Mode

Start both frontend and backend in development mode:

```bash
# From the project root
npm run dev
```

- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend: [http://localhost:3000](http://localhost:3000)

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

1. Open the application in your browser (`http://localhost:5173` in development)
2. Enter your SMTP server details:
   - Host
   - Port (587 for TLS, 465 for SSL, 25 for unencrypted)
   - Security option (TLS/SSL/None)
   - Authentication credentials (username/password)
   - (Optional) From and To email addresses for sending a test email
3. Click **Test Connection** to verify the SMTP server
4. If email addresses are provided, a test email will be sent

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

- **Never** commit sensitive information (passwords, API keys) to version control
- Use environment variables for all configuration and secrets
- The application does **not** store any SMTP credentials or email content
- For production, ensure proper CORS configuration and enable rate limiting
- Regularly update dependencies to address security vulnerabilities

## Contributing

We welcome contributions! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add YourFeature'`)
4. Push to your branch (`git push origin feature/YourFeature`)
5. Open a Pull Request describing your changes

Please ensure your code adheres to the project's coding standards and includes relevant tests and documentation.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with [React](https://reactjs.org/) and [Express](https://expressjs.com/)
- UI powered by [Tailwind CSS](https://tailwindcss.com/)
- Icons by [Lucide](https://lucide.dev/)
- SMTP handling with [Nodemailer](https://nodemailer.com/)
