async function setup() {
  await faceapi.nets.tinyFaceDetector.loadFromUri('https://cdn.jsdelivr.net/npm/face-api.js/models');
  await faceapi.nets.faceRecognitionNet.loadFromUri('https://cdn.jsdelivr.net/npm/face-api.js/models');
  await faceapi.nets.faceLandmark68Net.loadFromUri('https://cdn.jsdelivr.net/npm/face-api.js/models');

  const video = document.getElementById('video');
  navigator.mediaDevices.getUserMedia({ video: {} })
    .then(stream => video.srcObject = stream);

  document.getElementById('checkinBtn').addEventListener('click', async () => {
    const detection = await faceapi.detectSingleFace(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptor();
    if (!detection) return alert('No face found');

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const labeledDescriptors = users.map(user => new faceapi.LabeledFaceDescriptors(user.name, [new Float32Array(user.descriptor)]));
    const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors, 0.6);

    const bestMatch = faceMatcher.findBestMatch(detection.descriptor);
    const status = document.getElementById('status');
    const checkins = JSON.parse(localStorage.getItem('checkins') || '[]');
    const matchResult = bestMatch.label !== 'unknown' ? bestMatch.label : 'Unmatched';
    status.innerText = `Check-in result: ${matchResult}`;

    checkins.push({ time: new Date().toISOString(), match: matchResult });
    localStorage.setItem('checkins', JSON.stringify(checkins));
  });
}
setup();
