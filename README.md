# Virtual Try-On

An AI-powered virtual clothing try-on application that allows a user to upload a human photo and a garment image, then generates a virtual try-on result.

The project explores the integration of a modern Next.js interface with image-processing/model inference workflows and persistent try-on history.

## How It Works

```
User Photo + Garment Image
          |
          v
     Next.js API Route
          |
          v
    Image Validation
          |
          v
     Temporary Files
          |
          v
      IDM-VTON
          |
          v
    Generated Try-On
          |
          +----> MongoDB History
          |
          v
       Result UI
```

## Features

- Upload a person image
- Upload a garment image
- Validate supported image formats
- Enforce a 10 MB per-image upload limit
- Generate an AI virtual try-on result
- Display processing/completed/failed states
- Persist generated results in try-on history
- View previous try-on results

## Tech Stack

- Next.js
- React
- JavaScript
- Tailwind CSS
- MongoDB / Mongoose
- IDM-VTON integration
- Node.js runtime APIs

## Project Structure

```
Virtual-Try-On/
├── app/
│   ├── api/
│   │   └── tryon/
│   ├── history/
│   ├── globals.css
│   ├── layout.jsx
│   └── page.jsx
├── components/
│   ├── HistoryGrid.jsx
│   ├── ImageUploader.jsx
│   ├── LoadingOverlay.jsx
│   ├── Navbar.jsx
│   ├── ResultViewer.jsx
│   └── Toast.jsx
├── lib/
├── models/
│   └── TryonHistory.js
├── package.json
└── tailwind.config.js
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a local environment file containing the MongoDB connection and the credentials/configuration required by the try-on model service.

Do not commit API keys, database credentials, generated secrets, or private service configuration.

### 3. Start the development server

```bash
npm run dev
```

Open the local Next.js application in your browser.

## Upload Validation

The try-on API accepts:

- JPEG
- PNG
- WEBP

Each uploaded image must be smaller than 10 MB. Temporary uploaded files are cleaned up after processing.

## API

### POST `/api/tryon`

Accepts multipart form data:

- `humanImage`
- `garmentImage`

On success, the endpoint returns the generated output image. Errors are returned as JSON with an appropriate HTTP status.

## Engineering Highlights

- Next.js App Router
- Server-side API route
- Multipart form-data handling
- Image validation
- Temporary-file lifecycle management
- External AI/model inference integration
- MongoDB persistence
- Client-side loading and error states

## Research Context

The application builds on the virtual try-on problem explored in the project's broader research work around improving virtual clothing try-on using image depth estimation. The production implementation and the research prototype should be treated as related but distinct artifacts.
