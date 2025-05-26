document.getElementById('screenshotBtn').addEventListener('click', () => {
  fetch('/screenshot')
    .then(res => {
      if (!res.ok) throw new Error('Network response was not ok');
      return res.blob();
    })
    .then(blob => {
      const url = URL.createObjectURL(blob);

      // Create or show the download button
      let downloadBtn = document.getElementById('downloadScreenshotBtn');
      if (!downloadBtn) {
        downloadBtn = document.createElement('a');
        downloadBtn.id = 'downloadScreenshotBtn';
        downloadBtn.textContent = 'Download Screenshot';
        downloadBtn.style.cssText = `
  display: inline-block;
  margin-top: 20px;
  padding: 12px 20px;
  background-color: #4CAF50;
  color: white;
  font-size: 16px;
  font-weight: bold;
  text-decoration: none;
  border: none;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, transform 0.2s ease;
  cursor: pointer;
  
`;
        document.body.appendChild(downloadBtn);
      }

      // Set the image blob URL and filename
      downloadBtn.href = url;
      downloadBtn.download = 'screenshot.png';

      // Revoke object URL when clicked to free memory
      downloadBtn.onclick = () => {
        setTimeout(() => URL.revokeObjectURL(url), 100);
      };
    })
    .catch(err => {
      console.error('Screenshot failed:', err);
      alert('Failed to take screenshot: ' + err.message);
    });
});
