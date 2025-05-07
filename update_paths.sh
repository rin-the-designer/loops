#!/bin/bash

echo "Starting to update all HTML files with absolute paths..."

# First handle main project directories
for project in static/project-content/*; do
  if [ -d "$project" ] && [ -f "$project/index.html" ]; then
    slug=$(basename "$project")
    echo "=== Processing $slug ==="
    
    # Create a backup
    cp "$project/index.html" "$project/index.html.bak"
    
    # Update common resources with absolute paths
    sed -i "" "s|href=\"style.css\"|href=\"/project-content/$slug/style.css\"|g" "$project/index.html"
    sed -i "" "s|href=\"./style.css\"|href=\"/project-content/$slug/style.css\"|g" "$project/index.html"
    
    # Update media sources
    sed -i "" "s|src=\"loops.mp3\"|src=\"/project-content/$slug/loops.mp3\"|g" "$project/index.html"
    sed -i "" "s|src=\"./loops.mp3\"|src=\"/project-content/$slug/loops.mp3\"|g" "$project/index.html"
    sed -i "" "s|src=\"crackling.aac\"|src=\"/project-content/$slug/crackling.aac\"|g" "$project/index.html"
    sed -i "" "s|src=\"./crackling.aac\"|src=\"/project-content/$slug/crackling.aac\"|g" "$project/index.html"
    sed -i "" "s|src=\"ohm.aac\"|src=\"/project-content/$slug/ohm.aac\"|g" "$project/index.html"
    sed -i "" "s|src=\"./ohm.aac\"|src=\"/project-content/$slug/ohm.aac\"|g" "$project/index.html"
    
    # Update script references
    sed -i "" "s|src=\"sketch.js\"|src=\"/project-content/$slug/sketch.js\"|g" "$project/index.html"
    sed -i "" "s|src=\"./sketch.js\"|src=\"/project-content/$slug/sketch.js\"|g" "$project/index.html"
    sed -i "" "s|src=\"script.js\"|src=\"/project-content/$slug/script.js\"|g" "$project/index.html"
    sed -i "" "s|src=\"./script.js\"|src=\"/project-content/$slug/script.js\"|g" "$project/index.html"
    
    # Check sketch.js for any relative paths and update them
    if [ -f "$project/sketch.js" ]; then
      cp "$project/sketch.js" "$project/sketch.js.bak"
      # Update any references to text files
      sed -i "" "s|loadStrings('the-|loadStrings('/project-content/$slug/the-|g" "$project/sketch.js"
      sed -i "" "s|loadStrings(\"the-|loadStrings(\"/project-content/$slug/the-|g" "$project/sketch.js"
      echo "Updated sketch.js"
    fi
    
    echo "Updated $slug"
  fi
done

# Now handle nested subdirectories
echo "Looking for nested directories..."
for project in static/project-content/*; do
  # Skip if not a directory
  if [ ! -d "$project" ]; then
    continue
  fi
  
  slug=$(basename "$project")
  
  # Look for subdirectories that have an index.html file
  find "$project" -mindepth 1 -type d | while read subdir; do
    if [ -f "$subdir/index.html" ]; then
      subdir_name=$(basename "$subdir")
      echo "=== Processing nested directory $slug/$subdir_name ==="
      
      # Create a backup
      cp "$subdir/index.html" "$subdir/index.html.bak"
      
      # Build the full path for this subdirectory
      path_prefix="/project-content/$slug/$subdir_name"
      
      # Update resources with absolute paths
      sed -i "" "s|href=\"style.css\"|href=\"$path_prefix/style.css\"|g" "$subdir/index.html"
      sed -i "" "s|href=\"./style.css\"|href=\"$path_prefix/style.css\"|g" "$subdir/index.html"
      
      # Update script references
      sed -i "" "s|src=\"sketch.js\"|src=\"$path_prefix/sketch.js\"|g" "$subdir/index.html"
      sed -i "" "s|src=\"./sketch.js\"|src=\"$path_prefix/sketch.js\"|g" "$subdir/index.html"
      sed -i "" "s|src=\"script.js\"|src=\"$path_prefix/script.js\"|g" "$subdir/index.html"
      sed -i "" "s|src=\"./script.js\"|src=\"$path_prefix/script.js\"|g" "$subdir/index.html"
      
      # Check sketch.js for any relative paths and update them
      if [ -f "$subdir/sketch.js" ]; then
        cp "$subdir/sketch.js" "$subdir/sketch.js.bak"
        # Update any references to text files in the parent directory
        sed -i "" "s|loadStrings('../the-|loadStrings('/project-content/$slug/the-|g" "$subdir/sketch.js"
        sed -i "" "s|loadStrings(\"../the-|loadStrings(\"/project-content/$slug/the-|g" "$subdir/sketch.js"
        echo "Updated $subdir_name/sketch.js"
      fi
      
      echo "Updated $slug/$subdir_name"
    fi
  done
done

echo "All HTML and JS files updated with absolute paths." 