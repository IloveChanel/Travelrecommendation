# Travel Recommendation - Image Management Guide

## Image Organization

All images for the travel recommendation website are stored in the `images/` folder for better organization.

### Current Image Structure

```
travelRecommendation/
├── images/
│   ├── nyc-hero.jpg          (Hero background image)
│   ├── sydney.jpg             (City images)
│   ├── melbourne.jpg
│   ├── tokyo.jpg
│   ├── kyoto.jpg
│   ├── rio.jpg
│   ├── sao-paulo.jpg
│   ├── angkor-wat.jpg         (Temple images)
│   ├── taj-mahal.jpg
│   ├── borobudur.jpg
│   ├── bora-bora.jpg          (Beach images)
│   ├── copacabana.jpg
│   └── maldives.jpg
├── travel_recommendation.html
├── about.html
├── contact.html
├── travel_recommendation.css
├── travel_recommendation.js
└── travel_recommendation_api.json
```

## How to Add New Images

### Option 1: Using File Manager (Easiest for Lab Environment)

1. **Locate your images** on your desktop or local folder
2. **Open your project folder** in your file manager
3. **Navigate to** `travelRecommendation/images/` folder
4. **Copy or drag and drop** your image files into the `images/` folder
5. Make sure the image filenames match what's in your `travel_recommendation_api.json`

### Option 2: Using Command Line

If you have terminal/bash access:

```bash
# Navigate to your project directory
cd travelRecommendation

# Copy images from desktop to images folder
cp ~/Desktop/your-image.jpg images/

# Or move them
mv ~/Desktop/your-image.jpg images/
```

### Option 3: Using Git

If you're using version control:

```bash
# Add the images to git
git add images/*.jpg

# Commit the changes
git commit -m "Add travel destination images"
```

## Image File Naming

Your images should be named to match the references in `travel_recommendation_api.json`:

- **Cities**: `sydney.jpg`, `melbourne.jpg`, `tokyo.jpg`, `kyoto.jpg`, `rio.jpg`, `sao-paulo.jpg`
- **Temples**: `angkor-wat.jpg`, `taj-mahal.jpg`, `borobudur.jpg`
- **Beaches**: `bora-bora.jpg`, `copacabana.jpg`, `maldives.jpg`
- **Hero Background**: `nyc-hero.jpg`

## Updating Image References

If you add new destinations, update the `travel_recommendation_api.json` file:

```json
{
  "name": "New Destination",
  "imageUrl": "images/new-destination.jpg",
  "description": "Description here"
}
```

**Important:** Always include the `images/` prefix in the imageUrl path!

## Troubleshooting

### Images not showing?

1. **Check the file path** - Make sure the image is in the `images/` folder
2. **Check the filename** - Ensure it matches exactly (case-sensitive!)
3. **Check the JSON** - Verify the `imageUrl` includes `images/` prefix
4. **Refresh your browser** - Sometimes the browser caches old images

### Supported Image Formats

- JPEG/JPG (recommended)
- PNG
- WebP
- SVG

## Tips

- Keep image sizes reasonable (under 1MB) for faster loading
- Use descriptive filenames: `destination-name.jpg`
- Use lowercase and hyphens for filenames (not spaces)
- Optimize images before adding them to reduce file size
