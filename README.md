# Traid-Forge Landing Page

A modern, responsive landing page for a college-based startup offering web development, UI/UX design, and other digital services.

## 🚀 Features

- **Modern Black & Gold Theme**: Sleek design with gold accents for a premium feel
- **Fully Responsive**: Looks great on all devices
- **Animated Sections**: Smooth animations using Framer Motion
- **Accessible**: WCAG compliant with keyboard navigation and screen reader support
- **Performance Optimized**: Fast loading with optimized assets
- **Component-based**: Modular architecture for easy maintenance

## 🛠️ Built With

- [React](https://reactjs.org/) - UI Library
- [TypeScript](https://www.typescriptlang.org/) - Type Safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Framer Motion](https://www.framer.com/motion/) - Animations

## 🚦 Getting Started

### Prerequisites

- Node.js 16+ and npm/yarn

### Installation

1. Clone the repository
   ```
   git clone https://github.com/your-username/traid-forge.git
   ```

2. Navigate to the project directory
   ```
   cd traid-forge
   ```

3. Install dependencies
   ```
   npm install
   ```

4. Start the development server
   ```
   npm run dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

## 📝 Project Structure

```
traid-forge/
├── public/              # Static assets
│   └── images/          # Image assets
│       ├── projects/    # Project showcase images
│       └── team/        # Team member photos
├── src/                 # Source code
│   ├── components/      # React components
│   │   ├── ui/          # UI components
│   ├── lib/             # Utility functions
│   ├── App.tsx          # Main App component
│   ├── main.tsx         # Entry point
│   └── index.css        # Global styles
├── .gitignore           # Git ignore file
├── index.html           # HTML template
├── package.json         # Project dependencies
├── tailwind.config.js   # Tailwind CSS configuration
├── tsconfig.json        # TypeScript configuration
└── vite.config.ts       # Vite configuration
```

## 🌄 Adding Images

The landing page requires specific images for optimal display. Add your images to the following locations:

### Required Images:

1. **Project Showcase**: 
   - Path: `/public/images/project-showcase.png`
   - Size: 1200x600px recommended
   - Purpose: Main showcase image on the homepage

2. **Team Member Photos**:
   - Path: `/public/images/team/[name].jpg` (e.g., alex.jpg, taylor.jpg)
   - Size: 400x500px recommended
   - Purpose: Team member portraits
   - Fallback: If no image is provided, initials will be displayed

3. **Project Images**:
   - Path: `/public/images/projects/[project-name].jpg` (e.g., studyhub.jpg)
   - Size: 800x450px recommended (16:9 ratio)
   - Purpose: Project showcase thumbnails

4. **Team at Work Image**:
   - Path: `/public/images/team-at-work.jpg`
   - Size: 800x600px recommended
   - Purpose: Featured in the "Why Choose Us" section

### Image Formats:

- Use `.jpg` for photographs
- Use `.png` for graphics with transparency
- Optimize all images for web (compress to reduce file size)

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Design inspiration from modern startup websites
- Icons from [Lucide](https://lucide.dev/)

---

Made with ❤️ by the Traid-Forge Team
